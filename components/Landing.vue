<template>
  <div>
    <div class="landing is-full has-text-centered has-background-primary mb-3">
       <a class="icon-scroll" href="#filters"></a>
       <span class="icon-scroll-text">See All Concerts</span>
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
 }
</script>
<style lang="scss">
html {
  scroll-behavior: smooth;
}

.landing{
  height: 100vh;
  line-height: 100vh;
  position: relative;
  z-index: 9;
}

.icon-scroll,
.icon-scroll:before {
  position: absolute;
  left: 50%;
  z-index: 10;
}

.icon-scroll-text{
  position: absolute;
  left: calc(50% - 4rem);
  bottom: 120px;
  z-index: 10;
  line-height: normal;
  color: white;
}

.icon-scroll {
  width: 40px;
  height: 70px;
  margin-left: -20px;
  bottom: 2rem;
  margin-top: -35px;
  box-shadow: inset 0 0 0 1px #fff;
  border-radius: 25px;
}

.icon-scroll:before {
  content: '';
  width: 8px;
  height: 8px;
  background: #fff;
  margin-left: -4px;
  top: 8px;
  border-radius: 4px;
  -webkit-animation-duration: 1.5s;
          animation-duration: 1.5s;
  -webkit-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
  -webkit-animation-name: scroll;
          animation-name: scroll;
}

@-webkit-keyframes scroll {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(46px);
  }
}

@keyframes scroll {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(46px);
  }
}


</style>
