var PoemList = Backbone.Collection.extend({
  url: '/poems',
  model: HaikuApp.Models.Poem
});

HaikuApp.Collections.Poems = new PoemList()