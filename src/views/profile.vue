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
          :src="this.ProfileImageSrc"
          alt=""
          class="rounded-circle border-4 border border-light"
        />
      </div>
    </div>
  </div>

  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-3">
        <div class="vstack gap-2 ms-3 mt-2">
          <div class="p-2 fs-1">@{{ this.username }}</div>
          <hr />
          <div class="p-2 fs-5">
            {{ this.ime_prezime }}
            <div class="p-2 bio">* {{ this.bio }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <postCard v-for="card in this.cards" :key="card.posted_at" :info="card" />
</template>

<script>
import postCard from "@/components/postCard.vue";
import store from "@/store";
import {
  doc,
  collection,
  db,
  getStorage,
  ref,
  query,
  orderBy,
  where,
  getDocs,
  getAuth,
  onAuthStateChanged,
} from "@/firebase";
const auth = getAuth();

export default {
  name: "profile",
  data() {
    return {
      cards: [],
      ProfileImageSrc: "",
      bio: "",
      ime_prezime: "",
      username: "",
    };
  },

  methods: {
    async getPosts() {
      const q = query(
        collection(db, `users/ID${store.userMail}/posts`),
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
          images: data.images[0],
          profileImage: this.ProfileImageSrc,
          username: this.username,
        });
      });
      console.log("karte su ovo: ", this.cards);
    },

    async getProfileInfo() {
      const q = query(
        collection(db, "users"),
        where("email", "==", store.userMail)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
        this.ime_prezime = data.ime_prezime;
        this.ProfileImageSrc = data.imageSrc;
        this.bio = data.bio;
        this.username = data.username;
      });
    },
  },

  async created() {
    onAuthStateChanged(auth, (user) => {
      this.getProfileInfo();
      this.getPosts();
    });
  },
  components: {
    postCard,
  },
};
</script>

<style>
.bio {
  margin-top: 0;
  margin-left: 20px;
  font-size: 15px !important;
  font-family: cursive;
}
hr {
  border: 1px solid white;
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
  background-color: aliceblue;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

<script></script>
