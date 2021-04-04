const request = require('request')

const forcast = (latitude, longitude, callback) =>{

    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ encodeURIComponent(latitude) + '&lon='+ encodeURIComponent(longitude) + '&units=metric&exclude={part}&appid=30404f3ff76330bebf0e470768e51946'
    
    request({url, json : true}, (error, {body}) => {    // (response) destructuring
        if(error){
            callback('Unable to connect to weather service', undefined)
        }else if(body.message){
            callback('Unabe to find the location. Please try another location')
        }else{
            const data = body
            callback(undefined,
                "The weather is " + body.current.weather[0].description +". It is currently " + data.current.temp + " degrees outside. Air is "+data.current.humidity + " percent humid. Also the wind speed is "+body.current.wind_speed +"Km/hr."
            )
        }
    })
}

module.exports = forcast