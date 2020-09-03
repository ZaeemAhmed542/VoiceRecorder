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