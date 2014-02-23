webstorm-templates
==================

This is just a prove of concept on how to convert Sublime Text Snippets into Webstorm format. This is also a growing collection of some of my custom live templates for Webstorm / IntelliJ IDE.

## How to install
In order to build the referenced Sublime Text 2 Snippets you need to have [Grunt](https://gruntjs.com/) installed. 
Once you are ready to go, just enter _grunt_ into the command line:

```shell
grunt
```

This will start converting the referenced [Zurb Foundation 5 Sublime Text 2 Snippets](https://github.com/zrub/foundation-5-sublime-snipptes) to Webstorm/IntelliJ readable format. 
(yes, it should also be possible to adapt Gruntfile.js to handle multiple different Sublime Text Snippets Sources as well - maybe I will add other Snippets in the future.)
Templates will be copied into the build directory.

In order to import those templates into your IDE you need to copy them into  your templates directory and restart your IDE. 

Where this directory is depends on your platform and IDE version.

Possible places are:

### OS X
```shell
~/Library/Preferences/Webstorm7/templates/
```

### Ubuntu
```shell
~/.IntelliJIdea13/config/templates/
```
### Windows
_sorry I don't know yet, as I use Windows only for testing, but it should be somewhere under:_

```shell
C:\
```

;)
