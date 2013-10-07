HaikuApp.Routers.Poems = Backbone.Router.extend({
  routes: {
    "" :"showHome" 
  },

  showHome: function() {
    console.log('you are trying to reach home, you can do it! ET')
  } 
}); 