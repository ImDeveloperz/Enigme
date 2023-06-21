import { db } from "../../../config/db"
export default async function handler(req, res) {
  if (req.method === 'POST') {
    db.execute('SELECT * FROM `typeparametre`',(err,reslt)=>{
      if(reslt.length>0){
        return res.json({ typesParametre : reslt});
      }
    })        
    }
  }
