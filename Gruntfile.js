module.exports = function(grunt) {
  grunt.initConfig({
    release: {
      options: {
        additionalFiles: ['bower.json'],
        commitMessage: 'v<%= version %>',
        tagName: 'v<%= version %>',
        tagMessage: 'v<%= version %>'
      }
  }  
  });

  grunt.loadNpmTasks('grunt-release');
};