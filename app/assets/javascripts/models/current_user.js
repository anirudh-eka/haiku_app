HaikuApp.Models.CurrentUser = Backbone.Model.extend({

  initialize: function() {
    this.snaps = new HaikuApp.Collections.Snaps({user: this})
    this.snaps.add(this.get('snaps'))
  },

  snapped: function(poemId) {
    return this.snaps.findWhere({poem_id: poemId})
  },

  snap: function(poem) {
    var self = this
    this.snaps.create({poem_id: poem.id, poet_id: this.get('id')}, {
      wait: true,
      success: function() {
        poem.save({snap_count: poem.get('snap_count') + 1}, {wait: true});
      }
    })
  },

  unsnap: function(poem) {
    var self = this
    this.snapped(poem.id).destroy({
      wait: true,
      success: function() {
        poem.save({snap_count: poem.get('snap_count') - 1}, {wait: true})
      }
    })
  },

  poems: function() {
    var self = this
    var filtered = HaikuApp.poems.filter(function(model){
      return model.author().name === self.get('name')
    });
    return filtered
  }

});
