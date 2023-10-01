import { Token } from "./auth.type";
import authConfig from "./auth.config";
import mongo from "../session/mongodb/mongo.client";
import { SpotifySession } from "../session/session.service";
import { User } from "../session/session.type";
import { getMyProfile } from "../spotify/spotify.service";
import { sign } from "./jwt/jwt.service";

function getAuthParams(args: { [key: string]: string }): string {
  const searchParams = new URLSearchParams();
  for (const key of Object.keys(args)) {
    searchParams.append(key, args[key]);
  }

  return searchParams.toString();
}

export function getAuthorizationURL(): string {
  const scopes = [
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public",
    "user-top-read",
    "user-read-email",
  ].join(" ");

  const paramsString = getAuthParams({
    client_id: authConfig.clientId,
    response_type: "code",
    redirect_uri: authConfig.callbackUrl,
    scope: scopes,
  });
  return `https://accounts.spotify.com/authorize?${paramsString}`;
}

export function getAccessTokenURL({ code }: { code: string }): string {
  const paramsString = getAuthParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: authConfig.callbackUrl,
  });

  return `https://accounts.spotify.com/api/token?${paramsString}`;
}

export async function fetchAccessToken({
  code,
}: {
  code: string;
}): Promise<Token> {
  return fetch(getAccessTokenURL({ code }), {
    method: "POST",
    headers: {
      Authorization: `Basic ${authConfig.base64AuthHeader}`,
      ["Content-Type"]: "application/x-www-form-urlencoded",
    },
  }).then((res) => res.json());
}

export async function refreshAccessToken(
  refreshToken: string
): Promise<Omit<Token, "refresh_token">> {
  const paramsString = getAuthParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authConfig.base64AuthHeader}`,
      ["Content-Type"]: "application/x-www-form-urlencoded",
    },
    body: paramsString,
  }).then((res) => res.json());
}

/**
 * Get OAuth2 Code and generate a signed JWT
 * @param loginCode string
 * @returns jwt
 */
export async function implementLogin(loginCode: string): Promise<string> {
  let token: string = "";
  const getToken = await fetchAccessToken({ code: loginCode });
  if (getToken && getToken.access_token) {
    const profile = await getMyProfile(getToken.access_token);

    const user: Omit<User, "_id"> = {
      accessToken: getToken.access_token,
      refreshToken: getToken.refresh_token,
      name: profile.display_name,
      email: profile.email,
      spotifyId: profile.id,
    };

    await mongo();
    const session = new SpotifySession(user.spotifyId);
    const savedSession = await session.login(user);
    const signedJwt = await sign({
      spotifyId: savedSession.spotifyId,
      name: savedSession.name,
      accessToken: getToken.access_token,
    });

    token = signedJwt;
  }

  return token;
}
