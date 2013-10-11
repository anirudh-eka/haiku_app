HaikuApp.Views.Poem = Backbone.View.extend({
  tagName: 'article',
  className: 'poem',

  render: function() {
    this.$el.html(JST['poems/show']({ poem: this.model.toJSON(), author: this.model.author() }))
    return this
  }
});