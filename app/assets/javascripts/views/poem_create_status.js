var syncStatus = Backbone.View.extend({
  el: '#status-messager',

  events: {
    "click .message" : "clearMsg",
  },

  initialize: function() {
    this.on('dispMessage', function(msg, status){this.renderMsg(msg, status)});
    this.$el.hide()
  },

  renderMsg: function(msg, status) {
    var message = $("<h3 class='message'>"+msg+"</h3>").addClass(status)
    this.$el.empty();
    this.$el.append(message)
    this.$el.slideDown();
  },

  clearMsg: function() {
    this.$el.slideUp();
  }
});

HaikuApp.Views.StatusMessager = new syncStatus()