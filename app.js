const Steam = require('steam')
const Twitter = require('twitter')
const env = require('dotenv').config()

const steamClient = new Steam.SteamClient();
const steamUser = new Steam.SteamUser(steamClient);
const steamFriends = new Steam.SteamFriends(steamClient);

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

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

steamFriends.on('message', function(source, message, type, chatter) {
    if (type === 1) {
        steamFriends.sendMessage(source, 'Look for your message at https://twitter.com/spinyswordfish')

        if (message.length > 140) {message = message.slice(0, 139)}
        client.post('statuses/update', {status: message},  function(error, tweet, response) {
          if(error) {console.log(error)};
          console.log(`recieved ${message} from ${source}`);  // Tweet body.
        });
    }
  // if (message == 'ping') {
  //   steamFriends.sendMessage(source, 'pong', Steam.EChatEntryType.ChatMsg); // ChatMsg by default
  // }
});
