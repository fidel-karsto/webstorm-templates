var fs = require('fs'),
    path = require('path'),
    childProcess = require('child_process'),
    xmldom = require('xmldom');

module.exports = function (grunt) {
    'use strict';
    function wrapAndReplace() {
        var placeHolderStr = '####@@####',
            placeHolderRegExp = new RegExp(placeHolderStr, 'g');

        return function (str) {
            //TODO build closure
        };
    }

    grunt.registerTask('postProcessSnippets', 'Text based post processing of transformed sublime-snippets', function() {
        var done = this.async(),
            files = grunt.file.expand(grunt.config('postProcessSnippets.options.files')),
            placeHolderEND = /\$0/g,
            placeholderWithDefault = /\$\{(\d+):(\w+)\}/g,
            placeholderNoDefault = /\$\{(\d+):\}/g,
            fieldPoints = /\$(\d+)/g,
            placeHolderStr = '####@@####',
            placeHolderRegExp = new RegExp(placeHolderStr, 'g'),
            domParser = new xmldom.DOMParser(),
            xmlSerializer = new xmldom.XMLSerializer();

        console.log('running postProcess', files);

        // <variable name="DEPENDENCIES" expression="" defaultValue="deps" alwaysStopAt="true" />

        files.forEach(function(file) {
            var template = grunt.file.read(file),
                doc,
                customVars = [],
                defaults,
                noDefaults,
                fieldPts,
                tmplStr,
                tmplEl;
            console.log('processing ', template);

            if (placeholderNoDefault.test(template)) {

                doc = domParser.parseFromString(template, 'text/xml');
                tmplEl = [].slice.call(doc.getElementsByTagName('template'));

                if (tmplEl) {
                    tmplEl.forEach(function(tmpl) {
                        tmplStr = tmpl.getAttribute('value');

                        defaults = placeholderWithDefault.exec(tmplStr);
                        noDefaults = placeholderNoDefault.exec(tmplStr);
                        fieldPts = fieldPoints.exec(tmplStr);

                        console.log('defaults', defaults);
                        console.log('no defaults', noDefaults);
                        console.log('field points', fieldPts);

                        tmplStr = tmplStr.replace(placeHolderEND, '$END$');
                        tmplStr = tmplStr.replace(placeholderWithDefault, placeHolderStr+'$2'+placeHolderStr).replace(placeHolderRegExp, '$');
                        tmplStr = tmplStr.replace(placeholderNoDefault, '$CUSTOMVAR$');

                        tmplEl[0].setAttribute('value', tmplStr);

                        console.log('value: ', tmpl.getAttribute('value'));
                    });
                }

                console.log(xmlSerializer.serializeToString(doc));
            }
        });

        done();
    });
};