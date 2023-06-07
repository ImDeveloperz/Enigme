import { db } from "../../../config/db"

export default async function handler(req, res) {
    // Return the user ID from the decoded token
const {id,stat} = req.body;
     console.log(id,"stat",stat);
    db.execute('UPDATE `users` SET  `statue`=? WHERE id_User=?  ',[stat,id],(err,reslt)=>{  
        res.status(200).json({
            res: reslt
          });
      })
   
}