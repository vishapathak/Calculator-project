const jwt = require("jsonwebtoken");

const connectDB = require("../connectionDB");

const secret = process.env.SECRET;
async function auth (req ,res, next) {
    try {
        const token = req.header("auth");// if you use cookie then you have to use req.cookies.token
        if (token === undefined){
            return res.status(400).json({
                error:true,
                success:false,
                message:"login requie first",
            })
        }
        const decode = jwt.verify(token,secret);
        console.log("decode",decode);
        //const userId = req.params.id;
        const id = decode.id;
        console.log("user id from token:", id);
        const user = await connectDB.query("SELECT id ,name, email FROM users WHERE id = $1",[id]);
        if(user.rowCount === 0){
            return res.status(400).json({
                error:true,
                success:false,
                message: "User not found-middleware"
            })
        }

console.log("user from database:", user.rows[0]);
        req.user = user.rows[0];// maatlab kya hai or kyu use hua hai
        next();
    } catch (error) {
        res.status(500).json({
        message:"user is not authenticate",
        error:error.message
    })
    }
}
module.exports = auth;