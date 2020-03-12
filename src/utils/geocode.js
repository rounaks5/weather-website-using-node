const request = require('request')
const geocode=(address,callback)=>{
	const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoicm91bmFrczUiLCJhIjoiY2s2eHk2ZTNhMHEwZTNmbXZndjF3Y3R2cyJ9.Eh4AKO5FtXeECRkNHeu9Lw&limit=1"
	request({url,json:true},(error,{body}={})=>{
		if(error){
			callback("Unable to Connect to MapBox Location Services!",undefined)
		}
		else if(body.features.length===0){
			callback('No Matching Results Found',undefined)
		}
		else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude:body.features[0].center[0],
				location :body.features[0].place_name
			})
		}
	})
}

module.exports = geocode