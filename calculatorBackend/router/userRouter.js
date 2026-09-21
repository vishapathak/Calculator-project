const express = require("express");
const  { Registercontroller, login} = require("../controller/userController");
const auth = require("../middleWare/calculatorMidlerWare");
const route = express.Router();
{/**
    endpoint of register API is "/v1/register/calculator"
    */}
route.post( "/register", Registercontroller);

{
    /** endpoint for login APi is "/v1/login/calculator" */
}
route.post("/Login",auth,login);

module.exports = route;

