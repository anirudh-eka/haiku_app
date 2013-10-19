HaikuApp.Models.Poem = Backbone.Model.extend({

  defaults: {
    title: ''
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

