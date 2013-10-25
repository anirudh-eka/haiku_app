HaikuApp.Collections.Snaps = Backbone.Collection.extend({
  url: function() {
    return 'poets/' + HaikuApp.currentUser.id + '/snaps';
  },

  model: HaikuApp.Models.Snap
});
