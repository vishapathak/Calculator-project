const express = require("express");
const  { Registercontroller, login} = require("../controller/userController")
const route = express.Router();
{/**
    endpoint of register API is "/v1/register/calculator"
    */}
route.post( "/v1/register/calculator", Registercontroller);

{
    /** endpoint for login APi is "/v1/login/calculator" */
}
route.post("/v1/register/calculator", login);

module.exports = route;

