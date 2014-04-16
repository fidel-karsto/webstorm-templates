var xmldom = require('xmldom');

module.exports = function (grunt) {
    'use strict';

    var PLACEHOLDER_WITH_DEFAULT_G = /\$\{(\d+):(\w+)\}/g,
        PLACEHOLDER_WITH_DEFAULT   = /\$\{(\d+):(\w+)\}/,
        PLACEHOLDER_NO_DEFAULT_G   = /\$\{(\d+):\}/g,
        PLACEHOLDER_NO_DEFAULT     = /\$\{(\d+):\}/,
        PLACEHOLDER_END_G          = /\$0/g,
        FIELD_POINTS_G             = /\$(\d+)/g,
        FIELD_POINTS               = /\$(\d+)/;

    grunt.registerTask('postProcessSnippets', 'Text based post processing of transformed sublime-snippets', function() {
        var done = this.async(),
            files = grunt.file.expand(grunt.config('postProcessSnippets.options.files')),
            placeHolderStr  = '####@@####',
            placeHolderRegEx = new RegExp(placeHolderStr, 'g'),
            domParser       = new xmldom.DOMParser(),
            xmlSerializer   = new xmldom.XMLSerializer();

        grunt.log.writeln('running postProcess', files);

        files.forEach(function(file) {
            var template = grunt.file.read(file),
                doc,
                customVars = [],
                defaults,
                noDefaults,
                fieldPts,
                tmplStr,
                tmplEl;

            grunt.verbose.write('processing ', template);

            doc = domParser.parseFromString(template, 'text/xml');
            tmplEl = [].slice.call(doc.getElementsByTagName('template'));

            if (tmplEl) {
                tmplEl.forEach(function(tmpl) {
                    tmplStr = tmpl.getAttribute('value');

                    while(fieldPts = FIELD_POINTS_G.exec(tmplStr)){
                        if (fieldPts[1] > 0) {
                            customVars.push({
                                index: fieldPts[1],
                                defaultValue: null,
                                name: 'FIELD' + fieldPts[1]
                            });
                        }
                        grunt.verbose.writeln('field points', fieldPts);
                        tmplStr = tmplStr.replace(FIELD_POINTS, '$FIELD$');
                    }

                    while(defaults = PLACEHOLDER_WITH_DEFAULT_G.exec(tmplStr)){
                        customVars.push({
                            index: defaults[1],
                            defaultValue: defaults[2],
                            name: 'MYVAR' + defaults[1]
                        });
                        grunt.verbose.writeln('defaults', customVars);
                        tmplStr = tmplStr.replace(PLACEHOLDER_WITH_DEFAULT, placeHolderStr + '$MYVAR' + defaults[1] + placeHolderStr).replace(placeHolderRegEx, '$');
                    }

                    while(noDefaults = PLACEHOLDER_NO_DEFAULT_G.exec(tmplStr)){
                        customVars.push({
                            index: noDefaults[1],
                            defaultValue: null,
                            name: 'MYVAR' + noDefaults[1]
                        });
                        grunt.verbose.writeln('no defaults', noDefaults);
                        tmplStr = tmplStr.replace(PLACEHOLDER_NO_DEFAULT, '$MYVAR' + noDefaults[1] + '$');
                    }

                    tmplStr = tmplStr.replace(PLACEHOLDER_END_G, '$END$');
                    tmpl.setAttribute('value', tmplStr);

                    customVars.sort(function(a, b) {
                        return a.index - b.index;
                    });

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
            grunt.file.write(file, xmlSerializer.serializeToString(doc));

            grunt.verbose.write(xmlSerializer.serializeToString(doc));
        });

        done();
    });
};