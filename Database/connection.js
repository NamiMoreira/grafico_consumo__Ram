const fs = require("fs");
oracledb = require("oracledb")

async function consultaDB(cartao, consultReajuste) {
    
    const selectBase = fs.readFileSync(__dirname + '/select.txt').toString()
    const clientOpts = { libDir: "C:/oracle/instantclient_11_2" };
    const config = {
        user: "srcadger",
        password: "srcadger",
        connectString: "192.168.10.2:1521/TASYPRINC",
    };
  
    try {
      oracledb.initOracleClient(clientOpts);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  
    var valueSelect = await returnReajust();
    async function returnReajust() {
      try {
        const connection = await oracledb.getConnection(config);
        const result = await connection.execute(selectBase);
        doRelease(connection);
        return result.rows;
      } catch (e) {
        console.log(e);
      }
    }
  
    function doRelease(connection) {
      connection.close(function (err) {
        if (err) console.error(err.message);
      });
    }
  
    return valueSelect;
  }

  module.exports = {consultaDB};