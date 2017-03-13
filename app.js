const steam = require('steam')
const env = require('dotenv').config()

const steamClient = new Steam.SteamClient();
const steamFriends = new Steam.SteamFriends(steamClient);

steamClient.connect();
steamClient.on('connected', function() {
  steamUser.logOn({
    account_name: process.env.STEAM_USERNAME,
    password: process.env.STEAM_PASSWORD
  });
});

steamClient.on('logOnResponse', function(logonResp) {
  if (logonResp.eresult == Steam.EResult.OK) {
    console.log('Logged in!');
    steamFriends.setPersonaState(Steam.EPersonaState.Online); // to display your bot's status as "Online"
  }
});