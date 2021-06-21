import Vue from 'vue'

Vue.prototype.$openLightbox = () => {

}

Vue.prototype.$clicktoFade = () => {
  document.querySelector(".icon-scroll").click(function(){
      document.querySelector(".icon-scroll").style.opacity = 0;

  });


}
