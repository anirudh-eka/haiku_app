describe('Poems Spec', function(){
  beforeEach(function(){
    this.poems = new HaikuApp.Collections.Poems();
    this.model = new Backbone.Model({
      id: 5, 
      content: "Foo"
    })
    // console.log(HaikuApp);
    // spyOn(HaikuApp.Models, 'Poem')
    // .andReturn('this is returned');
  });

  it('should add a model', function(){
    this.poems.add({id: 5, content: "Foo"})
    console.log(this.poems)
    expect(this.poems.length).toEqual(1)
  });

});