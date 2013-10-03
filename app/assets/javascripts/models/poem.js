var app = app || {}

app.Poem = Backbone.Model.extend({
  defaults: {
    title: '',
    content: ''
  },
});