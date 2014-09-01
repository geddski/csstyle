describe("component", function(){
  it("creates a class", function(){
    var selector = getSelector('spec/scss/fixtures/component.css');      
    expect(selector.value).toBe('.tweet');
    expect(selector.score).toBe('0,0,1,0');
  });
});

describe("option", function(){
  it("appends a --class to the component", function(){
    var selector = getSelector('spec/scss/fixtures/option.css', 1);
    expect(selector.value).toBe(".tweet.\\--promoted");
    expect(selector.score).toBe('0,0,2,0');
  });
});

describe("part", function(){
  it("appends a __class to the component", function(){
    var selector = getSelector('spec/scss/fixtures/part.css', 1);
    expect(selector.value).toBe(".tweet__image");
    expect(selector.score).toBe('0,0,1,0');
  });

  describe("parts nested in parts", function(){
    it("creates a single class with both part names ", function(){
      var selector = getSelector('spec/scss/fixtures/parts-in-parts.css', 2);
      expect(selector.value).toBe(".tweet__message__title");
      expect(selector.score).toBe('0,0,1,0');
    });

    describe("with own options", function(){
      it("should append the option to the part class", function(){
        var selector = getSelector('spec/scss/fixtures/parts-in-parts.css', 3);
        expect(selector.value).toBe(".tweet__message__title.\\--special");
        expect(selector.score).toBe('0,0,2,0'); 
      });
    });
  });

  describe("parts inside of options", function(){
    it("responds correctly to component options", function(){
      var selector = getSelector('spec/scss/fixtures/parts-in-options.css', 2);
      expect(selector.value).toBe(".tweet.\\--promoted .tweet__profile");
      expect(selector.score).toBe("0,0,3,0");
    });

    describe("nested parts inside of options", function(){
      it("should concat the part names and preserve the component option", function(){
        var selector = getSelector('spec/scss/fixtures/parts-in-options.css', 3);        
        expect(selector.value).toBe(".tweet.\\--promoted .tweet__profile__img");
      });

      describe("even nested n levels deep", function(){
        it("should work the same", function(){
          var selector = getSelector('spec/scss/fixtures/parts-in-options.css', 4);        
          expect(selector.value).toBe(".tweet.\\--promoted .tweet__profile__img__header");
        });        
      });
    });
  });
});

describe("tweak", function(){
  it("defines a +class after csstyle id", function(){
    var selector = getSelector('spec/scss/fixtures/tweak.css');
    expect(selector.value).toBe("#csstyle .\\+rounded");
    // waiting on https://github.com/keeganstreet/specificity/issues/10
    // expect(selector.score).toBe('0,1,1,0');
  });
});

describe("location", function(){
  it("defines a @class after csstyle id", function(){
    var selector = getSelector('spec/scss/fixtures/location.css');
    expect(selector.value).toBe("#csstyle .\\@home");
    expect(selector.score).toBe('0,1,1,0');
  });
});