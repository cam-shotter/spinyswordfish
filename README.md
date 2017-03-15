# Spinyswordfish

This is a bot thing that [Cam](https://github.com/cam-shotter) and I built for fun as an exercise in pair programming.

It's a Steam bot that takes messages sent to it and tweets them out which you can see the result of [here](https://twitter.com/spinyswordfish)

At the moment, it isn't online and may not be ever again since honestly, it's just a novelty thing

We also deviated into messing around with the twitter streaming API which you can see in test.js

The thinking was that it could constantly check for replies to the twitter account and send them to random users who had replied to the account but we got sidetracked heavily.

Overall, it was a pretty good learning experience though!

In order to use the bot, it needs a Twitter account + dev application credentials to be placed in the .env file (check https://dev.twitter.com)

It also requires a Steam account. At first it'll work straight away but after a few attempts, Valve may freak out and require Steam Guard. When that happens, just pass it in as process.argv[2]


For example, `node app.js "steam_guard_code_here"`