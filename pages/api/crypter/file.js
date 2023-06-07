import fs from 'fs';
import crypto from 'crypto';
import { Dropbox } from 'dropbox';

export default async function handler(req, res) {
  const { name, path, tokenAccess } = req.body;
  
  try {
    if (req.method === 'POST') {
      // Encryption logic
      const response = await fetch("https://content.dropboxapi.com/2/files/download", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + tokenAccess,
          "Dropbox-API-Arg": JSON.stringify({ "path": "" + path })
        },
      });
      
      const fileContent = await response.buffer();
      deleete(name, path, tokenAccess);
      
      const password = "your-password";
      const { key, salt } = await generateKey(password);
      const { encryptedContent } = encryptData(fileContent, key, salt);
      
      fs.writeFileSync(name + ".enc", encryptedContent);
      
      const dbx = new Dropbox({ accessToken: tokenAccess });
      const fileData = fs.readFileSync(name + ".enc");
      
      await dbx.filesUpload({
        path: path + ".enc",
        contents: fileData,
      });
      
      res.status(200).json({ message: 'File encrypted successfully.' });
    } else if (req.method === 'DELETE') {
      // Decryption logic
      const response = await fetch("https://content.dropboxapi.com/2/files/download", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + tokenAccess,
          "Dropbox-API-Arg": JSON.stringify({ "path": "" + path })
        },
      });
      
      const encryptedData = await response.buffer();
      deleete(name, path, tokenAccess);
      
      const password = "your-password";
      const { key, salt } = await generateKey(password);
      const iv = Buffer.from([233, 174, 243, 164, 30, 122, 23, 199, 233, 214, 194, 220]);
      const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
      const decryptedContent = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
      
      fs.writeFileSync(name, decryptedContent);
      
      const dbx = new Dropbox({ accessToken: tokenAccess });
      const fileData = fs.readFileSync(name);
      
      await dbx.filesUpload({
        path: path,
        contents: fileData,
      });
      
      res.status(200).json({ message: 'File decrypted successfully.' });
    } else {
      res.status(405).json({ message: 'Method not allowed.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.' });
  }
}
