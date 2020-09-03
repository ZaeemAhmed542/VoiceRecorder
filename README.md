# voicerecorder

> A react component for audio recording

[![NPM](https://img.shields.io/npm/v/voicerecorder.svg)](https://www.npmjs.com/package/audiorecorder) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save voicerecorder
```

## Usage

```jsx

import React from 'react'

import { useVoiceRecorder } from 'voicerecorder';


const Button = () => {
  const { start, pause, stop } = useVoiceRecorder();
  
  return (
    <div>
      <button onClick={start}>start</button>
      <button onClick={stop}>stop</button>
      <button onClick={pause}>pause</button>
    </div>
  )
}
 
export default Button

----------------------------------------------------------------

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

```

## License

MIT © [https://github.com/ZaeemAhmed542/](https://github.com/ZaeemAhmed542/)
