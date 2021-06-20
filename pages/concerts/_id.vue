<template>
  <main>
      <div v-for="post in posts" :key="post.id" class="p-3">
        <section class="columns concert-info">
          <div class="column is-4">
            <p class="mb-2"><a href="/">{{ post.acf.concert_season }}</a></p>
            <h1 class="is-size-2 has-text-weight-bold my-2">{{ post.acf.concert_title }}</h1>
            <p class="mb-2">
              <span class="icon-text">
                <span class="icon">
                  <i class="has-text-grey fas fa-calendar-alt"></i>
                </span>
                <span>{{ post.acf.concert_date }}</span>
              </span>
            </p>
            <p class="mb-2">
              <span class="icon-text">
                <span class="icon">
                  <i class="has-text-grey fas fa-map-marker-alt"></i>
                </span>
                <span>{{ post.acf.concert_venue }}</span>
              </span>
            </p>
            <p class="mb-2" v-if="post.acf.concert_funders.length > 0">
              <span class="icon-text">
                <span class="icon">
                  <i class="has-text-grey fas fa-comments-dollar"></i>
                </span>
                <span v-for="funder in post.acf.concert_funders" class="arrayitem">{{ funder }}<span class="separator">, &nbsp;</span></span>
                <span v-if="post.acf.concert_other_funders">{{ post.acf.concert_other_funders }}</span>
              </span>
            </p>
            <p class="mb-2" v-if="post.acf.concert_sponsors">
              <span class="icon-text">
                <span class="icon">
                  <i class="has-text-grey fas fa-medal"></i>
                </span>
                <span>{{ post.acf.concert_sponsors }}</span>
              </span>
            </p>
            <p class="mb-2" v-if="post.acf.concert_producers">
              <span class="icon-text">
                <span class="icon">
                  <i class="has-text-grey fas fa-hamsa"></i>
                </span>
                <span>{{ post.acf.concert_producers }}</span>
              </span>
            </p>
            <p class="mb-2" v-if="post.acf.concert_presenters">
              <span class="icon-text">
                <span class="icon">
                  <i class="has-text-grey fas fa-gifts"></i>
                </span>
                <span>{{ post.acf.concert_presenters }}</span>
              </span>
            </p>
          </div>
          <div class="column is-4">
            <ul class="composition-list">
              <li v-for="(composition, index) in post.acf.archive_compositions" class="mb-4">
                <h4 class="is-size-6 p-2 is-clickable"
                v-if="composition.composition_title"
                @click="compositionItemClick(index)">
                  {{ composition.composition_title }}
                  <span v-if="composition.composition_year">({{ composition.composition_year }})</span>
                  <span v-if="composition.world_premiere"><i class="has-text-grey fas fa-globe"></i></span>
                  <span v-if="composition.canadian_premiere"><i class="has-text-grey fab fa-canadian-maple-leaf"></i></span>
                  <span class="icon is-pulled-right is-small">
                    <i class="has-text-grey fas fa-chevron-down"></i>
                  </span>
                </h4>
                <div class="p-2 is-hidden has-background-primary-light" :data-composition-id="index">
                  <p class="mb-2" v-if="composition.composer_name">
                    <span class="has-text-grey">Composer:</span>
                    <span>{{ composition.composer_name }}</span>
                    <span class="has-text-grey">({{ composition.composer_nationality }})</span>
                  </p>
                  <p class="mb-2" v-if="composition.guest_artists">
                    <span class="has-text-grey">Guest Artists:</span>
                    <span>{{ composition.guest_artists }}</span>
                  </p>
                  <p class="mb-2" v-if="composition.core_ensemble.length > 0 || composition.guest_performers">
                    <span class="has-text-grey">Performers:</span>
                    <span v-for="person in composition.core_ensemble" class="arrayitem"> {{ person }}<span class="separator">, &nbsp;</span></span>
                    <span v-if="composition.guest_performers">{{ composition.guest_performers }}</span>
                  </p>
                  <div class="embed-container mb-2" v-if="composition.composition_video_link" v-html="composition.composition_video_link"></div>
                  <p class="mb-2" v-if="composition.composition_funders.length > 0 || composition.composition_other_funders">
                    <span class="has-text-grey">Composition Funders:</span>
                    <span v-for="funder in composition.composition_funders" class="arrayitem">{{ funder }}<span class="separator">, &nbsp;</span></span>
                    <span v-if="composition.composition_other_funders">{{ composition.composition_other_funders }}</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="column is-4" v-if="post.acf.concert_poster">

              <img class="fullwidth" :src="post.acf.concert_poster" :alt="post.acf.concert_title" @click="isComponentModalActive = true">
              <b-modal v-model="isComponentModalActive">
                  <img class="fullwidth" :src="post.acf.concert_poster" :alt="post.acf.concert_title">
              </b-modal>

          </div>
        </section>
        <section class="concert-info my-4 py-4" v-if="post.acf.concert_info">
          <div class="container" v-html="post.acf.concert_info"></div>
        </section>
        <section class="concert-images my-4" v-if="post.acf.concert_images">
          <div v-html="post.acf.concert_images"></div>
        </section>

      </div>


  </main>
</template>

<script>
import axios from 'axios'

export default {
  layout: 'default',
  name: 'archive',
  components: {

  },
  head() {
    return {
      title: this.postTitle
    }
  },
  data() {
    return {
      ep: 'https://continuummusic.ca/wp-json/acf/v3/concerts?per_page=1000',
      posts: '',
      isComponentModalActive: false
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
          this.posts = response.data.filter(post => post.id == postId)
          this.postTitle = this.posts[0].acf.concert_title
        })
        .catch(error => {
          console.log(error);
        })
    },
    compositionItemClick (compositionIndex) {
      const compositionInfoElement = document.querySelectorAll('[data-composition-id="' + compositionIndex + '"]')[0]
      if (compositionInfoElement.classList.contains('is-block')) {
        compositionInfoElement.classList.remove('is-block')
        compositionInfoElement.classList.add('is-hidden')
      } else {
        compositionInfoElement.classList.remove('is-hidden')
        compositionInfoElement.classList.add('is-block')
      }
    }
  },
  computed: {

  }, // computed
   mounted(){
    this.$openLightbox();
   }
}
</script>

<style lang="scss">

</style>
