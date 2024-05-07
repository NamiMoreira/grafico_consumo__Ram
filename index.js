const express = require ("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const connection = require("./Database/connection");
const wd = require('./Database/writeData')
const host = 'localhost';
const port = 4040;
const fs = require("fs");
const { stringify } = require("querystring");


app.set('view engine','ejs');
app.use('/public',express.static(path.join(__dirname,'/public')));
app.use(bodyParser.urlencoded({extend: false}));

app.get("/", (req, res) =>{
    res.render('index')
});

app.get("/updateGrafic", (req, res) =>{
    let currentDate = req.headers['x-date'];
    wd.writeData(currentDate);

    connection.consultaDB()
    .then((result) =>{
       
        let newValue = result
        let statistics = JSON.parse(fs.readFileSync(__dirname + '/public/Statistics.json'))
        return {statistics,newValue}
       
    }).then((data)=>{
        let dataAtual = new Date();
        let hour = dataAtual.getHours() +':'+ dataAtual.getMinutes();
        let statistics = data.statistics;
        let newValue = data.newValue;
        let dataStatistics = statistics.data;
        dataStatistics.push([hour,newValue[0][0]])
        statistics = {data: dataStatistics}
        fs.writeFileSync(__dirname + '/public/Statistics.json',JSON.stringify(statistics))
        return statistics

    }).then((statistics)=>{
        let data = statistics.data.unshift(['Time','Consumo' ])
        res.send(statistics.data)
       
    })
})

app.listen(port, host, () =>{
    console.log(`Server is running on http://${host}:${port}`);
})