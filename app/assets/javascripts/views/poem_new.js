HaikuApp.Views.PoemNew = Backbone.View.extend({
  el: '#new-poem-container',

  events: {
    "submit #new-poem" : "submit"
  },

  initialize: function() {
    this.render();
    this.messager = new HaikuApp.Views.StatusMessager({el: '#poem-create-messager'})
  },

  render: function() {
    this.$el.html(JST['poems/new']())
    return this
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