<template>
  <div>
    <div class="container-fluid mt-4">
      <div class="row">
        <div class="d-none d-md-block col-3 border-end">
          <div class="position-fixed top-20 start-200">
            <div class="vstack gap-2 my-1">
              <div class="p-2" @click="onThePage(`profile`)">
                <Icon
                  icon="emojione:man-medium-skin-tone"
                  width="30"
                  class="me-2"
                />
                My Profile
              </div>
              <div
                class="p-2"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop3"
              >
                <Icon icon="ic:twotone-people-alt" width="30" class="me-2" />
                Friends
              </div>
              <div class="p-2">
                <Icon icon="emojione:racing-car" width="30" class="me-2" />
                Cars
              </div>
              <div class="p-2" @click="openTrophiesModal">
                <Icon icon="emojione:trophy" width="30" class="me-2" />
                Trophies
              </div>
              <div class="p-2" @click="goToCup()">
                <Icon
                  icon="emojione:flag-for-chequered-flag"
                  width="30"
                  class="me-2"
                />
                Races
              </div>
              <div class="p-2">
                <Icon icon="ic:twotone-sell" width="30" class="me-2" />
                Shop
              </div>
              <div class="p-2" @click="openRaces()">
                <Icon icon="emojione:spiral-calendar" width="30" class="me-2" />
                Events
              </div>
            </div>
            <hr class="crta1 mt-4 mb-1" />
            <div class="category p-2">
              <Icon icon="emojione:alarm-clock" width="30" class="me-2" />
              Vremenske kategorije
            </div>
            <div class="category p-2">
              <Icon icon="noto:tractor" width="30" class="me-2" />
              Dizel
            </div>
            <div class="category p-2">
              <Icon
                icon="mingcute:four-wheel-drive-line"
                width="30"
                class="me-2"
              />
              AWD
            </div>
            <div class="category p-2">
              <Icon icon="mdi:car-traction-control" width="30" class="me-2" />
              RWD
            </div>
            <div class="category p-2">
              <Icon
                icon="material-symbols:energy-savings-leaf-outline"
                width="30"
                class="me-2"
              />
              FWD
            </div>
          </div>
        </div>
        <div class="srednji col-sm-12 col-md-9 col-lg-6 col-12">
          <!-- --------------- -->
          <div
            class="modal fade"
            id="trophiesModal"
            tabindex="-1"
            aria-labelledby="trophiesModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="trophiesModalLabel">
                    Automobili s trofejima
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <ul v-if="carsWithTrophies.length">
                    <li v-for="car in carsWithTrophies" :key="car.id">
                      <span class="fs-4 fst-italic text-decoration-underline">
                         {{ car.carOwnerUsername }}-{{ car.Marka }}
                      {{ car.Model }}
                      </span>
                      <div v-for="trofej in car.trofeji" :key="trofej">
                        {{ trofej }}  <Icon icon="emojione:trophy" width="30" class="me-2" />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="container PostBG pt-3 pb-1 rounded-4">
            <div class="okvir2">
              <img
                :src="ProfileImageSrc"
                class="rounded-circle sredina me-5 ms-2"
                alt="..."
              />
              <button
                class="btn btn-secondary btnBG rounded-pill w-75 text-start"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop2"
              >
                Podijeli svoju autopriču..
              </button>
            </div>
            <hr class="mb-1" />
            <div
              class="btn btn-dark PostBG"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop2"
              @click="$refs.fileInputer.click()"
            >
              <Icon icon="mdi:tooltip-image" width="30" class="me-2" /> Dodaj
              fotografiju
            </div>
          </div>
          <!-- ---------------- -->
          <!-- Modal -->
          <div class="racesModal" v-if="openRacesBool">
            <button
              type="button"
              @click="this.openRacesBool = !this.openRacesBool"
              class="btn-close"
              aria-label="Close"
            ></button>
            <div
              class="border bg-secondary p-2 mt-5"
              v-for="utrka in UtrkeAdmin"
              :key="utrka.id"
            >
              {{ utrka.raceName }}
              <hr />
              {{ utrka.raceDesc }}
              <hr />
              <div class="mt-3">
                <div
                  v-for="car in myCars.filter(
                    (car) =>
                      !utrka.zahtjevAuti.includes(car.id) &&
                      !utrka.auti.includes(car.id)
                  )"
                  :key="car.id"
                >
                  {{ car.Marka }} {{ car.Model }} {{ car.Registracija }}
                  <button @click="carRequest(car.id, utrka.id)">
                    Posalji zahtjev
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="modal fade"
            id="staticBackdrop2"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header p-3">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">
                    Nova objava
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body p-0">
                  <p
                    ref="paragraph"
                    class="m-0 p-1"
                    contenteditable="true"
                    @input="handleInput"
                  ></p>
                  <!-- ------- -->
                  <div class="image_wrapper p-0">
                    <ul class="imageList p-0 mb-0">
                      <li
                        class="liIMG mt-2"
                        v-for="(image, index) in images"
                        :key="index"
                      >
                        <img :src="image" alt="Slika" />
                        <button
                          class="btn-close btnDelete"
                          @click="deleteImage(index)"
                        ></button>
                      </li>
                    </ul>
                  </div>
                  <!-- ------ -->
                </div>
                <hr class="my-0" />
                <textarea
                  v-model="hashtags"
                  class="visina2"
                  ref="textarea"
                  placeholder="#BaciHEŠTEG"
                  id="floatingTextarea"
                  @input="handleTextArea"
                  @keydown.space.prevent
                  spellcheck="false"
                ></textarea>
                <div class="modal-footer p-1">
                  <div class="btn btn-dark PostBG me-2 p-0">
                    <label for="fileInput" class="input-label p-1">
                      <Icon icon="mdi:tooltip-image" width="30" class="me-2" />
                      Dodaj fotografiju
                    </label>
                    <input
                      :disabled="btnClicked"
                      type="file"
                      ref="fileInputer"
                      id="fileInput"
                      @change="onFileChange($event)"
                      style="display: none"
                    />
                  </div>
                  <button
                    :disabled="btnClicked"
                    type="button"
                    data-bs-dismiss="modal"
                    @click="addPost"
                    class="btn btn-light mx-2"
                  >
                    Objavi
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!--  -->
          <div v-if="showSkeleton" class="skeletonOKVIR mt-4">
            <img
              src="@/assets/blog-loading-animation-skeletons.gif"
              class=""
              alt=""
            />
          </div>
          <!--  -->
          <postCard
            v-for="card in filteredPosts"
            :key="card.posted_at"
            :info="card"
          />
        </div>
        <div class="visina d-none d-lg-block col-3 overflow-y-scroll">
          <div v-if="ApiIstekao">
            DANAS JE SVE SKUPO TAKO DA SU I OVI RASPALI APIJI SKUPI, AKO VIDITE
            OVU PORUKU ZNACI DA SAM DOSEGAO MAKSIMALNI BROJ API ZAHTJEVA U DANU
            I ZAO MI JE ALI NEDAM 30€ MJESECNO SAMO ZBOG SKOLSKOG PROJEKTA,
            UZIVAJTE U OSTATKU APLIKACIJE
          </div>
          <newsCard v-for="article in news" :key="article" :infoNew="article">
          </newsCard>
        </div>
      </div>
    </div>
    <div class="overlayPost" v-if="btnClicked"></div>
    <div
      class="modal fade"
      id="staticBackdrop3"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Friends</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body row">
            <div class="targetPrijatelji overflow-y-scroll col border-end">
              <div class="text-center">Prijatelji</div>
              <hr />
              <div
                data-bs-dismiss="modal"
                @click="posjetiProf(friend.username)"
                class="pointer friend mt-2"
                v-for="friend in friends"
                :key="friend.email"
              >
                <img class="me-2" :src="friend.imageSrc" alt="" />
                {{ friend.username }}
              </div>
            </div>
            <div class="targetPrijatelji col overflow-y-scroll">
              <div class="text-center">Svi korisnici</div>
              <hr />
              <div
                @click="posjetiProf(man.username)"
                data-bs-dismiss="modal"
                class="pointer friend mt-2"
                v-for="man in filteredPeople"
                :key="man"
              >
                <img class="me-2" :src="man.imageSrc" alt="" />
                {{ man.username }}
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="" role="search">
              <input
                v-model="TargetFriend"
                class="form-control me-2"
                type="text"
                @keydown.space.prevent
                placeholder="Pronadi prijatelja"
                aria-label="Search"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import postCard from "@/components/postCard.vue";
import store from "@/store";
import newsCard from "@/components/newsCard.vue";
import { Icon } from "@iconify/vue";
import {
  getAuth,
  onAuthStateChanged,
  doc,
  where,
  setDoc,
  arrayUnion,
  updateDoc,
  collection,
  ref,
  getStorage,
  uploadBytes,
  getDownloadURL,
  db,
  collectionGroup,
  query,
  getDocs,
} from "@/firebase";
const storage = getStorage();
const auth = getAuth();
export default {
  data() {
    return {
      myCars: [],
      openRacesBool: false,
      people: [],
      TargetFriend: "",
      API_URL: "",
      carsWithTrophies: [],
      showSkeleton: false,
      cards: [],
      ApiIstekao: false,
      ProfileImageSrc: "",
      friends: [],
      btnClicked: false,
      newFireURL_Images: [],
      UtrkeAdmin: [],
      isFriendPosts: false,
      images: [],
      fileImages: [],
      currentIndex: 0,
      postText: "",
      store,
      imageFile: null,
      imageSrc: "",
      hashtags: "",
      user: null,
      news: [],
    };
  },
  created() {},
  async mounted() {
    onAuthStateChanged(auth, (user) => {
      this.getProfileInfo().then(() => {
        this.friendWatcher();
        this.getPeople();
      });
      this.getNews();
      this.getPosts();
      this.getMyCars();
    });
  },
  methods: {
    openTrophiesModal() {
      this.getCarsWithTrophies();
      const modal = new bootstrap.Modal(
        document.getElementById("trophiesModal")
      );
      modal.show();
    },
    async getCarsWithTrophies() {
      const carsRef = collectionGroup(db, "cars");
      const querySnapshot = await getDocs(carsRef);

      this.carsWithTrophies = [];

      querySnapshot.forEach((doc) => {
        const car = doc.data();

        if (car.trofeji && car.trofeji.length > 0) {
          car.id = doc.id;
          this.carsWithTrophies.push(car);
        }
      });
    },
    async getPeople() {
      const q = query(
        collection(db, "users"),
        where("email", "!=", store.userMail)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        this.people.push(doc.data());
      });
      console.log(this.people, "LJUDII::");
    },
    goToCup(){
      this.$router.push({
        name: "cup",
      });
    },
    posjetiProf(username) {
      this.$router.push({
        name: "profil",
        params: { username: username },
      });
    },
    onThePage(location) {
      this.$router.push(`/${location}`);
    },
    deleteImage(index) {
      this.images.splice(index, 1);
      this.fileImages.splice(index, 1);
    },
    handleInput(event) {
      if (event.shiftKey && event.key === "Enter") {
        event.preventDefault();
        this.$refs.paragraph.insertAdjacentHTML("beforeend", "<br>");
      }
      this.postText = this.$refs.paragraph.innerHTML;
    },
    handleTextArea() {
      if (this.$refs.textarea.value.length > 60) {
        this.$refs.textarea.value = this.$refs.textarea.value.substring(0, 60);
      }
    },
    async carRequest(autoID, utrkaID) {
      try {
        const raceRef = doc(db, "races", utrkaID);
        await updateDoc(raceRef, {
          zahtjevAuti: arrayUnion(autoID),
        });
        this.getRaces();
      } catch (error) {
        console.error(error);
      }
    },
    async addPost() {
      if (this.postText == "" && this.images.length == 0) {
        alert("Nisi dodao nikakav sadržaj postu!");
        return;
      }
      this.btnClicked = true;
      const fileImages = this.fileImages;
      this.showSkeleton = true;
      try {
        for (let index = 0; index < fileImages.length; index++) {
          const file = fileImages[index];
          const storageRef = ref(
            storage,
            "postsPictures/" + Date.now() + file.name + index
          );
          const snapshot = await uploadBytes(storageRef, file);
          const url = await getDownloadURL(ref(storageRef));
          this.newFireURL_Images.unshift(url);
          this.imageSrc = url;
        }

        const postRef = doc(
          db,
          "users",
          "ID" + store.userMail,
          "posts",
          "post" + Date.now()
        );
        await setDoc(postRef, {
          images: this.newFireURL_Images,
          hashtags: this.hashtags
            .split("#")
            .filter((element) => element !== ""),
          postText: this.postText,
          posted_at: Date.now(),
          ownerImage: this.ProfileImageSrc,
          ownerUsername: this.username,
          likes: 0,
          lovers: [],
          postOwner: this.store.userMail,
        });

        this.newFireURL_Images = [];
        this.$refs.paragraph.innerHTML = "";
        this.$refs.textarea.value = "";
        this.hashtags = this.$refs.textarea.value;
        this.postText = this.$refs.paragraph.innerHTML;
        this.images = [];
        this.btnClicked = false;
        this.fileImages = [];
        this.imageSrc = "";
        this.imageFile = null;
        window.location.reload();
        this.showSkeleton = false;
      } catch (error) {
        console.error("Error uploading images: ", error);
        this.btnClicked = false;
      }
    },
    async getMyCars() {
      const q = query(collection(db, `users/ID${store.userMail}/cars`));
      const querySnapshot = await getDocs(q);
      this.myCars = [];
      querySnapshot.forEach((doc) => {
        const car = doc.data();
        car.id=doc.id
        this.myCars.push(car);
      });
    },
    async openRaces() {
      this.openRacesBool = !this.openRacesBool;
      this.getRaces();
    },
    async getRaces() {
      const q = query(collection(db, `races`));
      const querySnapshot = await getDocs(q);
      this.UtrkeAdmin = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.UtrkeAdmin.push({
          raceName: data.raceName,
          raceDesc: data.raceDesc,
          auti: data.auti,
          zahtjevAuti: data.zahtjevAuti,
          id: doc.id,
        });
      });
    },
    async friendWatcher() {
      this.friends = [];
      if (this.user.friends) {
        for (const friend of this.user.friends) {
          try {
            const q = query(
              collection(db, "users"),
              where("email", "==", friend)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              this.friends.push(doc.data());
            });
          } catch (error) {
            console.error(error);
          }
        }
      }
    },
    changePosts() {
      console.log("Promenjen prikaz postova");
      // Ovdje dodaj logiku za prikazivanje postova prijatelja
    },
    async getPosts() {
      const q = query(collectionGroup(db, `posts`));
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
          ActiveUserImage: this.ProfileImageSrc,
        });
      });
      this.cards = this.cards.sort((a, b) => b.time - a.time);
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageSrc = URL.createObjectURL(file);
        this.images.unshift(this.imageSrc);
        this.fileImages.unshift(file);
        this.imageFile = file;
      }
      this.$refs.fileInputer.value = "";
    },

    async getProfileInfo() {
      const q = query(
        collection(db, "users"),
        where("email", "==", store.userMail)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.ProfileImageSrc = data.imageSrc;
        this.username = data.username;
        this.user = data;
      });
    },
    async getNews() {
      try {
        let res = await axios.get(
          `https://gnews.io/api/v4/search?q=cars&lang=en&country=us&max=10&apikey=${process.env.VUE_APP_PATH_START}`
        );

        this.news = res.data.articles;
        console.log(res.data);
      } catch (error) {
        console.error(error);
        this.ApiIstekao = true;
      }
    },
  },
  computed: {
    filteredPeople() {
      if (!this.TargetFriend || this.TargetFriend.trim() === "") {
        return this.people;
      } else {
        return this.people.filter((person) =>
          person.username
            .toLowerCase()
            .includes(this.TargetFriend.toLowerCase())
        );
      }
    },
    FilteredNews() {
      return this.news;
    },
    filteredPosts() {
      this.getPosts();
      if (this.store.isFriendPosts && this.user) {
        this.cards = this.cards.filter((post) =>
          this.user.friends.includes(post.postOwner)
        );
      }
      let searchTags = this.store.searchTags
        .trim()
        .toLowerCase()
        .split(" ")
        .filter((element) => element !== "");
      let filteredPosts = this.cards.filter((obj) => {
        let lowerCaseHashtags = obj.hashtags.map((hashtag) =>
          hashtag.toLowerCase()
        );
        return searchTags.every((searchTag) =>
          lowerCaseHashtags.includes(searchTag)
        );
      });
      return filteredPosts;
    },
  },
  components: {
    newsCard,
    postCard,
    Icon,
  },
};
</script>

<style scoped>
.vstack div:hover {
  cursor: pointer;
  background-color: #2a2b2c;
}
.category:hover {
  cursor: pointer;
  background-color: #2a2b2c;
}
.btnDelete {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 100;
}
ul {
  list-style: none;
}

.imageList {
  font-size: 0;
}
.imageList button {
  font-size: 20px;
}
.imageList:first-child {
  margin-top: 0;
}
.overlayPost {
  cursor: wait;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 99999;
}
.liIMG {
  background-color: #5e6266;
  position: relative;
  display: inline-block;
  width: 100%;
  height: auto;
  max-height: 500px;
  overflow: hidden;
  text-align: center;
}
.pointer {
  cursor: pointer;
}
.liIMG img {
  max-height: 500px;
  max-width: 500px;
  width: auto;
  object-fit: contain;
  background-color: #5e6266;
}
.modal-content {
  background-color: rgb(36, 37, 38) !important;
}
.input-label {
  cursor: pointer;
}
.visina2 {
  color: green;
  resize: none;
  overflow-y: hidden;
  height: 30px;
  outline: none;
  background-color: #18191a;
  border: none;
}
.visina2:focus {
  border: none;
}
p:focus {
  border: none;
}
p {
  outline: none;
}
.btnBG {
  background-color: rgb(72, 74, 76);
  color: rgb(183, 190, 194);
}
.PostBG {
  background-color: rgb(36, 37, 38);
}
.targetPrijatelji {
  scrollbar-width: none;
  max-height: 250px;
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
}
.visina {
  position: fixed;
  right: 10px;
  height: 85vh;
}
.crta1 {
  width: 20vw;
}
.friend img {
  height: 50px;
  width: 50px;
  object-fit: cover;
}
.okvir {
  margin: auto;
  position: relative;
  width: 10vw;
  height: 10vw;
}
.skeletonOKVIR {
  margin: auto;
  position: relative;
  width: 100%;
  max-height: 300px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.skeletonImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.innerImg {
  max-height: 600px;
  object-fit: contain;
  background-color: #5e6266;
}

.okvir img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.srednji {
  padding-left: 7vw;
  padding-right: 7vw;
}
.racesModal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  padding: 20px;
  background-color: rgb(44, 42, 42);
  z-index: 1050;
}
</style>
