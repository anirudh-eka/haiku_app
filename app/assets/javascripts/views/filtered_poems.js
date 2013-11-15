HaikuApp.Views.FilteredPoemIndex = Backbone.View.extend({

  id: 'poem-list',

  initialize: function(args) {
    this.listenTo(this.collection, 'add', this.addOne)
    this.addAll(args.filtered);
  }, 

  addAll: function(filtered) {
    var self = this
    _.each(filtered, function(model) {
      self.addOne(model);
    });
  },

  addOne: function(model) {
    var poemView = new HaikuApp.Views.Poem({model: model, currentUser: this.currentUser})
    this.$el.prepend(poemView.render().$el.fadeIn());
    return this
  }
});