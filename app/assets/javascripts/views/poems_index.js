HaikuApp.Views.PoemIndex = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'reset', this.addAll)
    this.listenTo(this.collection, 'add', this.addOne)
    this.collection.fetch({reset: true});
  },

  render: function() {
    console.log('rendering')
    this.$el.html(JST['poems/index']({ poems: this.collection }))
    return this
  },

  addAll: function() {
    this.render()
  },

  addOne: function() {
    this.render();
  }
});