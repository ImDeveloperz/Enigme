import DropboxProvider from "next-auth/providers/dropbox";
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sign } from "jsonwebtoken";
// import mysql from 'mysql';
import { db } from "../../../config/db"
import { serialize } from "cookie";
export default NextAuth({
    providers: [
        DropboxProvider({
          clientId: process.env.DROPBOX_CLIENT_ID,
          clientSecret: process.env.DROPBOX_CLIENT_SECRET,
          authorizationParams: {
            code_challenge_method: 'S256',
            code_challenge: '',
          
          },
          accessTokenUrl: 'https://api.dropbox.com/oauth2/token',
          authorizationUrl: 'https://www.dropbox.com/oauth2/authorize',
        }),
      //   CredentialsProvider({
      //     name: "credencials",
      //     credentials : {},
      //     async authorize(req, credencials) {
      //       if (req.method === 'POST') {
      //         const { email, password } = credencials;
          
            
      //       db.execute('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
                
      //           if (error) {
      //             res.json({ message: 'Server error' });
      //           } else if (results.length === 0) {
      //             // res.json({ message: 'Invalid email or password' });
      //           } else {
      //             const match = await bcrypt.compare(password,results[0].password) ;
          
      //              console.log(match) 
      //             if (match) {
      //               const token =sign(
      //                 {
      //                   exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
      //                   email: email,
      //                 },
      //                 secret
      //               );
      //            return  res.status(200).json({ token :token,user:results[0] });
      //             } else {
      //               res.json({ message: 'Invalid email or password' });
      //             }
                  
      //           }
      //         });
      //       }
      //     }
      //   })
      ],
      async redirect(url, baseUrl) {
        return `${process.env.NEXT_PUBLIC_URL}/Docpage`; 
      }
      

      // secret : process.env.SECRET

})
