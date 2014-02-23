module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        listfiles: {
            options: {
                banner: '<fileset>',
                footer: '</fileset>',
                prefix: '\t<files>../',
                postfix: '</files>',
                postfixLastLine: '</files>',
                replacements: [{
                    pattern: /\s/,
                    replacement: encodeURI(' ')
                }]
            },
            foundation5: {
                files: {
                    'tmp/Zurb-Foundation-Templates.xml': ['externals/foundation-5-sublime-snippets/Snippets/Sublime Snippets/*.sublime-snippet']
                }
            }
        },

        xsltproc: {
            options: {
                stylesheet: 'xslt/sublime-snippet2webstorm.xsl'
            },
            compile: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: 'tmp/Zurb-Foundation-Templates.xml',
                    dest: 'build/',
                    rename: function (dest, matchedSrcPath) {
                        return (encodeURI(dest + matchedSrcPath.replace('.sublime-snippet', '.xml')));
                    }
                }]
            }
        },

        copy: {
            templates: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: 'templates/*.xml',
                    dest: 'build/'
                }]
            }
        },

        clean: {
            previousSnippets: {
                files: [{
                    dot: true,
                    src: ['build/*', 'tmp/*']
                }]
            },
            tempOnly: {
                files: [{
                    dot: true,
                    src: ['tmp/*']
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-xsltproc');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-listfiles');

    grunt.registerTask('foundation5', ['clean:previousSnippets','listfiles', 'xsltproc', 'clean:tempOnly']);

    grunt.registerTask('default', ['foundation5', 'copy']);
};