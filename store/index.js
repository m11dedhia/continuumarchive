const siteURL = "https://continuummusic.ca"

export const state = () => ({
  posts: [],
})

export const mutations = {
  updatePosts: (state, posts) => {
    state.posts = posts
  },
}

export const actions = {
  async getPosts({ state, commit, dispatch }) {
    if (state.posts.length) return

    try {
      let posts = await fetch(
        `${siteURL}/wp-json/acf/v3/concerts?per_page=1000`
      ).then(res => res.json())

      posts = posts
        .map(({ id, acf }) => ({
          id,
          acf
        }))

      commit("updatePosts", posts)
    } catch (err) {
      console.log(err)
    }
  }
}
