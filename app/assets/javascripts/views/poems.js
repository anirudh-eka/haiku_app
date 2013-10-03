 // js/views/Poems.js

  var app = app || {};

  // Poem Item View
  // --------------

  // The DOM element for a Poem item...
  app.PoemView = Backbone.View.extend({

    //... is a list tag.
    tagName: 'li',

    // Cache the template function for a single item.
    // template: _.template( $('#item-template').html() ),
    template: _.template('<h3><%= content %></h3>'),

    // The PoemView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Poem** and a **PoemView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);        // NEW
      this.listenTo(this.model, 'visible', this.toggleVisible); // NEW
    },

    // Re-render the titles of the Poem item.
    render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    },

  });
