import { JWTPayload } from "@/app/lib/auth/jwt/jwt.type";
import { getPlaylistTracks } from "@/app/lib/spotify/spotify.service";
import { notFound } from "next/navigation";
import TrackList from "./TrackList";

const DisplayPlaylist = async ({ payload, playlistId }: IDisplayPlaylist) => {
  let tracks = [];
  try {
    const response = await getPlaylistTracks(payload, playlistId);
    if (response.items.length > 0) {
      tracks = response.items;
    }

    if (response.error) throw new Error();
  } catch (error) {
    notFound();
  }
  return (
    <div>
      <TrackList tracks={tracks} />
    </div>
  );
};

interface IDisplayPlaylist {
  payload: JWTPayload;
  playlistId: string;
}

export default DisplayPlaylist;
