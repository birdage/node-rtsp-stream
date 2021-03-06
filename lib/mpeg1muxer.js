// Generated by CoffeeScript 2.3.2
(function() {
  var Mpeg1Muxer, child_process, events, util;

  child_process = require('child_process');

  util = require('util');

  events = require('events');

  Mpeg1Muxer = function(options) {
    var key, self;
    self = this;
    this.url = options.url;
    this.ffmpegOptions = options.ffmpegOptions;
    this.additionalFlags = [];
    if (this.ffmpegOptions) {
      for (key in this.ffmpegOptions) {
        this.additionalFlags.push(key, String(this.ffmpegOptions[key]));
      }
    }
    this.spawnOptions = [
      "-rtsp_transport",
      "tcp",
      "-i",
      this.url,
      '-f',
      'mpeg1video',
      // additional ffmpeg options go here
      ...this.additionalFlags,
      '-'
    ];
    console.log(this.spawnOptions);
    this.stream = child_process.spawn("ffmpeg", this.spawnOptions, {
      detached: false
    });
    this.inputStreamStarted = true;
    this.stream.stdout.on('data', function(data) {
      return self.emit('mpeg1data', data);
    });
    this.stream.stderr.on('data', function(data) {
      return self.emit('ffmpegError', data);
    });
    return this;
  };

  util.inherits(Mpeg1Muxer, events.EventEmitter);

  module.exports = Mpeg1Muxer;

}).call(this);
