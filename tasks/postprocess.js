var fs = require('fs'),
    path = require('path'),
    childProcess = require('child_process'),
    xmldom = require('xmldom');

module.exports = function (grunt) {
    'use strict';

    var PLACEHOLDER_WITH_DEFAULT_G = /\$\{(\d+):(\w+)\}/g,
        PLACEHOLDER_WITH_DEFAULT   = /\$\{(\d+):(\w+)\}/,
        PLACEHOLDER_NO_DEFAULT_G   = /\$\{(\d+):\}/g,
        PLACEHOLDER_NO_DEFAULT     = /\$\{(\d+):\}/,
        PLACEHOLDER_END_G          = /\$0/g,
        PLACEHOLDER_END            = /\$0/,
        FIELD_POINTS_G             = /\$(\d+)/g,
        FIELD_POINTS               = /\$(\d+)/;

    grunt.registerTask('postProcessSnippets', 'Text based post processing of transformed sublime-snippets', function() {
        var done = this.async(),
            files = grunt.file.expand(grunt.config('postProcessSnippets.options.files')),
            placeHolderStr  = '####@@####',
            placeHolderRegEx = new RegExp(placeHolderStr, 'g'),
            domParser       = new xmldom.DOMParser(),
            xmlSerializer   = new xmldom.XMLSerializer();

        console.log('running postProcess', files);

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

            doc = domParser.parseFromString(template, 'text/xml');
            tmplEl = [].slice.call(doc.getElementsByTagName('template'));

            if (tmplEl) {
                tmplEl.forEach(function(tmpl) {
                    tmplStr = tmpl.getAttribute('value');

                    while(defaults = PLACEHOLDER_WITH_DEFAULT_G.exec(tmplStr)){
                        customVars.push({
                            index: defaults[1],
                            defaultValue: defaults[2],
                            name: 'MYVAR' + defaults[1]
                        });
                        //console.log('defaults', customVars);
                        tmplStr = tmplStr.replace(PLACEHOLDER_WITH_DEFAULT, placeHolderStr + defaults[1] + placeHolderStr).replace(placeHolderRegEx, '$');
                    }

                    while(noDefaults = PLACEHOLDER_NO_DEFAULT_G.exec(tmplStr)){
                        customVars.push({
                            index: noDefaults[1],
                            defaultValue: null,
                            name: 'MYVAR' + noDefaults[1]
                        });
                        //console.log('no defaults', noDefaults);
                        tmplStr = tmplStr.replace(PLACEHOLDER_NO_DEFAULT, '$CUSTOMVAR$');
                    }

                    while(fieldPts = FIELD_POINTS_G.exec(tmplStr)){
                        customVars.push({
                            index: fieldPts[1],
                            defaultValue: null,
                            name: 'MYVAR' + fieldPts[1]
                        });
                        //console.log('field points', fieldPts);
                        //tmplStr = tmplStr.replace(FIELD_POINTS, '$_$');
                    }

                    tmplStr = tmplStr.replace(PLACEHOLDER_END_G, '$END$');
                    tmpl.setAttribute('value', tmplStr);

                    customVars.forEach(function(customVar){
                        var variableEl = doc.createElement('variable');
                        variableEl.setAttribute('name', customVar.name);
                        variableEl.setAttribute('expression', '');
                        variableEl.setAttribute('defaultValue', customVar.defaultValue || '');
                        variableEl.setAttribute('alwaysStopAt', 'true');
                        tmpl.appendChild(variableEl);
                    });
                });
            }

            console.log(xmlSerializer.serializeToString(doc));
        });

        done();
    });
};