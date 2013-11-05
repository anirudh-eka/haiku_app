HaikuApp.Models.Poem = Backbone.Model.extend({

  initialize: function() {
    var self = this
    this.listenTo(this, 'invalid', function(model, error){
      self.collection.trigger('invalid', model, error)
    });
  },

  defaults: {
    title: ''
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

