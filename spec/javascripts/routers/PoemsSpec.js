describe("HaikuAppRouter poems", function() {
  beforeEach(function() {
    this.poems = new Backbone.Collection({})
    this.currentUser = new Backbone.Model({id: 1, name: "Basho"})
    this.signInStub = sinon.stub(HaikuApp.Views, "SignIn")
    this.poemNewStub = sinon.stub(HaikuApp.Views, "PoemNew")
    this.poemIndexStub = sinon.stub(HaikuApp.Views, "PoemIndex")
    this.router = new HaikuApp.Routers.Poems({ collection: this.poems, user: this.currentUser });
    this.routeSpy = sinon.spy();

    try {
      Backbone.history.start({silent:true, pushState:true});
    } catch(e) {}
    this.router.navigate("elsewhere");
  });
  
  afterEach(function(){
    this.signInStub.restore();
    this.poemNewStub.restore();
    this.poemIndexStub.restore();
    this.router.navigate("");
  });

  describe('initialize',function(){
    it("should set collection property to collection passed in", function(){
      expect(this.router.collection).toEqual(this.poems)
    });
    describe("when user is passed at router initialization", function(){
      it("should set user property to user passed in", function(){
        expect(this.router.user).toEqual(this.currentUser)
      });
    });
    describe("when user is not passed at router initialization", function(){
      beforeEach(function(){
        this.router = new HaikuApp.Routers.Poems({ collection: this.poems});
      })
      it("should set user property to null", function(){
        expect(this.router.user).toEqual(null)
      });
    });
  });

  describe('index', function(){
    beforeEach(function(){
      this.router.bind("route:index", this.routeSpy);
      this.router.navigate("", true);
    })

    it("fires the index route with a blank hash", function() {
      expect(this.routeSpy.calledOnce).toBeTruthy();
      expect(this.routeSpy.calledWithExactly()).toBeTruthy();  
    });

    it ("makes new poem index view with collection", function(){
      expect(this.poemIndexStub.calledOnce).toBeTruthy();
      expect(this.poemIndexStub.calledWithExactly({ collection: this.poems })).toBeTruthy();
    });

    describe('when there is a user for the router', function(){
      beforeEach(function(){
        this.router.user = true
      });

      it('creates a new poem new view with collection', function(){
        expect(this.poemNewStub.calledOnce).toBeTruthy();
         expect(this.poemNewStub.calledWith({ el:'#left-bar', collection: this.poems })).toBeTruthy();
      });

      it('does not create new sign in view', function(){
        expect(this.signInStub.calledOnce).toBeFalsy();
      });
    })

    describe('when there is no user for the router', function(){
      beforeEach(function(){
        this.router.navigate("elsewhere");
        this.router.user = false
        this.router.navigate("", true);
      });

      it('creates a new sign in view', function(){
        expect(this.signInStub.calledOnce).toBeTruthy();
      });

      it('does not create new poem new view');
    });
  });

  describe('about', function(){
    beforeEach(function(){
      this.aboutStub = sinon.stub(HaikuApp.Views, "About")
      this.router.bind("route:about", this.routeSpy);
      this.router.navigate("elsewhere");
      this.router.navigate("about", true);
    });
    
    afterEach(function(){
      this.aboutStub.restore();
    });


    it("fires the about route with an about hash", function() {
      expect(this.routeSpy.calledOnce).toBeTruthy();
      expect(this.routeSpy.calledWithExactly()).toBeTruthy();  
    });

    it("makes about view", function(){
      expect(this.aboutStub.calledOnce).toBeTruthy();
    });
  });

  describe('myPoetry', function(){
    beforeEach(function(){
      this.currentUserPoemsStub = sinon.stub(this.user, 'poems')
      this.router.bind("route:myPoetry", this.routeSpy);
      this.router.navigate("elsewhere");
      this.router.navigate("myPoetry", true);
    });

    afterEach(function(){
      this.currentUserPoemsStub.restore();
    })

    it("fires the myPoetry route with a myPoetry hash", function() {
      expect(this.routeSpy.calledOnce).toBeTruthy();
      expect(this.routeSpy.calledWithExactly()).toBeTruthy();  
    });

    it("makes myPoetry view", function(){
      expect(this.poemIndexStub.calledOnce).toBeTruthy();
    });
  });
});