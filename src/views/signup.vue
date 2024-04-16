<template>
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
      />
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
      />
    </div>
    <label for="inputPassword5" class="form-label">Password</label>
    <input
      required
      name="password"
      v-model="password"
      type="password"
      id="inputPassword5"
      class="form-control"
      aria-describedby="passwordHelpBlock"
      placeholder="*******"
    />
    <div id="passwordHelpBlock" class="form-text">
      Must be 8-20 characters long.
    </div>
    <div class="form-group my-3">
      <label for="exampleInputPassword2">Repeat Password</label>
      <input
        type="password"
        name="passwordRepeat"
        v-model="passwordRepeat"
        class="form-control"
        id="exampleInputPassword2"
        placeholder="*******"
      />
    </div>

    <div class="text-danger" v-for="error of v$.$errors" :key="error.$uid">
      {{ error.$message }}
    </div>

    <button :disabled="btnClicked" type="submit" @click="signup" class="btn btn-outline-warning my-3">
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
</template>

<script>
// @ is an alias to /src
import { getAuth, createUserWithEmailAndPassword } from "@/firebase";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
} from "@vuelidate/validators";

const moreWords =(value)=>value.trim().split(" ").length>=2
const auth = getAuth();
export default {
  name: "singup",
  setup() {
    return { v$: useVuelidate() };
  },
  data() { 
    return {
      btnClicked:false,
      ime_prezime: "",
      email: "",
      password: "",
      passwordRepeat: "",
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
    async signup(e) {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        console.log("nesto je krivo")
      }
      else {
        this.btnClicked=true
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(function () {
            console.log("suces");
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
