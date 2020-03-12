const path=require('path')
const express=require("express")
const hbs=require("hbs")

const geocode = require("../src/utils/geocode.js")
const forecast = require("../src/utils/forecast.js")

//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000


//Define Paths for express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath =path.join(__dirname,'../templates/views')
const partialPath =path.join(__dirname,'../templates/partials')

//Setup handlebars engine & Views Location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//set up Static Directory to serve
app.use(express.static(publicDirectoryPath))

//Page Routes created for index, about, help page
app.get('', (req,res)=>{
	res.render("index",{
		title:"Weather App",
		name: "Rounak Shah"
	})
})

app.get('/about',(req,res)=>{
	res.render("about",{
		title: "About me",
		name: "Rounak Shah"
	})
})

app.get("/help",(req,res)=>{
	res.render("help",{
		helpText:"This is helpful text",
		title:"Help",
		name:"Rounak Shah"
	})
})


//Below 3 lines only works if we have set root index page path using app.use()
// app.get('', (req,res)= >{
// 	res.send('<h1>Weather</h1>')
// })
app.get('/weather', (req,res)=>{
	if(!req.query.address){
		return res.send({
			error : "You must Provide an address term"
		})
	}

	geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
		if(error){
		return res.send({error})
			}
		forecast(latitude,longitude, (error, forecastData) => {
	  		if(error){
				return res.send({error})
				}
			res.send({
				foreCast : forecastData,
				Location : location,
				address : req.query.address
			})
		})

	})
	
})
 
app.get('/help/*',(req,res)=>{
	res.render('error',{
		error:"help article not found",
		title:"404",
		name:"Rounak Shah"
	})
})

app.get('*',(req,res)=>{
	res.render('error',{
		error:"Page Not found",
		title:"404",
		name:"Rounak Shah"
	})
})

app.listen(port,()=>{
	console.log('Server is up on Port '+ port)
})
 