HaikuApp.Routers.Poems = Backbone.Router.extend({
  routes: {
    "" :"index"
  },

  index: function() {
    new HaikuApp.Views.PoemNew( { collection: HaikuApp.Collections.Poems } )
    // var status = new HaikuApp.Views.PoemCreationStatus( { collection: HaikuApp.Collections.Poems } )
    var view = new HaikuApp.Views.PoemIndex({ collection: HaikuApp.Collections.Poems })
    $('#poem-list').html(view.$el);
  }
}); 