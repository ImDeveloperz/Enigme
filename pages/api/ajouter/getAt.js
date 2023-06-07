import bcrypt from 'bcryptjs';
import { db } from "../../../config/db"
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {nom} = req.body;

    db.execute('SELECT AT FROM `compte` where nomCompte=? ',[nom],(err,reslt)=>{
      if(reslt.length>0){
        return res.json({ AT : reslt});
      }
    })        
      }
  }