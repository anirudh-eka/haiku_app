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
    var leftBarView
    if (this.user) {
      leftBarView = new HaikuApp.Views.PoemNew( { collection: this.collection } )
    } else {
      leftBarView = new HaikuApp.Views.SignIn()
    }
    $('#left-bar').html(leftBarView.$el)

    var view = new HaikuApp.Views.PoemIndex({ collection: this.collection})
    $('#right-bar').html(view.$el);
  },

  about: function() {
    new HaikuApp.Views.About()
  }
}); 