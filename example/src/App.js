import React, { useState } from 'react'

import { VoiceRecorder } from 'voicerecorder'
import Button from './Button'

const App = () => {
  const [stream, setStream] = useState(null)
  const [audio, setAudio] = useState(
    'http://alexkatz.me/codepen/music/interlude.mp3'
  )
  const constraints = {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100
  }
  const options = {
    audioBitsPerSecond: 128000
  }

  const setUpStream = async () => {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia ||
      navigator.webkitGetUserMedia
    navigator.permissions
      .query({ name: 'microphone' })
      .then(async (permissionObj) => {
        if (permissionObj.state === 'denied') {
          alert('Microphone access Blocked enable it to continue');
        }
        else {
          if (navigator.getUserMedia && window.MediaRecorder) {
            const stream = await navigator.mediaDevices.getUserMedia({
              audio: constraints
            })
            if (stream) {
              setStream(stream)
            } else {
              setStream(null)
            }
          } else {
            window.alert('Audio recording APIs not supported by this browser')
          }
        }
      })
    
  }

  return (
    <div>
      {stream ? (
        <VoiceRecorder
          options={options}
          audioUpload={(blob) => {
            setAudio(URL.createObjectURL(blob))
          }}
          stream={stream}
        >
          <Button />
        </VoiceRecorder>
      ) : (
        <button onClick={setUpStream}>setStream</button>
      )}

      <audio src={audio} controls='controls' />
    </div>
  )
}

export default App
