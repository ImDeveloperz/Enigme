import { db } from "../../../config/db"

export default async function handler(req, res) {
    // Return the user ID from the decoded token
  const   id=req.body;
     console.log('id   : ',req.body);
    db.execute('DELETE FROM `users` WHERE id_User=?',[id],(err,reslt)=>{  
    console.log(reslt)
        res.status(200).json({
            res: reslt
          });
      })
   
}