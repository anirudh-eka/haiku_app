HaikuApp.Views.Poem = Backbone.View.extend({
  tagName: 'article',
  className: 'poem',

  render: function() {
    var snapped = false
    if (HaikuApp.currentUser) {
      snapped = HaikuApp.currentUser.snapped(this.model.id)
    }

    this.$el.html(JST['poems/show']({ poem: this.model.toJSON(), 
      author: this.model.author(),
      loggedIn: Boolean(HaikuApp.currentUser), 
      snapped: snapped}))
    return this
  }
});