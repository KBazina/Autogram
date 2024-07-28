<template>
  <div>
  <div class="pozadina"></div>
  <div class="joke">
    <span class="LifeIs">LIFE IS</span><br />TOO SHORT TO <br />
    DRIVE BORING <br />
    <span class="cars">CARS</span>
  </div>
  <div class="login_container">
    <div class="input-group my-3">
      <span class="input-group-text">Ime i prezime</span>
      <input
        type="text"
        v-model="ime_prezime"
        name="ime_prezime"
        aria-label="First name"
        class="form-control"
        @input="InputUpdate('ime_prezime')"
      />
    </div>
    <div class="text-danger" v-if="showImePrezimeDiv">
      Morate upisati Ime i prezime te mora sadrzavati manje od 40 znakova
    </div>
    <div class="my-3">
      <label for="exampleFormControlInput1" class="form-label"
        >Email address</label
      >
      <input
        name="email"
        required
        v-model="email"
        type="email"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="name@example.com"
        @input="InputUpdate('email')"
      />
    </div>
    <div class="text-danger" v-if="showEmailDiv">Unesite valjan Email</div>
    <label for="inputPassword5" class="form-label">Password</label>
    <input
      required
      name="password"
      v-model="password"
      type="password"
      id="inputPassword5"
      class="form-control"
      aria-describedby="passwordHelpBlock"
      placeholder="********"
      @input="InputUpdate('password')"
    />
    <div class="text-danger" v-if="showPasswordDiv">
      Lozinka mora sadržavati između 8 i 20 znakova.
    </div>
    <div class="form-group my-3">
      <label for="exampleInputPassword2">Repeat Password</label>
      <input
        type="password"
        name="passwordRepeat"
        v-model="passwordRepeat"
        class="form-control"
        id="exampleInputPassword2"
        placeholder="********"
        @input="InputUpdate('passwordRepeat')"
      />
    </div>
    <div class="text-danger" v-if="showPasswordRepeatDiv">
      Lozinke se ne podudaraju
    </div>

    <button
      :disabled="btnClicked"
      type="submit"
      @click="signup"
      class="btn btn-outline-warning my-3"
    >
      Sign up
    </button>
    <div>
      Already have an account?
      <a
        class="ms-3 link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
        href="/login"
        >Login</a
      >
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import store from "@/store";
import { getAuth, createUserWithEmailAndPassword } from "@/firebase";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
} from "@vuelidate/validators";
import { collection, addDoc, db,setDoc, doc } from "@/firebase";

const moreWords = (value) => value.trim().split(" ").length >= 2;
const auth = getAuth();
export default {
  name: "singup",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      store,
      btnClicked: false,
      ime_prezime: "",
      email: "",
      password: "",
      passwordRepeat: "",
      showImePrezimeDiv: false,
      showEmailDiv: false,
      showPasswordDiv: false,
      showPasswordRepeatDiv: false,
    };
  },
  validations() {
    return {
      ime_prezime: {
        moreWords,
        required,
        minLength: minLength(2),
        maxLength: maxLength(40),
      },
      email: { required, email },
      password: { required, minLength: minLength(8), maxLength: maxLength(20) },
      passwordRepeat: { required, sameAsPassword: sameAs(this.password) },
    };
  },

  methods: {
    async InputUpdate(inputName) {
      if (inputName === "ime_prezime") {
        this.showImePrezimeDiv = this.v$.ime_prezime.$error;
      } else if (inputName === "email") {
        this.showEmailDiv = this.v$.email.$error;
      } else if (inputName === "password") {
        this.showPasswordDiv = this.v$.password.$error;
      } else if (inputName === "passwordRepeat") {
        this.showPasswordRepeatDiv = this.v$.passwordRepeat.$error;
      }
    },
    async signup(e) {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        this.showImePrezimeDiv = this.v$.ime_prezime.$error;
        this.showEmailDiv = this.v$.email.$error;
        this.showPasswordDiv = this.v$.password.$error;
        this.showPasswordRepeatDiv = this.v$.passwordRepeat.$error;
      } else {
        this.btnClicked = true;
        store.ime_prezime_default = this.ime_prezime;
        store.userActiveState = true;
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(function () {
            const usersRef = doc(db, "users","ID"+ store.userMail);
            setDoc(usersRef, {
              email: store.userMail,
              done:false,
            });
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    },
  },
};
</script>
<style scoped>
.cars {
  font-size: 7vw;
  margin-right: 20px;
}

.LifeIs {
  font-size: 3vw;
  margin-right: 30px;
}

.joke {
  font-family: Georgia, "Times New Roman", Times, serif;
  color: rgb(200, 200, 200);
  font-size: 3.5vw;
  float: right;
  text-align: right;
  margin-right: 50px;
  font-weight: bold;
}

.login_container {
  position: absolute;
  width: 400px;
  top: 150px;
  left: 10%;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.288);
  color: white;
  padding: 20px;
  border-radius: 10px;
}

.pozadina {
  position: fixed;
  top: 0;
  left: 0;
  background-image: url(@/assets/background.jpg);
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  z-index: -1000;
}
</style>
