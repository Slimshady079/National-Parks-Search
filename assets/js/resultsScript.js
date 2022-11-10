results = JSON.parse(localStorage.getItem("search"));
console.log(results);

var box = $("#resultBox");
var card = $("<div>");
var cardName = $("<p>");
cardName.text(results[0].parkName);
card.append(cardName);
box.append(card);
