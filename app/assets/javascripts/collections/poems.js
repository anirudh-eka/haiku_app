var PoemList = Backbone.Collection.extend({
  urlRoot: '/poems',
  model: HaikuApp.Models.Poem
});

HaikuApp.Collections.Poems = new PoemList