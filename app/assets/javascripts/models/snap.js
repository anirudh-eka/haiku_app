HaikuApp.Models.Snap = Backbone.Model.extend({
  toJSON: function(){
    return json = {snap: this.attributes};
  }
});
