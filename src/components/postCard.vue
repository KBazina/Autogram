<template>
  <div class="card position-relative my-4">
    <div class="position-absolute top-0 start-50 translate-middle">
      <div class="okvir2">
        <img
          src="@/assets/mateo.png"
          class="rounded-circle sredina"
          alt="..."
        />
      </div>
    </div>
    <div class="card-header">
      KARLO BAZINA <span class="desno me-2"> 2 days ago</span>
    </div>
    <img src="@/assets/circle.jpg" class="card-img-top" alt="..." />
    <div class="card-body">
      <p class="card-text">
        Cura me naterala da kupim rozi auto. <br />
        Obiteljski!
      </p>
      <hr />
      Like @ <span class="desno me-2"> Komentiraj</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["infoPost"],
  name: "postCard",
  data() {
    return {};
  },
};
</script>

<style>
.okvir2 {
  position: relative;
  width: 40px;
  height: 40px;
}
.okvir2 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card {
  background-color: #242526 !important;
}
.desno {
  float: right;
}
</style>
