const Twitter = require('twitter')
const env = require('dotenv').config()
const cheerio = require('cheerio')

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

let devices = {}

function stream() {
    let start = Date.now()
    client.stream('statuses/filter', {track: '@support'}, function(stream) {
        stream.on('data', function(event) {
            if (event && event.text) {
                console.log(event.text);
                // let $ = cheerio.load(event.source)
                // if (!devices[$.text()]) {
                //     devices[$.text()] = 1;
                // } else {
                //     devices[$.text()]++
                // }
                // console.log((Date.now()-start)/1000);
            }

            // if (Date.now() - start > 5000) {
            //     stream.destroy()
            //     console.log(devices)
            // }
        })

        stream.on('error', function(error) {
            throw error
        })

        stream.on('close', function() {
            console.log('closed')
        })
    })
}

stream()
