export class Recorder {
  constructor(options, upload, stream) {
    this.options = options || []
    this.upload = upload
    this.stream = stream
  }

  setUpRecorder = async () => {
    this.chunks = []
    this.mediaRecorder = new window.MediaRecorder(this.stream, this.options)
    this.mediaRecorder.ondataavailable = (e) => {
      this.chunks.push(e.data)
    }
    this.mediaRecorder.onstop = this.onStop
  }

  startRecording = () => {
    if (this.mediaRecorder && this.mediaRecorder.state != 'paused') {
      this.mediaRecorder.start()
    } else if (this.mediaRecorder) {
      this.mediaRecorder.resume()
    }
  }

  stopRecording = () => {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop()
    }
  }

  pauseRecording = () => {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.pause()
    }
  }

  onStop = () => {
    const blob = new window.Blob(this.chunks, {
      type: 'audio/webm'
    })
    this.upload(blob)
    this.chunks = []
  }
}
