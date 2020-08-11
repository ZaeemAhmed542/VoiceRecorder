import React, { useState } from 'react'

import { VoiceRecorder } from 'voicerecorder'


const App = () => {
  const [recording, setRecording] = useState(false);
  const [audio, setAudio] = useState('http://alexkatz.me/codepen/music/interlude.mp3');
  const constraints = {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100,
  };
  const options = {
    audioBitsPerSecond: 128000,
  };
  return (
    <div>
      <VoiceRecorder
        options={options}
        constraints={constraints}
        audioUpload={(blob) => {setAudio(URL.createObjectURL(blob))}}
        status={recording}
      />
      {
        recording ? (
          <button onClick = {() => setRecording(false)}>STOP</button>
        ):
        (
          <button onClick = {() => setRecording(true)}>START</button>
        )
      }
      <audio src={audio} controls="controls"/>
    </div>
  )
}
 
export default App