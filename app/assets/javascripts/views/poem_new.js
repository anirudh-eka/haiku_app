HaikuApp.Views.PoemNew = Backbone.View.extend({
  el: '#new-poem-container',

  events: {
    "submit #new-poem" : "submit",
    "keyup #content" : "countContent"
  },

  initialize: function() {
    this.render();
    this.messager = new HaikuApp.Views.StatusMessager({el: '#poem-create-messager'})
    this.contentCounter = new HaikuApp.Views.Counter({el: '#content-counter', maxCount: 140, recording: '#content'})
  },

  render: function() {
    this.$el.html(JST['poems/new']())
    return this
  },

  countContent: function(e) {
    this.updateSubmit()
    this.contentCounter.render()
  },

  updateSubmit: function() {
    if (this.contentCounter >= 0) {
      // enable submit
    } else {
      // disable submit
    }

  },

  submit: function(e) {
    e.preventDefault();
    var title = $('#title').val()
    var content = $('#content').val()
    var self = this
    this.collection.create({title: title, content: content}, {wait: true, 
      error: function() {
        self.messager.renderMsg('What is a poem without words?', 'error');
      },
      success: function() {
        self.messager.renderMsg('Thank you for sharing', 'success');
        $('#title').val("")
        $('#content').val("")
      }
    });
  },
});