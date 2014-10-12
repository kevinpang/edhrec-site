$(document.body).on("mouseenter", ".hover-card card-anchor", function() {
  var img = $(this).siblings("card-image").find("img");
  img.attr("src", img.attr("lazy-src"));
});