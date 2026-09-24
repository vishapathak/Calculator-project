const express = require('express');
const calculateroute = express.Router();

const auth = require("../middleWare/calculatorMidlerWare")
const {SaveCalculation, getCalculation} = require("../controller/calculatorController");

calculateroute.post("/saveCalculation",auth, SaveCalculation);

calculateroute.get("/getCalculation",auth,getCalculation)

module.exports = {calculateroute};
