describe('Poems Spec', function(){
  beforeEach(function(){
    this.poemStub = sinon.stub(HaikuApp.Models, "Poem")
    this.model = new Backbone.Model({
      id: 5, 
      content: "Foo"
    })
    this.poemStub.returns(this.model)
    this.poems = new HaikuApp.Collections.Poems();
    this.poems.model = HaikuApp.Models.Poem
    this.poems.add({id: 5, content: "Foo"})
  });

  afterEach(function(){
    this.poemStub.restore();
  });

  it('should add a model', function(){
    expect(this.poems.length).toEqual(1);
  });

  it('should get a model by id', function(){
    expect(this.poems.get(5)).toEqual(this.model);
  });

  describe('fetch', function(){
    beforeEach(function(){
      this.server = sinon.fakeServer.create();
      this.server.respondWith(
        "GET",
        "/poems",
        this.validResponse(this.fixture.Poems.valid)
      );
      this.poems = new HaikuApp.Collections.Poems();  
    });

    afterEach(function(){
      this.server.restore();
    });

    it('should make the correct request', function(){
      this.poems.fetch();
      expect(this.server.requests.length).toEqual(1)
      expect(this.server.requests[0].method).toEqual("GET");
      expect(this.server.requests[0].url).toEqual("/poems")
    });

    it('should parse poems from the response', function(){
      this.poems.fetch();
      this.server.respond();
      expect(this.poems.length).toEqual(this.fixture.Poems.valid.response.length);
      expect(this.poems.get(1).get('content')).toEqual(this.fixture.Poems.valid.response[0].content);
    });
  })

});