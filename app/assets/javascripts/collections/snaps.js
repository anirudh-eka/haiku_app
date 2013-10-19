HaikuApp.Collections.Snaps = Backbone.Collection.extend({
  
  url: function() {
    return 'poet/' + HaikuApp.currentUser.id + '/snaps';
  },

  model: HaikuApp.Models.Snap
});
