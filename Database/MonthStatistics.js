const Sequelize = require('sequelize');
const connection = require("./database");

const postAverage = connection.define('average_month',{
    consumption_ram:{
        type: Sequelize.NUMBER,
        allowNull: false
    },
    date_Query:{
        type: Sequelize.DATE,
        allowNull: false
    }
});

postAverage.sync({force: false})
.then(() => {
    console.log('execução');
})

module.exports = postAverage;