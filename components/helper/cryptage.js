import CryptoJS from "crypto-js";
import { Dropbox } from "dropbox";
import { deleete } from "./functions";
import axiosClient from "@/axios-client";
const encoder = new TextEncoder();


const algo = {
  name : 'AES-GCM',
  length : 256,
}
const password = "SMI_S6";
const passwordBuffer = encoder.encode(password);
// const salt = window.crypto.getRandomValues(new Uint8Array(16));
 async function generateKey(){
  const masterPassword = await window.crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  return await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode(password.length),
      iterations: 1000,
      hash: { name: "SHA-1" },
    },
    masterPassword,
    algo,
    false,
    ["encrypt", "decrypt"]
  );
 } 
// console.log("masterPassword : ", masterPassword, "key : ", key);

async function encryptData(data,filename) {

  const encryptedContent = await window.crypto.subtle.encrypt(
    {...algo,iv: encoder.encode(filename)},
    await generateKey(),
    data
  );
  return { encryptedContent};
}

export async function processFile(name, path, tokenAccess) {
  const result = await fetch(
    "https://content.dropboxapi.com/2/files/download",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + tokenAccess,
        "Dropbox-API-Arg": JSON.stringify({ path: "" + path }),
      },
    }
  );
  console.log(result)
  const file = await result.blob();
  deleete(name, path, tokenAccess);
  console.log(file);
  const reader = new FileReader();
  console.log("reader : ", reader);
  reader.onload = async function (event) {
    const fileContent = event.target.result;
    // Encrypt the file content
    const { encryptedContent } = await encryptData(fileContent, name);
    console.log("encrypted content : ", encryptedContent);
    const blob = new Blob([encryptedContent], { type: file.type });
    const f = new File([blob], name + ".enc");
    console.log("file : ",f);
    const dbx = new Dropbox({ accessToken: tokenAccess });
    dbx
      .filesUpload({ path: path + ".enc", contents: f })
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const res = reader.readAsArrayBuffer(file);
  console.log("res : ",res);
}

export async function encryptFile(file,name) {
  console.log(result)
   file = await result.blob();
  const reader = new FileReader();
  console.log("reader : ", reader);
  reader.onload = async function (event) {
    const fileContent = event.target.result;
    const { encryptedContent } = await encryptData(fileContent, name);
    console.log("encrypted content : ", encryptedContent);
    const blob = new Blob([encryptedContent], { type: file.type });
    const f = new File([blob], name + ".enc");
    console.log(f);
    return f;
  }
  const res = reader.readAsArrayBuffer(file);
  console.log(res);
}
export async function decryptFile(name, path, tokenAccess) {
  const response = await fetch(
    "https://content.dropboxapi.com/2/files/download",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + tokenAccess,
        "Dropbox-API-Arg": JSON.stringify({ path: "" + path }),
      },
    }
  );

  const file = await response.blob();
  let array = name.split(".");
  let length = array.length;
 const filename = array.slice(0, length - 1).join(".");
 const reader = new FileReader();
 reader.onload = async function (event) {
  const fileContent = event.target.result;
  const decryptedContent = await crypto.subtle.decrypt(
    {...algo,iv: encoder.encode(filename)},
    await generateKey(),
    fileContent
  )
  console.log(decryptedContent)
  const blob = new Blob([decryptedContent], { type: "application/pdf" });
  const f = new File([blob], name);
  array = path.split(".");
  length = array.length;
  path = array.slice(0, length - 1).join(".");
  console.log("path : ", path);
  const dbx = new Dropbox({ accessToken: tokenAccess });
  dbx
    .filesUpload({ path: path, contents: f })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    });
  }
  const res = reader.readAsArrayBuffer(file);
  deleete(name, path, tokenAccess);
  console.log(res);
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
