describe("Poem Model", function() {

  beforeEach(function() {
    this.poem = new HaikuApp.Models.Poem({content: 'something deep'})
  });

  it("should exhibit attributes", function() {
    expect(this.poem.get('content')).toEqual('something deep');
  });

  it ("should set title to the default", function() {
    expect(this.poem.get('title')).toEqual('');
  });

  describe('url', function(){
    beforeEach(function(){
      var collection = {
        url: '/poems'
      }
      this.poem.collection = collection
    });
    
    describe('when id is not set', function(){
      it("should reture the collection URL", function(){
        expect(this.poem.url()).toEqual('/poems');
      });
    });

    describe('when id is set', function(){
      it('should return the collection URL + id', function(){
        this.poem.id = 2 
        expect(this.poem.url()).toEqual('/poems/2')
      });
    });
  });

  describe('author', function(){
    describe('when the poem has no poet', function(){
      it('should return anonymousPoet', function(){
        this.poem.anonymousPoet = 'anonymous'
        expect(this.poem.author()).toEqual('anonymous');
      });
    });

    describe('when the poem has a poet', function(){
      it('should return poet object', function(){
        this.poem.set({poet: 'Basho'})
        expect(this.poem.author()).toEqual('Basho') 
      });
    });
  });

  describe('validations', function(){
    beforeEach(function(){
      var collection = {
        url: '/poems'
      }
      this.poem.collection = collection
    });

    it("should not save when content is empty", function() {
      var eventSpy = sinon.spy();
      this.poem.on("invalid", eventSpy);
      this.poem.save({"content": ""});
      expect(eventSpy.calledOnce).toBeTruthy();
      expect(eventSpy.calledWith(this.poem, "what is a poem without words?")).toBeTruthy();
    });
  });

});
