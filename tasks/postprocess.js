var xmldom = require('xmldom');
var _ = require('lodash');

module.exports = function (grunt) {
    'use strict';

    var PLACEHOLDER_WITH_DEFAULT_G = /\${([0-9]+):(\w*)}|\$([1-9]+)/g,
        PLACEHOLDER_END_G = /\$0/g;

    grunt.registerTask('postProcessSnippets', 'Text based post processing of transformed sublime-snippets', function () {
        var done = this.async(),
            files = grunt.file.expand(grunt.config('postProcessSnippets.options.files')),
            domParser = new xmldom.DOMParser(),
            xmlSerializer = new xmldom.XMLSerializer();

        var findIndex = function (customVars, index) {
            return _.find(customVars, function (customVar) {
                return customVar.index === index;
            });
        };

        grunt.log.writeln('running postProcess', files);

        files.forEach(function (file) {
            var template = grunt.file.read(file),
                doc,
                customVars = [],
                tmplStr,
                tmplEl;

            grunt.verbose.write('processing ', template);

            doc = domParser.parseFromString(template, 'text/xml');
            tmplEl = [].slice.call(doc.getElementsByTagName('template'));

            if (tmplEl) {
                tmplEl.forEach(function (tmpl) {
                    tmplStr = tmpl.getAttribute('value');
                    grunt.verbose.write('template prior modification', tmplStr);
                    tmplStr = tmplStr.replace(PLACEHOLDER_WITH_DEFAULT_G, function (match, p1, p2, p3) {
                        if (!findIndex(customVars, p1 || p3)) {
                            customVars.push({
                                index: p1 || p3,
                                expression: '"' + p2 + '"',
                                name: 'MYVAR' + (p1 || p3)
                            });
                        }
                        return '$MYVAR' + (p1 || p3) + '$';
                    });
                    grunt.verbose.write('template after modification', tmplStr);

                    tmplStr = tmplStr.replace(PLACEHOLDER_END_G, '$END$');
                    tmpl.setAttribute('value', tmplStr);

                    customVars.sort(function (a, b) {
                        return a.index - b.index;
                    });

                    customVars.forEach(function (customVar) {
                        var variableEl = doc.createElement('variable');
                        variableEl.setAttribute('name', customVar.name);
                        variableEl.setAttribute('expression', customVar.expression || '');
                        variableEl.setAttribute('defaultValue', '');
                        variableEl.setAttribute('alwaysStopAt', 'true');
                        tmpl.appendChild(variableEl);
                    });
                });
            }

            doc = xmlSerializer.serializeToString(doc);

            //Replace actual newline and tabs for their utf8 code in template value.
            doc = doc.replace(/<template name="[^\"]*" value=\"[^\"]*\"/gm, function (match) {
                match = match.replace(/\n/g, '&#10;');
                match = match.replace(/\t/g, '&#09;');
                return match;
            });

            grunt.file.write(file, doc);

            grunt.verbose.write(xmlSerializer.serializeToString(doc));
        });

        done();
    });
};
