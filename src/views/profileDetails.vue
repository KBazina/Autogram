<template>
  <div class="overlay"></div>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8 detailer">
        <div class="container shadow-lg p-3 mb-5 bgColor2 rounded">
          <div class="row">
            <div
              class="col shadow-sm p-3 mx-3 my-3 bgColor1 rounded align-self-end"
            >
              <div class="profile_bg container-fluid p-3">
                <div class="">
                  <div class="okvir mb-5">
                    <img
                      :src="imageSrc"
                      alt=""
                      class="rounded-circle border-4 border border-light bg-light-subtle"
                    />
                  </div>
                </div>
              </div>
              <div class="input-group">
                <input
                  type="file"
                  class="form-control"
                  id="inputGroupFile04"
                  aria-describedby="inputGroupFileAddon04"
                  aria-label="Upload"
                  @change="onFileChange"
                />
              </div>
            </div>
            <div class="col my-5">
              <h1>"Dobar dan kolege"</h1>
              <h5 class="mb-5">
                Voljeli bi znati nešto više o vama, pa bih vas zamolili da
                ispunite sljedeće podatke..
              </h5>
              <!-- -------------- -->
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ime i prezime"
                  aria-label="ime_prezime"
                />
                <span class="input-group-text">@</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Usesname"
                  aria-label="Usesrname"
                />
              </div>

              <div class="input-group">
                <span class="input-group-text">My description</span>
                <textarea
                  placeholder="Tell us more about yourself.."
                  class="form-control"
                  aria-label="With textarea"
                ></textarea>
              </div>

              <!-- ___________--- -->
            </div>
          </div>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageSrc: "",
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageSrc = URL.createObjectURL(file);
      }
    },
  },
};
</script>
<style>
.bgColor2 {
  background-color: rgb(36, 37, 38);
}
.bgColor1 {
  background-color: rgb(72, 74, 76);
}
.overlay {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9000;
}
.detailer {
  z-index: 9001;
}
.okvir {
  position: relative;
  width: 250px;
  height: 250px;
}
</style>
