<template>
  <div class="p-3">


        <a href="#">go back to home</a>
  

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'archive',
  components: {
  },
  head() {
    return {
      title: "continuum archive",
    }
  },
  data() {
    return {
      ep: 'https://continuummusic.ca/wp-json/acf/v3/concerts?per_page=1000',
      posts: '',
    }
  },
  created() {
    this.getAllPosts();
  },
  methods: {
    getAllPosts() {
      const postId = this.$route.params.id
      axios.get(this.ep)
        .then(response => {
          this.posts = response.data.filter(post =>
            post.id == postId
          )
        })
        .catch(error => {
          console.log(error);
        })
    },

  },
  computed: {

   } // computed
}
</script>

<style lang="scss">

</style>
