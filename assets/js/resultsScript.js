results = JSON.parse(localStorage.getItem("search"));
console.log(results);

//pulled from my past project -Jackson Grimm
function currentWeather(lat, lon) {
  var url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=569d785adfe9b44db482c835162b2e7a";
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var temp = $("<p>");
      temp.text("temperature " + data.main.temp + "F");
      card.append(temp);
      return temp;
    });
}

for (let i = 0; i < results.length; i++) {
  var box = $("#resultBox");
  var card = $("<div>");

  card.addClass("card");
  var cardName = $("<p>");
  cardName.addClass("cardName");
  var state = $("<p>");
  state.addClass("state");
  var code = $("<p>");
  code.addClass("code");
  var url = $("<a>");
  url.addClass("url");
  var list = $("<ul>");
  list.addClass("list");
  var img = $("<img>");
  var description = $("<p>");
  description.addClass("desc");

  //   <iframe src="https://embed.waze.com/iframe?zoom=12&lat=45.6906304&lon=-120.810983"
  //   width="300" height="400"></iframe>

  var lat = results[i].lat;
  var long = results[i].long;
  //calls weather function with weather API
  currentWeather(lat, long);

  cardName.text(results[i].parkName);
  state.text("State Code: " + results[i].parkState);
  code.text("Park Code: " + results[i].parkCode);
  url.text(results[i].parkURL);
  url.attr("href", results[i].parkURL);
  url.text("Park Webpage");
  img.attr("src", results[i].img);
  description.text(results[i].description);

  var WazeSrc =
    "https://embed.waze.com/iframe?zoom=12&lat=" + lat + "&lon=" + long;
  var wazeFrame = $(
    "<iframe width ='400' height='600' src=" + WazeSrc + "></iframe>"
  );
  wazeFrame.attr("id", "wazeFrame");
  wazeFrame.attr("loading", "lazy");
  wazeFrame.addClass("wazeFrame");
  card.addClass("cards");
  //card build
  card.append(cardName);
  card.append(img);
  card.append(description);
  card.append(list);
  card.append(state);
  card.append(code);
  card.append(url);
  card.append(wazeFrame);
  //loop for attractions
  for (let x = 0; x < results[i].attraction.length; x++) {
    listEl = $("<li>");
    listEl.text(results[i].attraction[x]);
    list.append(listEl);
  }
  card.append(list);
  box.append(card);
}
