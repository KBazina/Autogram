<template>
  <div class="card position-relative my-4">
    <div class="card-header">
      <div class="okvir2">
        <img
          :src="info.profileImage"
          class="rounded-circle sredina"
          alt="..."
        />

        <span class="curive ms-2">{{ info.username }}</span>
        <span v-if="info.postOwner===store.userMail" class="desno">
          <button type="button" @click="deletePosts()" class="btn-close" aria-label="Close"></button>
        </span>
        <span class="desno time me-2"> {{ postedFromNow }}</span>
      </div>
    </div>
    <div v-if="info.images.length > 0" class="image-wrapper carousel-inner">
      <button
        v-if="info.images.length > 1"
        @click="counterUP"
        class="carousel-control-prev"
        type="button"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <img :src="info.images[counter]" class="card-img-top" alt="..." />
      <button
        v-if="info.images.length > 1"
        @click="counterDown"
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>

    <div class="card-body">
      <p class="card-text" v-html="info.postText"></p>
      <p v-if="info.hashtags != ''" class="mb-1 hashtags">
        <span v-for="(tag, index) in info.hashtags" :key="index">
          #{{ tag }}</span
        >
      </p>
      <hr class="mt-0" />
      <Icon
        v-if="!likeBool"
        @click="likesPost()"
        icon="mdi:cards-heart-outline"
        width="30"
        class="pointer"
      />
      <Icon
        v-if="likeBool"
        @click="dislikesPost()"
        icon="mdi:cards-heart"
        width="30"
        class="pointer"
      />
      <span @click="showLikes()" class="pointer ms-2">
        {{ likes }} <span v-if="info.likes == 1">Like</span>
        <span v-if="info.likes != 1"> Likes </span>
      </span>
      <span @click="commentShower" class="desno me-2">
        <Icon icon="mdi:comment-outline" width="30" class="me-2" />
        Komentiraj</span
      >
      <div
        v-if="arrayLovers.length > 0 && showLikesBool"
        class="lovers mt-2 rounded-bottom rounded-top"
      >
        <ul class="p-1 mb-0">
          <li v-for="lover in arrayLovers" :key="lover.id" class="mt-1 ms-1">
            <div class="okvir2">
              <img
                :src="lover.image"
                class="rounded-circle sredina"
                alt="..."
              />

              <span class="curive ms-2">{{ lover.username }}</span>
              <span
                @click="posjetiProf(lover.username)"
                v-if="lover.id != myMailID"
                class="desno me-2"
                >Pogledaj profil</span
              >
              <hr class="m-0 m-auto" style="width: 85%" />
            </div>
          </li>
        </ul>
      </div>
      <hr v-if="showCommentBool" />
      <div class="limitedComments" v-if="showCommentBool">
        <div class="okvir2 mt-1">
          <img
            :src="info.ActiveUserImage"
            class="rounded-circle sredina me-5 ms-2"
            alt="..."
          />
          <input
            type="text"
            class="p-2 btnBG rounded-pill text-break"
            placeholder="Komentiraj.."
            @keyup.enter="submitComment"
            maxlength="150"
            v-model="comment"
          />
        </div>
        <div v-if="this.arrayComments.length > 0" class="mt-3"></div>
        <div class="okvir3 mt-1" v-for="comm in arrayComments" :key="comm">
          <img
            :src="comm.commentPicture"
            class="rounded-circle sredina ms-2"
            alt="..."
          />

          <div
            class="sirinaKomentara desno bg-dark bg-gradient p-2 text-light-emphasis rounded"
          >
            <span class="curive text-warning-emphasis">
              {{ comm.commentName }}
            </span>
            <br />
            {{ comm.commentText }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import store from "@/store";
import {
  db,
  getDoc,
  getDocs,
  ref,
  doc,
  deleteDoc ,
  updateDoc,
  setDoc,
  collection,
} from "@/firebase";
import { Icon } from "@iconify/vue";
export default {
  data() {
    return {
      arrayComments: [],
      store,
      comment: "",
      showCommentBool: false,
      arrayLovers: [],
      likeBool: false,
      myMailID: "ID" + store.userMail,
      showLikesBool: false,
      counter: 0,
      likes: 0,
    };
  },
  props: ["info"],
  name: "PostCard",
  computed: {
    postedFromNow() {
      return moment(this.info.time).fromNow();
    },
  },
  mounted() {
    this.ckeckIFlikes();
    this.postLovers();
    this.getComments();
  },
  methods: {
    posjetiProf(username) {
      this.$router.push({
        name: "profil",
        params: { username: username },
      });
    },
    commentShower() {
      this.showCommentBool = !this.showCommentBool;
    },
    showLikes() {
      this.showLikesBool = !this.showLikesBool;
    },
    async getComments() {
      this.arrayComments = [];
      const querySnapshot = await getDocs(
        collection(
          db,
          "users",
          "ID" + this.info.postOwner,
          "posts",
          this.info.id,
          "comments"
        )
      );
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.arrayComments.push({
          commentText: data.commentText,
          commentPicture: data.commentPicture,
          commentName: data.commentName,
        });
      });
      this.arrayComments = this.arrayComments.reverse();
    },
    async deletePosts() {
      const confirmed = window.confirm("Jeste li sigurni da želite obrisati ovaj post?");
      if(confirmed) {
    try {
      const commentsCollectionRef = collection(
        db,
        "users",
        "ID" + this.info.postOwner,
        "posts",
        this.info.id,
        "comments"
      );
      const commentsSnapshot = await getDocs(commentsCollectionRef);
      const deletePromises = commentsSnapshot.docs.map((commentDoc) => {
        return deleteDoc(commentDoc.ref);
      });
      await Promise.all(deletePromises);
      const postRef = doc(
        db,
        "users",
        "ID" + this.info.postOwner,
        "posts",
        this.info.id
      );
      await deleteDoc(postRef).then(()=>{
        window.location.reload()
      })
    } catch (error) {
      console.error(error);
    }
  }
  },

    async ckeckIFlikes() {
      if (this.info.lovers.includes(store.userMail)) this.likeBool = true;
    },
    async postLovers() {
      for (const lover of this.info.lovers) {
        const docRef = doc(db, "users", "ID" + lover);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.arrayLovers.push({
            id: docSnap.id,
            image: docSnap.data().imageSrc,
            username: docSnap.data().username,
          });
        } else {
          console.log("lover:", lover);
          this.info.lovers = this.info.lovers.filter((mail) => mail !== lover);
        }
      }
      this.likes = this.arrayLovers.length;
    },  
    async submitComment() {
      if (!this.comment) {
        console.log("no text");
      } else {
        const postRef = doc(
          db,
          "users",
          "ID" + this.info.postOwner,
          "posts",
          this.info.id,
          "comments",
          "post" + this.info.postOwner + Date.now()
        );
        await setDoc(postRef, {
          commentText: this.comment,
          commentPicture: this.info.ActiveUserImage,
          commentName: this.store.activeUsername,
        });
        this.comment = "";
      }
      this.getComments();
    },
    async likesPost() {
      try {
        this.likeBool = true;
        this.info.lovers.push(store.userMail);
        const postRef = doc(
          db,
          "users",
          "ID" + this.info.postOwner,
          "posts",
          this.info.id
        );
        await updateDoc(postRef, {
          likes: this.likes + 1,
          lovers: this.info.lovers,
        });
        this.info.likes += 1;
        this.likes = this.info.likes;
        this.arrayLovers = [];
        this.postLovers();
      } catch (error) {
        console.error(error);
        this.likeBool = false;
        this.info.lovers = this.info.lovers.filter(
          (element) => element !== store.userMail
        );
      }
    },
    async dislikesPost() {
      try {
        this.info.lovers = this.info.lovers.filter(
          (element) => element !== store.userMail
        );
        this.likeBool = false;
        const postRef = doc(
          db,
          "users",
          "ID" + this.info.postOwner,
          "posts",
          this.info.id
        );
        await updateDoc(postRef, {
          likes: this.likes - 1,
          lovers: this.info.lovers,
        });
        this.info.likes -= 1;
        this.likes = this.info.likes;
        this.arrayLovers = [];
        this.postLovers();
      } catch (error) {
        console.error(error);
        this.likeBool = true;
        this.info.lovers.push(store.userMail);
      }
    },
    counterUP() {
      if (this.counter == this.info.images.length - 1) {
        this.counter = 0;
      } else this.counter += 1;
    },
    counterDown() {
      if (this.counter == 0) {
        this.counter = this.info.images.length - 1;
      } else this.counter -= 1;
    },
  },
  components: {
    Icon,
  },
};
</script>
<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
.btnBG::placeholder {
  color: aliceblue;
}
.btnBG {
  outline: none;
  border: none;
  box-shadow: none;
  width: 80%;
  background-color: rgb(72, 74, 76);
  color: white;
}
.lovers {
  background-color: #484a4c;
  height: auto;
  max-height: 150px;
  overflow-y: scroll !important;
  scrollbar-width: none;
}
.image-wrapper {
  background-color: #5e6266;
  width: 100%;
  height: auto;
  max-height: 500px;
  overflow: hidden;
  text-align: center;
}
.image-wrapper img {
  max-height: 500px;
  max-width: 550px;
  width: auto;
  object-fit: contain;
  background-color: #5e6266;
}
.time {
  cursor: default !important;
}
.limitedComments {
  max-height: 500px;
  overflow-y: auto;
}
.limitedComments::-webkit-scrollbar {
  display: none;
}

.limitedComments {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.desno {
  cursor: pointer;
  float: right;
}

.okvir2 {
  position: relative;
  width: 100%;
  height: 40px;
}
.okvir2 img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  background-color: beige;
}
.okvir3 {
  position: relative;
  display: inline-block;
  width: 100%;
}
.okvir3 img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  background-color: beige;
}
.sirinaKomentara {
  width: 85%;
  cursor: default;
}
.card {
  background-color: #242526 !important;
  width: 550px;
  margin: auto;
}
.curive {
  font-family: cursive;
}
.hashtags {
  color: #bc653c;
}
.card-text {
  font-weight: bold;
}
</style>
