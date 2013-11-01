beforeEach(function() {
  this.addMatchers({
    toBePlaying: function(expectedSong) {
      console.log('bye there')
      var player = this.actual;
      return player.currentlyPlayingSong === expectedSong
          && player.isPlaying;
    }
  })
});
