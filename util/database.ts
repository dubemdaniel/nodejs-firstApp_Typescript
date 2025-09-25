import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'localhost', 
    user: 'dubem',
    database: 'first-app',
    password:'your_password'
})

export default pool