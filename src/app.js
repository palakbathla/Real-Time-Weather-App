const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()
const port = process.env.PORT || 3000    // envionment variable set up by heroku

// Define paths for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handelbars endine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory of serve
app.use(express.static(publicDirectoryPath))         // its a way to customize your server

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Palak'
    })
})

// Setting up routes
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Palak'
    })
})



app.get('/weather',(req,res) =>{
    const data = req.query.address
    if(!data){
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {})=>{         // desturucturing
        if(error){
            return res.send({ error })
        }
        forcast(latitude, longitude, (error,forcastData)=>{
            if(error){
               return res.send({ error })
            }
            res.send({
                forcast: forcastData,
                location,
                address: req.query.address
            })
        }) 
    }) 
})



app.get('*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Palak',
        errorMessage: 'page not found'
    }) // it needs to be kept at the end after all routes
})

app.listen(port, ()=>{
    console.log('Server is up on port '+ port)
})

