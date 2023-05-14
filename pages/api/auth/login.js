import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sign } from "jsonwebtoken";
// import mysql from 'mysql';
import { db } from "../../../config/db"
import { serialize } from "cookie";
const secret = process.env.SECRET;
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

  
  db.execute('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
      
      if (error) {
        res.json({ message: 'Server error' });
      } else if (results.length === 0) {
        // res.json({ message: 'Invalid email or password' });
      } else {
        const match = await bcrypt.compare(password,results[0].password) ;

         console.log(match) 
        if (match) {
          const token =sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
              email: email,
            },
            secret
          );
       return  res.status(200).json({ token :token,user:results[0] });
        } else {
          res.json({ message: 'Invalid email or password' });
        }
        
      }
    });
  }
}