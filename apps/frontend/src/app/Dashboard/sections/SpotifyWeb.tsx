import { useEffect, useRef, useState } from 'react';
import { MusicPlayer } from './MusicPlayer';
import { useDispatch } from 'react-redux';
import { setDevice, setPlayerReady } from '@/app/redux/features/SpotifyPlayer';
import axios from 'axios';

const SpotifyPlayer = ({ token }: { token: string }) => {
  const LocalPlayerRef = useRef<Spotify.Player | null>(null);
  const dispatch= useDispatch();

  useEffect(() => {
    if(!token) return;
    if (!document.getElementById('spotify-sdk')) {
      const script = document.createElement('script');
      script.id = 'spotify-sdk';
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      if (!LocalPlayerRef.current) {
        const player = new window.Spotify.Player({
          name: 'Tuneify',
          getOAuthToken: (cb: (token: string) => void) => cb(token),
          volume: 0,
          enableMediaSession:true,
        });
        LocalPlayerRef.current = player;
       

        player.addListener('ready', ({ device_id }: { device_id: string }) => {
          console.log('Player ready with device ID:', device_id);
          try {
            const TransferPlayBack = async()=>{ 
              const response=await axios.put("https://api.spotify.com/v1/me/player",{
                device_ids:[device_id],
                play:true
              },{
              headers:{
                  Authorization :`Bearer ${token}`
              }
            });

          }
          TransferPlayBack();
          dispatch(setDevice(device_id));
          } catch (err) {
            console.log(err);
          }
          dispatch(setPlayerReady(true));
        });

        player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
          console.log('Device ID has gone offline', device_id);
        });
        player.connect();
      }
    };

    return () => {
      if (LocalPlayerRef.current) {
        LocalPlayerRef.current.disconnect();
        console.log('Disconnected Spotify player');
      }
    };
  }, [token,dispatch]);

  return (
    <div >
      {LocalPlayerRef.current ? <MusicPlayer player={LocalPlayerRef.current} /> : <p className='flex justify-center text-gray-500 items-center'>Loading Spotify Player...</p>}
    </div>
  );
};

export default SpotifyPlayer;
