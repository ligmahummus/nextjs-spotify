import { getPlaylists } from "@/app/lib/spotify/spotify.service";
import PlaylistGrid from "./PlaylistGrid";
import { JWTPayload } from "@/app/lib/auth/jwt/jwt.type";

const PlaylistList = async ({ payload }: IPlaylistList) => {
  let playlists: any | null;
  try {
    playlists = await getPlaylists(payload);
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      {playlists ? (
        <PlaylistGrid playlistsList={playlists.items} />
      ) : (
        "No playlists fetched"
      )}
    </div>
  );
};

interface IPlaylistList {
  payload: JWTPayload;
}

export default PlaylistList;
