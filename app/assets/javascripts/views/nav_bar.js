HaikuApp.Views.NavBar = Backbone.View.extend({

  events: {
    'click #signout' : 'signout',
    'click #my-poetry' : 'myPoetry',
    'click #logo' : 'home',
    'click #all-poetry' : 'home',
    'click #about' : 'about'
  },

  signout: function(e) {
    e.preventDefault();
    var url = $('#signout').attr('href')
    var self = this
    $.get( url, function() {
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

   myPoetry: function(e) {
    e.preventDefault();
    HaikuApp.router.navigate('myPoetry', {trigger: true})
    this.changeLink({
      oldId: 'my-poetry', 
      newId: 'all-poetry', 
      url: '', 
      newText: 'All Poetry'})
   },

  about: function(e) {
    HaikuApp.router.navigate('about', {trigger: true})
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