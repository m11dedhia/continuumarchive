<template>
  <div>
    <div v-if="loading" class="landing has-text-centered has-background-primary mb-3">
       <a id="landingBtn" class="icon-scroll"></a>
       <span class="icon-scroll-text">View All Concerts</span>
       <Logo />
    </div>


  </div>
</template>
<script>
 import Logo from "@/components/Logo"
 export default {
   components: {
     Logo,
   },
   data: () => ({
      loading: false,
   }),
   methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      },
  },
  mounted(){
    this.$clicktoFade();
  }
 }
</script>
<style lang="scss">

</style>
