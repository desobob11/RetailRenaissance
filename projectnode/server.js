const http = require('http')
const sql = require('mysql2')

const hostname = '127.0.0.1'
const port = '8080'

const query_map = {'QUERY1': 'SELECT * FROM sakila.address;'}

var result_set



async function query_db(query_id, res) {


    con.query('SELECT * FROM sakila.address;', (err, result, fields) =>  {
        if (err) throw err
        result_set = result
        console.log(result_set)
        res.end(JSON.stringify(result_set))
    })
}


const con = sql.createConnection({
    host: 'localhost',
    user: 'dobrien',
    password: 'abc*123',
    database: 'sakila'
})


    const server = http.createServer((req, res) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text')
        console.log(req.headers["content-language"])
        query_db(req.headers['query'], res)
       //res.end("suceess")

    })


    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`)
    })
