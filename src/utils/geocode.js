const request = require('request');

const geocode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2h1YmhhbWt1bWFyMTciLCJhIjoiY2tzNzJxeHc5MGdtdjJ2cHN3bWFxbHlxZSJ9.KQyM3llt4T8Kk0EQKWAJGQ&limit=1`;
    request({url, json: true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to geo-location service!',undefined);
        }
        else if(body.message || body.features.length === 0){
            callback('Unable to find the position!',undefined);
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;