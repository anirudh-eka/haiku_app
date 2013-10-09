var syncStatus = Backbone.View.extend({
  el: '#status-messager',

  events: {
    "click .error-message" : "messageSlideUp",
    "click .success-message" : "messageSlideUp"
  },

  initialize: function() {
    this.on('dispMessage', function(msg, status){this.renderMsg(msg, status)});
    this.$el.hide()
  },

  renderMsg: function(msg, status) {
    this.$el.html("<h3 class='"+status+"-message'>"+msg+"</h3>")    
    this.messageSlideDown();
  },

  messageSlideDown: function() {
    this.$el.slideDown();
  },

  messageSlideUp: function() {
    this.$el.slideUp();
  },
});

HaikuApp.Views.StatusMessager = new syncStatus()