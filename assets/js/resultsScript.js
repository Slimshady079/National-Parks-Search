results = JSON.parse(localStorage.getItem("search"));
console.log(results);

//pulled from my past project -Jackson Grimm
function currentWeather(lat, lon, i) {
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
      buildCards(results, temp, i);
    });
}

function buildCards(results, temp, i) {
  var card = $("<div>");
  var cardTitle = $("<div>");
  var box = $("#resultBox");

  //creates elements and adds classes/IDs
  stateFlag = $("<img>");
  stateFlag.attr("id", "flagIcon");
  card.addClass("card");
  var cardName = $("<p>");
  cardName.attr("id", "cardName");
  var state = $("<p>");
  state.addClass("state");
  var code = $("<p>");
  code.addClass("code");
  var url = $("<a>");
  url.addClass("url");
  var list = $("<ul>");
  list.addClass("list");
  var img = $("<img>");
  img.addClass("parkImg");
  var description = $("<p>");
  description.addClass("desc");

  //adds text content and sources to elements inside card
  cardTitle.addClass("cardTitle");
  stateFlag.attr("src", "./images/coloradoFlagIcon.png");
  cardName.text(results[i].parkName);
  state.text("State Code: " + results[i].parkState);
  code.text("Park Code: " + results[i].parkCode);
  url.text(results[i].parkURL);
  url.attr("href", results[i].parkURL);
  url.text("Park Webpage");
  img.attr("src", results[i].img);
  description.text(results[i].description);

  //waze frame
  var WazeSrc =
    "https://embed.waze.com/iframe?zoom=12&lat=" + lat + "&lon=" + long;
  var wazeFrame = $(
    "<iframe width ='400' height='600' src=" + WazeSrc + "></iframe>"
  );
  wazeFrame.attr("id", "wazeFrame");
  wazeFrame.attr("loading", "lazy");
  wazeFrame.addClass("wazeFrame");

  //card build
  //card title
  cardTitle.append(stateFlag);
  cardTitle.append(cardName);
  // following elements underneath
  card.append(cardTitle);
  card.addClass("cards");
  card.append(img);
  card.append(description);
  card.append(list);
  card.append(state);
  card.append(temp);
  card.append(code);
  card.append(url);
  //loop for attractions
  for (let x = 0; x < results[i].attraction.length; x++) {
    listEl = $("<li>");
    listEl.text(results[i].attraction[x]);
    list.append(listEl);
  }
  card.append(list);
  card.append(wazeFrame);
  box.append(card);
}

for (let i = 0; i < results.length; i++) {
  //creates container for cards and cards el
  var lat = results[i].lat;
  var long = results[i].long;
  //calls weather function with weather API
  currentWeather(lat, long, i);
}
