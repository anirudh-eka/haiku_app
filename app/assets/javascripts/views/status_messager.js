HaikuApp.Views.StatusMessager = Backbone.View.extend({

  events: {
    "click .message" : "clearMsg",
  },

  initialize: function() {
    this.$el.hide()
  },

  renderMsg: function(msg, status) {
    var message = $("<h4 class='message'>"+msg+"</h4>").addClass(status)
    this.$el.empty();
    this.$el.append(message)
    this.$el.slideDown();
  },

  clearMsg: function() {
    this.$el.slideUp();
  }
});
