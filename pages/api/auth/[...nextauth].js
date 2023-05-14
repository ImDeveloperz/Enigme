import DropboxProvider from "next-auth/providers/dropbox";
import NextAuth from 'next-auth';
export default NextAuth({
    providers: [
        DropboxProvider({
          clientId: process.env.DROPBOX_CLIENT_ID,
          clientSecret: process.env.DROPBOX_CLIENT_SECRET
        }),
      ],
      // secret : process.env.SECRET

})
