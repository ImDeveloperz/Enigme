import { db } from "../../../config/db"
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const id = req.body;

    const hashedAt = await bcrypt.hash(AT, 10);
    db.execute('SELECT * FROM `compte` where nomCompte=? ',[nom],(err,reslt)=>{
      if(reslt.length>0){
        return res.json({ compte : reslt});
      }
    })        
        // console.log('hh')       
      }
  }
