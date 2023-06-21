import axios from 'axios' 

export const getToken = async (authorizationCode) => {
    const clientId = 'xr0fdcw09il66bs'; // Replace with your Dropbox app's client ID
    const clientSecret = 'ecmlxa1gzoe70xs'; // Replace with your Dropbox app's client secret
    const redirectUri = 'http://localhost:3000/getToken'; // Replace with your actual redirect URI
  
    try {
      const response = await axios.post('https://api.dropboxapi.com/oauth2/token', null, {
        params: {
          code: authorizationCode,
          grant_type: 'authorization_code',
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri
        }
      });
  
      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;
      // You can store the access token and refresh token for future use
      consol.log('Access Token:', accessToken);
      console.log('Refresh Token:', refreshToken);
    } catch (error) {
      console.error('Error retrieving access token:', error.response.data);
    }
  };
  