<template>
  <div class="card position-relative my-4">
    <div class="card-header">
      <div class="okvir2">
        <img
          src="@/assets/mateo.png"
          class="rounded-circle sredina"
          alt="..."
        />

        <span class="curive ms-2">Karlo_VK</span>
        <span class="desno me-2"> 2 days ago</span>
      </div>
    </div>
    <div class="carousel-inner">
      <button class="carousel-control-prev" type="button">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <img src="@/assets/cars.jpg" class="card-img-top" alt="..." />
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
    <div class="card-body">
      <p class="card-text">
        Cura me naterala da kupim rozi auto. <br />
        Obiteljski!
      </p>
      <p class="mb-1 hashtags">#cars #porsche #audi #ljubav</p>
      <hr class="mt-0" />
      Like @ <span class="desno me-2"> Komentiraj</span>
    </div>
  </div>
</template>
<style>
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
