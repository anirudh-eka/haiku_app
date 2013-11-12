window.HaikuApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function(data) {
    this.poems = new HaikuApp.Collections.Poems(data.poems);
    // this.poets = new HaikuApp.Collections.Poets(data.poets);
    if (data.currentUser) {
      this.currentUser = new HaikuApp.Models.CurrentUser(data.currentUser);
    } else {
      this.currentUser = null
    }


    this.router = new HaikuApp.Routers.Poems({ collection: this.poems, user: this.currentUser });
    
    this.navbar = new HaikuApp.Views.NavBar({el: '.top-bar'})
    
    if (!Backbone.history.started) {
      Backbone.history.start();
      Backbone.history.started = true;
    }
  }
};

