const zo = require('zod');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connectDB = require('../connectionDB');


const userValidation = zo.object({
name: zo.string(),
  email: zo.string(),
  password: zo
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
      error: "password must consist of letter, special character and number",
    })

});

 async function Registercontroller (req,res){

    try {
        const { name, email, password} = req.body;
        if(!name||!email||!password){
            return res.status(400).json({
                message:"please provide proper all required fields"
            });
        }
        const userExists = await connectDB.query('SELECT FROM users WHERE email = $1',[email]);

        if(userExists.rows.length > 0){
            return res.status(400).json({message:"User already exist"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await connectDB.query(
            'INSERT INTO users (name , email ,password) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, hashedPassword]
        );
        return res.status(201).json({ user : newUser.rows[0]})  
    
    } catch (error) {
        res.status(501).json({
            message:"Error in user Registratin",
            error:error.message,
        })
    }
}

async function login(req,res){
try {
    const {email ,password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            messaage:'plaese provide the valid information'
        });
    }
    const user = await connectDB.query('SELECT * FROM users WHERE email =$1',[email]);
    if(user.rows.length === 0){
        return res.status(400).json({message:'invalid credentials'})
    }
    const userData = user.rows[0];
    const validUser = await bcrypt.compare(password, userData.password);

    if (!validUser){
        return res.status(400).json({
            message:"invalid credentials"
        });
    }res.json({
        user:{id: userData.id,
            name:userData.userName,
            email:userData.email
        }
    })

} catch (error) {
    res.status(501).json({
            message:"Error in user Registratin",
            error:error.message,
        })
}
}

module.exports = { Registercontroller, login};