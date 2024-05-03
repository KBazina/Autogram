<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="d-none d-md-block col-3 border-end">
        <div class="position-fixed top-20 start-200">
          <div class="okvir ms-5 mb-4">
            <img
              src="@/assets/mateo.png"
              class="rounded-circle sredina"
              alt="..."
            />
          </div>
          <div class="vstack gap-2">
            <div class="p-2">Mateo Udovitjitj</div>
            <div class="p-2">165cm</div>
            <div class="p-2">Ja sam upo na FOI</div>
            <div class="p-2">IMAM SIFILIS</div>
            <div class="p-2">Volim mamu i valamar</div>
            <div class="p-2">Mateo Udovitjitj</div>
            <div class="p-2">165cm</div>
            <div class="p-2">IMAM SIFILIS</div>
            <div class="p-2">IMAM SIFILIS</div>
            <div class="p-2">Ja sam upo na FOI</div>
            <div class="p-2">Volim mamu i valamar</div>
            <div class="p-2">Mateo Udovitjitj</div>
            <div class="p-2">165cm</div>
            <div class="p-2">IMAM SIFILIS</div>
            <div class="p-2">Ja sam upo na FOI</div>
            <div class="p-2">Volim mamu i valamar</div>
          </div>
        </div>
      </div>
      <div class="srednji col-sm-12 col-md-9 col-lg-6 col-12">
        <!-- --------------- -->
        <div class="container PostBG pt-3 pb-1 rounded-4">
          <div class="okvir2">
            <img
              src="@/assets/mateo.png"
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
          >
            <Icon icon="mdi:tooltip-image" width="30" class="me-2" /> Dodaj
            fotografiju
          </div>
        </div>
        <!-- ---------------- -->
        <!-- Modal -->
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
                <div class="image_wrapper">
                  <ul class="imageList p-0">
                    <li
                      class="liIMG"
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
                  @click="addPost"
                  class="btn btn-light mx-2"
                >
                  Objavi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="visina d-none d-lg-block col-3 overflow-y-scroll">
        <newsCard v-for="article in news" :key="article" :infoNew="article">
        </newsCard>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store";
import newsCard from "@/components/newsCard.vue";
import { Icon } from "@iconify/vue";
import {
  doc,
  where,
  setDoc,
  ref,
  getStorage,
  uploadBytes,
  getDownloadURL,
  db,
} from "@/firebase";
const storage = getStorage();
export default {
  data() {
    return {
      btnClicked: false,
      newFireURL_Images: [],
      images: [],
      fileImages: [],
      currentIndex: 0,
      postText: "",
      store,
      imageFile: null,
      imageSrc: "",
      hashtags: "",
      news: [],
    };
  },
  mounted() {
    this.getNews();
  },
  methods: {
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
    addPost() {
      if (this.postText == "" && this.images.length == 0) {
        alert("Nisi dodao nikakav sadržaj postu!");
      } else {
        this.btnClicked = true;
        const fileImages = this.fileImages;
        fileImages.forEach((file) => {
          const storageRef = ref(
            storage,
            "postsPictures/" + Date.now() + file.name
          );
          uploadBytes(storageRef, file)
            .then((snapshot) => {
              return getDownloadURL(ref(storageRef));
            })
            .then((url) => {
              this.newFireURL_Images.push(url);
              this.imageSrc = url;
              console.log(url);
            });
        });

        setTimeout(() => {
          const postRef = doc(
            db,
            "users",
            "ID" + store.userMail,
            "posts",
            "post" + Date.now()
          );
          setDoc(postRef, {
            images: this.newFireURL_Images,
            hashtags: this.hashtags.split("#").filter(element => element !== ""),
            postText: this.postText,
            posted_at: Date.now(),
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
        }, 2000);
      }
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageSrc = URL.createObjectURL(file);
        this.images.push(this.imageSrc);
        this.fileImages.push(file);
        this.imageFile = file;
      }
      this.$refs.fileInputer.value = "";
    },
    async getNews() {
      try {
        let res = await axios.get(
          "https://newsapi.org/v2/everything?q=sport cars&language=en&pageSize50&apiKey=374a9102e94e4621a11a1608cbed0f83"
        );

        this.news = res.data.articles;
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    FilteredNews() {
      return this.news;
    },
  },
  components: {
    newsCard,
    Icon,
  },
};
</script>

<style>
.btnDelete {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 100;
}
ul {
  list-style: none;
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
.okvir2 {
  position: relative;
  width: 100%;
  height: 40px;
}
.okvir2 img {
  width: 40px;
  height: auto;
  object-fit: cover;
}
.visina {
  position: fixed;
  right: 10px;
  height: 85vh;
}

.okvir {
  margin: auto;
  position: relative;
  width: 10vw;
  height: 10vw;
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
</style>
