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
    <div v-if="info.images" class="image-wrapper">
      <img :src="info.images" class="card-img-top" alt="..." />
    </div>

    <div class="card-body">
      <p class="card-text">
        {{ info.postText }}
      </p>
      <p v-if="info.hashtags != ''" class="mb-1 hashtags">
        {{ info.hashtags }}
      </p>
      <hr class="mt-0" />
      Like @ <span class="desno me-2"> Komentiraj</span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["info"],
  name: "PostCard",
  computed: {
    postedFromNow() {
      return moment(this.info.time).fromNow();
    },
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
