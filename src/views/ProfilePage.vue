<template>
  <div>
    <div
      class="profile_bg container-fluid p-0 border-bottom border-4 border-secondary"
    >
      <div class="profile_bg_img">
        <img src="@/assets/profile_background.jpg" alt="" />
      </div>
      <div class="pola position-relative">
        <div class="okvir position-absolute top-100 start-50 translate-middle">
          <img
            v-if="this.UserInfo"
            :src="this.UserInfo.imageSrc"
            alt=""
            class="rounded-circle border-4 border border-light"
          />
        </div>
      </div>
    </div>
    <div v-if="UserInfo" class="p-3 ms-5 mt-3 d-flex align-items-center">
      <span class="fs-1">
        {{ UserInfo.username }}
      </span>

      <div class="ms-auto me-5">
        <button @click="followBtnFun()" class="p-2">
          <span v-if="!follow">
            Zaprati korisnika
            <Icon icon="mdi:account-plus" width="30" class="mx-2" />
          </span>
          <span v-if="follow">
            Prestani pratiti
            <Icon icon="mdi:account-remove" width="30" class="mx-2" />
          </span>
        </button>
      </div>
    </div>
    <div class="row container-fluid">
      <div class="col-4">
        <div v-if="UserInfo" class="p-3 ms-5 fst-italic">
          *{{ UserInfo.bio }}
        </div>
        <div
          v-if="myCars.length > 0"
          ref="probni2"
          class="carFlower overflow-y-scroll mt-3 border-end"
        >
          <carProfCard v-for="car in myCars" :key="car" :carNew="car">
          </carProfCard>
        </div>
      </div>
      <div class="col-5">
        <postCard v-for="card in cards" :key="card.posted_at" :info="card" />
      </div>
      <div class="col-3">
        <div ref="probni" class="carFlower overflow-y-scroll">
          <div class="text-center my-3">Friends:</div>
          <div
            class="p-2 border border-light row"
            v-for="follower in FFfollowers"
            :key="follower"
          >
            <div class="mt-2 col">
              <div class="fs-3">
                {{ follower.username }}
              </div>
              <hr />
              <div class="fst-italic">_{{ follower.ime_prezime }}_</div>
              <br />
              <div
                v-if="myEmail != follower.email"
                @click="posjetiProf(follower.username)"
                class="text-primary text-decoration-underline pointer"
              >
                Pogledaj ovog korisnika
              </div>
            </div>
            <div class="col okvir2">
              <img :src="follower.imageSrc" alt="" class="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon } from "@iconify/vue";
import carProfCard from "@/components/carProfCard.vue";
import store from "@/store";
import postCard from "@/components/postCard.vue";
import {
  query,
  getDocs,
  collection,
  updateDoc,
  doc,
  db,
  getDoc,
  where,
  orderBy,
  onAuthStateChanged,
  getAuth,
} from "@/firebase";
const auth = getAuth();
export default {
  props: {
    id: String,
  },
  data() {
    return {
      FFfollowers: [],
      followers: [],
      friends: [],
      myCars: [],
      follow: false,
      user: 0,
      UserInfo: null,
      cards: [],
      myProfile: null,
      myEmail: null,
    };
  },
  methods: {
    async posjetiProf(username) {
      this.$router
        .replace({
          name: "profil",
          params: { username: username },
        })
        .then(() => {
          window.location.reload();
        });
    },
    async getCars() {
      const q = query(collection(db, `users/ID${this.UserInfo.email}/cars`));
      const querySnapshot = await getDocs(q);
      this.myCars = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.myCars.push({
          Marka: data.Marka,
          Model: data.Model,
          carYear: data.carYear,
          Motorizacija: data.Motorizacija,
          Pogon: data.Pogon,
          Registracija: data.Registracija,
          Snaga: data.Snaga,
          Transmition: data.Transmition,
          Weight: data.Weight,
          registeredCar: data.registeredCar,
          carPic: data.carPic,
          carOwner: data.carOwner,
        });
      });
    },
    handleScroll() {
      const probniDiv = this.$refs.probni;
      const probniDiv2 = this.$refs.probni2;
      const scrollPosition = window.scrollY;
      if (probniDiv) {
        if (scrollPosition > 320) {
          probniDiv.classList.add("fixed");
        } else {
          probniDiv.classList.remove("fixed");
        }
      }
      if (probniDiv2) {
        if (scrollPosition > 360) {
          probniDiv2.classList.add("fixed2");
        } else {
          probniDiv2.classList.remove("fixed2");
        }
      }
    },
    async followBtnFun() {
      if (this.follow) {
        this.followers = this.followers.filter(
          (element) => element !== store.userMail
        );
        this.friends = this.friends.filter(
          (element) => element !== this.UserInfo.email
        );
      } else {
        this.followers.push(store.userMail);
        this.friends.push(this.UserInfo.email);
      }
      console.log(this.followers);
      this.follow = !this.follow;
      const userRef = doc(db, "users", "ID" + this.UserInfo.email);
      await updateDoc(userRef, {
        followers: this.followers,
      });
      const userRef2 = doc(db, "users", "ID" + store.userMail);
      await updateDoc(userRef2, {
        friends: this.friends,
      });
      this.FollowersWatcher();
    },
    async getPosts() {
      const q = query(
        collection(db, "users/ID" + this.UserInfo.email + "/posts"),
        orderBy("posted_at", "desc")
      );
      const querySnapshot = await getDocs(q);
      this.cards = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.cards.push({
          hashtags: data.hashtags,
          time: data.posted_at,
          postText: data.postText,
          images: data.images,
          profileImage: data.ownerImage,
          username: data.ownerUsername,
          likes: data.likes,
          lovers: data.lovers,
          id: doc.id,
          postOwner: data.postOwner,
          ActiveUserImage: this.myProfile,
        });
      });
      console.log("karte su ovo: ", this.cards);
    },
    async getMyProfilePic() {
      const q = query(
        collection(db, "users"),
        where("email", "==", store.userMail)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.myProfile = data.imageSrc;
        this.myEmail = data.email;
        this.friends = data.friends;
        this.follow = data.friends.includes(this.UserInfo.email);
      });
      await this.getPosts();
    },
    async FollowersWatcher() {
      this.FFfollowers = [];
      for (const follower of this.followers) {
        try {
          const q = query(
            collection(db, "users"),
            where("email", "==", follower)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            this.FFfollowers.push(doc.data());
          });
        } catch (error) {
          console.error(error);
        }
      }
    },
    async getProfileInfo() {
      const q = query(
        collection(db, "users"),
        where("username", "==", this.user)
      );
      const querySnapshot = await getDocs(q);
      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        this.UserInfo = data;
        this.followers = data.followers;
      }
    },
  },
  async created() {
    window.addEventListener("scroll", this.handleScroll);
    this.user = this.$route.params.username;
    await this.getProfileInfo();
    onAuthStateChanged(auth, (user) => {
      this.getMyProfilePic();
    });
    this.getCars();
    this.FollowersWatcher();
  },
  async destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  components: {
    postCard,
    carProfCard,
    Icon,
  },
};
</script>
<style lang="scss" scoped>
.profile_bg_img {
  height: 200px;
  overflow: hidden;
}
.fixed2 {
  position: fixed;
  top: 100px;
  width: 30vw;
}
.fixed {
  position: fixed;
  top: 80px;
  width: 23vw;
}
.profile_bg_img img {
  opacity: 0.9;
  width: 100%;
  height: auto;
  object-fit: cover;
}
.pointer {
  cursor: pointer;
}
.okvir {
  position: relative;
  width: 250px;
  height: 250px;
}
.okvir2 {
  float: right;
  position: relative;
  width: 150px;
  height: 150px;
}
.pola {
  width: 60vw;
}
.okvir2 img {
  background-color: aliceblue;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.okvir img {
  background-color: aliceblue;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.carFlower {
  height: 90vh;
  scrollbar-width: none;
}
</style>
