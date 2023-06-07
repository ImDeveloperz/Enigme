import { db } from "../../../config/db";

export default async function handler(req, res) {
  try {
    const { stat, id, nom, type } = req.body.data;
    console.log('body:', id);

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
      db.execute('UPDATE `parametre` SET `parametre_name` = ?, `typeParametre_id` = ?, `crypter` = ? WHERE `parametre_name` = ?', [nom, reslt[0].typeParametre_id, stat, id.id], (err, res) => {
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
