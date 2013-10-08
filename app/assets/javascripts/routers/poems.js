HaikuApp.Routers.Poems = Backbone.Router.extend({
  routes: {
    "" :"index"
  },

  index: function() {
    // HaikuApp.Collections.Poems.fetch();
    var newPoemView = new HaikuApp.Views.PoemNew( { collection: HaikuApp.Collections.Poems } )
    $('#new-poem-container').html(newPoemView.$el);
    var view = new HaikuApp.Views.PoemIndex({ collection: HaikuApp.Collections.Poems })
    $('#poem-list').html(view.$el);
  }
}); 