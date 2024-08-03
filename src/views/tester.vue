<template>
  <div >
    <div>{{ count.toFixed(2) }}</div>
    <button @click="startStoperica()">Start</button>
    <button @click="resetStoperica()">Reset</button>
  </div>
</template>
<script>
export default {
  
  data() {
    return {
      count: 0.00,
      intervalId: null
    };
  },
  methods: {
        startStoperica() {
          if (this.intervalId) return; // Sprječava višestruko pokretanje intervala

          this.intervalId = setInterval(() => {
            if (this.count >= 10) {
              clearInterval(this.intervalId);
              this.intervalId = null; // Resetiranje intervalId kada stoperica stane
            } else {
              this.count += 0.01;
            }
          }, 10); // Interval od 10 milisekundi
        },
        resetStoperica() {
          clearInterval(this.intervalId);
          this.intervalId = null; // Resetiranje intervalId kada se stoperica resetira
          this.count = 0;
        }
      }
}
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
