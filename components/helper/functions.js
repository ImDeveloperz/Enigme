"use-client"
import { useStateContext } from "@/utils/AuthContext";

export async function dowload(name, path,tokenAccess){
    console.log(path)
    const res = await fetch("https://content.dropboxapi.com/2/files/download", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + tokenAccess,
        "Dropbox-API-Arg": JSON.stringify({ "path": "" + path })
      },
    })
    const link = document.createElement('a');
    link.href = URL.createObjectURL(await res.blob());
    link.download = name;

    // Programmatically triggering the download
    link.click();

    URL.revokeObjectURL(link.href);
  }

export async function deleete(name, path,tokenAccess){
    const res = await fetch("https://api.dropboxapi.com/2/files/delete_v2", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + tokenAccess,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "path": path,

      })
    })
    console.log(res)
    

  }