describe('Snaps collection spec', function(){
  describe('initialize', function(){
    describe('when user property is specified', function(){
      it('should set user property to user passed in', function(){
        this.currentUser = new Backbone.Model({id: 1, name: "Basho"})
        this.snaps = new HaikuApp.Collections.Snaps({user: this.currentUser})
        expect(this.snaps.user).toEqual(this.currentUser)
      });
    });
  });

  describe('url', function(){
    beforeEach(function(){
      this.currentUser = new Backbone.Model({id: 1, name: "Basho"})
      this.snaps = new HaikuApp.Collections.Snaps({user: this.currentUser})
    });
    it('should retun url with current user id embedded', function(){
      expect(this.snaps.url()).toEqual('poets/1/snaps');
    });
  });

});