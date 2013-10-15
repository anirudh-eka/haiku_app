HaikuApp.Views.Poem = Backbone.View.extend({
  tagName: 'article',
  className: 'poem',

  render: function() {
    if (HaikuApp.currentUser) {
      snapped = HaikuApp.currentUser.snapped()
    } else {
      snapped = false
    }
    
    this.$el.html(JST['poems/show']({ poem: this.model.toJSON(), 
      author: this.model.author(), 
      snapped: snapped}))
    return this
  }
});