HaikuApp.Views.PoemNew = Backbone.View.extend({
  el: '#new-poem-container',

  events: {
    "submit #new-poem" : "submit",
    "keyup #content" : "countContent"
  },

  initialize: function() {
    this.render();
    this.maxCount = 140
    this.messager = new HaikuApp.Views.StatusMessager({el: '#poem-create-messager'})
    this.contentCounter = new HaikuApp.Views.Counter({el: '#content-counter', maxCount: this.maxCount, recording: '#content'})
    var self = this

    this.listenTo(HaikuApp.navbar, 'signout', function(){
    self.remove()  
    });
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
    if (this.currentCount() > 0 && this.currentCount() <= this.maxCount ) {
      $('input[type="submit"]').removeAttr('disabled')
    } else {
      $('input[type="submit"]').attr('disabled', true)
    }

  },

  currentCount: function() {
    return this.contentCounter.currentCount()
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