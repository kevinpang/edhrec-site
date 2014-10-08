app.service("cardService", function() {
  this.getCardUrl = function(name) {
    name = this.sanitizeName_(name);
    return "http://gatherer.wizards.com/Pages/Card/Details.aspx?name=" + name;
  };
  
  this.getCardImage = function(name) {
    name = this.sanitizeName_(name);
    return "http://gatherer.wizards.com/Handlers/Image.ashx?name=" + name + "&type=card&.jpg";
  };
  
  this.sanitizeName_ = function(name) {
    return name.replace("\u00C6", "Ae");
  }
});