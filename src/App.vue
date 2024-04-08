<template>
  <nav class="navImp navbar navbar-expand-lg sticky-top" >
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img src="@/assets/logo.png" alt="" width="60" height="" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li v-if="!UserActive" class="nav-item">
            <a class="nav-link" href="/login">Login</a>
          </li>
          <li v-if="!UserActive" class="nav-item">
            <a class="nav-link" href="/signup">Sign up</a>
          </li>
          <li v-if="UserActive" class="nav-item">
            <a class="nav-link" @click="signOut" href="/login">Log out</a>
          </li>
        </ul>
        <form v-if="UserActive" class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <div v-if="!UserActive" class="modHide">
          What is autogram?
          <button
            type="button"
            class="btn btn-outline-success mx-2"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            More information!
          </button>
          <div
            class="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class=" modal-content ">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">
                    AUTOGRAM
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  Autogram je strastveno mjesto za ljubitelje automobila koji
                  žele dijeliti svoje iskustvo, znanje i strast prema vozilima s
                  istomišljenicima diljem svijeta. Naša platforma omogućuje
                  kreiranje osobnih profila, gdje korisnici mogu istaknuti svoje
                  automobilske preferencije, iskustva i dostignuća. Uz mogućnost
                  dijeljenja objava, fotografija i sudjelovanja u utrkama,
                  Autogram je idealno mjesto za povezivanje s autoentuzijastima
                  i istraživanje svijeta automobilizma.
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
  </nav>
  <router-view />
</template>

<script>
import router from "./router";
import { onAuthStateChanged, getAuth, signOut } from "@/firebase";
const auth = getAuth();
const currentRoute = router.currentRoute;

export default {
  name: "app",
  data() {
    return {
      UserActive: null,
    };
  },
  async created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.UserActive = user;
        if (!currentRoute.value.meta.needsUser) {
          this.$router.push({ name: "home" });
        }
      } else {
        this.UserActive = null;
        if (currentRoute.value.meta.needsUser) {
          this.$router.push({ name: "login" });
        }
      }
    });
  },
  methods: {
    signOut() {
      signOut(auth)
        .then(() => {
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color:white;
  background-color:#18191a;
}


@media screen and (max-width: 62em) {
  .modHide {
    display: none !important;
  }
}

.navImp {
  color: rgb(203, 198, 198);
  background-color:#242526 !important;
}
.fade{
  z-index: 100 !important;
}
</style>
