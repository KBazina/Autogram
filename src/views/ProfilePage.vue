<template>
  <div>
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
    console.log("evo ti voo:",this.id)
  },
};
</script>
