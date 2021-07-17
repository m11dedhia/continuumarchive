<template>
<div class="p-3">
    <div v-if="filteredPosts.length == 0" class="landing has-background-primary mb-3">
       <Instructions />
    </div>
    <section id="filters" class="mb-4 is-hidden-mobile">
      <div class="columns is-vcentered">
        <div class="column is-5">
          <b-input type="search" class="search column is-full" placeholder="search" v-model="search"></b-input>
        </div>

        <div class="column is-2">
          <b-field class="is-full">
              <b-select placeholder="FILTERED BY" v-model="filteredBy">
                <option value="season-title">By Season or Concert Title</option>
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
        <p @click="sort('season')" :class="[sortBy === 'season' ? sortDirection : '']">season</p>
      </div>
      <div class="column is-3">
        <p @click="sort('title')" :class="[sortBy === 'title' ? sortDirection : '']">concert</p>
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

    <div class="tableitem columns is-vcentered" v-for="post in filteredPosts" :key="post.id">
      <div class="column is-1">
        <p v-html="highlight(post.season) || post.season"></p>
      </div>
      <div class="column is-3">
        <p><nuxt-link :to="`/concerts/` + post.id" target="_blank" v-html="highlight(post.title) || post.title"></nuxt-link>
          <span v-if="post.poster"><i class="has-text-grey fas fa-image"></i></span>
          <span v-if="post.images"><i class="has-text-grey fas fa-images"></i></span></p>
      </div>
      <div class="column is-8">
        <div class="columns is-vcentered" v-for="composition in post.compositions" :class="{ 'is-hidden' : composition.hide == true }" >
        <!-- <div class="columns is-vcentered composition-item" v-for="composition in post.compositions"> -->
          <div class="column is-3">
              <!-- <span>{{ composition.hide }}</span> -->
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
              <span class="arrayitem" v-html="highlight(person) || person"></span><span class="separator">,&nbsp;</span>
            </span><span v-if="composition.guest_performers" v-html="highlight(composition.guest_performers) || composition.guest_performers"></span>
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

   <div id="postnum" class="fixed is-hidden-mobile">
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
import Instructions from "@/components/Instructions"
import axios from 'axios'
export default {
  name: 'search',
  components: {
     Instructions
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
              season: post.acf.concert_season,
              title: post.acf.concert_title,
              poster: post.acf.concert_poster,
              images: post.acf.concert_images,
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
   sort: function(s){
     if(s === this.sortBy) {
         this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
     }
     this.sortBy = s;
   },
  },
  computed: {
     filteredPosts(){
        let oriposts = this.posts;
        let finalposts = [];
        finalposts = Array.from(oriposts);

        if (this.hasImages) {
          finalposts = finalposts.filter((post) => {
            return post.images.length != 0
          })
        }

        if (this.hasVideo) {
          finalposts = finalposts.filter(post => {
            let res = post.compositions.some(
              c => c.composition_video_link.length == 0
            )
            post.compositions.filter(c => {
              let r = c.composition_video_link.length == 0
              c.hide = r
              return r
            })
            return res
          })
        } else {
          finalposts = finalposts.filter(post => {
            let res = post.compositions.some(
              c => c.composition_video_link.length == 0
            )
            post.compositions.filter(c => {
              c.hide = false
            })
            return res
          })
        }

        if (this.hasWorldPremiere) {
          finalposts = finalposts.filter(post => {
            let res = post.compositions.some(
              c => c.world_premiere == false
            )
            post.compositions.filter(c => {
              let r = c.world_premiere == false
              c.hide = r
              return r
            })
            return res
          })
        }

        if (this.hasCanadianPremiere) {
          finalposts = finalposts.filter(post => {
            let res = post.compositions.some(
              c => c.canadian_premiere == false
            )
            post.compositions.filter(c => {
              let r = c.canadian_premiere == false
              c.hide = r
              return r
            })
            return res
          })
        }

        if (this.search != '' && this.search) {
              if (this.filteredBy === 'composition') {
                finalposts = finalposts.filter(post => {
                  let res = post.compositions.some(
                    c => !c.composition_title.toLowerCase().includes(this.search.toLowerCase())
                  )
                  post.compositions.filter(c => {
                    let r = !c.composition_title.toLowerCase().includes(this.search.toLowerCase())
                    c.hide = r
                    return r
                  })
                  return res
                })
              } else if (this.filteredBy === 'composer') {
                 finalposts = finalposts.filter(post => {
                   let res = post.compositions.some(
                     c => !c.composer_name.toLowerCase().includes(this.search.toLowerCase())
                   )
                   post.compositions.filter(c => {
                     let r = !c.composer_name.toLowerCase().includes(this.search.toLowerCase())
                     c.hide = r
                     return r
                   })
                   return res
                 })
              } else if (this.filteredBy === 'performer') {

                finalposts = finalposts.filter(post => {
                

                })
              } else if (this.filteredBy === 'season-title'){
                finalposts = finalposts.filter(post => {
                  return post.season.toLowerCase().includes(this.search.toLowerCase()) ||
                         post.title.toLowerCase().includes(this.search.toLowerCase())
                })
              }
        }

        finalposts.sort((p1,p2) => {
            let modifier = 1;
            if(this.sortDirection === 'desc') modifier = -1;
            if(p1[this.sortBy] < p2[this.sortBy]) return -1 * modifier; if(p1[this.sortBy] > p2[this.sortBy]) return 1 * modifier;
            return 0;
        });

        // return paginated posts
        this.total = finalposts.length
        let page_number = this.current - 1
        return finalposts.slice(page_number * this.perPage, (page_number + 1) * this.perPage);
     }, // filteredPosts
  } // computed
};
</script>
<style lang="scss">

</style>
