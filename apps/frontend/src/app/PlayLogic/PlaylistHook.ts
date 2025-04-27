import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { TrackItemType } from "@/types/GlobalTypes";
export const usePlaylistTracks = (playlistId: string, token: string | null) => {
  const [tracks, setTracks] = useState<TrackItemType[]>([]);
  const [playlistImage, setPlaylistImage] = useState<string>("");
  const [playlistName,setPlaylistName]=useState<string>("");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPlaylistTracks = async () => {
        if(!token) return;
      try {
        console.log(playlistId);
        console.log(token);
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPlaylistImage(response.data.images[0]?.url || "");
        setPlaylistName(response.data.name);

        const fetchedTracks: TrackItemType[] = response.data.tracks.items.map((item: any) => {
          const track = item.track;
          const album = track.album;
          return {
            img: album.images[0]?.url || "",
            id: track.id,
            href: track.href,
            name: track.name,
            Album: {
              id: album.id,
              name: album.name,
            },
            duration: track.duration_ms,
            date: item.added_at,
            playlist: item.uri,
          };
        });
        console.log(tracks);
        setTracks(fetchedTracks);

      } catch (err) {
        console.error(err);
      } 
    };

    if (playlistId && token) {
      fetchPlaylistTracks();
    }
  }, [playlistId, token, dispatch]);

  return {playlistName, tracks, playlistImage};
};
