HaikuApp.Models.Poem = Backbone.Model.extend({

  defaults: {
    title: ''
  },

  initialize: function() {
    console.log('hi')
  },

  validate: function(attrs) {
    if (!attrs.content) {
      return "what is a poem without words?";
    }
  },

  author: function() {
    if (this.get('poet')) {
      return this.get('poet')
    } else {
      return this.anonymousPoet
    }
  },

  anonymousPoet: {
    name: 'anonymous'
  }
});

