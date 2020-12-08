document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");

  setPlatformInfo();
  closeKeyboardOnBlur();

  var inputBox = document.querySelector(".safari textarea");
  var myContainer = document.querySelector(".safari .container");
  if (inputBox) {
    inputBox.addEventListener("focus", function (e) {
      document.body.classList.add("keyboard");
      var displayHeight = window.innerHeight - myContainer.scrollTop;
      setTimeout(function () {
        window.scrollTo(0, 0);
        document.documentElement.style.setProperty(
          "--containerHeight",
          displayHeight + "px"
        );
      }, 200);
    });

    inputBox.addEventListener("blur", function (e) {
      document.body.classList.remove("keyboard");
    });
  }
});

function closeKeyboardOnBlur() {
  let cacheInput = null;
  let timer = null;
  if (!isApple()) {
    return false;
  }

  const textarea = document.querySelector("textarea");
  textarea.addEventListener("focus", (event) => {
    let target = event.target;
    if (!target) return;
    cacheInput = event.target;
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
}

function setPlatformInfo() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("safari") != -1) {
    if (ua.indexOf("chrome") > -1) {
      document.body.classList.add("chrome");
    } else {
      document.body.classList.add("safari");
    }
  }
}

function isApple() {
  let ua = navigator.userAgent.toUpperCase();
  let ipad = ua.indexOf("IPAD") > -1,
    ipod = ua.indexOf("IPOD") > -1,
    iphone = ua.indexOf("IPHONE") > -1;
  return ipad || ipod || iphone;
}
