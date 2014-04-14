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
            collectTemplates: {
                files: {
                    'tmp/Zurb-Foundation-Templates.xml': ['externals/foundation-5-sublime-snippets/Snippets/Sublime Snippets/*.sublime-snippet'],
                    'tmp/Custom-Sublime-Snippets.xml': ['src-sublime-snippets/*.sublime-snippet']
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
                    src: 'tmp/<%= grunt.task.current.args[0] %>',
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

        postProcessSnippets: {
            options: {
                files: ['build/Custom-Sublime-Snippets.xml']
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

    grunt.loadTasks('tasks');

    grunt.registerTask('foundation5', ['xsltproc:compile:Zurb-Foundation-Templates.xml']);
    grunt.registerTask('customSnippets', ['xsltproc:compile:Custom-Sublime-Snippets.xml']);

    grunt.registerTask('default', ['clean', 'listfiles:collectTemplates','foundation5', 'customSnippets',
                                   'postProcessSnippets', 'copy', 'clean:tempOnly']);
};