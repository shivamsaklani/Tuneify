import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { Button } from '@/app/components/Button';
import { PlaylistSection } from '@/app/components/PlayListsection';
import { Animate } from '@/app/callback/animate';
import { emotionToSongs } from '@/app/PlayLogic/Emotion2Music';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { usePlaylistTracks } from '@/app/PlayLogic/PlaylistHook';

export const CameraDashboard = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [emotion, setEmotion] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const [playlist,setplaylist]=useState('');
  const token = useSelector((state: RootState) => state.auth.token);
  const {playlistName,tracks,playlistImage} = usePlaylistTracks(playlist,token);
  const username = useSelector((state:RootState)=>state.userInfo.name);
  
  const history = useRef<string[]>([]);

  useEffect(() => {
    (async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]);
      startCamera();
      startDetection();

    })();

    return () => {
      stopCamera();
      clearDetection();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error starting camera:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  // Detect user face expression
  const startDetection = () => {
    setIsDetecting(true);
    history.current = [];
    setEmotion('');

    intervalId.current = setInterval(async () => {
      if (videoRef.current) {
        const result = await faceapi
          .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions({ inputSize: 224 }))
          .withFaceExpressions();

        if (result?.expressions) {
          const topEmotion = Object.entries(result.expressions)
            .reduce((a, b) => (a[1] > b[1] ? a : b))[0];
          history.current.push(topEmotion);
        }
      }
    }, 1000);

    setTimeout(() => {
      clearDetection();
      finalizeEmotion();
    }, 2000);
  };

  const clearDetection = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
    setIsDetecting(false);
  };
  // Finalize the data among the most frequent data 
  const finalizeEmotion = () => {
    if (history.current.length === 0) {
      setEmotion('No face detected');
      return;
    }
  
    const counts: Record<string, number> = {};
    history.current.forEach(e => {
      counts[e] = (counts[e] || 0) + 1;
    });
  
    const final = Object.entries(counts).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
    setEmotion(final);
    playMusicForEmotion(final);
    console.log('Final Emotion:', final);
  };

  // change the current playing music according to the Emotion of user 

  const playMusicForEmotion = (emotion: string) => {
    const songs = emotionToSongs[emotion];
    if (songs && songs.length > 0) {
      console.log(songs);
      setplaylist(songs);
    }
  };
  

  return (
    <div className="h-full w-full flex flex-rows">
      <div className="bg-primary p-5 flex flex-col items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          muted
          width="400"
          height="300"
          className="rounded-lg shadow-lg"
        />
        <div className="text-white mt-4 text-xl">
          {isDetecting ? 'Detecting emotion...' : `Detected Emotion: ${emotion || '-'}`}
        </div>

        <div className="flex gap-4 mt-6">
          <Button onclick={startDetection} variant="secondary" size='sm' >
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex h-full w-full justify-center items-center p-10 bg-primary flex-grow">
        {isDetecting ? <Animate fullScreen={false} text="Loading Playlist" />: <PlaylistSection 
        playlistImage={playlistImage}
        trackData={tracks}
        playlistId={playlist}
        playlistName={playlistName}
        userName={username || ''}
        /> }
      </div>
    </div>
  );
};
