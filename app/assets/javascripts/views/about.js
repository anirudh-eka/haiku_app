HaikuApp.Views.About = Backbone.View.extend({
  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(JST['utilities/about']())
  }
});