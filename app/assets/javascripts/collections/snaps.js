HaikuApp.Collections.Snaps = Backbone.Collection.extend({
  initialize: function(args) {
     this.user = args.user
     console.log(args)
  },

  url: function() {
    return 'poets/' + this.user.id + '/snaps';
  },

  model: HaikuApp.Models.Snap
});
