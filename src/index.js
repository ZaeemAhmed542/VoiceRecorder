import React from 'react'
import { Recorder } from "./Recorder/Recorder"

export class VoiceRecorder extends React.Component{
  componentDidMount = async () => {
    const { audioUpload, constraints, options } = this.props
    this.recorder = new Recorder(constraints, options, audioUpload);
    await this.recorder.setUpRecorder();
  }
  componentDidUpdate = () => {
    const { status } = this.props;
    if (status) {
      this.recorder.startRecording();
    } else {
      this.recorder.stopRecording();
    }
  }
  render() {
    return null;
  }
}
