import {Dropbox} from 'dropbox';

const dbx = new Dropbox({ accessToken: 'sl.BeUhjGzmP-CiPZ2OUcG5Qdmc2AL9viGO6uez5mJsdYgrae2GqyeE9oktU2vBE5wlVvko6uNePtQdKWGHiv2rUk9XcO7ckIbl8ihmbPr-RLi7WZtayDd5u2OxMbGS3aboaYn1Kg5kPeTs' });

export default async function handler(req, res) {
  
    try {
      const response = await dbx.filesListFolder();
      console.log('hhh',response);

      const contents = response.entries;
      console.log('hh',contents);
      res.status(200).json(contents);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went hhh wrong' });
    }
  }
  

// async function listFolders(dbx, path) {
//   try {
//     const response = await dbx.filesListFolder();
//     const contents = response.entries.filter(entry => entry[".tag"] === "folder");

//     // If there are more items in the directory, recursively call this function
//     if (response.has_more) {
//       const moreContents = await listFolders(dbx, path);
//       return [...contents, ...moreContents];
//     }

//     return contents;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Something went wrong');
//   }
// }