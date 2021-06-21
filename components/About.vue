<template>
  <div>
    <div v-for="post in posts" :key="post.id" class="p-3 container">
      <div v-html="post.content.rendered" class="columns is-vcentered windowheight"></div>
    </div>
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
      ep: 'https://continuummusic.ca/wp-json/wp/v2/pages',
      posts: '',
    }
  },
  created() {
    this.getAllPosts();
  },
  methods: {
    getAllPosts() {
      axios.get(this.ep)
        .then(response => {
          this.posts = response.data.filter(post =>
            post.slug == "about-archive"
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
