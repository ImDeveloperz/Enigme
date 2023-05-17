import { Dropbox } from 'dropbox';

export default async function handler(req, res) {
  const dbx = new Dropbox({
    clientId: process.env.NEXT_PUBLIC_DROPBOX_API_KEY,
    clientSecret: process.env.NEXT_PUBLIC_DROPBOX_API_SECRET,
    accessToken: null,
  });

  if (req.query.code) {
    // This is a callback from the Dropbox authentication flow
    const { code } = req.query;

    try {
      const response = await dbx.auth.getAccessTokenFromCode(
        'http://localhost:3000/api/dropbox',
        code 
      );

      dbx.setAccessToken(response.result.access_token);

      res.redirect('http://localhost:3000/Docpage'); // Redirect to your app's homepage
    } catch (error) {
      console.error(error);
      res.status(500).send('Error authenticating with Dropbox');
    }
  } else {
    // This is the initial request to start the Dropbox authentication flow
    // const authUrl = dbx.auth.getAuthenticationUrl(
    //   'http://localhost:3000/api/dropbox',
    //   null,
    //   'code',
    //   'offline',
    //   null,
    //   'none'
    // );

    res.redirect('http://localhost:3000/api/dropbox');
  }
}