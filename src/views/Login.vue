<template>
  <div class="pozadina"></div>
  <div class="joke">
    <span class="LifeIs">LIFE IS</span><br />TOO SHORT TO <br />
    DRIVE BORING <br />
    <span class="cars">CARS</span>
  </div>
  <div class="login_container">
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label"
        >Email address</label
      >
      <input
        v-model="email"
        type="email"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="name@example.com"
      />
    </div>
    <label for="inputPassword5" class="form-label mt-3">Password</label>
    <input
      placeholder="*******"
      v-model="password"
      type="password"
      id="inputPassword5"
      class="form-control mb-4"
      aria-describedby="passwordHelpBlock"
    />
    <button type="button" @click="login()" class="btn btn-outline-warning mb-3">
      Login
    </button>
    <div>
      Don't have an account?
      <a
        class="ms-3 link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
        href="/signup"
        >Register</a
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { signInWithEmailAndPassword, getAuth } from "@/firebase";
import store from "@/store"
const auth = getAuth();

export default {
  name: "login",
  data() {
    return {
      store,
      email: "",
      password: "",
    };
  },

  methods: {
    login() {
      store.userMail=this.email
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          window.alert("Invalid User");
          const errorCode = error.code;
          const errorMessage = error.message;
        });
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
  width: 350px;
  top: 200px;
  left: 15%;
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