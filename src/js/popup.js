define(function() {

  var popup = document.querySelector(".popup");

  return {
    show: function(content, pageX, pageY) {
      popup.querySelector(".content").innerHTML = content;
      popup.style.top = pageY + "px";
      popup.style.left = (pageX - 100 > 0 ? pageX : 100) + "px";
      if (!(/show/.test(popup.className))) {
        popup.className += " show";
      }
    },
    hide: function() {
      popup.className = popup.className.replace(/\w?show\w?/, "");
    }
  }

})