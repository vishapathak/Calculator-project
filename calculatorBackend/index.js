require("dotenv").config();
const express = require("express");
const db =require("./connectionDB");
const app = express();

app.use(express.json());
(db);
const port = process.env.PORT|| 8080;
app.listen(port,() => {
    console.log(`server is running on ${port}`)
});