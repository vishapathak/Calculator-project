const {Client} = require('pg')

const connectDB = new Client({
    host : process.env.HOST,
    user: process.env.USER,
    port: process.env.DBPORT,
    password: process.env.PASSWORD,
    database:process.env.DATABASE
})
try {
    connectDB.connect().then( () => console.log("Connected to Database SQL"))
} catch (error) {
    console.log("Unexpected error occur in db",error)
}
 module.exports = connectDB;