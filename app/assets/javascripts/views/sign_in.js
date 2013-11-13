HaikuApp.Views.SignIn = Backbone.View.extend({
  id: 'sign-in-box',

  initialize: function(){
    this.render();
  },

  render: function(){
    this.$el.html(JST['utilities/sign_in_box']())
  }
});