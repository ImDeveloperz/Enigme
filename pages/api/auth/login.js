import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sign } from "jsonwebtoken";
// import mysql from 'mysql';
import { db } from "../../../config/db"
import { serialize } from "cookie";
export default async function handler(req, res) {
  const secret = process.env.SECRET;
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
          const serialised = serialize("OursiteJWT", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
          });
          
          res.setHeader("Set-Cookie", serialised);
      
       return  res.status(200).json({ token :token });
        } else {
          res.json({ message: 'Invalid email or password' });
        }
        
      }
    });
  }
}