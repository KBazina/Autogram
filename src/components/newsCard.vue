<template>
  <div class="newsDiv ">
    <div class="card my-3 m-auto">
      <img :src="info.urlToImage" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{{ info.title }}</h5>
        <p class="card-text">
          <a :href="info.url"  >
            Read more
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["info"],
  name: "newsCard",
  data() {
    return {};
  },
};
</script>

<style>
</style>