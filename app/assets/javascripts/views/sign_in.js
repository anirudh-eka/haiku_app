HaikuApp.Views.SignIn = Backbone.View.extend({
  id: 'sign-in-box',

  initialize: function(){
    this.render();
  },

  render: function(){
    this.$el.html(JST['utilities/sign_in_box']())
  },

  setup: function(){
    this.setupMessager()
  },

  setupMessager: function() {
    this.messager = new HaikuApp.Views.StatusMessager({el: '#poem-create-messager'})
    var welcomeMsg = 'Please sign in to share!'
    this.messager.renderMsg(welcomeMsg, 'success')
  },
});