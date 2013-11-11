HaikuApp.Models.Snap = Backbone.Model.extend({
  toJSON: function(){
    return json = {snap: this.attributes};
  },

  validate: function(attrs) {
    if (!attrs.poem_id) {
      return "snap must have a poem_id";
    }
    if (!attrs.poet_id) {
      return "snap must have a poet_id";
    }
  },

});
