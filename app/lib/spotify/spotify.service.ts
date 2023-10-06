import { refreshAccessToken } from "../auth/auth.service";
import { JWTPayload } from "../auth/jwt/jwt.type";
import mongo from "../session/mongodb/mongo.client";
import { SpotifySession } from "../session/session.service";
import { UserProfile } from "./spotify.type";

export async function getMyProfile(accessToken: string): Promise<UserProfile> {
  try {
    return fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
  } catch (error) {
    throw new Error(error as any);
  }
}

export async function getPlaylists(payload: JWTPayload) {
  return fetchSpotify(payload, "/me/playlists");
}

export async function getPlaylistTracks(
  payload: JWTPayload,
  playlistId: string
) {
  return fetchSpotify(payload, `/playlists/${playlistId}/tracks`);
}

/**
 * Get a decoded JWT payload which contains the user's Spotify ID
 * Initialize a new SpotifySession instance and get the current session's refresh token
 * If the initial fetch fails of 401, it refreshes the access token and try again once.
 * @param payload JWTPayload
 * @param url string
 * @param options optional array
 * @returns generic promise
 */
export async function fetchSpotify(
  payload: JWTPayload,
  url: string,
  options?: RequestInit
): Promise<any> {
  const opts = options || {};

  const spotifyUrl = "https://api.spotify.com/v1" + url;

  const fetchInstance = async (newAccessToken: string) => {
    return fetch(spotifyUrl, {
      ...opts,
      headers: { Authorization: `Bearer ${newAccessToken}` },
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return null;
      }
    });
  };

  return fetch(spotifyUrl, {
    ...opts,
    headers: { Authorization: `Bearer ${payload.accessToken}` },
  }).then(async (res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      await mongo();
      const spotifySession = new SpotifySession(payload.spotifyId);
      const currentSessionRefreshToken =
        await spotifySession.getSessionRefreshToken();

      return refreshAccessToken(currentSessionRefreshToken).then((res) =>
        fetchInstance(res.access_token)
      );
    }
  });
}
