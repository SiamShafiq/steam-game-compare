let api_key = '9E57BE1BFF6EDFE3E88D59A10132E9EB';
let steam_profile = "76561198093023428";
let url = `https://protected-castle-91862.herokuapp.com/https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${api_key}&steamid=${steam_profile}&format=json`
let steamGames = "https://protected-castle-91862.herokuapp.com/https://api.steampowered.com/ISteamApps/GetAppList/v2";
let check1 = false;
let check2 = false;

$("#compareBtn").prop("disabled", true);

// let seek1 = document.getElementById("#steamIDinput1");
$(document).ready(function() {
  $("#seekBtn1").click(function(){
      let steamIDinput = $("#steamIDinput1").val();
      let new_url = `https://protected-castle-91862.herokuapp.com/https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${api_key}&steamid=${steamIDinput}&format=json`
      addGameNames(new_url, 1);
      check1 = true;
  }); 
});

$(document).ready(function() {
  $("#seekBtn2").click(function(){
      let steamIDinput = $("#steamIDinput2").val();
      let new_url = `https://protected-castle-91862.herokuapp.com/https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${api_key}&steamid=${steamIDinput}&format=json`
      addGameNames(new_url,2);
      check2 = true;
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


