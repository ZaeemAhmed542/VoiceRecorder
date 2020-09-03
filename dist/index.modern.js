import React, { createContext, useContext } from 'react';

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var Recorder = function Recorder(constraints, options, upload) {
  var _this2 = this;

  var _this = this;

  this.setUpRecorder = function () {
    try {
      navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.webkitGetUserMedia;

      var _temp3 = function () {
        if (navigator.getUserMedia && window.MediaRecorder) {
          _this.chunks = [];

          var _temp4 = _catch(function () {
            return Promise.resolve(navigator.mediaDevices.getUserMedia({
              audio: _this.constraints
            })).then(function (stream) {
              _this.mediaRecorder = new window.MediaRecorder(stream, _this.options);

              _this.mediaRecorder.ondataavailable = function (e) {
                _this.chunks.push(e.data);
              };

              _this.mediaRecorder.onstop = _this.onStop;
              _this.mediaRecorder.onPause = _this.onStop;
            });
          }, function () {
            window.alert('Microphone access Blocked');
          });

          if (_temp4 && _temp4.then) return _temp4.then(function () {});
        } else {
          window.alert('Audio recording APIs not supported by this browser');
        }
      }();

      return Promise.resolve(_temp3 && _temp3.then ? _temp3.then(function () {}) : void 0);
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
    if (_this2.mediaRecorder && _this2.mediaRecorder.state !== 'paused') {
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

  this.constraints = constraints || [];
  this.options = options || [];
  this.upload = upload;
};

var VoiceRecorderContext = createContext({});
var useVoiceRecorder = function useVoiceRecorder() {
  var controls = useContext(VoiceRecorderContext);
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
            constraints = _this$props.constraints,
            options = _this$props.options;
        _this.recorder = new Recorder(constraints, options, audioUpload);
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
    return /*#__PURE__*/React.createElement(VoiceRecorderContext.Provider, {
      value: controls
    }, this.props.children);
  };

  return VoiceRecorder;
}(React.Component);

export { VoiceRecorder, useVoiceRecorder };
//# sourceMappingURL=index.modern.js.map
