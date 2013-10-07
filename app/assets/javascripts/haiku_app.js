window.HaikuApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    alert('Hello from Backbone!');
    new HaikuApp.Routers.Poems();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  HaikuApp.initialize();
});
