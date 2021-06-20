<template>
  <main class="search">
    <Search />
  </main>
</template>

<script>
import Search from "@/components/Search"
export default {
  name: 'archive',
  layout: 'home',
  components: {
    Search,
  },
  head() {
    return {
      title: "continuum archive",
    }
  }
}
</script>

<style lang="scss">

</style>
