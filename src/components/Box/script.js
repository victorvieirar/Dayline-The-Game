import Hole from "../Hole";

export default {
  name: "Box",
  data() {
    return {
      holes: [],
      level: 0,
      hitCount: 0,
      points: 0,
      missCount: 0,
      lastSpawn: ""
    };
  },
  components: {
    Hole
  },
  methods: {
    setLevel(level) {
      this.level = level;
    },

    continue() {
      for (let index = 0; index < this.holes.length; index++) {
        const element = this.holes[index];
        this.$refs[element.id][0].gameIsOver = false;
      }
    },

    initiate() {
      this.spawn();
    },

    spawn() {
      let hole = Math.floor(Math.random() * 9);
      this.play(hole);
    },

    play(hole) {
      var id = this.holes[hole].id;
      if (id == this.lastSpawn) this.spawn();
      else {
        this.lastSpawn = id;
        this.$refs[id][0].isAlive = true;
      }
    },

    stop() {
      for (let index = 0; index < this.holes.length; index++) {
        const element = this.holes[index];
        this.$refs[element.id][0].isAlive = false;
      }
    },

    gameOver() {
      for (let index = 0; index < this.holes.length; index++) {
        const element = this.holes[index];
        this.$refs[element.id][0].gameIsOver = true;
      }
    },

    miss: function() {
      setTimeout(() => {
        this.spawn();
      }, 500);
      this.missCount++;

      this.$parent.lifes--;
    },

    hit: function() {
      this.spawn();
      this.hitCount++;
      this.points++;
    }
  },
  mounted() {
    for (let i = 0; i < 9; i++) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var j = 0; j < 9; j++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      this.holes.push({ id: result });
    }
  },

  watch: {
    points: function() {
      this.$parent.points = this.points;
    },

    hitCount: function() {
      switch (this.level) {
        case 0:
          if (this.hitCount == 10) {
            this.level++;
          }
          break;
        case 1:
          if (this.hitCount == 12) {
            this.level++;
          }
          break;
        case 2:
          if (this.hitCount == 18) {
            this.level++;
          }
          break;
      }
    },

    level: function() {
      switch (this.level) {
        case 1:
          this.missCount = 0;
          this.hitCount = 0;
          this.$parent.passLevel(this.level);
          break;
        case 2:
          this.missCount = 0;
          this.hitCount = 0;
          this.$parent.passLevel(this.level);
          break;
        case 3:
          this.missCount = 0;
          this.hitCount = 0;
          this.$parent.success();
          break;
      }
    },

    missCount: function() {
      if (this.missCount == 5) {
        this.points = 0;
        this.missCount = 0;
        this.hitCount = 0;
        this.$parent.gameOver(this.level);
      }
    }
  }
};
