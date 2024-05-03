<template>
  <div class="card position-relative my-4">
    <div class="card-header">
      <div class="okvir2">
        <img
          :src="info.profileImage"
          class="rounded-circle sredina"
          alt="..."
        />

        <span class="curive ms-2">{{ info.username }}</span>
        <span class="desno me-2"> {{ postedFromNow }}</span>
      </div>
    </div>
    <div v-if="info.images.length > 0" class="image-wrapper carousel-inner">
      <button @click="counterUP" class="carousel-control-prev" type="button">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <img :src="info.images[counter]" class="card-img-top" alt="..." />
      <button
        @click="counterDown"
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>

    <div class="card-body">
      <p class="card-text" v-html="info.postText"></p>
      <p v-if="info.hashtags != ''" class="mb-1 hashtags">
        <span v-for="(tag, index) in info.hashtags" :key="index">
          #{{ tag }}</span
        >
      </p>
      <hr class="mt-0" />
      <Icon icon="mdi:cards-heart-outline" width="30" class="me-2" />Like
      <span class="desno me-2"> Komentiraj</span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { Icon } from "@iconify/vue";
export default {
  data() {
    return {
      counter: 0,
    };
  },
  props: ["info"],
  name: "PostCard",
  computed: {
    postedFromNow() {
      return moment(this.info.time).fromNow();
    },
  },
  methods: {
    counterUP() {
      if (this.counter == this.info.images.length - 1) {
        this.counter = 0;
      } else this.counter += 1;
    },
    counterDown() {
      if (this.counter == 0) {
        this.counter = this.info.images.length - 1;
      } else this.counter -= 1;
    },
  },
  components: {
    Icon,
  },
};
</script>
<style>
.image-wrapper {
  background-color: #5e6266;
  width: 100%;
  height: auto;
  max-height: 500px;
  overflow: hidden;
  text-align: center;
}
.image-wrapper img {
  max-height: 500px;
  max-width: 500px;
  width: auto;
  object-fit: contain;
  background-color: #5e6266;
}
.desno {
  float: right;
}
.okvir2 {
  position: relative;
  width: 100%;
  height: 40px;
}
.okvir2 img {
  width: 40px;
  height: auto;
  max-height: 40px;
  object-fit: cover;
  background-color: beige;
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
