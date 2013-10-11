HaikuApp.Collections.Poems = Backbone.Collection.extend({
  initialize: function(data) {
    this.add(data)
  },
  url: '/poems',
  model: HaikuApp.Models.Poem
});
