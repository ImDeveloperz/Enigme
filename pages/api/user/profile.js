import { db } from "../../../config/db"
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb' // Set desired value here
        }
    }
}
export default async function handler(req, res) {
    // Return the user ID from the decoded token
const {url,id} = req.body;
     console.log(id,"iii :",url);
    db.execute('UPDATE `users` SET  `image`=? WHERE id_User=?  ',[url,id],(err,reslt)=>{  
        res.status(200).json({
            res: reslt
          });
      })
   
}