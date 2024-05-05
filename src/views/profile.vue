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

  <div class="ProfileEditor">
    <div class="vstack gap-2 ms-3 mt-2">
      <div
        v-show="showHomepage"
        class="p-2 showHomePage"
        @click="onThePage(``)"
        :class="{ show: showHomepage }"
      >
        <Icon
          icon="material-symbols:garage-door-rounded"
          width="30"
          class="me-2"
        />
        Homepage
      </div>
      <div
        v-show="showGallery"
        class="p-2 showGallery"
        :class="{ show: showGallery }"
      >
        <Icon icon="emojione:framed-picture" width="30" class="me-2" />
        Gallery
      </div>
      <div
        class="p-2 showImage"
        v-show="showAddImage"
        :class="{ show: showAddImage }"
      >
        <Icon
          icon="material-symbols:add-a-photo-outline"
          width="30"
          class="me-2"
        />
        Add image
      </div>
      <div class="fixedProfileEditor">
        <div class="p-2 fs-1">@{{ this.username }}</div>
        <hr />
        <div class="p-2 fs-5">
          {{ this.ime_prezime }}
          <div class="p-2 bio">* {{ this.bio }}</div>
        </div>
        <div class="p-2" @click="onThePage(`home`)">
          <Icon icon="emojione:man-medium-skin-tone" width="30" class="me-2" />
          Edit profile
        </div>
        <div class="p-2">
          <Icon icon="ic:twotone-people-alt" width="30" class="me-2" />
          Friends
        </div>
        <div class="p-2">
          <Icon icon="emojione:racing-car" width="30" class="me-2" />
          Cars
        </div>
      </div>
    </div>
  </div>

  <div class="postContainer">
    <postCard v-for="card in this.cards" :key="card.posted_at" :info="card" />
  </div>
</template>

<script>
import postCard from "@/components/postCard.vue";
import store from "@/store";
import { Icon } from "@iconify/vue";
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
      showAddImage: false,
      showGallery: false,
      showHomepage: false,
    };
  },

  methods: {
    handleScroll() {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 60) {
        this.showAddImage = true;
      } else {
        this.showAddImage = false;
      }
      if (scrollPosition > 120) {
        this.showGallery = true;
      } else {
        this.showGallery = false;
      }
      if (scrollPosition > 180) {
        this.showHomepage = true;
      } else {
        this.showHomepage = false;
      }
    },
    onThePage(location) {
      this.$router.push(`/${location}`);
    },
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
          images: data.images,
          profileImage: data.ownerImage,
          username: data.ownerUsername,
          likes: data.likes,
          lovers: data.lovers,
          id: doc.id,
          postOwner: data.postOwner,
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
    window.addEventListener("scroll", this.handleScroll);
    onAuthStateChanged(auth, (user) => {
      this.getProfileInfo();
      this.getPosts();
    });
  },
  async destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  components: {
    postCard,
    Icon,
  },
};
</script>

<style scoped>
.postContainer{
  margin-top: 150px;
}
.showImage {
  width: 20vw;
  position: fixed;
  top: 27vh;
}
.showGallery {
  width: 20vw;
  position: fixed;
  top: 20vh;
}
.showHomePage {
  width: 20vw;
  position: fixed;
  top: 13vh;
}
.showImage,
.showGallery,
.showHomePage {
  opacity: 0;
  transition: opacity 0.5s, transform 0.5s;
  transform: translateX(-100%);
}
.showImage.show,
.showGallery.show,
.showHomePage.show {
  opacity: 1;
  transform: translateX(0%);
}
.showImage.show {
  animation: slideInImage 0.5s forwards;
}

.showGallery.show {
  animation: slideInGallery 0.5s forwards;
}

.showHomePage.show {
  animation: slideInHomepage 0.5s forwards;
}

@keyframes slideInImage {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
}

@keyframes slideInGallery {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
}

@keyframes slideInHomepage {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
}
.vstack div {
  overflow: hidden;
}
.showImage:hover,
.showGallery:hover,
.showHomePage:hover {
  cursor: pointer;
  background-color: #2a2b2c;
}
.fixedProfileEditor {
  width: 25vw;
  position: fixed;
  top: 35vh;
}
.ProfileEditor {
  width: 25vw;
  position: fixed;
  top: 13vh;
}
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
