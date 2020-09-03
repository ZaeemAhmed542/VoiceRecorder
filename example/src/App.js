import React, { useState } from 'react'

import { VoiceRecorder } from 'voicerecorder'
import Button from './Button';


const App = () => {
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
      >
        <Button/>
      </VoiceRecorder>
      
      <audio src={audio} controls="controls"/>
    </div>
  )
}
 
export default App