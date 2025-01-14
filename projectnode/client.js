
const sql = require('mysql2')

const con = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'rr'
})

/**
 * This functio assumes that the result set is from a stored procedure call. This means
 * that the results sit is an array with length n=2, where the first index
 * is an array of objects containing the request data, and the second index
 * is an array of objects containing metadata for the resultset (headers, etc.)
 * @param {
 * } resultset 
 */
function tablify(resultset) {
    let arr = [];
    let row = [];
    Object.keys(resultset[0][0]).forEach((x) => {
        row.push(x);
    })
    arr.push(row);
    row = [];
    
    resultset[0].forEach((x) => {
        Object.values(x).forEach((y) => {
            row.push(y);
        })
        arr.push(row);
        row = [];
    })

    console.log(arr);
}



function call_sp(sp_name, param_string) {
    let query = `CALL ${sp_name}${param_string} `;
    con.query(query, (err, result, fields) => {
        tablify(result);
    })
}

call_sp("request_login", "('root@rr.ca', '123')");
//call_sp("user_summary", "()");



