let date = new Date();
let currentDate = date.getDate() +'-'+ date.getMonth() +'-'+  (date.getYear() - 100) ;

var timeConsumo = getData()
    .then((result) => {
        console.log(result);
        feedsGraph(result);
    })

function feedsGraph(timeConsumo) {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable(
           timeConsumo

        );
        var options = {
            title: '',
            legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
        chart.draw(data, options);
    }
}
console.log(currentDate);
async function getData() {
    try {
        const response = await fetch("/updateGrafic", {
            method: "GET",
            headers: {'x-date' : currentDate}
             
        });
        const result = await response.json();
        console.log("Success:", result);
        return result;
    } catch (error) {
        console.error("Error:", error);
    }
}