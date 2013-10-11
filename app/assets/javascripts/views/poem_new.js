HaikuApp.Views.PoemNew = Backbone.View.extend({
  el: '#new-poem-container',

  events: {
    "submit #new-poem" : "submit"
  },

  initialize: function() {
    this.render();
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
        var messager = new HaikuApp.Views.StatusMessager()
        messager.el = '#poem-create-messager'
        messager.renderMsg('What is a poem without words?', 'error');
        // messager.trigger('dispMessage', 'What is a poem without words?', 'error')
      },
      success: function() {
        HaikuApp.Views.StatusMessager.trigger('dispMessage', 'Thank you for sharing', 'success')
        self.render()
      }
    });
  },
});