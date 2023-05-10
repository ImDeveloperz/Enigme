import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { db } from "../../../config/db"
const secret = process.env.SECRET;
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {name,prenom, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    db.execute('SELECT * FROM `users` where email=? ',[email],(err,reslt)=>{
      if(reslt.length>0){
        return res.json({ message:'email already exist'});
      }
    })
    db.execute('INSERT INTO `users` (name,prenom,email,password) VALUES (?, ?,?,?)', [name,prenom,email,hashedPassword], (error, results) => {
      if (error) {
        res.status(500).json({ message: error });
      } else {
        const token =sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
            email: email,
          },
          secret
        );
        db.execute(
          'SELECT * FROM `users` where email=? ',[email],
          function(err, results, fields) {
            const user = results
              res.status(200).json({ token });
          })
        // console.log('hh')
        
      }
    });
  }
}