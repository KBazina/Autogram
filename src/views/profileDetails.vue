<template>
  <div class="overlay"></div>
  <div class="pozadina"></div>
  <div class="detailer position-absolute top-50 start-50 translate-middle">
    <div class="container p-3 bgColor2 rounded rowOpacity">
      <div class="row">
        <div
          class="col shadow-sm p-3 mx-3 my-3 bgColor1 rounded align-self-end firstCol"
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
        <div class="col secondCol mt-5">
          <h1>"Dobar dan kolege"</h1>
          <h5 class="mb-5">
            Voljeli bi znati nešto više o vama, pa bih vas zamolili da ispunite
            sljedeće podatke..
          </h5>

          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Ime i prezime"
              aria-label="ime_prezime"
              v-model="ime_prezime"
            />
            <span class="input-group-text">@</span>
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              aria-label="Username"
              v-model="username"
            />
          </div>
          <VueDatePicker
            class="dp__theme_dark"
            v-model="date"
            placeholder="Enter your birthday"
            text-input
          />

          <div class="input-group mt-3">
            <span class="input-group-text">My description</span>
            <textarea
              placeholder="Tell us more about yourself.."
              class="form-control"
              aria-label="With textarea"
              v-model="bio"
            ></textarea>
          </div>
          <button
            type="button"
            @click="detailProfile()"
            class="btn btn-outline-warning mt-3 me-3"
          >
            Dalje
          </button>
          <span class="warningSpan">
            Sljedeći podaci neće se koristiti za unaprijeđivanje vašeg iskustva,
            nego će biti zlouporabljeni!
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
} from "@vuelidate/validators";
const oneWord = (value) => value.trim().split(" ").length == 1;
const moreWords = (value) => value.trim().split(" ").length >= 2;

export default {
  name: "profileDetails",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      imageSrc: "",
      date: null,
      ime_prezime: "",
      username: "",
      bio: "",
    };
  },
  validations() {
    return {
      imageSrc: { required },
      date: { required },
      ime_prezime: {
        moreWords,
        required,
        minLength: minLength(2),
        maxLength: maxLength(40),
      },
      username: {
        maxLength: maxLength(30),
        required,
        oneWord,
      },
    };
  },
  methods: {
    async detailProfile(e) {
        console.log(this.imageSrc)
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        console.log("nesto je krivo");
      } else {
        const newUser = await addDoc(collection(db, "posts"), {
          imageSrc: this.imageSrc,
          date:JSON.stringify(this.date),
          ime_prezime: this.ime_prezime,
          username: this.username,
          bio: this.bio,
        }).catch((e) => {
          console.error(e);
        });
      }
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageSrc = URL.createObjectURL(file);
      }
    },
  },
  components: { VueDatePicker },
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
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 9000;
}

.detailer {
  width: 1200px;
  z-index: 9002;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.288);
}
.rowOpacity {
  background-color: rgba(36, 37, 38, 0);
}
.firstCol {
  background-color: rgb(52, 52, 52);
}
.okvir {
  position: relative;
  width: 250px;
  height: 250px;
}
.warningSpan {
  font-size: 10px;
  color: #737373;
}

.pozadina {
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(@/assets/cars.jpg);
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.dp__theme_dark {
  --dp-background-color: #212121;
  --dp-text-color: #fff;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #fff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #005cb2;
  --dp-primary-disabled-color: #61a8ea;
  --dp-primary-text-color: #fff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #2d2d2d;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-disabled-color-text: #d0d0d0;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-marker-color: #e53935;
  --dp-tooltip-color: #3e3e3e;
  --dp-highlight-color: rgb(0 92 178 / 20%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
  --dp-range-between-border-color: var(--dp-hover-color, #fff);
}
</style>
