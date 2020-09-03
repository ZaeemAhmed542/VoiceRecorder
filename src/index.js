import React, { createContext, useContext } from 'react'
import { Recorder } from './Recorder/Recorder'

const VoiceRecorderContext = createContext({})

export const useVoiceRecorder = () => {
  const controls = useContext(VoiceRecorderContext);
  return controls;
}

export class VoiceRecorder extends React.Component {
  componentDidMount = async () => {
    const { audioUpload, constraints, options } = this.props
    this.recorder = new Recorder(constraints, options, audioUpload)
    await this.recorder.setUpRecorder()
  }
  render() {
    const controls = {
      start: () => this.recorder.startRecording(),
      pause: () => this.recorder.pauseRecording(),
      stop: () => this.recorder.stopRecording()
    }
    return (
      <VoiceRecorderContext.Provider value={controls}>
        {this.props.children}
      </VoiceRecorderContext.Provider>
    )
  }
}
