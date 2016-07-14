describe('csstyle', function() {
  var frame;
  var app;
  var component, part;
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
          '<div class="tst' + i + '-c tst' + i + '-c1 --tst' + i + '-o +tst' + i + '-t" id="component">' +
            '<div class="tst' + i + '-c/tst' + i + '-p" id="part">test</div>' +
          '</div>' +
        '</div>' +
      '</div>',
      'location'
    );
    
    component = frame.get('#component');
    part = frame.get('#part');
    i++;
  });
  
  describe('Locations', function() {
    it('should overwrite components', function() {
      component.assert({
        width: 2
      });
    });
    
    it('should overwrite parts', function() {
      part.assert({
        width: 2
      });
    });
    
    it('should not overwrite options', function() {
      component.assert({
        width: 2
      });
    });
    
    it('should overwrite options inside the location', function() {
      component.assert({
        width: 4
      });
    });
    
    it('should overwrite tweaks', function() {
      component.assert({
        width: 2
      });
    });
  });
  
  describe('Nested Components', function() {
    it('should behave like locations and not overwrite options', function() {
      component.assert({
        width: 2
      });
    });
    
    it('should behave like locations and overwrite options inside the nested component', function() {
      component.assert({
        width: 4
      });
    });
  });
});
