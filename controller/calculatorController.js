const connectDB = require("../connectionDB");

async function SaveCalculation(req, res) {
  try {
    const { expression, result } = req.body;
    if ((!expression, !result)) {
      res.status(400).json({
        message: "Please provide a proper expression",
      });
    }
    const user_id = req.user.id;
    const calcution = await connectDB.query(
      "INSERT INTO calculation ( user_id, expression , result) VALUES ($1,$2,$3) RETURNING user_id, expression, result",
      [user_id, expression, result],
    );
    return res.status(201).json({
      message: "Done",
      calculation: calcution.rows[0], /// yaha .rows kyu use kiya hai
    });
  } catch (error) {
     console.log("SAVE CALCULATION ERROR:", error);
    res.status(500).json({
      message: " error saving calculation",
      error: error.message,
    });
  }
}

async function getCalculation(req, res) {
  try {
    const userId = req.user.id;
    console.log("USER ID", userId);
    const calculations = await connectDB.query(
      `SELECT *
       FROM calculation
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 1`,
      [userId],
    );
     console.log("GET calculation:", calculations.rows);
    
    if (calculations.rows.length === 0) {
      return res.status(404).json({
        message: "no previous calculation found",
      });
    }
    res.json({
      calculation: calculations.rows[0],
    });
  } catch (error) {
    console.log("get error",error)
    res.status(500).json({
      message: "Error occur while fetching calculation",
      error: error.message,
    });
  }
}

module.exports = { SaveCalculation, getCalculation };
