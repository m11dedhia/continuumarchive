<template>
  <header class="columns is-vcentered p-3 m-0">
    <div class="logo column is-3">
      <a href="/">
      <img src="https://www.continuummusic.ca/wp-content/uploads/2020/09/ccm-logo-1536x258.png" alt="continuum contemporary music">
      </a>
    </div>

    <div class="info column is-2 has-text-right">
      <b-button
      tag="router-link"
      to="/about-archive"
      type="is-link"
      class="is-small"
      label="About Archive"
       />
       </b-button>
    </div>
  </header>
</template>
<script>
import Logo from "@/components/Logo"
export default {
  name: 'subnavigation',
  data(){

  },
  components: {
    Logo,
  }
}
</script>
<style lang="scss">

</style>
