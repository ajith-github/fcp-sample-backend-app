var mysql = require("mysql");// First you need to create a connection to the db
var con = mysql.createConnection({
    host: "12.34.56.78",
    user: "peter",
    password: "1234",
    database: "southwind"
});
con.connect(function (err) {
    if (err) {
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});

function close(){
    con.end(function (err) {
        // The connection is terminated gracefully
        // Ensures all previously enqueued queries are still
        // before sending a COM_QUIT packet to the MySQL server.
        if (err) console.log('err: ', err);
        else console.log('Terminated done: ');
    });
}