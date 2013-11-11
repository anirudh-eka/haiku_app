HaikuApp.Collections.Poems = Backbone.Collection.extend({
  initialize: function() {
    var self = this
    setInterval(function() { 
      self.fetch()
    }, 180000);
  },

  parse: function(res) {
    return res.response
  },

  url: '/poems',
  model: HaikuApp.Models.Poem
});
