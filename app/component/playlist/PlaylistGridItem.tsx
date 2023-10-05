"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import defaultImage from "@/app/assets/playlist/default-playlist.jpg";
import { useState } from "react";
import LoadingState from "../navigation/LoadingState";

const PlaylistGridItem = ({ playlist }: IPlaylistGridItem) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { images, name, id, owner } = playlist;
  const playlistOwner = owner
    ? {
        name: owner.display_name,
        link: owner.external_urls.spotify,
      }
    : null;

  const image = images.length > 0 ? images[0].url : defaultImage;

  const visitPlaylist = () => {
    setLoading(true);
    router.push(`/playlist/${id}`);
  };

  return (
    <>
      {loading ? <LoadingState /> : ""}
      <div
        onClick={visitPlaylist}
        className="cursor-pointer mt-10 ease-in-out duration-200 hover:bg-neutral-700 flex p-4 gap-4 rounded-xl w-[95%] mx-auto"
      >
        <div className="flex-shrink-0">
          <Image
            alt="playlist image"
            src={image}
            height={125}
            width={125}
            className="rounded-xl h-40 w-40 shadow-xl "
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold">{name}</h3>
          {playlistOwner ? (
            <Link href={playlistOwner.link ? playlistOwner.link : "#"}>
              {playlistOwner.name ? playlistOwner.name : "Unknown"}
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

interface IPlaylistGridItem {
  playlist: any;
}

export default PlaylistGridItem;
