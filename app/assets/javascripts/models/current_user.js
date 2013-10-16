HaikuApp.Models.CurrentUser = Backbone.Model.extend({

  initialize: function() {
    this.snaps = new HaikuApp.Collections.Snaps(this.get('snaps'))
  },

  snapped: function(poemId) {
    return Boolean(this.snaps.findWhere({poem_id: poemId}))
  }

});
