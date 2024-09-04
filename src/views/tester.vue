<template>
  <div>
    <button >FIREBAE JE RETARDIRANA BAZA PODATKA KOJU TREBA ZAPALIT</button>
    <audio ref="myAudio1">
      <source src="@/assets/karlo1.mp3" type="audio/ogg" />
      Your browser does not support the audio element.
    </audio>
    <audio ref="myAudio2">
      <source src="@/assets/karlo2.mp3" type="audio/ogg" />
      Your browser does not support the audio element.
    </audio>
    <div>{{ count.toFixed(2) }}</div>
    <button @click="startStoperica()">Start</button>
    <button @click="resetStoperica()">Reset</button>
  </div>
</template>
<script>
import {getAuth} from "@/firebase"
export default {
  data() {
    return {
      count: 0.0,
      intervalId: null,
    };
  },
  methods: {
    startStoperica() {
      if (this.intervalId) return;
      this.intervalId = setInterval(() => {
        if (this.count >= 10) {
          clearInterval(this.intervalId);
          this.intervalId = null;
          this.count += 0.01;
        }
      }, 10);
      //-----------------------------------------------------------------------
      const audioElement = this.$refs.myAudio1;
      if (audioElement) {
        audioElement.play();
      }
      setTimeout(() => {
        const audioElement2 = this.$refs.myAudio2;
        const audioElement = this.$refs.myAudio1;
        if (audioElement2) {
          audioElement.volume = 0.7;
          audioElement2.volume = 0.2;
          audioElement2.play();
        }
      }, 1000);
      setTimeout(() => {
        const audioElement2 = this.$refs.myAudio2;
        const audioElement = this.$refs.myAudio1;
        if (audioElement2) {
          audioElement.volume = 0.5;
          audioElement2.volume = 0.5;
        }
      }, 2000);
      setTimeout(() => {
        const audioElement2 = this.$refs.myAudio2;
        const audioElement = this.$refs.myAudio1;
        if (audioElement2) {
          audioElement.volume = 0.3;
          audioElement2.volume = 0.8;
        }
      }, 3000);
      setTimeout(() => {
        const audioElement2 = this.$refs.myAudio2;
        const audioElement = this.$refs.myAudio1;
        audioElement.volume = 0.15;
        audioElement2.volume = 1;
        audioElement.pause();
      }, 4000);
    },
    resetStoperica() {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.count = 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.desno {
  float: right;
}
.okvir2 {
  position: relative;
  width: 100%;
  height: 35px;
}
.okvir2 img {
  width: 35px;
  height: auto;
  object-fit: cover;
}
.card {
  background-color: #242526 !important;
  width: 500px;
  margin: auto;
}
.curive {
  font-family: cursive;
}
.hashtags {
  color: green;
}
</style>
