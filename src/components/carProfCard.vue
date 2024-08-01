<template>
  <div class="carCard p-3 border border-light">
    <div class="image_wrapper my-3">
      <img :src="carNew.carPic" alt="" />
    </div>
    <div class="row">
      <div class="col align-self-center">
        <span class="fs-2"> {{ carNew.Marka }} {{ carNew.Model }} </span>
      </div>
      <div class="col">
        <ul class="text-start fs-5">
          <li>Snaga: {{ carNew.Snaga }}kW</li>
          <li>Godište: {{ carNew.carYear }}</li>
          <li>Težina: {{ carNew.Weight }}kg</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["carNew"],
  name: "carprofCard",
  data() {
    return {};
  },
};
</script>
<style scoped>
.carCard {
  height: auto;
  background-color: rgb(129, 134, 140);
}
.image_wrapper {
  border-style: solid;
  border-color: aliceblue;
  background-color: #5e6266;
  width: 30vw;
  height: auto;
  max-height: 30vw;
  overflow: hidden;
}
.image_wrapper img {
  max-height: 30vw;
  max-width: 30vw;
  width: auto;
  object-fit: contain;
  background-color: #5e6266;
}
</style>
