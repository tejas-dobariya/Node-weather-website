const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port=process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, './')
const viewPath=path.join(__dirname,'./templates/views')
const partialPath=path.join(__dirname,'./templates/partials')

app.set('views',viewPath)
app.set('view engine','hbs')
hbs.registerPartials(partialPath)
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Tejas Patel',
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name: 'Tejas Patel',
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        example:'Hello you should read weather guide given in intro section',
        name: 'Tejas Patel',

    })
})

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'It is snowing',
//         location: 'Philadelphia'
//     })
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must enter address first'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address,
            })
        })
    })
        // res.send({
        //     forecast: 'It is snowing',
        //     location: 'Philadelphia',
        //     address:req.query.address,
        // })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
       products:[] 
    })
})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Tejas Patel',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Tejas Patel',
        errorMessage:'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})