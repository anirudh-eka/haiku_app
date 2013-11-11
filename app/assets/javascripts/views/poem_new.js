HaikuApp.Views.PoemNew = Backbone.View.extend({
  // el: '#new-poem-container',

  events: {
    "submit #new-poem" : "submit",
    "keyup #title" : "countTitle",
    "keyup #content" : "countContent"
  },

  initialize: function() {
    this.render();
    this.maxContentCount = 140
    this.maxTitleCount = 40
    this.setupMessager()
    this.titleCounter = new HaikuApp.Views.Counter({el: '#title-counter', maxCount: this.maxTitleCount, recording: '#title'})
    this.contentCounter = new HaikuApp.Views.Counter({el: '#content-counter', maxCount: this.maxContentCount, recording: '#content'})

    this.listenTo(this.collection, 'invalid', function(model, error){
      this.messager.renderMsg(error, 'error')
    });

    var self = this
    this.listenTo(HaikuApp.navbar, 'signout', function(){
      self.remove()  
    });
  },

  render: function() {
    this.$el.html(JST['poems/new']())
    return this
  },

  setupMessager: function() {
    this.messager = new HaikuApp.Views.StatusMessager({el: '#poem-create-messager'})
    var welcomeMsg = 'Welcome ' + HaikuApp.currentUser.get('name') + '! Please share a haiku or short poem with us'
    this.messager.renderMsg(welcomeMsg, 'success')
  },
  
  countTitle: function(e) {
    this.updateSubmit(this.titleCounter.currentCount(), this.maxTitleCount)
    this.titleCounter.render()
  },

  countContent: function(e) {
    this.updateSubmit(this.contentCounter.currentCount(), this.maxContentCount)
    this.contentCounter.render()
  },

  updateSubmit: function(currentCount, maxCount) {
    if (currentCount > 0 && currentCount <= maxCount ) {
      $('input[type="submit"]').removeAttr('disabled')
    } else {
      $('input[type="submit"]').attr('disabled', true)
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