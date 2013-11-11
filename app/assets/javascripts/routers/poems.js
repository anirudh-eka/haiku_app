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
    "about":"about"
  },

  index: function() {
    if (this.user) {
      new HaikuApp.Views.PoemNew( { collection: this.collection } )
    } else {
      new HaikuApp.Views.SignIn()
    }
    // var status = new HaikuApp.Views.PoemCreationStatus( { collection: HaikuApp.Collections.Poems } )
    var view = new HaikuApp.Views.PoemIndex({ collection: this.collection})
    $('#poem-list').html(view.$el);
  },

  about: function() {
    new HaikuApp.Views.About()
  }
}); 