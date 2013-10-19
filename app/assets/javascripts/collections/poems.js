HaikuApp.Collections.Poems = Backbone.Collection.extend({
  url: '/poems',
  model: HaikuApp.Models.Poem
});
