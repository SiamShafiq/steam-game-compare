let api_key = '9E57BE1BFF6EDFE3E88D59A10132E9EB';

let url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${api_key}&steamids=76561197960435530`
$.ajax({url: url, success: function(result){
    console.log(result);
  }});