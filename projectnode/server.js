const http = require('http')
const sql = require('mysql2')

const hostname = '127.0.0.1'
const port = '8080'







async function query_db(msg_body, res) {
    let sp_name = msg_body.split(";;;")[0];
    let params = msg_body.split(";;;")[1];
    query = `CALL ${sp_name}${params}`;

    con.query(query, (err, result, fields) =>  {
        if (err) throw err
        console.log(JSON.stringify({ "result": result[0] }));
        res.end(JSON.stringify({"result": result[0]}));
    })
}


const con = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Cam1pos2!',
    database: 'rr'
})


    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        req.on('data', (x) => {
            query_db(x.toString(), res)
        })
    })


    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`)
    })
