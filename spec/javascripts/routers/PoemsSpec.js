describe("HaikuAppRouter poems", function() {
  beforeEach(function() {
    this.poems = new Backbone.Collection({})
    this.currentUser = new Backbone.Model({id: 1, name: "Basho", poems: true})
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
      this.renderPoemNewOnStub = sinon.stub(this.router, "renderPoemNewOn")
      this.router.bind("route:index", this.routeSpy);
      this.router.navigate("", true);
    })

    afterEach(function(){
      this.renderPoemNewOnStub.restore();
    })

    it("fires the index route with a blank hash", function() {
      expect(this.routeSpy.calledOnce).toBeTruthy();
      expect(this.routeSpy.calledWithExactly()).toBeTruthy();  
    });

    it ("makes new poem index view with collection", function(){
      expect(this.poemIndexStub.calledOnce).toBeTruthy();
      expect(this.poemIndexStub.calledWithExactly({ collection: this.poems })).toBeTruthy();
    });

    it("renders left-bar with new poem/sign in", function(){
      expect(this.renderPoemNewOnStub.calledOnce).toBeTruthy();
      expect(this.renderPoemNewOnStub.calledWithExactly('#left-bar')).toBeTruthy();
    });
  });

  describe('renderPoemNewOn', function(){
    describe('when there is a user for the router', function(){
      beforeEach(function(){
        this.router.user = true
        this.router.renderPoemNewOn('#left-bar')
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
        this.router.user = false
        this.router.renderPoemNewOn('#left-bar')
      });

      it('creates a new sign in view', function(){
        expect(this.signInStub.calledOnce).toBeTruthy();
      });

      it('does not create new poem new view', function(){
        expect(this.poemNewStub.calledOnce).toBeFalsy();
      });
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
      this.router.user = new HaikuApp.Models.CurrentUser({id: 1, name: "Basho"})
      this.currentUserPoemsStub = sinon.stub(this.router.user, 'poems', function(){
        return 'collection'
      });
      this.poemsCollectionStub = sinon.stub(HaikuApp.Collections, "Poems", function(){
        return 'filtered collection'
      })
      this.renderPoemNewOnStub = sinon.stub(this.router, "renderPoemNewOn")
      this.router.bind("route:myPoetry", this.routeSpy);
      this.router.navigate("elsewhere");
      this.router.navigate("myPoetry", true);
    });

    afterEach(function(){
      this.currentUserPoemsStub.restore();
      this.poemsCollectionStub.restore();
      this.renderPoemNewOnStub.restore();
    })

    it("fires the myPoetry route with a myPoetry hash", function() {
      expect(this.routeSpy.calledOnce).toBeTruthy();
      expect(this.routeSpy.calledWithExactly()).toBeTruthy();  
    });

    it("makes new poems collection with current users poems", function(){
      expect(this.poemsCollectionStub.calledOnce).toBeTruthy();
      expect(this.poemsCollectionStub.calledWithExactly('collection')).toBeTruthy();
    });

    it("makes poem index view with current users poem collection", function(){
      expect(this.poemIndexStub.calledOnce).toBeTruthy();
      expect(this.poemIndexStub.calledWithExactly('filtered collection'))
    });

    it("renders left-bar with new poem/sign in", function(){
      expect(this.renderPoemNewOnStub.calledOnce).toBeTruthy();
      expect(this.renderPoemNewOnStub.calledWithExactly('#left-bar')).toBeTruthy();
    });

  });
});