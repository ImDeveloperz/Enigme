import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { db } from "../../../config/db"
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
        const token = jwt.sign({ id: results.insertId }, 'my_secret_key');
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