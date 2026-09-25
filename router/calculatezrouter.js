const express = require('express');
const router = express.Router();

const auth = require("../middleWare/calculatorMidlerWare")
const {SaveCalculation, getCalculation} = require("../controller/calculatorController");

router.post("/saveCalculation",auth, SaveCalculation);

router.get("/getCalculation",auth,getCalculation)

module.exports = router;
