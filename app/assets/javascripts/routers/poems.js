HaikuApp.Routers.Poems = Backbone.Router.extend({
  initialize: function(options) {
    this.collection = options.collection
    this.leftBarView, this.rightBarView

    this.listenTo(HaikuApp.navbar, 'signout', function(){
      this.user = HaikuApp.currentUser
      this.index();
    });
  },

  routes: {
    "" :"index",
    "about":"about",
    "myPoetry":"myPoetry"
  },

  index: function() {
    this.renderLeftBar();
    if (this.rightBarView) { this.rightBarView.remove() }
    this.rightBarView = new HaikuApp.Views.PoemIndex({ collection: this.collection})
    $('#right-bar').html(this.rightBarView.$el);
  },

  about: function() {
    new HaikuApp.Views.About()
  },

  myPoetry: function() {
    this.renderLeftBar();

    if (this.rightBarView) { this.rightBarView.remove() }
    var filtered = []
    if (this.user) {
      filtered = this.user.poems()
    }
    this.currentUsersPoems = new HaikuApp.Collections.Poems(filtered);

    this.rightBarView = new HaikuApp.Views.PoemIndex({ collection: this.currentUsersPoems });
    $('#right-bar').html(this.rightBarView.$el);
    
  },

  renderLeftBar: function() {
    var tag = ('#left-bar') 
    if (HaikuApp.currentUser && !(this.leftBarView instanceof HaikuApp.Views.PoemNew)) {
      if (this.leftBarView) {this.leftBarView.remove()}
      this.leftBarView = new HaikuApp.Views.PoemNew( { collection: this.collection, user: this.user } )
      $('#left-bar').html(this.leftBarView.$el);
      this.leftBarView.setup();
    } else if (!HaikuApp.currentUser && !(this.leftBarView instanceof HaikuApp.Views.SignIn)) {
      if (this.leftBarView) {this.leftBarView.remove()}
      this.leftBarView = new HaikuApp.Views.SignIn()
      $('#left-bar').html(this.leftBarView.$el);
      this.leftBarView.setup();
    }
  }
}); 