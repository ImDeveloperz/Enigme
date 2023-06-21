import { db } from "../../../config/db"
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // const id =req.body
    const userId =req.body
    db.execute('SELECT * FROM `compte` where user_id=?',[userId],(err,reslt)=>{
        if(err){
          return res.status(500).json({message: "server err"});
        }
        else{
          return res.json({ compte : reslt});
        }
    })   
     
    }
  }