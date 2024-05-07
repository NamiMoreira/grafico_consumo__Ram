const fs = require("fs");
const connection = require("./database");
const postAverage = require("./MonthStatistics")

function writeData(currentDate){
console.log(currentDate);
const dateFileServer =  JSON.parse(fs.readFileSync(__dirname + '/public'))

if (dateFileServer.data.value != currentDate) {
    let statistics = JSON.parse(fs.readFileSync(__dirname + '/public/Statistics.json'))

        getAverage()
        .then((result) =>{
            const averageStatistics = result;
            statistics = {"data" : []}
            fs.writeFileSync(__dirname + '/public/Statistics.json',JSON.stringify(statistics))
            writeDataBase(averageStatistics);
        })
    }else{
        fs.writeFileSync(__dirname + '/public',JSON.stringify(fileServer));
    }
}

function writeDataBase(averageStatistics){
    connection.authenticate()
    .then(() =>{
        console.log('Sucesso')
    })
    .catch((msgErro) =>{
            console.log(msgErro);
    });
    
    postAverage.create({
        consumption_ram : averageStatistics,
        date_query: dateFileServer

    }).then(()=>{
        console.log();
    }).catch((err)=>{
        console.log(err);
    })

}

function getAverage(statistics){
    let sum = 0
    for (let i = 0; i < statistics.data.length; i++) {
        const element = statistics.data[i];
        sum =+ element 
    }
    let average = sum / statistics.data.length;
        return average;
    }