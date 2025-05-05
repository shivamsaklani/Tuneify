import {useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { TrackItemType } from "@/types/GlobalTypes";
import { PlaylistSection } from "@/app/components/PlayListsection";
import axios from "axios";

export const MusicSection = () => {
  const PlayListId = useSelector((state: RootState) => state.userPlaylist.selectedplaylist);
  const [track, setTrack] = useState<TrackItemType[] | null>(null);
  const [img, setImg] = useState<string | null>(null);
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.userInfo);
  

  useEffect(() => {
    const getTrack = async () => {
      try {
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${PlayListId.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setImg(response.data.images[0].url);
        const newTrack: TrackItemType[] = response.data.tracks.items.map((item: any) => {
          const track = item.track;
          const album = track.album;
          const addedAt = new Date(item.added_at);
          const formattedDate = `${addedAt.getDate().toString().padStart(2, '0')}-${(addedAt.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${addedAt.getFullYear()}`;
          return {
            img: album.images[0].url,
            id: track.id,
            href: track.href,
            name: track.name,
            Album: {
              id: album.id,
              name: album.name,
            },
            duration: track.duration_ms,
            date: formattedDate,
            playlist: item.uri,
          };
        });

        setTrack(newTrack);
      } catch (error) {
        console.log(error);
      }
    };

    getTrack();
  }, [PlayListId.id, token]);

  return (
    <PlaylistSection
      playlistId={PlayListId.id}
      playlistName={PlayListId.name}
      playlistImage={img}
      userName={user.name || ''}
      trackData={track}
    />
  );
};
