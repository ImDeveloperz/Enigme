import { db } from "../../../config/db"


export default async function handler(req, res) {
  if (req.method === 'POST') {
     const id = req.body
     console.log("id : ",id)
     if(id == 0 ||  id ){
      db.execute('SELECT * FROM `typecompte` where `typeCompte_id`= ?  ',[id],(err,reslt)=>{
         console.log('hhh')
        return res.json({ Typecompte : reslt[0].typeCompte_name});
      })  
     }    
        // console.log('hh')       
      }
  }