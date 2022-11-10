results = JSON.parse(localStorage.getItem("search"));
console.log(results);

var box = $("#resultBox");
var card = $("<div>");
var cardName = $("<p>");
var state = $("<p>");
var code = $("<p>");
var url = $("<a>");

cardName.text(results[0].parkName);
state.text(results[0].parkState);
code.text(results[0].parkCode);
url.text(results[0].parkURL);
url.attr("href", results[0].parkURL);

card.append(cardName);
card.append(state);
card.append(code);
card.append(url);

box.append(card);
