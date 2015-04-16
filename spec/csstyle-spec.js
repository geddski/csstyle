describe("component", function(){
  it("creates a class", function(){
    [
      getSelector('spec/scss/fixtures/component.css'),
      getSelector('spec/postcss/fixtures/component.css')
    ]
    .forEach(function(selector){
      expect(selector.value).toBe('.tweet');
      expect(selector.score).toBe('0,0,1,0');
    })
  });
});

describe("option", function(){
  it("appends a --class to the component", function(){
    [
      getSelector('spec/scss/fixtures/option.css', 1),
      getSelector('spec/postcss/fixtures/option.css', 1)      
    ]
    .forEach(function(selector){
      expect(selector.value).toBe(".tweet.\\--promoted");
      expect(selector.score).toBe('0,0,2,0');
    })
  });
});

describe("verbose option", function(){
  it("creates a class with the option .component--option", function(){
    [
      getSelector('spec/scss/fixtures/option-verbose.css', 1)
      //getSelector('spec/postcss/fixtures/option-verbose.css', 1)
    ]
        .forEach(function(selector){
          expect(selector.value).toBe(".tweet\\--promoted");
          expect(selector.score).toBe('0,0,1,0');
        })
  });
});

describe("part", function(){
  it("appends a __class to the component", function(){
    [
      getSelector('spec/scss/fixtures/part.css', 1),
      getSelector('spec/postcss/fixtures/part.css', 1)      
    ]
    .forEach(function(selector){
      expect(selector.value).toBe(".tweet__image");
      expect(selector.score).toBe('0,0,1,0');
    })
  });

  describe("parts nested in parts", function(){
    it("creates a single class with both part names ", function(){
      [
        getSelector('spec/scss/fixtures/parts-in-parts.css', 2),
        getSelector('spec/postcss/fixtures/parts-in-parts.css', 2)
      ]
      .forEach(function(selector){
        expect(selector.value).toBe(".tweet__message__title");
        expect(selector.score).toBe('0,0,1,0');
      });
    });

    describe("with own options", function(){
      it("should append the option to the part class", function(){
        [
          getSelector('spec/scss/fixtures/parts-in-parts.css', 3),
          getSelector('spec/postcss/fixtures/parts-in-parts.css', 3)
        ]
        .forEach(function(selector){
          expect(selector.value).toBe(".tweet__message__title.\\--special");
          expect(selector.score).toBe('0,0,2,0'); 
        });
      });
    });
  });

  describe("parts inside of options", function(){
    it("responds correctly to component options", function(){
      [
        getSelector('spec/scss/fixtures/parts-in-options.css', 2),
        getSelector('spec/postcss/fixtures/parts-in-options.css', 2)
      ]
      .forEach(function(selector){
        expect(selector.value).toBe(".tweet.\\--promoted .tweet__profile");
        expect(selector.score).toBe("0,0,3,0");
      });
    });

    describe("nested parts inside of options", function(){
      it("should concat the part names and preserve the component option", function(){
        [
          getSelector('spec/scss/fixtures/parts-in-options.css', 3),
          getSelector('spec/postcss/fixtures/parts-in-options.css', 3)
        ]
        .forEach(function(selector){
          expect(selector.value).toBe(".tweet.\\--promoted .tweet__profile__img");
        });
      });

      describe("even nested n levels deep", function(){
        it("should work the same", function(){
          [
            getSelector('spec/scss/fixtures/parts-in-options.css', 4),
            getSelector('spec/postcss/fixtures/parts-in-options.css', 4)
          ]
          .forEach(function(selector){
            expect(selector.value).toBe(".tweet.\\--promoted .tweet__profile__img__header");
          });
        });        
      });
    });
  });
});

describe("tweak", function(){
  it("defines a +class after csstyle id", function(){
    [
      getSelector('spec/scss/fixtures/tweak.css'),
      getSelector('spec/postcss/fixtures/tweak.css')      
    ]
    .forEach(function(selector){
      // waiting on https://github.com/keeganstreet/specificity/issues/10
      // expect(selector.score).toBe('0,1,1,0');
      expect(selector.value).toBe("#csstyle .\\+rounded");
    })
  });
});

describe("location", function(){
  it("defines a @class after csstyle id", function(){
    [
      getSelector('spec/scss/fixtures/location.css'),
      getSelector('spec/postcss/fixtures/location.css')      
    ]
    .forEach(function(selector){
      expect(selector.value).toBe("#csstyle .\\@home");
      expect(selector.score).toBe('0,1,1,0');
    })
  });
});