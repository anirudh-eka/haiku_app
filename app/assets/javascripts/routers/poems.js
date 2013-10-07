HaikuApp.Routers.Poems = Backbone.Router.extend({
  routes: {
    "" :"index" 
  },

  index: function() {
    var view = new HaikuApp.Views.PoemIndex({ collection: HaikuApp.Collections.Poems })
    $('#poem-list').html(view.render().$el);
  } 
}); 