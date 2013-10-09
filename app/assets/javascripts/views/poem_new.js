HaikuApp.Views.PoemNew = Backbone.View.extend({
  id: 'new-poem-container',

  events: {
    "submit #new-poem" : "submit"
  },

  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'error', this.anError)
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
      },
      success: function() {
        console.log('success')
        console.log(self)
        self.render()
      }
    });
  },

  anError: function() {
    console.log('error2!');
  }
});