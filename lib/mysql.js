var mysql = require("mysql");

function getConnOptions() {
    return {
        host: process.env.ENDPOINT_ADDRESS,
        port: process.env.MYSQL_PORT,
        user: process.env.MASTER_USERNAME,
        password: process.env.MASTER_PASSWORD,
        database: process.env.DB_NAME
    }
}


function connect(){
    return new Promise((resolve, reject) => {
        let conn = mysql.createConnection(getConnOptions());
        conn.connect(function (err) {
            if (err) {
                reject(err.stack)
            }
            resolve(conn)
        });
    });
}


function end(conn) {
    return new Promise((resolve, reject) => {
        conn.end(function (err) {
            if (err)
                reject(err.stack)
            else
                resolve()
        });
    })
}

module.exports = {
    connect: connect,
    end: end
}