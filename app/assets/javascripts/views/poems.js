  // js/views/app.js

  var app = app || {};

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  app.PoemsView = Backbone.View.extend({
    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: '#haikuapp',

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
      console.log(this)
      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'reset', this.addAll);
      this.collection.fetch();
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function( poem ) {
      var view = new app.PoemView({ model: poem });
      $('#poem-list').append( view.render().el );
    },

    // Add all items in the **Poems** collection at once.
    addAll: function() {
      this.$('#poem-list').html('');
      this.collection.each(this.addOne, this);
    },
  });