HaikuApp.Routers.Poems = Backbone.Router.extend({
  initialize: function(options) {
    this.collection = options.collection
  },

  routes: {
    "" :"index"
  },

  index: function() {
    new HaikuApp.Views.PoemNew( { collection: this.collection } )
    // var status = new HaikuApp.Views.PoemCreationStatus( { collection: HaikuApp.Collections.Poems } )
    var view = new HaikuApp.Views.PoemIndex({ collection: this.collection})
    $('#poem-list').html(view.$el);
  }
}); 