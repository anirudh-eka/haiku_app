HaikuApp.Views.NavBar = Backbone.View.extend({

  events: {
    'click #signout' : 'signout'
  },

  signout: function(e) {
    e.preventDefault();
    console.log('clicked')
    var url = $('#signout').attr('href')
    var self = this
    $.get( url, function() {
      self.changetoSignin()
      self.trigger('signout')
    }).fail(function() {
      console.log( "error" );
    })
   },

   changetoSignin: function() {
    var link = $('#signout')
    link.text('Sign In with Twitter')
    link.attr('href', '/auth/twitter')
    link.attr('id', '#signin')
   }
});