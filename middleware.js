// const legacyPrefixes = ['/docs', '/blog']
import { getCookie, setCookie } from 'cookies-next';
import { NextResponse } from "next/server"; 
export default async function middleware(req) {
  const { pathname } = req.nextUrl
  console.log('pathname : ',pathname)
  const role =  req.cookies.get('role');
  console.log("roole  :",role);
  if((pathname.startsWith('/Docpage')) && !role){
    console.log("roole2  :",role);
    return NextResponse.redirect(new URL('/SignInPage',req.nextUrl))
  }
  if((pathname.startsWith('/Docpage/ajouterParametre') || pathname.startsWith('/Docpage/Users')) && role.value=="user"){
    return NextResponse.redirect(new URL('/SignInPage',req.nextUrl))
  }
  if(pathname=='/Docpage' && role.value=="admin"){
    return NextResponse.redirect(new URL('/Docpage/ajouterParametre',req.nextUrl))
  }
}