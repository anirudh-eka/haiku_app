HaikuApp.Views.PoemIndex = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.collection, 'reset', this.addAll)
    this.listenTo(this.collection, 'add', this.addOne)
    this.collection.fetch({reset: true});
  },


  addAll: function(modelArray) {
    var self = this
    modelArray.each(function(model){
      self.addOne(model);
    });
  },

  addOne: function(model) {
    var poemView = new HaikuApp.Views.Poem({model: model})
    this.$el.append(poemView.render().$el);
    return this
  }
});