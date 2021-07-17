<template>
  <div>
    <div class="logo-invert p-6">
      <a href="#">
        <img src="https://www.continuummusic.ca/wp-content/uploads/2020/09/ccm-logo-1536x258.png" alt="continuum contemporary music logo"/>
      </a>
    </div>
    <div v-for="post in posts" :key="post.id" class="p-3 container">
      <div v-html="post.content.rendered" class="columns is-vcentered windowheight p-4"></div>
    </div>
    <a class="icon-scroll"></a>
    <span class="icon-scroll-text">LOADING</span>
  </div>
</template>
<script>
import axios from 'axios'
 export default {
   components: {
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
 }
</script>
<style lang="scss">

</style>
