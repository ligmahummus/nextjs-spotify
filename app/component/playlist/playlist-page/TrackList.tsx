"use client";

import TrackItem from "./TrackItem";

const TrackList = ({ tracks }: ITrackList) => {
  return (
    <div>
      {tracks.map((track, i) => (
        <TrackItem track={track} key={i} />
      ))}
    </div>
  );
};

interface ITrackList {
  tracks: any[];
}

export default TrackList;
