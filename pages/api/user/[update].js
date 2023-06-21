import { db } from "../../../config/db"

export default async function handler(req, res) {
    // Return the user ID from the decoded token
const {pseudo,biographie,name,prenom,gender,phone,city,address,birthdate,country} = req.body;
  const   id=req.query.update;
     console.log(id);
    db.execute('UPDATE `users` SET   `name`=?,`prenom`=?, `city`=?,`country`=?, `address`=? ,`birthday`=? ,`biographie`=?,`phone`=?,`gender`=?  WHERE id_User=?  ',[name,prenom,city,country,address,birthdate,biographie,phone,gender,id],(err,reslt)=>{  
    console.log(reslt)
        res.status(200).json({
            res: reslt
          });
      })
   
}