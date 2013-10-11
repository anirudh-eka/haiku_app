HaikuApp.Collections.Poems = Backbone.Collection.extend({
  initialize: function(data) {
    console.log('in collections initialize')
    this.add(data)
  },
  url: '/poems',
  model: HaikuApp.Models.Poem
});
