window.HaikuApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new HaikuApp.Routers.Poems();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  HaikuApp.initialize();
});
