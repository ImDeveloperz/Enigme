import { db } from "../../../config/db";

export default async function handler(req, res) {
  try {
    const { typeCompte_id, stat, nom, type } = req.body.data;
    console.log('body:',  req.body.data);

    const reslt = await new Promise((resolve, reject) => {
      db.execute('SELECT * FROM `typeparametre` WHERE typeParametre_name = ?', [type], (err, reslt) => {
        if (err) {
          reject(err);
        } else {
          resolve(reslt);
        }
      });
    });

    console.log('typeParam:', reslt);

    const updateResult = await new Promise((resolve, reject) => {
      db.execute('INSERT INTO `parametre` (`parametre_name`, `typeCompte_id`, `typeParametre_id`, `crypter`) VALUES (?,?,?,?)', [nom,typeCompte_id, reslt[0].typeParametre_id, stat], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });

    return res.json({ res: updateResult });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
