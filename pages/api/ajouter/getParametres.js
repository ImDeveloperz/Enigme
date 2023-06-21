import { db } from "../../../config/db";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const  id  = req.body;

    db.execute('SELECT * FROM `parametre` WHERE typeCompte_id = ?', [id], (err, reslt) => {
        const promises = reslt?.map((row) => {
          return new Promise((resolve, reject) => {
            db.execute('SELECT * FROM `typeParametre` WHERE typeParametre_id = ?', [row.typeParametre_id], (err, res) => {
              if (err) {
                reject(err);
              } else {
                const parametre = {
                  nomParametre: row.parametre_name,
                  typeParametre: res[0].typeParametre_name
                };
                resolve(parametre);
              }
            });
          });
        });

        Promise.all(promises)
          .then((parametres) => {
            return res.json({ parametres });
          })
          .catch((error) => {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
          });
     
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
