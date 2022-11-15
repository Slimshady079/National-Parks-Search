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
var stateFlags = {
  AK: "../../images/flags/icons8-alaska-flag-100.png",
  AZ: "../../images/flags/icons8-arizona-flag-100.png",
  AR: "../../images/flags/icons8-arkansas-flag-100.png",
  CA: "../../images/flags/icons8-california-flag-100.png",
  CO: "../../images/flags/coloradoFlagIcon.png",
  FL: "../../images/flags/icons8-florida-flag-100.png",
  HI: "../../images/flags/icons8-hawaii-flag-100.png",
  ID: "../../images/flags/icons8-idaho-flag-100.png",
  IN: "../../images/flags/icons8-indiana-flag-100.png",
  KY: "../../images/flags/icons8-kentucky-flag-100.png",
  ME: "../../images/flags/icons8-maine-flag-100.png",
  MI: "../../images/flags/icons8-michigan-flag-100.png",
  MN: "../../images/flags/icons8-minnesota-flag-100.png",
  MT: "../../images/flags/icons8-montana-flag-100.png",
  NV: "../../images/flags/icons8-nevada-flag-100.png",
  NM: "../../images/flags/icons8-new-mexico-flag-100.png",
  NC: "../../images/flags/icons8-north-carolina-flag-100.png",
  ND: "../../images/flags/icons8-north-dakota-flag-100.png",
  OH: "../../images/flags/icons8-ohio-flag-100.png",
  OR: "../../images/flags/icons8-oregon-flag-100.png",
  SC: "../../images/flags/icons8-south-carolina-flag-100.png",
  SD: "../../images/flags/icons8-south-dakota-flag-100.png",
  TN: "../../images/flags/icons8-tennessee-flag-100.png",
  TX: "../../images/flags/icons8-texas-flag-100.png",
  UT: "../../images/flags/icons8-utah-flag-100.png",
  VA: "../../images/flags/icons8-virginia-flag-100.png",
  WA: "../../images/flags/icons8-washington-flag-100.png",
  WV: "../../images/flags/icons8-west-virginia-flag-100.png",
  WY: "../../images/flags/icons8-wyoming-flag-100.png",
};
var stateCodeArr = [
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "FL",
  "HI",
  "ID",
  "IN",
  "KY",
  "ME",
  "MI",
  "MN",
  "MT",
  "NV",
  "NM",
  "NC",
  "ND",
  "OH",
  "OR",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VA",
  "WA",
  "WV",
  "WY",
];

var response = {};
//DOM vars
//search elements
var searchForm = $("#searchForm");
var searchBox = $("#searchBox");
var stateSearchBox = $("#stateSearchBox");
var selectBox = $("#select");
var searchBtn = $("#search");

//Modal Variables - Getz
// const myModal = new bootstrap.Modal(document.getElementById('getzModal'), options)

var returnGlobal = function (response) {
  npsData = response;
  fillSearchOption(response);
  return npsData;
};

var stateSort = function (response, state, search) {
  //checks if state search is blank
  if (state === "") {
    for (let i = 0; i < response.data.length; i++) {
      for (let x = 0; x < response.data[i].parks.length; x++) {
        if (response.data[i].parks[x].fullName === search) {
          state = response.data[i].parks[x].states;
          console.log(state);
          break;
        }
      }
    }
  }
  //if user has a state value
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
  parksArrSearch(search, dropDown, state);
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
    fillSearchOption(response);
    returnGlobal(response);
  });

//auto complete national parks arr
var fillSearchOption = function (object) {
  //loops through loop looking for duplicate values in new array if there are none then it adds it to the new array.
  for (let i = 0; i < object.data.length; i++) {
    for (let x = 0; x < object.data[i].parks.length; x++) {
      if (searchFillArr.includes(object.data[i].parks[x].fullName)) {
      } else {
        //adding new value to array
        searchFillArr = searchFillArr.concat(object.data[i].parks[x].fullName);
      }
    }
  }
  //adding autofill with JQuery UI
  $("#searchBox").autocomplete({
    autoFocus: true,
    source: searchFillArr,
  });
  //state code
  $("#stateSearchBox").autocomplete({
    autoFocus: true,
    source: stateCodeArr,
  });
};

//stringify and store array into local storage
var storeArr = function (arr) {
  localStorage.removeItem("search");
  localStorage.setItem("search", JSON.stringify(arr));
  document.location.href = "./assets/HTML/results.html";
};

//combine park actives into one fancy object
var parkActivityCombine = function (arr) {
  console.log("parks combine" + arr);
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
var parksArrSearch = function (search, dropDown, state) {
  console.log(search);
  console.log(dropDown);

  //removed error test cases for later version to use modal.
  //error test cases
  // if (search === "" && dropDown === "" && state === "") {
  //   $("#myModal").modal();
  //   return;
  // }

  // if (dropDown === "" && state !== "") {
  //   $("#myModal").modal();
  //   return;
  // }

  // if (dropDown !== "" && state === "") {
  //   $("#myModal").modal();
  //   return;
  // }

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
  parkInfoSearch(state);
  return searchResultArr;
};

//appends response data to parksArr objects
var parksSearchArrAppend = function (response, parksArr, state) {
  for (let i = 0; i < response.data.length; i++) {
    for (let x = 0; x < parksArr.length; x++) {
      if (response.data[i].fullName === parksArr[x].parkName) {
        //append parksarr[i] object with response.data info
        parksArr[x].flag = stateFlags[state];
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
var parkInfoSearch = function (state) {
  var url =
    "https://developer.nps.gov/api/v1/parks?stateCode=" +
    state +
    "&api_key=ghDseNHrR36kawXtMRDPM3LL1oBoNJDdwOsQhbve";
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var parksInfo = data;
      console.log(data);
      parksSearchArrAppend(parksInfo, searchResultArr, state);
    });
};

var npsData = [];

//onclick for search
searchBtn.click(function (event) {
  localStorage.removeItem("search");
  event.preventDefault();
  search = searchBox.val();
  dropDown = selectBox.val();
  state = stateSearchBox.val();
  stateSort(npsData, state, search);
});
