import { db } from "../../../config/db"
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // const id =req.body
    const userId =req.body
    console.log('hh',userId)
    db.execute('SELECT * FROM `compte` where user_id=?',[userId],(err,reslt)=>{
      console.log(reslt)     
        return res.json({ compte : reslt});
    })     
   
    }
  }