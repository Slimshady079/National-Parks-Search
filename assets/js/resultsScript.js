results = JSON.parse(localStorage.getItem("search"));
console.log(results);

for (let i = 0; i < results.length; i++) {
  var box = $("#resultBox");
  var card = $("<div>");
  var cardName = $("<p>");
  var state = $("<p>");
  var code = $("<p>");
  var url = $("<a>");
  var list = $("<ul>");
  var img = $("<img>");
  var description = $("<p>");
  cardName.text(results[i].parkName);
  state.text(results[i].parkState);
  code.text(results[i].parkCode);
  url.text(results[i].parkURL);
  url.attr("href", results[i].parkURL);
  img.attr("src", results[i].img);
  description.text(results[i].description);

  card.append(img);
  card.append(description);
  card.append(cardName);
  card.append(state);
  card.append(code);
  card.append(url);
  card.append(list);
  //loop for attractions
  for (let x = 0; x < results[i].attraction.length; x++) {
    listEl = $("<li>");
    listEl.text(results[i].attraction[x]);
    list.append(listEl);
  }
  card.append(list);
  box.append(card);
}
