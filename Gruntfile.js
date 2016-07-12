module.exports = function(grunt) {
  var rename = function(dest, src, opts) {
    var files, glob, ext, regex, lastSingleAstersikReplacement, lastDoubleAstersikReplacement, matches, renamed;
    
    if (grunt.task.current.name === 'newer') {
      files = grunt.config.get(grunt.task.current.args.join('.')).files;
    } else {
      files = grunt.task.current.data.files;
    }
    
    filesLoop: for (var i = 0; i < files.length; i++) {
      var srcArray = files[i].src;
      
      if (! (srcArray instanceof Array)) {
        srcArray = [srcArray];
      }
      
      for (var j = 0; j < srcArray.length; j++) {
        glob = srcArray[j];
        
        if (grunt.file.isMatch(glob, src)) {
          break filesLoop;
        }
      }
    }
    
    // Get extension
    if (opts.extDot === 'first') {
      ext = src.replace(/.*?\.([^\/]+)$/, '$1');
    } else {
      ext = src.replace(/.*\.([^\/]+)$/, '$1');
    }
    
    // Get regex
    if (opts.extDot !== 'first') {
      lastSingleAstersikReplacement = '$1([^\\/]*)(?=\\.|$)';
      lastDoubleAstersikReplacement = '(.*)(?=\\.[^\\/]+$)';
    } else {
      lastSingleAstersikReplacement = '$1([^\\.\\/]*)[^\\/]*';
      lastDoubleAstersikReplacement = '(.*?)(?=\\.[^\\/]+$).*';
    }
    
    regex = glob
      .replace(/\*{2}\/\*/g, '**') // replace **/* with **
      .replace(/\./g, '\\.').replace(/\//g, '\\/') // escape . and /
      .replace(/{([^}]+)}/g, '($1)').replace(/,/g, '|') // replace {.,...} with regex equivalent
      .replace(/\?/g, '([^\\/])') // replace ? with regex equivalent
      .replace(/(^|[^\*])\*(?!\*|[^\/]*$)/g, '$1([^\\/]*)') // replace * with regex equivalent
      .replace(/\*{2}(?=.*\*.*)/g, '(.*)') // replace ** with regex equivalent
      .replace(/(^|[^\*])\*(?=[^\*\/]*$|$)/g, lastSingleAstersikReplacement) // replace last * with regex equivalent
      .replace(/\*{2,}(?=[^\/]*$|$)/g, lastDoubleAstersikReplacement); // replace last ** with regex equivalent
    
    matches = src.match(new RegExp(regex));
    
    renamed = dest.replace(/\$(\d+)/g, function(match, $1) {
      return matches[$1];
    });
    
    renamed = opts.cwd + '/' + renamed;
    
    if (! dest.match(/\.(?=[^\/]+$)/)) {
      renamed = renamed + '.' + ext;
    }
    
    return renamed;
  };
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        gruntLogHeader: false,
        sourceMap: false,
        includePaths: [
          'scss'
        ]
      },
      test: {
        options: {
          outputStyle: 'expanded'
        },
        files: [
          {
            expand: true,
            cwd: 'tests',
            src: 'scss/**/*.scss',
            dest: '$1.css',
            rename: rename
          }
        ]
      }
    },
    mochacli: {
      all: ['tests/*.test.js']
    },
    clean: {
      fixtures: ['tests/fixtures']
    },
    notify_hooks: {
      options: {
        enabled: true,
        title: '\\--csstyle 2'
      }
    },
    notify: {
      options: {
        title: '\\--csstyle 2'
      },
      test: {
        options: {
          message: 'Tests Complete'
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-sass');
  
  grunt.task.run('notify_hooks');
  
  grunt.registerTask('test', [
    'sass:test',
    'mochacli',
    'clean:fixtures',
    'notify:test'
  ]);
  
  grunt.registerTask('default', [
    'test'
  ]);
};
