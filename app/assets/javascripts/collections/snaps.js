HaikuApp.Collections.Snaps = Backbone.Collection.extend({
  
  initialize: function(args) {
    
  },

  url: function() {
    return 'poets/' + HaikuApp.currentUser.id + '/snaps';
  },

  model: HaikuApp.Models.Snap
});
