var config = {
  NPS_KEY: "ghDseNHrR36kawXtMRDPM3LL1oBoNJDdwOsQhbve",
};
var NPS_key = config.NPS_KEY;
var url =
  "https://developer.nps.gov/api/v1/activities/parks/?api_key=" +
  NPS_key +
  "&limit=50";

var parksArr = [];

var stateSort = function (response) {
  console.log("state Sort");
  for (let i = 0; i < response.data.length; i++) {
    //loop goes through every item in the parks arr inside of Data
    for (let x = 0; x < response.data[i].parks.length; x++) {
      //checks if the parks state code is = to colorado if so then push park fullName into an arr and park actives call .name
      if (response.data[i].parks[x].states === "CO") {
        //check if park code is inside of arr if so dont push
        //add park code into arr
        parksArr.push(
          response.data[i].parks[x].fullName + " " + response.data[i].name
        );
      }
    }
  }
};

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
