<template lang="pug">
  #app(@mouseup="leave" @mousedown="hold" :class="{pressing: isPressing}")
    img.logo(src="./assets/logo.png")
    Box(ref="box")

    #startContainer(:class="{ active: !playing }")
      img.logoBig(src="./assets/logo.png")
      p.intro.
        Bem-vinda, amor.
        #[br]
        Criei esse desafio baseado em coisas que nos conectaram, o objetivo é você passar das 3 fases do jogo.
        #[br]
        #[br]
        Cada fase exige uma pontuação. [Preste muita atenção nelas]
        #[br]
        #[br]
        Você só tem 5 vidas, caso perca todas, você retorna para o início da fase.
        #[br]
        #[br]
        Ao final do desafio, você vai ganhar um prêmio.
        #[br]
        O resto é surpresa.
        #[br]
        Boa sorte. <3
      span#start(@click="startGame") Start!

    span#points {{ points }}

    #levelClearContainer(:class="{ active: levelClear }")
      img(src="./assets/levelclear.png")
      span.points You scored #[span.pointsSpace {{points}}] points.
      span#start(@click="continueGame") Next level

    #gameOverContainer(:class="{ active: gameIsOver }")
      img(src="./assets/gameover.png")
      span.points Game over. You must make your better in this game if you really wanna my love.
      span#start(@click="continueGame") Restart level

    #winTheGame(:class="{ active: win }")
      img(src="./assets/win.png")
      span.points YEAH! You win the best prize ever!
      span#start(@click="openBox") Open the box

    #boxContainer(:class="{ active: box }")
      img(src="./assets/box.gif")

    #heartContainer
      img(v-for="n in lifes" src="./assets/heart.png")

</template>

<script>
import { Box } from "./components";

export default {
  name: "app",
  data() {
    return {
      lifes: 5,
      level1song: null,
      level2song: null,
      level3song: null,
      levelClear: false,
      gameIsOver: false,
      win: false,
      box: false,
      playing: false,
      isPressing: false,
      points: 0
    };
  },
  components: {
    Box
  },
  methods: {
    leave() {
      this.isPressing = false;
    },

    hold() {
      this.isPressing = true;
    },

    startGame() {
      this.playSong(0);
      this.playing = true;
      this.$refs.box.initiate();
    },

    stop() {
      this.level1song.pause();
      if (this.level2song != null) this.level2song.pause();
      if (this.level3song != null) this.level3song.pause();
      this.$refs.box.stop();
    },

    continueGame() {
      this.levelClear = false;
      this.gameIsOver = false;
      this.playSong(this.$refs.box.level);
      this.$refs.box.points = 0;
      this.$refs.box.continue();
      this.$refs.box.initiate();
      this.lifes = 5;
    },

    gameOver(level) {
      this.stop();
      this.playSong(4);
      this.$refs.box.gameOver();
      this.gameIsOver = true;
    },

    passLevel(level) {
      this.stop();
      this.playSong(3);
      this.levelClear = true;
      this.lifes = 5;
    },

    success() {
      this.stop();
      this.playSong(3);
      this.win = true;
      this.lifes = 5;
    },

    openBox() {
      this.win = false;
      this.box = true;
    },

    playSong(id) {
      switch (id) {
        case 0: //level 1
          this.level1song = new Audio(require("./assets/level1.mp3"));
          this.level1song.play();
          break;
        case 1: //level 2
          this.level2song = new Audio(require("./assets/level2.mp3"));
          this.level2song.play();
          break;
        case 2: //level 3
          this.level3song = new Audio(require("./assets/level3.mp3"));
          this.level3song.play();
          break;
        case 3: //victory
          var victory = new Audio(require("./assets/victory.mp3"));
          victory.play();
          break;
        case 4:
          var gameOver = new Audio(require("./assets/gameover.mp3"));
          gameOver.play();
          break;
      }
    }
  }
};
</script>

<style lang="sass" src="./app.sass"></style>
