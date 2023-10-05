"use client";

import PlaylistGridItem from "./PlaylistGridItem";

const PlaylistGrid = ({ playlistsList }: IPlaylistGrid) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-flow-row gap-6">
      {playlistsList.map((playlist, i) => (
        <PlaylistGridItem key={i} playlist={playlist} />
      ))}
    </section>
  );
};

interface IPlaylistGrid {
  playlistsList: any[];
}

export default PlaylistGrid;
