<template>
<div class="p-3">
    <section id="filters" class="mb-4 is-hidden-mobile">
      <div class="columns is-vcentered">
        <div class="column is-5">
          <b-input type="search" class="search column is-full" placeholder="search" v-model="search"></b-input>
        </div>

        <div class="column is-2">
          <b-field class="is-full">
              <b-select placeholder="FILTERED BY" v-model="filteredBy">
                <option value="composition">By Composition</option>
                <option value="composer">By Composer</option>
                <option value="performer">By Performer</option>
              </b-select>
          </b-field>
        </div>
        <div class="column is-5">
         <b-checkbox v-model="hasImages" type="is-info" native-value="images" size="is-small">
            <label for="images">
                <span class="icon-text is-uppercase">
                  <span class="icon">
                    <i class="fas fa-images"></i>
                  </span>
                  <span>Image</span>
                </span>
            </label>
        </b-checkbox>

                 <b-checkbox v-model="hasVideo" type="is-info" native-value="video" size="is-small">
                    <label for="images">
                      <span class="icon-text is-uppercase">
                       <span class="icon">
                         <i class="fas fa-video"></i>
                       </span>
                       <span>Video</span>
                     </span>
                    </label>
                </b-checkbox>


        <b-checkbox v-model="hasWorldPremiere" type="is-info" native-value="worldPremiere" size="is-small">
          <label for="worldPremiere">
            <span class="icon-text is-uppercase">
              <span class="icon">
                <i class="fas fa-globe"></i>
              </span>
              <span>World Premiere</span>
            </span>
         </label>
       </b-checkbox>

       <b-checkbox v-model="hasCanadianPremiere" type="is-info" native-value="canadianPremiere" size="is-small">
         <label for="canadianPremiere">
           <span class="icon-text is-uppercase">
             <span class="icon">
               <i class="fab fa-canadian-maple-leaf"></i>
             </span>
             <span>Canadian Premiere</span>
           </span>
        </label>
      </b-checkbox>


        </div>

      </div>
    </section>

    <div class="tablehead columns has-text-weight-bold is-uppercase is-hidden-mobile">
      <div class="column is-1">
        <p>season</p>
      </div>
      <div class="column is-3">
        <p>concert</p>
      </div>
      <div class="column is-2">
        <p>composition</p>
      </div>
      <div class="column is-2">
        <p>composer</p>
      </div>
      <div class="column is-4">
        <p>performer</p>
      </div>
    </div>


    <div class="tableitem columns is-vcentered" v-for="(post, index) in filteredPosts" :key="post.id">
      <div class="column is-1">
        <p v-html="highlight(post.concert_season) || post.concert_season"></p>
      </div>
      <div class="column is-3">
        <p><nuxt-link :to="`/concerts/` + post.id" target="_blank" v-html="highlight(post.concert_title) || post.concert_title"></nuxt-link>
          <span v-if="post.concert_poster"><i class="has-text-grey fas fa-image"></i></span>
          <span v-if="post.concert_images"><i class="has-text-grey fas fa-images"></i></span></p>
      </div>
      <div class="column is-8">
        <div class="columns is-vcentered" v-for="composition in post.compositions" v-if="composition.show = 'false'">
          <div class="column is-3">
              <span v-html="highlight(composition.composition_title) || composition.composition_title"></span>
              <span v-if="composition.composition_year">({{ composition.composition_year }})</span>
              <span v-if="composition.world_premiere"><i class="has-text-grey fas fa-globe"></i></span>
              <span v-if="composition.canadian_premiere"><i class="has-text-grey fab fa-canadian-maple-leaf"></i></span>
              <span v-if="composition.composition_video_link"><i class="has-text-grey fas fa-video"></i></span>
          </div>
          <div class="column is-3">
            <span v-html="highlight(composition.composer_name) || composition.composer_name"></span>
            <span class="has-text-grey" v-if="composition.composer_nationality">({{ composition.composer_nationality }})</span>
          </div>
          <div class="column is-6">
            <span v-for="person in composition.core_ensemble">
              <span class="arrayitem" v-html="highlight(person) || person"></span>
              <span class="separator">,&nbsp;</span></span>
            <span v-if="composition.guest_performers" v-html="highlight(composition.guest_performers) || composition.guest_performers"></span>
          </div>
        </div>
      </div>
    </div>


    <b-pagination
    :total="total"
	  :current.sync="current"
	  :per-page="perPage"
   >
   </b-pagination>

   <div id="postnum" class="fixed">
      <small v-if="filteredPosts.length == total">
				Found {{ total }} items
			</small>
      <small v-else>
				Found {{ filteredPosts.length }} items
			</small>
   </div>

  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'search',
  components: {

  },
  data() {
    return {
      ep: 'https://continuummusic.ca/wp-json/acf/v3/concerts?per_page=1000',
      search: '',
      posts: '',
      filteredBy: 'FILTERED BY',
      hasVideo: false,
      hasImages: false,
      hasWorldPremiere: false,
      hasCanadianPremiere: false,
      total: 0,
      current: 1,
	    perPage: 20,
      sortBy: 'season',
      sortDirection: 'asc',
    }
  },
  created() {
    this.getAllPosts();
  },
  mounted(){

  },
  methods: {
    getAllPosts() {
      axios.get(this.ep)
        .then(response => {
          this.posts = response.data.map((post) => {
            return{
              id: post.id,
              concert_season: post.acf.concert_season,
              concert_title: post.acf.concert_title,
              concert_date: post.acf.concert_date,
              concert_venue: post.acf.concert_venue,
              concert_poster: post.acf.concert_poster,
              concert_images: post.acf.concert_images,
              concert_funders: post.acf.concert_funders,
              concert_other_funders: post.acf.concert_other_funders,
              concert_producers: post.acf.concert_producers,
              concert_presenters: post.acf.concert_presenters,
              concert_sponsors: post.acf.concert_sponsors,
              compositions: post.acf.archive_compositions
            }
          })
        }) // then
        .catch(error => {
          console.log(error);
        })
   },
   highlight( data ) {
			if ( this.search ) {
				const pattern = new RegExp( this.search, 'i' );
				const highlightedData = data.replace(
					pattern,
					`<span class="highlighted">${this.search}</span>`
				);
				return highlightedData;
			}
	 },
   stringify( arr ) {
     return arr.join(', ')
   },
  },
  computed: {
     filteredPosts: function(){
          let posts = this.posts

          if (this.hasImages) {
            posts = posts.filter((post) => {
              return post.concert_images.length != 0
            })
          }

          if (this.hasVideo) {
            posts = posts.filter((post) => {
              let video = post.compositions.findIndex((c) =>{
                return c.composition_video_link.length != 0
              })

              return video !== -1

            })
          }

          if (this.hasWorldPremiere) {
            posts = posts.filter((post) => {
              let worldPremiere = post.compositions.findIndex((c) =>{
                return c.world_premiere == true
              })

              return worldPremiere !== -1

            })
          }

          if (this.hasCanadianPremiere) {
            posts = posts.filter((post) => {
              let canadianPremiere = post.compositions.findIndex((c) =>{
                return c.canadian_premiere == true
              })

              return canadianPremiere !== -1

            })
          }


          if (this.search != '' && this.search) {
            posts = posts.filter((post) => {

              let compositionTitle = post.compositions.findIndex((c) => {
                 return c.composition_title.toLowerCase().includes(this.search.toLowerCase())
              })

              let composerName = post.compositions.findIndex((c) => {
                return c.composer_name.toLowerCase().includes(this.search.toLowerCase())
              })

              return composerName !== -1 || compositionTitle !== -1 ||
                     post.concert_season.toLowerCase().includes(this.search.toLowerCase()) ||
                     post.concert_title.toLowerCase().includes(this.search.toLowerCase())
           })
         }

        // return paginated posts
        this.total = posts.length
        let page_number = this.current - 1
        return posts.slice(page_number * this.perPage, (page_number + 1) * this.perPage);

     }, // filteredPosts

  } // computed
};
</script>
<style lang="scss">

</style>
