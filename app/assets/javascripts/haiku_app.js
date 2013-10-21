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

    new HaikuApp.Views.NavBar({el: '.top-bar'})

    new HaikuApp.Routers.Poems({ collection: this.poems });
    if (!Backbone.history.started) {
      Backbone.history.start();
      Backbone.history.started = true;
    }
  }
};

