HaikuApp.Views.NavBar = Backbone.View.extend({

  events: {
    'click #signout' : 'signout'
  },

  signout: function(e) {
    e.preventDefault();
    var url = $('#signout').attr('href')
    var self = this
    $.get( url, function() {
      self.changetoSignin()
      HaikuApp.currentUser = null
      self.trigger('signout')
    })
   },

   changetoSignin: function() {
    var link = $('#signout')
    link.text('Sign In with Twitter')
    link.attr('href', '/auth/twitter')
    link.attr('id', '#signin')
   }
});