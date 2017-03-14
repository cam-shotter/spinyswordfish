const Twitter = require('twitter')
const env = require('dotenv').config()
const cheerio = require('cheerio')

const client = new Twitter({
  consumer_key: process.env.ALT_CONSUMER_KEY,
  consumer_secret: process.env.ALT_CONSUMER_SECRET,
  access_token_key: process.env.ALT_ACCESS_TOKEN,
  access_token_secret: process.env.ALT_ACCESS_TOKEN_SECRET
});

let devices = {}

function stream() {
    let start = Date.now()
    client.stream('statuses/filter', {track: 'news'}, function(stream) {
        stream.on('data', function(event) {
            if (event && event.source) {
                let $ = cheerio.load(event.source)
                if (!devices[$.text()]) {
                    devices[$.text()] = 1;
                } else {
                    devices[$.text()]++
                }
                console.log((Date.now()-start)/1000);
            }

            if (Date.now() - start > 5000) {
                stream.destroy()
                console.log(devices)
            }
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
