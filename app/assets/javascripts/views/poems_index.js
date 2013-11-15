HaikuApp.Views.PoemIndex = Backbone.View.extend({

  id: 'poem-list',

  initialize: function(args) {
    this.listenTo(this.collection, 'reset', this.addAll)
    this.listenTo(this.collection, 'add', this.addOne)
    this.addAll(this.collection);
    // this.collection.fetch({reset: true});
  },


  addAll: function(modelArray) {
    var self = this
    modelArray.each(function(model){
      self.addOne(model);
    });
  },

  addOne: function(model) {
    var poemView = new HaikuApp.Views.Poem({model: model, currentUser: this.currentUser})
    this.$el.prepend(poemView.render().$el.fadeIn());
    return this
  }
});