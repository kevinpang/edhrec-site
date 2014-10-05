app.service("cardService", function() {
  this.getCardUrl = function(name) {
    return "http://gatherer.wizards.com/Pages/Card/Details.aspx?name=" + name;
  };
  
  this.getCardImage = function(name) {
    return "http://gatherer.wizards.com/Handlers/Image.ashx?name=" + name + "&type=card&.jpg";
  };
});