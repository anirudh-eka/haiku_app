HaikuApp.Routers.Poems = Backbone.Router.extend({
  initialize: function(options) {
    this.collection = options.collection
    if (options.user) {
      this.user = options.user
    } else {
      this.user = null
    }
  },

  routes: {
    "" :"index",
    "about":"about",
    "myPoetry":"myPoetry"
  },

  index: function() {
    this.renderPoemNewOn('#left-bar');
    this.rightBarView = new HaikuApp.Views.PoemIndex({ collection: this.collection})
    $('#right-bar').html(this.rightBarView.$el);
  },

  about: function() {
    console.log('about')
    new HaikuApp.Views.About()
  },

  myPoetry: function() {
    this.renderPoemNewOn('#left-bar');

    if (this.rightBarView) {
      this.rightBarView.remove()
    }
    var filtered = this.collection.filter(function(model){
      return model.author().name === HaikuApp.currentUser.get('name')
    });

    var currentUsersPoems = new HaikuApp.Collections.Poems(filtered);

    this.rightBarView = new HaikuApp.Views.PoemIndex({ collection: currentUsersPoems });
    $('#right-bar').html(this.rightBarView.$el);
    
  },

  renderPoemNewOn: function(tag) {    
    if (this.user) {
      new HaikuApp.Views.PoemNew( { el:tag, collection: this.collection } )
    } else {
      new HaikuApp.Views.SignIn( {el:tag} )
    }
  }
}); 