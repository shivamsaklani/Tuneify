import axios from "axios";

export const useCurrentTrack = (token: string) => {
  const fetchCurrentTrack = async () => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const trackData = response.data.item;
      return trackData;
    } catch (error) {
      console.error("Error fetching current track:", error);
      return null;
    }
  };

  return { fetchCurrentTrack };
};
