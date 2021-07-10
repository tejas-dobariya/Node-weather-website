const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4f33c078e4a1e4a7694337e996ce5428&query=' +latitude+','+longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] +','+ ' It is currently ' + body.current.temperature + ' degress out but it feels like '+ body.current.feelslike  +' and there is a ' + body.current.precip + '% chance of rain.');
        }
    })
}

module.exports = forecast

