export default {
  name: "Hole",
  props: ["hole", "parentMiss", "parentHit"],
  data() {
    return {
      gameIsOver: false,
      isAlive: false,
      isHitted: false,
      timing: null
    };
  },
  methods: {
    alive() {
      this.timing = setTimeout(() => {
        if (!this.isHitted) {
          if (!this.gameIsOver) this.die();
          else this.isAlive = false;
        }
      }, 1000);
    },

    die() {
      this.isAlive = false;
      this.parentMiss();
    },

    hit() {
      if (this.isAlive) {
        this.isHitted = true;
        this.parentHit();

        clearTimeout(this.timing);

        setTimeout(() => {
          this.isHitted = false;
          this.isAlive = false;
        }, 500);
      }
    },

    stop() {
      clearTimeout(this.timing);
    }
  },
  watch: {
    isAlive: function(value) {
      if (value) this.alive();
    },

    gameIsOver: function(value) {
      if (value) this.stop();
    }
  }
};
