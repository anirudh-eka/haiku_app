var app = app || {};

  var PoemList = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: app.Poem,
    url: '/poems'
  });

  // Create our global collection of **Poems**
  app.Poems = new PoemList();
  
