import { getPlaylists } from "@/app/lib/spotify/spotify.service";
import PlaylistGrid from "./PlaylistGrid";
import { JWTPayload } from "@/app/lib/auth/jwt/jwt.type";

const PlaylistList = async ({ payload }: IPlaylistList) => {
  const playlists = await getPlaylists(payload);

  return (
    <div>
      <PlaylistGrid playlistsList={playlists.items} />
    </div>
  );
};

interface IPlaylistList {
  payload: JWTPayload;
}

export default PlaylistList;
