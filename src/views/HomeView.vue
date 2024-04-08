<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="d-none d-md-block col-3 border-end">
        <div class="position-fixed top-20 start-200">
          <div class="okvir mb-4">
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
            <div class="p-2">Volim mamu i valamar</div>
            <div class="p-2">Mateo Udovitjitj</div>
            <div class="p-2">165cm</div>
            <div class="p-2">Ja sam upo na FOI</div>
            <div class="p-2">Volim mamu i valamar</div>   
            <div class="p-2">Mateo Udovitjitj</div>
            <div class="p-2">165cm</div>
            <div class="p-2">Ja sam upo na FOI</div>
            <div class="p-2">Volim mamu i valamar</div>
          </div>
        </div>
      </div>
      <div class="srednji col-sm-12 col-md-9 col-lg-6 col-12">
        <div class="card position-relative my-4">
          <div class="position-absolute top-0 start-50 translate-middle">
            <div class="okvir2">
              <img
                src="@/assets/mateo.png"
                class="rounded-circle sredina"
                alt="..."
              />
            </div>
          </div>
          <div class="card-header">
            KARLO BAZINA <span class="desno me-2"> 2 days ago</span>
          </div>
          <img src="@/assets/circle.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <p class="card-text">
              Cura me naterala da kupim rozi auto. <br />
              Obiteljski!
            </p>
            <hr />
            Like @ <span class="desno me-2"> Komentiraj</span>
          </div>
        </div>

        <div class="card position-relative my-4">
          <div class="position-absolute top-0 start-50 translate-middle">
            <div class="okvir2">
              <img
                src="@/assets/mateo.png"
                class="rounded-circle sredina"
                alt="..."
              />
            </div>
          </div>
          <div class="card-header">
            KARLO BAZINA <span class="desno me-2"> 2 days ago</span>
          </div>
            <img
              src="@/assets/Pin on Wallpapers.jpg"
              class="innerImg card-img-top"
              alt="..."
            />
          <div class="card-body">
            <p class="card-text">
              Cura me naterala da kupim rozi auto. <br />
              Obiteljski!
            </p>
            <hr />
            Like @ <span class="desno me-2"> Komentiraj</span>
          </div>
        </div>

        <div class="card position-relative my-4">
          <div class="position-absolute top-0 start-50 translate-middle">
            <div class="okvir2">
              <img
                src="@/assets/mateo.png"
                class="rounded-circle sredina"
                alt="..."
              />
            </div>
          </div>
          <div class="card-header">
            KARLO BAZINA <span class="desno me-2"> 2 days ago</span>
          </div>
            <img
              src="@/assets/zuta.jpg"
              class="innerImg card-img-top"
              alt="..."
            />
          <div class="card-body">
            <p class="card-text">
              Cura me naterala da kupim rozi auto. <br />
              Obiteljski!
            </p>
            <hr />
            Like @ <span class="desno me-2"> Komentiraj</span>
          </div>
        </div>
      </div>
      <div class="visina d-none d-lg-block col-3 overflow-y-scroll">
        <newsCard v-for="article in news" :key="article" :info="article">
        </newsCard>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import newsCard from "@/components/newsCard.vue";

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
    async getNews() {
      try {
        let res = await axios.get(
          "https://newsapi.org/v2/everything?q=sport cars&language=en&pageSize50&apiKey=374a9102e94e4621a11a1608cbed0f83"
        );

        this.news = res.data.articles;
        console.log(this.news);
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
  },
};
</script>

<style>
.visina {
  position: fixed;
  right: 10px;
  height: 85vh;
}

.desno {
  float: right;
}
.okvir {
  margin: auto;
  position: relative;
  width: 10vw;
  height: 10vw;
}
.okvir2 {
  position: relative;
  width: 40px;
  height: 40px;
}
.innerImg{
  max-height: 600px;
  object-fit: contain;
  background-color:#5e6266;
}

.okvir2 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
.card {
  background-color: #242526 !important;
}
</style>