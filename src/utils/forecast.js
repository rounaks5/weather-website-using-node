const request = require('request')

const forecast =(lat,long,callback) =>{
	const url = "https://api.darksky.net/forecast/50955ca28f225d827b0f63fca20394aa/"+lat+","+long+"?units=si"
	request({url,json:true},(error,{body})=>{
		if(error)
		{
			callback("Unable to connect to weather Services",undefined)
		}
		else if(body.error){
			callback("Unable to find location",undefined)
		}
		else{
			text=`${body.daily.data[0].summary} Outside temperature is currently ${body.currently.temperature} degree.
				  It is ${body.currently.precipProbability}% probability of rain today.`
			
			callback(undefined,text)
		}

	})

}

module.exports = forecast