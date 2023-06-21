import { db } from "../../../config/db"


export default async function handler(req, res) {
  if (req.method === 'POST') {
 
    
  
      db.execute('SELECT * FROM `typecompte`  ',(err,reslt)=>{
      if(err){
        console.log("error")
      }else{
        return res.json({ compte : reslt});
      }
       
    })    
        // console.log('hh')       
      }
  }