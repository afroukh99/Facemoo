import mysql from 'mysql'

export const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: 'Mo@123456',
    database:'social'
})