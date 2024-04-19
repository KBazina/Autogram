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
              <div class="modal-body">
                <p
                  ref="paragraph"
                  class="m-0 p-1"
                  contenteditable="true"
                  @input="handleInput"
                ></p>
              </div>
              <div class="modal-footer p-1">
                <div class="btn btn-dark PostBG me-2">
                  <Icon icon="mdi:tooltip-image" width="30" class="me-2" />
                  Dodaj fotografiju
                </div>
                <button type="button" class="btn btn-light mx-2">Objavi</button>
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
import newsCard from "@/components/newsCard.vue";
import { Icon } from "@iconify/vue";

export default {
  data() {
    return {
      news: [],
    };
  },
  mounted() {
    this.getNews();
  },
  methods: {
    handleInput(event) {
      if (event.shiftKey && event.key === "Enter") {
        event.preventDefault();
        this.$refs.paragraph.insertAdjacentHTML("beforeend", "<br>");
      }
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
