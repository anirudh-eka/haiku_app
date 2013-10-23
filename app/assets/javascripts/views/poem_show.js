HaikuApp.Views.Poem = Backbone.View.extend({
  tagName: 'article',
  className: 'poem',
  
  events: {
    'click .snap' : 'snap',
    'click .unsnap' : 'unsnap'
  },
  
  initialize: function() {
    var self = this
    
    this.listenTo(this.model, 'change', this.render)
    this.listenTo(HaikuApp.navbar, 'signout', function(){
      self.render()
    });

    if (HaikuApp.currentUser) {
      this.listenTo(HaikuApp.currentUser.snaps, 'add', this.render)
      this.listenTo(HaikuApp.currentUser.snaps, 'remove', this.render)
    }
  },

  render: function() {
    this.$el.html(this.renderPoem());
    
    if (HaikuApp.currentUser) {
      this.$el.children('.snap-area').append(this.renderSnapButton());
    }
    this.$el.children('.snap-area').append(this.renderSnapCount());

    return this
  },

  renderPoem: function() {
    return JST['poems/show']({ poem: this.model.toJSON(), author: this.model.author() })
  },

  renderSnapButton: function() {
    this.snap = HaikuApp.currentUser.snapped(this.model.id)
    return JST['snaps/button_show']({ snapped: this.snap })
  },

  renderSnapCount: function() {
    return JST['poems/snap_count']({ poem: this.model.toJSON() })  
  },

  snap: function() {
    HaikuApp.currentUser.snap(this.model)
  },

  unsnap: function() {
    HaikuApp.currentUser.unsnap(this.model)
  },
});