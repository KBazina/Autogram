<template>
  <div class="newsDiv ">
    <div class="card my-3 m-auto">
      <img :src="infoNew.urlToImage" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{{ infoNew.title }}</h5>
        <p class="card-text">
          <a :href="infoNew.url"  >
            Read more
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["infoNew"],
  name: "newsCard",
  data() {
    return {};
  },
};
</script>

<style>
</style>