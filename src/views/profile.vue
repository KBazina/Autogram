<template>
  <div
    class="profile_bg container-fluid p-0 border-bottom border-4 border-secondary"
  >
    <div class="profile_bg_img">
      <img src="@/assets/profile_background.jpg" alt="" />
    </div>
    <div class="pola position-relative">
      <div class="okvir position-absolute top-100 start-50 translate-middle">
        <img
          src="@/assets/circle.jpg"
          alt=""
          class="rounded-circle border-4 border border-light"
        />
      </div>
    </div>
  </div>

  <div class="container-fluid mt-4">
    <div class="row " >
      <div class=" col-3 ">
          <div class="vstack gap-2 ms-3 mt-2">
            <div class="  p-2 fs-1">Mateo Udovitjitj</div>
            <hr>
            <div class="p-2 fs-5">Promijeni sliku profila</div>
            <div class="p-2  fs-5">Dodaj auto</div>
            <div class="p-2  fs-5">Uredi auto</div>
            <div class="p-2  fs-5">Utrke</div>
            <div class="p-2 fs-5">Osvojeni trofeji</div>
            <div class="p-2  fs-5">Moji pratitelji</div>
          </div>

      </div>
    </div>
    </div>
</template>

<style>
hr{
  border:1px solid white;
}
.pola {
  width: 60vw;
}
.profile_bg_img {
  height: 200px;
  overflow: hidden;
}
.profile_bg_img img {
  opacity: 0.9;
  width: 100%;
  height: auto;
  object-fit: cover;
}
.okvir {
  position: relative;
  width: 250px;
  height: 250px;
}

.okvir img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

<script></script>