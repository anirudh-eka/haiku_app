HaikuApp.Views.StatusMessager = Backbone.View.extend({
  // el: '#status-messager',

  events: {
    "click .message" : "clearMsg",
  },

  initialize: function() {
    this.on('dispMessage', function(msg, status){this.renderMsg(msg, status)});
    this.$el.hide()
  },

  renderMsg: function(msg, status) {
    this.$el.hide()
    var message = $("<h4 class='message'>"+msg+"</h4>").addClass(status)
    this.$el.empty();
    this.$el.append(message)
    this.$el.slideDown();
    // debugger
  },

  clearMsg: function() {
    this.$el.slideUp();
  }
});
