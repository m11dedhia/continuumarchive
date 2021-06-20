<template>
  <header class="columns is-vcentered p-3 m-0">
    <div class="logo column is-3">
      <a href="/">
      <img src="https://www.continuummusic.ca/wp-content/uploads/2020/09/ccm-logo-1536x258.png" alt="continuum contemporary music">
      </a>
    </div>
    <div class="info column is-9 has-text-right">
            <b-button
            tag="router-link"
            to="/about-archive"
            type="is-primary"
            class="is-small"
            label="About Archive"
             />
             </b-button>
    </div>
  </header>
</template>
<script>

export default {
  name: 'navigation',
}
</script>
<style lang="scss">

</style>
