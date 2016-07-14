describe('csstyle', function() {
  var frame;
  var app;
  var test;
  var i = 1;
  
  before(function(done) {
    frame = quixote.createFrame({
      stylesheet: 'base/tests/fixtures/browser.css'
    }, done);
  });
  
  after(function() {
    frame.remove();
  });
  
  beforeEach(function() {
    frame.reset();
    
    app = frame.add(
      '<div id="app">' +
        '<div class="@tst' + i + '-l tst' + i + '-c2">' +
          '<div class="tst' + i + '-c tst' + i + '-c1 --tst' + i + '-o" id="test">Test</div>' +
        '</div>' +
      '</div>',
      'location'
    );
    
    test = frame.get('#test');
    i++;
  });
  
  describe('Locations', function() {
    it('should not overwrite options', function() {
      test.assert({
        width: 2
      });
    });
    
    it('should overwrite options inside the location', function() {
      test.assert({
        width: 4
      });
    });
  });
  
  describe('Nested Components', function() {
    it('should behave like locations and not overwrite options', function() {
      test.assert({
        width: 2
      });
    });
    
    it('should behave like locations and overwrite options inside the nested component', function() {
      test.assert({
        width: 4
      });
    });
  });
});
