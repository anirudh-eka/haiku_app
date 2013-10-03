window.HaikuApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    alert('Hello from Backbone!');
  }
};

 var app = app || {};

$(document).ready(function(){
  new app.PoemsView({collection: app.Poems});
});
