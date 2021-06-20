import Vue from 'vue'

Vue.prototype.$openLightbox = () => {



}

Vue.prototype.$clicktoFade = () => {
  document.querySelector(".icon-scroll").click(function(){
      document.querySelector(".landing").style.opacity = 0;
      console.log("hey")
  });



}
