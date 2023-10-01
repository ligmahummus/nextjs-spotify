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
