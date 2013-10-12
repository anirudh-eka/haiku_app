HaikuApp.Collections.Snaps = Backbone.Collection.extend({
  initialize: function(data) {
    this.add(data)
  },

  url: function() {
    return this.currentUser.id + '/snaps';
  },

  model: HaikuApp.Models.Snap
});
