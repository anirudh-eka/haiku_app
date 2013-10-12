HaikuApp.Views.Poem = Backbone.View.extend({
  tagName: 'article',
  className: 'poem',

  render: function() {
    console.log(this.model.get('title'))
    var snapped
    if(HaikuApp.currentUser) {
      snapped = Boolean(HaikuApp.currentUser.snaps.findWhere({poem_id: this.model.id}))
      console.log(snapped)
    }

    this.$el.html(JST['poems/show']({ poem: this.model.toJSON(), author: this.model.author(), snapped: snapped}))
    return this
  }
});