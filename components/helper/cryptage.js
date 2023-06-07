import CryptoJS from 'crypto-js';
import { Dropbox } from 'dropbox';
import { deleete } from './functions';
import axiosClient from '@/axios-client';

async function generateKey(password) {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  const key = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
  return { key, salt };
}
async function encryptData(data, key, salt) {
  const iv = new Uint8Array([233, 174, 243, 164, 30, 122, 23, 199, 233, 214, 194, 220]);
  const encryptedContent = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
     iv : iv
    },
    key,
    data
  );
  return { encryptedContent, salt };
}



export async function processFile(name,path,tokenAccess) {
    const result = await fetch("https://content.dropboxapi.com/2/files/download", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + tokenAccess ,
        "Dropbox-API-Arg": JSON.stringify({ "path": "" + path })
      },
    })
    const file = await result.blob()
    deleete(name,path,tokenAccess) 
   console.log(file)
    const reader = new FileReader();
    console.log("reader : ", reader)
    reader.onload = async function(event) {
      const fileContent = event.target.result;

      const password = "your-password";
      const { key, salt } = await generateKey(password);
       console.log("key : ",key)
      // Encrypt the file content
      const { encryptedContent } = await encryptData(fileContent, key, salt);
      console.log("encrypted content : ", encryptedContent)
   const blob = new Blob([encryptedContent], { type: file.type });
   const f=new File([blob], name + ".enc")
   console.log(f);
   const dbx = new Dropbox({ accessToken: tokenAccess });
   dbx.filesUpload({ path:path + '.enc', contents: f }).then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.error(error);
});
    };
   
   const res= reader.readAsArrayBuffer(file);
   console.log(res)
  }

  export async function decryptFile(name,path,tokenAccess) {
   
    const response = await fetch("https://content.dropboxapi.com/2/files/download", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + tokenAccess ,
        "Dropbox-API-Arg": JSON.stringify({ "path": "" + path })
      },
    })
    const reader = new FileReader();
    const file = await response.blob()
    deleete(name,path,tokenAccess)
    let array = name.split(".")
    let length = array.length;
    name=array.slice(0, length - 1).join(".")
    reader.onload = async function(event) {
        const encryptedData = event.target.result;
        const password = "your-password";
        const { key, salt } = await generateKey(password);
         console.log("key : ",key)
         let decryptedContent;
         const iv = new Uint8Array([233, 174, 243, 164, 30, 122, 23, 199, 233, 214, 194, 220]);
        // Encrypt the file content
        // const decryptedContent = await decryptData(fileContent, key,iv);
        axiosClient.post('/crypter/file', {encryptedData,iv,key}).then(({ data }) => {
            decryptedContent=data.decryptedContent;
          }).catch(err => {
            console.log(err)
            const response = err.response;
          
              console.log(response)
          });
        const blob = new Blob([decryptedContent], { type: 'application/pdf' });
        const f=new File([blob], name)
         array = path.split(".")
       length = array.length;
      path=array.slice(0, length - 1).join(".")
      console.log("path : ",path);
      const dbx = new Dropbox({ accessToken: tokenAccess });
      dbx.filesUpload({ path:path, contents: f }).then(function (response) {
       console.log(response);
  })
  .catch(function (error) {
      console.error(error);
  });
}
   const res= reader.readAsArrayBuffer(file);
   console.log(res)
}
// function readFile(input) {
//     const file = input.files[0];
//     const reader = new FileReader();
  
//     reader.onload = function(event) {
//       const fileContent = event.target.result;
//       // Process the file content here
//     };
  
//     reader.readAsArrayBuffer(file);
//   }