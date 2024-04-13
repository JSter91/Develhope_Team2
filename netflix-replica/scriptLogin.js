function submitForm() {
  var email = document.querySelector('input[type="email"]').value;
  var password = document.querySelector('input[type="password"]').value;

  if (email && password) {
    document.querySelector("form").style.display = "none";

    var video = document.getElementById("video");
    video.style.display = "block";

    video.play();

    video.addEventListener("ended", function () {
      window.location.href = "./home.html";
    });

    return false;
  } else {
    return true;
  }
}
