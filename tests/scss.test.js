var expect = require('expect.js');
var Selector = require('./selector-helper.js');

describe('Component', function() {
  var selectors = Selector.getAll('tests/fixtures/component.css');
  
  it('creates a class', function() {
    expect(selectors[0].value).to.be.ok();
    expect(selectors[0].value).to.be('.c1');
    expect(selectors[0].score).to.be('0,0,1,0');
  });
  
  it('creates multiple classes', function() {
    expect(selectors[1].value).to.be.ok();
    expect(selectors[1].value).to.be('.c1, .c2');
    expect(selectors[1].score).to.be('0,0,1,0');
  });
});

describe('Option', function() {
  var selectors = Selector.getAll('tests/fixtures/option.css');
  
  it('appends an option class to a component', function() {
    expect(selectors[0].value).to.be.ok();
    expect(selectors[0].value).to.be('.c1.\\--o1');
    expect(selectors[0].score).to.be('0,0,2,0');
  });
  
  it('appends multiple option classes to a component', function() {
    expect(selectors[1].value).to.be.ok();
    expect(selectors[1].value).to.be('.c1.\\--o1, .c1.\\--o2');
    expect(selectors[1].score).to.be('0,0,2,0');
  });
  
  it('appends an option class to multiple components', function() {
    expect(selectors[2].value).to.be.ok();
    expect(selectors[2].value).to.be('.c1.\\--o1, .c2.\\--o1');
    expect(selectors[2].score).to.be('0,0,2,0');
  });
  
  it('appends multiple option classes to multiple components', function() {
    expect(selectors[3].value).to.be.ok();
    expect(selectors[3].value).to.be('.c1.\\--o1, .c1.\\--o2, .c2.\\--o1, .c2.\\--o2');
    expect(selectors[3].score).to.be('0,0,2,0');
  });
  
  it('appends an option class to a tweak', function() {
    expect(selectors[4].value).to.be.ok();
    expect(selectors[4].value).to.be('#app .\\+t1.\\--o1');
    expect(selectors[4].score).to.be('0,1,2,0');
  });
  
  it('appends an option class to a location', function() {
    expect(selectors[5].value).to.be.ok();
    expect(selectors[5].value).to.be('#app .\\@l1.\\--o1');
    expect(selectors[5].score).to.be('0,1,2,0');
  });
});

describe('Part', function() {
  var selectors = Selector.getAll('tests/fixtures/part.css');
  
  it('appends a part to the component', function() {
    expect(selectors[0].value).to.be.ok();
    expect(selectors[0].value).to.be('.c1\\/p1');
    expect(selectors[0].score).to.be('0,0,1,0');
  });
  
  it('appends multiple parts to the component', function() {
    expect(selectors[1].value).to.be.ok();
    expect(selectors[1].value).to.be('.c1\\/p1, .c1\\/p2');
    expect(selectors[1].score).to.be('0,0,1,0');
  });
  
  it('appends a part to multiple components', function() {
    expect(selectors[2].value).to.be.ok();
    expect(selectors[2].value).to.be('.c1\\/p1, .c2\\/p1');
    expect(selectors[2].score).to.be('0,0,1,0');
  });
  
  it('appends multiple parts to multiple components', function() {
    expect(selectors[3].value).to.be.ok();
    expect(selectors[3].value).to.be('.c1\\/p1, .c1\\/p2, .c2\\/p1, .c2\\/p2');
    expect(selectors[3].score).to.be('0,0,1,0');
  });
  
  it('doesn\'t create a part when nested inside of a tweak or location', function() {
    expect(selectors[4]).to.not.be.ok();
  });
});

describe('Tweaks', function() {
  var selectors = Selector.getAll('tests/fixtures/tweak.css');
  
  it('creates a tweak class nested inside the root id', function() {
    expect(selectors[0].value).to.be.ok();
    expect(selectors[0].value).to.be('#app .\\+t1');
    expect(selectors[0].score).to.be('0,1,1,0');
  });
  
  it('creates multiple tweak classes nested inside the root id', function() {
    expect(selectors[1].value).to.be.ok();
    expect(selectors[1].value).to.be('#app .\\+t1, #app .\\+t2');
    expect(selectors[1].score).to.be('0,1,1,0');
  });
  
  it('can contain complex components', function() {
    expect(selectors[2].value).to.be.ok();
    expect(selectors[2].value).to.be('#app .\\+t1 .c1\\/p1.\\--o1, #app .\\+t1 .c2\\/p1.\\--o1');
    expect(selectors[2].score).to.be('0,1,3,0');
  });
});

describe('Locations', function() {
  var selectors = Selector.getAll('tests/fixtures/location.css');
  
  it('creates a location class nested inside the root id', function() {
    expect(selectors[0].value).to.be.ok();
    expect(selectors[0].value).to.be('#app .\\@l1');
    expect(selectors[0].score).to.be('0,1,1,0');
  });
  
  it('creates multiple location classes nested inside the root id', function() {
    expect(selectors[1].value).to.be.ok();
    expect(selectors[1].value).to.be('#app .\\@l1, #app .\\@l2');
    expect(selectors[1].score).to.be('0,1,1,0');
  });
  
  it('can contain complex components', function() {
    expect(selectors[2].value).to.be.ok();
    expect(selectors[2].value).to.be('#app .\\@l1 .c1\\/p1.\\--o1, #app .\\@l1 .c2\\/p1.\\--o1');
    expect(selectors[2].score).to.be('0,1,3,0');
  });
});

describe('Nesting', function() {
  var selectors = Selector.getAll('tests/fixtures/nesting.css');
  
  describe('Part > Part', function() {
    it('creates a single class with both part names', function() {
      expect(selectors[0].value).to.be.ok();
      expect(selectors[0].value).to.be('.c1\\/p1\\/ps1');
      expect(selectors[0].score).to.be('0,0,1,0');
    });
    
    describe('Part > Part > Option', function() {
      it('appends the option class to the part', function() {
        expect(selectors[1].value).to.be.ok();
        expect(selectors[1].value).to.be('.c1\\/p1\\/ps1.\\--o1');
        expect(selectors[1].score).to.be('0,0,2,0');
      });
    });
  });
  
  describe('Option > Part', function() {
    it('appends the option class to the component, and appends full part class', function() {
      expect(selectors[2].value).to.be.ok();
      expect(selectors[2].value).to.be('.c1.\\--o1 .c1\\/p1');
      expect(selectors[2].score).to.be('0,0,3,0');
    });
    
    describe('Part > Option > Part', function() {
      it('appends the option class to the upper part, and appends the full part class', function() {
        expect(selectors[3].value).to.be.ok();
        expect(selectors[3].value).to.be('.c1\\/p1.\\--o1 .c1\\/p1\\/ps1');
        expect(selectors[3].score).to.be('0,0,3,0');
      });
    });
  });
  
  describe('Component > Component', function() {
    it('nests another component inside a component', function() {
      expect(selectors[4].value).to.be.ok();
      expect(selectors[4].value).to.be('.c1 .c2, .c1 .c3');
      expect(selectors[4].score).to.be('0,0,2,0');
    });
    
    describe('Component > Part > Component', function() {
      it('nests another component inside a part', function() {
        expect(selectors[5].value).to.be.ok();
        expect(selectors[5].value).to.be('.c1\\/p1 .c2');
        expect(selectors[5].score).to.be('0,0,2,0');
      });
    });
  });
  
  describe('Tweak > Component', function() {
    it('nests the tweak inside a component', function() {
      expect(selectors[6].value).to.be.ok();
      expect(selectors[6].value).to.be('#app .c1 .\\+t1');
      expect(selectors[6].score).to.be('0,1,2,0');
    });
  });
  
  describe('Location > Component', function() {
    it('nests the component inside the location', function() {
      expect(selectors[7].value).to.be.ok();
      expect(selectors[7].value).to.be('#app .\\@l1 .c1');
      expect(selectors[7].score).to.be('0,1,2,0');
    });
  });
});

describe('Nesting non-csstyle selectors', function() {
  var selectors = Selector.getAll('tests/fixtures/non_csstyle.css');
  
  it('allows the parent to be referenced in a component', function() {
    expect(selectors[0].value).to.be.ok();
    expect(selectors[0].value).to.be('.c1:hover');
    expect(selectors[0].score).to.be('0,0,2,0');
  });
  
  it('appends an option class to a component', function() {
    expect(selectors[1].value).to.be.ok();
    expect(selectors[1].value).to.be('.c1.\\--o1.class');
    expect(selectors[1].score).to.be('0,0,3,0');
    
    expect(selectors[2].value).to.be.ok();
    expect(selectors[2].value).to.be('.c1.\\--o1 .class');
    expect(selectors[2].score).to.be('0,0,3,0');
  });
  
  it('appends an option class to a part', function() {
    expect(selectors[3].value).to.be.ok();
    expect(selectors[3].value).to.be('.c1\\/p1.\\--o1.class');
    expect(selectors[3].score).to.be('0,0,3,0');
  });
});

/*


describe("parent references", function() {

  it("allows the parent to be referenced in a component", function(){
    [
      getSelector('spec/scss/fixtures/parent-reference.css'),
      getSelector('spec/postcss/fixtures/parent-reference.css')
    ]
    .forEach(function(selector) {
      expect(selector.value).toBe(".card:hover");
    })
  });

  it("allows the parent to be referenced in a part in a component that targets a part", function(){
    [
      getSelector('spec/scss/fixtures/part-parent-reference.css'),
      getSelector('spec/postcss/fixtures/part-parent-reference.css')
    ]
    .forEach(function(selector) {
      expect(selector.value).toBe(".card:hover .card__picture");
    })
  });

  it("can handle multiple pseudoclasses on a selector/parent reference", function() {
    [
      getSelector('spec/scss/fixtures/nested-multiple-pseudo.css'),
      getSelector('spec/postcss/fixtures/nested-multiple-pseudo.css')
    ]
    .forEach(function(selector) {
      expect(selector.value).toBe(".frame:hover, .frame:focus");
    })
  });

  it("can handle multiple pseudoclasses on a component parent reference that targets a part", function() {
    [
      getSelector('spec/scss/fixtures/part-nested-multiple-pseudo.css'),
      getSelector('spec/postcss/fixtures/part-nested-multiple-pseudo.css')
    ]
    .forEach(function(selector) {
      expect(selector.value).toBe(".frame:hover .frame__img, .frame:focus .frame__img");
    })
  });

});

describe("regular css", function() {
  it("leaves regular selectors untouched", function() {
    [
      getSelector('spec/scss/fixtures/untouched.css'),
      getSelector('spec/postcss/fixtures/untouched.css')
    ]
    .forEach(function(selector) {
      expect(selector.value).toBe(".test");
    })
  });
})

describe("custom symbols", function(){
  it("allows projects to customize their styling conventions", function(){
    [
      getSelector('spec/scss/fixtures/custom-symbols.css')
    ]
    .forEach(function(selector){
      expect(selector.value).toBe(".\\$tweet");
    })
  });
});
*/
