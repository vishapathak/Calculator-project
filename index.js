require("dotenv").config();

const express = require("express");
const cors = require("cors");
const route = require("./router/userRouter");
const router = require("./router/calculatezrouter")
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use("/v1/calculator", route);
app.use("/v1/calculator", router);

const port = process.env.PORT || 8080;

app.listen(port, "0.0.0.0", () => {
    console.log(`server is running on ${port}`);
});