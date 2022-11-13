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
var searchResultArr = [];
var stateFlagArr = {
  AK: "./images/flags/icons8-alaska-flag-100.png",
  AR: "./images/flags/icons8-arkansas-flag-100.png",
};
var response = {};
//DOM vars
//search elements
var searchForm = $("#searchForm");
var searchBox = $("#searchBox");
var stateSearchBox = $("#stateSearchBox");
var selectBox = $("#select");
var searchBtn = $("#searchBtn");

//Modal Variables - Getz
// const myModal = new bootstrap.Modal(document.getElementById('getzModal'), options)

var returnGlobal = function (response) {
  npsData = response;
  return npsData;
};

var stateSort = function (response, state) {
  for (let i = 0; i < response.data.length; i++) {
    //loop goes through every item in the parks arr inside of Data
    for (let x = 0; x < response.data[i].parks.length; x++) {
      //checks if the parks state code is = to colorado if so then push park fullName into an arr and park actives call .name
      if (response.data[i].parks[x].states === state) {
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
  //change this arr to be all parks
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
    console.log("NPS API DATE RECEIVED");
    // stateSort(response);
    returnGlobal(response);
  });

//auto complete national parks arr
var fillSearchOption = function (parksArr) {
  //loops through loop looking for duplicate values in new array if there are none then it adds it to the new array.
  for (let i = 0; i < parksArr.length; i++) {
    if (searchFillArr.includes(parksArr[i].parkName)) {
    } else {
      //adding new value to array
      searchFillArr = searchFillArr.concat(parksArr[i].parkName);
    }
  }
  //adding autofill with JQuery UI
  $("#searchBox").autocomplete({
    source: searchFillArr,
  });
};

//stringify and store array into local storage
var storeArr = function (arr) {
  localStorage.removeItem("search");
  localStorage.setItem("search", JSON.stringify(arr));
  // document.location.href = "./results.html";
};

//combine park actives into one fancy object
var parkActivityCombine = function (arr) {
  //sets a var to the first array element
  firstItem = arr[0];
  for (let i = 0; i < arr.length; i++) {
    //add item from arr.attractions to the firstItem attractions array
    firstItem.attraction.push(arr[i].attraction[0]);
  }
  arr = [firstItem];
  return arr;
};

//search parks array
var parksArrSearch = function (search, dropDown) {
  console.log(search);
  console.log(dropDown);
  //modal saying please enter value
  if (search === "" && dropDown === "") {
    $("#myModal").modal();
    return;
  }
  //search by dropdown only
  if (search === "" && dropDown !== "") {
    console.log("search by drop down");
    searchResultArr = [];
    for (let i = 0; i < parksArr.length; i++) {
      //check ever list item if the .activity is = to dropdown value then append to search result list
      if (parksArr[i].attraction[0] === dropDown) {
        searchResultArr = searchResultArr.concat(parksArr[i]);
      }
    }
  }
  //checks search by searchBox only
  if (search !== "" && dropDown === "") {
    console.log("search by park");
    searchResultArr = [];
    //check ever list item if the .parkNAme is = to searchBox value then append to search result list

    //new array to combine all parks and park activity
    for (let i = 0; i < parksArr.length; i++) {
      if (parksArr[i].parkName === search) {
        searchResultArr = searchResultArr.concat(parksArr[i]);
      }
    }
    searchResultArr = parkActivityCombine(searchResultArr);
  }
  //search by park and drop down
  if (search !== "" && dropDown !== "") {
    //clear arrays
    searchResultArr = [];
    firstFilter = [];
    for (let i = 0; i < parksArr.length; i++) {
      //first fill the filter array with all items with park name
      if (parksArr[i].parkName === search) {
        firstFilter = firstFilter.concat(parksArr[i]);
      }
    }
    console.log(firstFilter);
    //then filter park name by activity
    for (let i = 0; i < firstFilter.length; i++) {
      if (firstFilter[i].attraction[0] === dropDown) {
        searchResultArr = searchResultArr.concat(firstFilter[i]);
      }
    }
  }
  //return to global scope
  console.log(searchResultArr);
  //takes user to results page
  parkInfoSearch();
  return searchResultArr;
};

//appends response data to parksArr objects
var parksSearchArrAppend = function (response, parksArr) {
  for (let i = 0; i < response.data.length; i++) {
    for (let x = 0; x < parksArr.length; x++) {
      if (response.data[i].fullName === parksArr[x].parkName) {
        //append parksarr[i] object with response.data info
        parksArr[x].img = response.data[i].images[0].url;
        parksArr[x].description = response.data[i].description;
        parksArr[x].lat = response.data[i].latitude;
        parksArr[x].long = response.data[i].longitude;
      }
    }
  }
  console.log(parksArr);
  storeArr(searchResultArr);
};

//gets park description, image, and lon lat from NPS api
var parkInfoSearch = function () {
  var url =
    "https://developer.nps.gov/api/v1/parks?stateCode=CO&api_key=ghDseNHrR36kawXtMRDPM3LL1oBoNJDdwOsQhbve";
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var parksInfo = data;
      console.log(data);
      parksSearchArrAppend(parksInfo, searchResultArr);
    });
};

var npsData = [];

//onclick for search
searchBtn.click(function (event) {
  event.preventDefault();
  search = searchBox.val();
  dropDown = selectBox.val();
  state = stateSearchBox.val();
  stateSort(npsData, state);
  parksArrSearch(search, dropDown);
});
