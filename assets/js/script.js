var config = {
  NPS_KEY: "ghDseNHrR36kawXtMRDPM3LL1oBoNJDdwOsQhbve",
};
var NPS_key = config.NPS_KEY;
var url =
  "https://developer.nps.gov/api/v1/activities/parks/?api_key=" +
  NPS_key +
  "&limit=50";
var parksArr = [];
var searchFillArr = [];
//DOM vars
//search elements
var searchBox = $("#searchBox");
var selectBox = $("#select");
var searchBtn = $("#searchBtn");

var stateSort = function (response) {
  for (let i = 0; i < response.data.length; i++) {
    //loop goes through every item in the parks arr inside of Data
    for (let x = 0; x < response.data[i].parks.length; x++) {
      //checks if the parks state code is = to colorado if so then push park fullName into an arr and park actives call .name
      if (response.data[i].parks[x].states === "CO") {
        // if state park code = CO then create new object and push to park arr
        parksArr.push({
          //object keys and values pulled from NPS API
          //attraction is a empty array to be filled with duplicate park attractions
          attraction: [].concat(response.data[i].name),
          parkState: response.data[i].parks[x].states,
          parkCode: response.data[i].parks[x].parkCode,
          parkName: response.data[i].parks[x].fullName,
          parkURL: response.data[i].parks[x].url,
        });
      }
    }
  }
  console.log(parksArr);
  fillSearchOption(parksArr);
  return parksArr;
};
// //filter: if
// var newarray = [];
// response.data.filter((value) => newarray.includes(value));
// newarray.push(response.data[i]);

//fetch for parks in NPS api
fetch(url)
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (response) {
    //console logs all response from API
    console.log(response);
    //stateSort function
    stateSort(response);
  });

//creates array for search bar auto fill without any repeating values
var fillSearchOption = function (parksArr) {
  //loops through loop looking for duplicate values in new array if there are none then it adds it to the new array.
  for (let i = 0; i < parksArr.length; i++) {
    if (searchFillArr.includes(parksArr[i].parkName)) {
    } else {
      //adding new value to array
      searchFillArr = searchFillArr.concat(parksArr[i].parkName);
    }
  }
  console.log(searchFillArr);
  //adding autofill with JQuery UI
  $("#searchBox").autocomplete({
    source: searchFillArr,
  });
};

//onclick for search
searchBtn.click(function (event) {
  event.preventDefault();
  search = searchBox.val;
  // activities = selectBox.val;
  console.log(search);
  console.log(activities);
});
