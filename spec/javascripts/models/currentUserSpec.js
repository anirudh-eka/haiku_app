describe("CurrentUser Model", function() {

  beforeEach(function() {
    this.currentUser = new HaikuApp.Models.CurrentUser({id:1, name: 'Basho'})
    this.currentUser.snaps = new Backbone.Collection()
  });

  it("should exhibit attributes", function() {
    expect(this.currentUser.get('name')).toEqual('Basho');
  });

  describe('snapped', function(){
    beforeEach(function(){
      this.model = new Backbone.Model({id: 1, poem_id: 1, poet_id: 1})
      this.currentUser.snaps = new Backbone.Collection(this.model)
    });

    it("should return first snapped object that has poem_id passed as parameter", function(){
      expect(this.currentUser.snapped(1)).toEqual(this.model)
    });
  });

  describe('snap', function(){
    beforeEach(function(){
      this.currentUserSnapsStub = sinon.stub(this.currentUser.snaps, 'create');
      this.poem = new Backbone.Model({id: 1, content: "deep poem", snap_count: 0})
    });

    afterEach(function() {
      this.currentUserSnapsStub.restore();
    });

    it("should create new snap object with poem passed in as param", function() {
      this.currentUser.snap(this.poem)
      expect(this.currentUserSnapsStub.calledOnce).toBeTruthy();
      expect(this.currentUserSnapsStub.calledWith(this.poem.get('id'), this.currentUser.get('id')))
    });
    
    describe("when snap creation successful", function(){
      beforeEach(function(){
        var self = this
        this.currentUserSnapsStub.restore();
        this.currentUserSnapsStub = sinon.stub(this.currentUser.snaps, 'create', function(model, callbacks){
          callbacks.success();
        });

        this.poemSaveStub = sinon.stub(this.poem, 'save', function(attrChange) {
          self.poem.set(attrChange)
        });          
      });

      afterEach(function() {
        this.poemSaveStub.restore();
        this.currentUserSnapsStub.restore();
      });

      it('should add 1 to the snap count of passed in poem ', function(){
        this.currentUser.snap(this.poem)
        expect(this.poem.get('snap_count')).toEqual(1);
      })
    });

    describe("when snap creation fails", function(){
      it('should not add 1 to the snap count of poem passed in ', function(){
        this.currentUser.snap(this.poem)
        expect(this.poem.get('snap_count')).toEqual(0)
      });
    });
  });

  describe('unsnap', function(){
    beforeEach(function(){
      this.snap = { destroy: function() {}}
      this.snapStub = sinon.stub(this.snap, 'destroy')
      var self = this
      this.currentUserSnappedStub = sinon.stub(this.currentUser, 'snapped', function(){
        return self.snap
      });
      this.poem = new Backbone.Model({id: 1, content: "deep poem", snap_count: 1})
    });

    afterEach(function() {
      this.currentUserSnappedStub.restore();
      this.snapStub.restore();
    });

    it("should destroy snap object associated with poem passed in as param", function(){
      this.currentUser.unsnap(this.poem)
      expect(this.snapStub.calledOnce).toBeTruthy();
    });
    
    describe("when snap destroy successful", function(){
      beforeEach(function(){
        var self = this
        this.snapStub.restore();
        this.snapStub = sinon.stub(this.snap, 'destroy', function(options) {
          options.success();
        })
        this.poemSaveStub = sinon.stub(this.poem, 'save', function(attrChange){
          self.poem.set(attrChange);
        })
      });

      afterEach(function(){
        this.snapStub.restore();
      })

      it('should subtract 1 to the snap count of poem passed in', function(){
        this.currentUser.unsnap(this.poem)
        expect(this.poem.get('snap_count')).toEqual(0)
      });
    });

    describe("when snap destroy fails", function(){
      it('should not add 1 to the snap count of poem passed in', function(){
        expect(this.poem.get('snap_count')).toEqual(1)
      })
    });
  });
});
