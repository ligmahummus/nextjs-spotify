const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const callbackUrl = process.env.SPOTIFY_CALLBACK_URL;

if (!clientId || !clientSecret || !callbackUrl)
  throw new Error("Missing Spotify Client ID or Client Secret or Callback URL");

const authConfig = {
  clientId: clientId,
  clientSecret: clientSecret,
  base64AuthHeader: Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  ),
  callbackUrl: callbackUrl,
};

export default authConfig;
export type AuthConfig = typeof authConfig;
