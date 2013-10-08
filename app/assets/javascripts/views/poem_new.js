HaikuApp.Views.PoemNew = Backbone.View.extend({
  id: 'new-poem-container',

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
    console.log('title is '+title+', and content is '+content)
    this.collection.create({title: title, content: content}, {wait: true},{
      error: function(r) {
        console.log('error!')
        // console.log(r)
      }
    });
  }
});