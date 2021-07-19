<template>
  <main>
    <Search />
  </main>
</template>

<script>
import Search from "@/components/SearchBeta"
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
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 2000)
    })
  }
}
</script>

<style lang="scss">

</style>
