export class Recorder {
  constructor(constraints, options, upload) {
    this.constraints = constraints || []
    this.options = options || []
    this.upload = upload
  }

  setUpRecorder = async () => {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia ||
      navigator.webkitGetUserMedia
    if (navigator.getUserMedia && window.MediaRecorder) {
      this.chunks = []

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: this.constraints
        })
        this.mediaRecorder = new window.MediaRecorder(stream, this.options)
        this.mediaRecorder.ondataavailable = (e) => {
          this.chunks.push(e.data)
        }
        this.mediaRecorder.onstop = this.onStop
        this.mediaRecorder.onPause = this.onStop
      } catch (err) {
        window.alert('Microphone access Blocked')
      }
    } else {
      window.alert('Audio recording APIs not supported by this browser')
    }
  }

  startRecording = () => {
    if (this.mediaRecorder && this.mediaRecorder.state != 'paused') {
      this.mediaRecorder.start()
    }
    else if(this.mediaRecorder) {
      this.mediaRecorder.resume()
    }
  }

  stopRecording = () => {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop()
    }
  }

  pauseRecording = () => {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'paused') {
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
