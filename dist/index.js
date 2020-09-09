function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var Recorder = function Recorder(options, upload, stream) {
  var _this2 = this;

  var _this = this;

  this.setUpRecorder = function () {
    try {
      _this.chunks = [];
      _this.mediaRecorder = new window.MediaRecorder(_this.stream, _this.options);

      _this.mediaRecorder.ondataavailable = function (e) {
        _this.chunks.push(e.data);
      };

      _this.mediaRecorder.onstop = _this.onStop;
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  this.startRecording = function () {
    if (_this2.mediaRecorder && _this2.mediaRecorder.state != 'paused') {
      _this2.mediaRecorder.start();
    } else if (_this2.mediaRecorder) {
      _this2.mediaRecorder.resume();
    }
  };

  this.stopRecording = function () {
    if (_this2.mediaRecorder && _this2.mediaRecorder.state !== 'inactive') {
      _this2.mediaRecorder.stop();
    }
  };

  this.pauseRecording = function () {
    if (_this2.mediaRecorder && _this2.mediaRecorder.state !== 'inactive') {
      _this2.mediaRecorder.pause();
    }
  };

  this.onStop = function () {
    var blob = new window.Blob(_this2.chunks, {
      type: 'audio/webm'
    });

    _this2.upload(blob);

    _this2.chunks = [];
  };

  this.options = options || [];
  this.upload = upload;
  this.stream = stream;
};

var VoiceRecorderContext = React.createContext({});
var useVoiceRecorder = function useVoiceRecorder() {
  var controls = React.useContext(VoiceRecorderContext);
  return controls;
};
var VoiceRecorder = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(VoiceRecorder, _React$Component);

  function VoiceRecorder() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.componentDidMount = function () {
      try {
        var _this$props = _this.props,
            audioUpload = _this$props.audioUpload,
            options = _this$props.options,
            stream = _this$props.stream;
        _this.recorder = new Recorder(options, audioUpload, stream);
        return Promise.resolve(_this.recorder.setUpRecorder()).then(function () {});
      } catch (e) {
        return Promise.reject(e);
      }
    };

    return _this;
  }

  var _proto = VoiceRecorder.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var controls = {
      start: function start() {
        return _this2.recorder.startRecording();
      },
      pause: function pause() {
        return _this2.recorder.pauseRecording();
      },
      stop: function stop() {
        return _this2.recorder.stopRecording();
      }
    };
    return /*#__PURE__*/React__default.createElement(VoiceRecorderContext.Provider, {
      value: controls
    }, this.props.children);
  };

  return VoiceRecorder;
}(React__default.Component);

exports.VoiceRecorder = VoiceRecorder;
exports.useVoiceRecorder = useVoiceRecorder;
//# sourceMappingURL=index.js.map
