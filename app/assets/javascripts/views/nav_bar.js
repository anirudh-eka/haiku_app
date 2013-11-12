HaikuApp.Views.NavBar = Backbone.View.extend({

  events: {
    'click #signout' : 'signout',
    'click #my-poetry' : 'myPoetry',
    'click #title' : 'home',
    'click #all-poetry' : 'home'
  },

  signout: function(e) {
    e.preventDefault();
    var url = $('#signout').attr('href')
    var self = this
    $.get( url, function() {
      // self.changetoSignin()
      self.changeLink({
        oldId: 'signout',
        newId: 'signin',
        url: '/auth/twitter',
        newText: 'Sign In with Twitter'
      })
      HaikuApp.currentUser = null
      self.trigger('signout')
    })
   },

   changetoSignin: function() {
    var link = $('#signout')
    link.text('Sign In with Twitter')
    link.attr('href', '/auth/twitter')
    link.attr('id', 'signin')
   },

   myPoetry: function(e) {
    console.log('my poetry')
    e.preventDefault();
    HaikuApp.router.navigate('myPoetry', {trigger: true})
    this.changeLink({
      oldId: 'my-poetry', 
      newId: 'all-poetry', 
      url: '', 
      newText: 'All Poetry'})
   },

  changeLink: function(args){
    var link = $('#'+args.oldId)
    link.text(args.newText)
    link.attr('href', args.url)
    link.attr('id', args.newId)
   },
   
   home: function(e) {
    e.preventDefault();
    HaikuApp.router.navigate('', {trigger: true})
    this.changeLink({
      oldId: 'all-poetry', 
      newId: 'my-poetry', 
      url: '#myPoetry', 
      newText: 'My Poetry'})
   }
});