
const express= require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    
    res.sendFile(__dirname+"/index.html");
});

function titleCase(string){
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }
app.post("/", function(req,res){
    var city = titleCase(req.body.city);
    var appid = '6f6fb1e1f28232ecc09f7b24ade9cc83';
    
    const url='https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid='+appid
    
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp = weatherData.main.temp;
            const iconCode = weatherData.weather[0].icon;
            const imgUrl = 'http://openweathermap.org/img/wn/'+iconCode+'@2x.png';
            const description = weatherData.weather[0].description;
            console.log(temp, description);
        res.write('<h1>Weather today</h1>')
        res.write("<p>The temperature in "+city +" is " +temp+ " degrees Celsius, "+description+ ".</p>" );
        res.write('<img src='+imgUrl+'></img>');
        res.send();

        
        })
    });

})


app.listen(3000, function (){
    console.log("Port running on port 3000.")
});