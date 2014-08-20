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
});

describe("tweak", function(){
  it("defines a [class] after csstyle id", function(){
    var selector = getSelector('spec/scss/fixtures/tweak.css');
    expect(selector.value).toBe("#csstyle .\\[rounded\\]");
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