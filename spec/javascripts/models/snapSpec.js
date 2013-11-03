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
      // expect('snap' in this.snap.toJSON()).toEqual(true);
      expect(this.snap.toJSON()).toHaveProperty('snap');
    });
  });


});
