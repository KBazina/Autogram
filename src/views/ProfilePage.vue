<template>
  <div>
    {{ user }}
  </div>
</template>
<script>

export default {
    props: {
    id: String
  },
  data() {
    return{
        user:0,
    }
  },
  created() {
    this.user=this.$route.params.username
}
}

</script>
