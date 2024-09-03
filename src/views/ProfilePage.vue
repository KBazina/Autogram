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
    <div class="p-3 ms-5 mt-3">
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
    <div class="row container-fluid mt-5">
      <div class="col-4">PRVA KOLOKNA</div>
      <div class="col-6">
        <postCard v-for="card in cards" :key="card.posted_at" :info="card" />
      </div>
      <div class="col-2">
        <div ref="probni" class="carFlower overflow-y-scroll">
          <div class="text-center my-3">Friends:</div>
          <div
            class="p-2"
            v-for="friend in friends"
            :key="friend"
            :friend="friend"
          >
            {{ friend.username }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon } from "@iconify/vue";
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
      followers: [],
      friends: [],
      follow: false,
      user: 0,
      UserInfo: null,
      cards: [],
      myProfile: null,
    };
  },
  methods: {
    handleScroll() {
      const probniDiv = this.$refs.probni;
      const scrollPosition = window.scrollY;
      if (scrollPosition > 310) {
        probniDiv.classList.add("fixed");
      } else {
        probniDiv.classList.remove("fixed");
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
        this.followers = data.followers;
        this.follow = data.followers.includes(this.UserInfo.email);
      });
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
        console.log("AAAAAAAAAAAAAAAAAAAAAAA::::", data.followers);
        for (const friend of data.followers) {
          try {
            const q = query(
              collection(db, "users"),
              where("email", "==", friend)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              this.friends.push(doc.data())
            });
          } catch (error) {
            console.error(error);
          }
        }
      }
      console.log("prijateljis u ovo:", this.friends);
    },
  },
  async created() {
    window.addEventListener("scroll", this.handleScroll);
    this.user = this.$route.params.username;
    await this.getProfileInfo();
    onAuthStateChanged(auth, (user) => {
      this.getMyProfilePic();
    });
    this.getPosts();
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
<style lang="scss" scoped>
.profile_bg_img {
  height: 200px;
  overflow: hidden;
}
.fixed {
  position: fixed;
  top: 80px;
  width: 15vw;
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
.pola {
  width: 60vw;
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
