import Vue from 'vue'

Vue.prototype.$openLightbox = () => {

  var imageBtn = Array.from(document.getElementsByClassName("attachment-full"));
  console.log(imageBtn);
  for (var i = 0; i < imageBtn.length; i++) {
    // imageBtn[i].classList.add("hide");

    imageBtn[i].click(function(e){
      console.log(i);
      e.preventDefault();
    });
  }


}

Vue.prototype.$clicktoFade = () => {
  // document.getElementById("landingBtn").click(function(){
  //     document.querySelector(".landing").style.opacity = 0;
  // });


}
