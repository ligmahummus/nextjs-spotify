"use client";

import Image from "next/image";
import defaultImage from "@/app/assets/playlist/default-playlist.jpg";

const TrackItem = ({ track }: ITrackItem) => {
  const { track: data } = track;
  const { album, artists, name } = data;
  const artistsName = artists
    .map((artist: { name: string }) => artist.name)
    .join(", ");

  const image = album.images.length > 0 ? album.images[0].url : defaultImage;

  console.log(
    "🚀 ~ file: TrackItem.tsx:11 ~ TrackItem ~ artistsName:",
    artistsName
  );
  return (
    <div className="px-4 py-2 hover:bg-zinc-900/10 cursor-pointer flex items-center gap-3">
      <Image
        src={image}
        alt="track image"
        width={50}
        height={50}
        className="rounded-xl shadow-lg"
      />
      <div className="flex items-center gap-3">
        <div className="text-xl font-bold">{name}</div>
        <span className="text-gray-400 font-light">({artistsName})</span>
      </div>
    </div>
  );
};

interface ITrackItem {
  track: any;
}

export default TrackItem;
