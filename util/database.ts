import mysql from 'mysql2/promise';

const Pool: mysql.Pool = mysql.createPool({
    host: 'localhost',
    user: 'dubem',
    database: 'first-app',
    password: 'your_password'
});

export default Pool;


