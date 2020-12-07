document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");

  let cacheInput = null;
  let timer = null;
  if (!isApple()) {
    return false;
  }

  const textarea = document.querySelector("textarea");
  const myContainer = document.querySelector(".container");
  textarea.addEventListener("focus", (event) => {
    let target = event.target;
    if (!target) return;
    cacheInput = event.target;

    var displayHeight = window.innerHeight - myContainer.scrollTop;
    myContainer.style.height = displayHeight + "px";
  });

  textarea.addEventListener("blur", (event) => {
    myContainer.style.height = "100%";
  });

  document.addEventListener("touchend", function (event) {
    let tagName = event.target.tagName;
    if (tagName === "TEXTAREA") return;

    if (cacheInput !== null) {
      timer = setTimeout(function () {
        cacheInput.blur();
        clearTimeout(timer);
      }, 300);
    }
  });

  function isApple() {
    let ua = navigator.userAgent.toUpperCase();
    let ipad = ua.indexOf("IPAD") > -1,
      ipod = ua.indexOf("IPOD") > -1,
      iphone = ua.indexOf("IPHONE") > -1;
    return ipad || ipod || iphone;
  }
});
