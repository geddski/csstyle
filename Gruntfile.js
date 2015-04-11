module.exports = function(grunt) {
  grunt.initConfig({
    release: {
      options: {
        additionalFiles: ['bower.json']
      }
  }  
  });

  grunt.loadNpmTasks('grunt-release');
};