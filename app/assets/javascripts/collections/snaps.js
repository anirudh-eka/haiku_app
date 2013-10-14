HaikuApp.Collections.Snaps = Backbone.Collection.extend({
  initialize: function(data) {
    this.add(data)
  },

  url: function() {
    return 'poet/' + HaikuApp.currentUser.id + '/snaps';
  },

  model: HaikuApp.Models.Snap
});
