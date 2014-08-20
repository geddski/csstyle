describe("component", function(){
  it("creates a class", function(){
    var selector = getSelector('spec/scss/fixtures/component.css');      
    expect(selector.value).toBe('.tweet');
    expect(selector.score).toBe('0,0,1,0');
  });
});