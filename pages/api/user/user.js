import jwt from 'jsonwebtoken';
import { db } from "../../../config/db"
const secret = process.env.SECRET;

function verifyToken(req){
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];

      const decoded = jwt.verify(token, secret);
    const email = decoded.email;
      return email;
}
    export default async function handler(req, res) {
        // Return the user ID from the decoded token
        const email=verifyToken(req)
        console.log(email)
        db.execute('SELECT * FROM `users` where email=? ',[email],(err,reslt)=>{
        
            res.status(200).json({
                user: reslt[0]
              });
          })
       
  }