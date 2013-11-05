describe("Snap Model", function() {

  beforeEach(function() {
    this.snap = new HaikuApp.Models.Snap({poet_id: 1, poem_id: 1})
  });

  it("should exhibit attributes", function() {
    expect(this.snap.get('poet_id')).toEqual(1);
  });


  describe('url', function(){
    beforeEach(function(){
      var collection = {
        url: '/snaps'
      }
      this.snap.collection = collection
    });
    
    describe('when id is not set', function(){
      it("should return the collection URL", function(){
        expect(this.snap.url()).toEqual('/snaps');
      });
    });

    describe('when id is set', function(){
      it('should return the collection URL + id', function(){
        this.snap.id = 2 
        expect(this.snap.url()).toEqual('/snaps/2')
      });
    });
  });

  describe('toJSON', function(){
    it('should return hash with the attributes as value to key snap', function(){
      expect(this.snap.toJSON()).toHaveProperty('snap');
    });
  });

  describe('validations', function(){
    beforeEach(function(){
      var collection = {
        url: '/snaps'
      }
      this.snap.collection = collection
    });

    it("should not save when poem_id is absent", function() {
      var eventSpy = jasmine.createSpy('eventSpy');
      this.snap.on("invalid", eventSpy);
      this.snap.save({"poem_id": ""});

      expect(eventSpy).toHaveBeenCalled();
    });

    it("should not save when poet_id is absent", function() {
      var eventSpy = sinon.spy();
      this.snap.on("invalid", eventSpy);
      this.snap.save({"poet_id": ""});
      expect(eventSpy.calledOnce).toBeTruthy();
      expect(eventSpy.calledWith(this.snap, "snap must have a poet_id")).toBeTruthy();
    });
  });

});
