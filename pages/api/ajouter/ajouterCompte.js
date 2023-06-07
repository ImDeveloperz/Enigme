import { db } from "../../../config/db"
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body || NULL;
    console.log(data)
    console.log(req.body)
    db.execute('SELECT * FROM `compte` where nomCompte = ? ',[data.nom],(err,reslt)=>{
      if(reslt.length>0){
        return res.json({ message:'compte already exist'});
      }
    
    })
    try{
      db.execute('INSERT INTO `compte` (nomCompte,typeCompte_id,methode_id,user_id) VALUES (?,?,?,?)',[data.nom,data.typeCompte,data.typeCryptage,data.userId] ,(error, results) => {
      // console.log('db.getQueryLog() : ',db.getQueryLog())
      console.log("result : ",error)
        if (error) {
          // console.log("result : ",results.sql)
          // console.log('ERROR : ',error);
         return res.status(500).json({ message: error });
        } else {
          db.execute(
            'SELECT * FROM `compte`  ',
            function(err, results, fields) {
              const comptes = results
              return  res.status(200).json({compte : comptes });
            })
          // console.log('hh')   
        }
      });
    }catch(error){
      // console.log(error)  
    }
  }
}