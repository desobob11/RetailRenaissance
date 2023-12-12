const http = require('http')
const sql = require('mysql2')
const io = require('fs')

const hostname = '127.0.0.1'
const port = '8080'



async function query_db(msg_body, res) {
    let sp_name = msg_body.split(";;;")[0];
    let params = msg_body.split(";;;")[1];
    query = `CALL ${sp_name}${params}`;


    con.query(query, (err, result, fields) => {
        if (err) { res.end(JSON.stringify({ "result": [{ "@result": 0 }] })) }
        else {
            console.log(JSON.stringify({ "result": result[0] }));
            res.end(JSON.stringify({ "result": result[0] }));
        }
    })


}


const con = sql.createConnection({
    host: 'localhost',
    user: 'dobrien',
    password: 'abc*123',
    database: 'rr'
})



var req = io.readFileSync("sql/CUSTOMERS_get_all_data.sql", "utf-8");
var files = io.readdirSync("sql/SP")


files.forEach((x) => {
    var req = io.readFileSync(`sql/SP/${x}`, "utf-8");
    console.log(x);
    con.query(req);
})
