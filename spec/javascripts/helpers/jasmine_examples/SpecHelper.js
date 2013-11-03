beforeEach(function () {
  jasmine.addMatchers({
    toBePlaying: function () {
      return {
        compare: function (actual, expected) {
          var player = actual;

          return {
            pass: player.currentlyPlayingSong === expected && player.isPlaying
          }
        }
      };
    },

    toHaveProperty: function() {
      return {
        compare: function (actual, expected) {
          var object = actual;

          return {
            pass: expected in object 
          }
        }
      }
    }
  });
});
