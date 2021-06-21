<template>
  <main>
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
      title: "Continuum Contemporary Music Archive",
    }
  }
}
</script>

<style lang="scss">

</style>
