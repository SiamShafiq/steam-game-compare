let api_key = '9E57BE1BFF6EDFE3E88D59A10132E9EB';
let steam_profile = "76561198093023428";
let url = `https://protected-castle-91862.herokuapp.com/https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${api_key}&steamid=${steam_profile}&format=json`
let steamGames = "https://protected-castle-91862.herokuapp.com/https://api.steampowered.com/ISteamApps/GetAppList/v2";
let check1 = false;
let check2 = false;

// let steamurl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${api_key}&steamids=${id}`;

//76561198093023428
//76561198118253636

let idCollections = [];

$("#compareBtn").prop("disabled", true);

// let seek1 = document.getElementById("#steamIDinput1");
// $(document).ready(function() {
//   $("#seekBtn1").click(function(){
//       let steamIDinput = $("#steamIDinput1").val();
//       let new_url = `https://protected-castle-91862.herokuapp.com/https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${api_key}&steamid=${steamIDinput}&format=json`
//       addGameNames(new_url, 1);
//       check1 = true;
//   }); 
// });

$(document).ready(function() {
  $("#addSteamID").click(function(){
      let steamIDinput = $("#steamIDinput").val();
      let steamurl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${api_key}&steamids=${steamIDinput}`;
      
      //TODO: Add Steam profile name to DOM.

      if(idCollections.includes(steamIDinput)){
        alert("You've already entered this Steam ID. Try again.");
        $("#steamIDinput").val('');
      }else if($("#steamIDinput").val() == ''){
        alert("You haven't input anything. Try again.");
      }
      else{
        idCollections.push(steamIDinput);
        $("#id_list").append(steamIDinput + ", ");
        $("#steamIDinput").val('');
      }
      if(idCollections.length > 0){
        $("#findGamesBtn").prop("disabled", false);
      }
  }); 
});

$(document).ready(function() {
  $("#findGamesBtn").click(function(){
    findCommonGames();
    // findCommonGames();
  }); 
});


function getSteamGames(customURL) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: customURL,
      type: 'GET',

      success: function (data) {
        resolve(data)
      },
      error: function (error) {
        reject(error)
      },
    })
  })
}

function getAppIdNames(){
  return new Promise((resolve, reject) => {
    $.ajax({
      url: steamGames,
      type: 'GET',

      success: function (data) {
        resolve(data)
      },
      error: function (error) {
        reject(error)
      },
    })
  })
}
let smallest = 100000;
let small_index = 0;
let appIDCollections = [];
//76561198093023428 //t
//76561198118253636 //s
//76561198048010035 //sbd

function findCommonGames(){
  let gamesList = [];

  idCollections.forEach((steam_profile) => {
    let url = `https://protected-castle-91862.herokuapp.com/https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${api_key}&steamid=${steam_profile}&format=json&include_appinfo=1`
    getSteamGames(url).then((data) =>{
      console.log(data);
      let games = data["response"]["games"];
      let appId = [];
      
      for(var i = 0; i < games.length; i++){
        appId.push(games[i]["appid"]);
      }

      appIDCollections.push(appId);
    })
  });

  setTimeout(filteredArrays, 3000);
}

function filteredArrays(){
  for(let i = 0; i < appIDCollections; i++){
    console.log(appIDCollections[i]);
  }
  // var filteredArray = []

  // for(let i = 0; i < appIDCollections.length-1; i++){
  //   filteredArray.push(appIDCollections[i].filter(value => appIDCollections[i+1].includes(value)));
  // }

  filteredArray = appIDCollections[0].filter(value => appIDCollections[1].includes(value));
  console.log(filteredArray);

  let gamesCounter = 0;

  getAppIdNames().then((data) =>{
    let appNames = data["applist"]["apps"];

    for(var i = 0; i < filteredArray.length; i++){
      for(var names of appNames){
        if(filteredArray[i] == names["appid"]){
          gamesCounter++;
          $("#gameslist").append("<li>" + names["name"] + "</li>");
        }
      }
    }

    $("#list_title span").text(gamesCounter);
  })
}

function addGameNames(url, check){
  getSteamGames(url).then((data) => {
    console.log(data);
    let games = data["response"]["games"];
    let counter = 0;
    
    getAppIdNames().then((data) =>{
      let appNames = data["applist"]["apps"];
      for(var gameID of games){
        // console.log(gameID["appid"]);
        for(var names of appNames){
          if(gameID["appid"] == names["appid"]){
            console.log(names["name"]);
            if(check == 1){
              $("#gamelist").append("<li>" + names["name"] + "</li>");
            }else{
              $("#gamelist2").append("<li>" + names["name"] + "</li>");
            }
          }
        }

        if(check1 && check2){
          $("#compareBtn").prop("disabled", false);
        }
      }
      
    })
  })
}


