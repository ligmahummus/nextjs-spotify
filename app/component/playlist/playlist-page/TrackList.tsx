"use client";

import TrackItem from "./TrackItem";

const TrackList = ({ tracks }: ITrackList) => {
  return (
    <div>
      {tracks.map((track) => (
        <TrackItem track={track} />
      ))}
    </div>
  );
};

interface ITrackList {
  tracks: any[];
}

export default TrackList;
