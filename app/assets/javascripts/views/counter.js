HaikuApp.Views.Counter = Backbone.View.extend({

  initialize: function(params) {
    this.maxCount = params.maxCount
    this.recording = params.recording
  },

  render: function() {
    if (this.countRemaining() >= 0) {
      this.$el.text(this.countRemaining()).css('color', 'black') 
    } else {
      this.$el.text(this.countRemaining()).css('color', 'red') 
    }
  },

  countRemaining: function() {
    return this.maxCount - this.currentCount()
  },

  currentCount: function() {
    return $(this.recording).val().length
  }

});