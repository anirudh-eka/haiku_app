HaikuApp.Collections.Poems = Backbone.Collection.extend({
  initialize: function() {
    var self = this
    setInterval(function() { 
      self.fetch()
    }, 180000);
  },

  url: '/poems',
  model: HaikuApp.Models.Poem
});
