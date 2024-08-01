<template>
  <div class="carCard p-3 border border-light mb-3 m-auto">
    <div class="image_wrapper my-3">
      <img :src="carNew.carPic" alt="" />
    </div>
    <div class="row">
      <div class="col align-self-center">
        <span class="fs-3"> {{ carNew.Marka }} {{ carNew.Model }} </span>
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
  width: 27vw;
  height: auto;
  background-color: #645f4e;
}
.image_wrapper {
  border-style: solid;
  border-color: aliceblue;
  background-color: #5e6266;
  width: 25vw;
  height: auto;
  max-height: 25vw;
  overflow: hidden;
}
.image_wrapper img {
  max-height: 25vw;
  max-width: 25vw;
  width: auto;
  object-fit: contain;
  background-color: #5e6266;
}
</style>
