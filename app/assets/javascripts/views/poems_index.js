HaikuApp.Views.PoemIndex = Backbone.View.extend({
  initialize: function() {
    this.collection.fetch();
  },
  render: function() {
    console.log(this.collection)
    this.$el.html(JST['poems/index']({ poems: this.collection }))
    return this
  }
});