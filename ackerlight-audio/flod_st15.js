/*
  Mini FLOD for Intros
  15 instruments Sountrackers
  version 7.2
  2019-01-22
  Christian Corti
*/
(function() {
  class Player {
    constructor() {
      return Object.seal(this);
    };

    get audioCache() {
      return cache.read();
    };

    set filter(value = 0) {
      gl_filter = value;
    };

    set model(value = 0) {
      amiga.model = value;
    };

    set stereoSeparation(value = 1) {
      gl_stereo = value;
    }

    set version(value = 1) {
      if (value < ULTIMATE_SOUNDTRACKER) {
        value = ULTIMATE_SOUNDTRACKER;
      } else if (value > DOC_SOUNDTRACKER20) {
        value = DOC_SOUNDTRACKER20;
      }

      if (value != amiga.version) {
        amiga.version = value;
        amiga.reset();
      }
    };

    set videoMode(value = 0) {
      if (value != amiga.ntsc) {
        amiga.ntsc = value;
        amiga.reset();
      }
    };

    set volume(value = 64) {
      gl_volume = value;
    };

    setSample(index = 0, number = 0, period = 320, volume = 64) {
      const c = amiga.output[index];
      const s = amiga.samples[number];

      c.enabled = 0;
      c.pointer = s.pointer;
      c.length  = s.length;
      c.period  = period;
      c.volume  = volume;
      c.enabled = 1;

      if (s.repeat > 2) {
        c.pointer = s.loopPtr;
        c.length  = s.repeat;
      }
    };

    load(stream) {
      amiga.version = 0;

      const data = new ByteArray(stream);
      amiga.parse(data);

      if (!amiga.version) {
        return false;
      }

      if (gl_memory) {
        gl_memory = data.append(gl_memory);

        const length = amiga.samples.length;
        const offset = data.length;

        for (let i = 16; i < length; i++) {
          const s = amiga.samples[i];

          s.pointer += offset;
          s.loopPtr += offset;
        }
      } else {
        gl_memory = data;
      }

      amiga.memory = new Int8Array(gl_memory.buffer);
      dispatch("flodReady");
      return true;
    };

    loadSamples(stream) {
      const data = new ByteArray(stream);

      if (data.utf8(4) != "SMPL") {
        return false;
      }

      let offset = 0;

      if (gl_memory) {
        offset = gl_memory.length;
        gl_memory = gl_memory.append(data);
      } else {
        gl_memory = data;
      }

      let len = data.uint16;

      for (let i = 0; i < len; i++) {
        const s = new Sample();

        s.pointer = offset + (data.uint16 << 1);
        s.length  = data.uint16 << 1;
        s.loopPtr = offset + (data.uint16 << 1);
        s.repeat  = data.uint16 << 1;

        amiga.samples[16 + i] = s;
      }

      amiga.memory = new Int8Array(gl_memory.buffer);
      amiga.initialize();
      dispatch("flodReady");
      return true;
    };

    play(mode = 0, frames = 0) {
      if ((!mode && !amiga.version) || (mode && amiga.samples.length < 17)) {
        return false;
      }

      amiga.playMode = mode;
      if (!mode) { amiga.initialize(); }

      if (frames) {
        amiga.volume  = 0;
        amiga.fadeDir = 1;
        amiga.fadeFrame = frames;
        amiga.fadeSpeed = frames;
      }

      if (!amiga.node) { amiga.connect(); }

      document.addEventListener("visibilitychange", suspend, false);
      requestAnimationFrame(sync);
      return true;
    };

    stop(frames = 0) {
      if (frames) {
        amiga.fadeDir = -1;
        amiga.fadeFrame = frames;
        amiga.fadeSpeed = frames;

      } else if (amiga.node) {
        document.removeEventListener("visibilitychange", suspend, false);
        amiga.stop();
      }
    };

    reset() {
      this.stop();
      amiga.samples.length = 0;
      gl_memory = amiga.memory = null;
    };
  }

  class Amiga {
    constructor() {
      this.output  = [];
      this.memory  = null;
      this.node    = null;
      this.cache   = null;
      this.clock   = 0.0;
      this.model   = 0;
      this.ntsc    = 0;
      this.state   = 0;
      this.version = 0;
      this.volume  = 0;

      this.l0 = this.r0 = 0.0;
      this.l1 = this.r1 = 0.0;
      this.l2 = this.r2 = 0.0;
      this.l3 = this.r3 = 0.0;

      this.playMode  = 2;
      this.playTime  = 0.0;
      this.fadeDir   = 0;
      this.fadeFrame = 0;
      this.fadeSpeed = 0;
      this.tickLeft  = 0;
      this.tickSize  = 0;

      this.periods = [
        856,808,762,720,678,640,604,570,538,508,480,453,
        428,404,381,360,339,320,302,285,269,254,240,226,
        214,202,190,180,170,160,151,143,135,127,120,113,
        0];

      this.samples    = [];
      this.voices     = [];
      this.patterns   = [];
      this.track      = [];
      this.length     = 0;
      this.tempo      = 0;
      this.speed      = 0;
      this.tick       = 0;
      this.jumpFlag   = 0;
      this.patternPos = 0;
      this.trackPos   = 0;

      this.output[0] = new AmigaChannel(0);
      this.voices[0] = new Voice(0);

      for (let i = 1; i < 4; i++) {
        this.output[i - 1].next = this.output[i] = new AmigaChannel(i);
        this.voices[i - 1].next = this.voices[i] = new Voice(i);
      }

      return Object.seal(this);
    };

    initialize() {
      this.l0 = this.r0 = 0.0;
      this.l1 = this.r1 = 0.0;
      this.l2 = this.r2 = 0.0;
      this.l3 = this.r3 = 0.0;

      this.volume = 64;
      this.tickLeft = 0;

      const rate = audio.sampleRate;

      if (this.ntsc) {
        this.clock = 3579545 / rate;

        if (this.version != ULTIMATE_SOUNDTRACKER) {
          this.tickSize = (rate / 60) >> 0;
        } else {
          this.tickSize = ((240 - this.tempo) * (0.0001704127110 * rate)) >> 0;
        }
      } else {
        this.clock = 3546895 / rate;

        if (this.version != ULTIMATE_SOUNDTRACKER) {
          this.tickSize = (rate / 50) >> 0;
        } else {
          this.tickSize = ((240 - this.tempo) * (0.0001719813992 * rate)) >> 0;
        }
      }

      this.speed      = 6;
      this.tick       = 0;
      this.jumpFlag   = 0;
      this.patternPos = 0;
      this.trackPos   = 0;

      let voice = this.voices[0];

      do {
        const chan = this.output[voice.index];
        chan.initialize();

        voice.initialize();
        voice.channel = chan;
        voice.sample = this.samples[0];
      } while (voice = voice.next);
    };

    set filter(value) {
      this.state = gl_filter & (value + 1);
    };

    mixer(e) {
      const lbuf = e.outputBuffer.getChannelData(0);
      const rbuf = e.outputBuffer.getChannelData(1);
      lbuf.fill(0);
      rbuf.fill(0);

      let mixed  = 0;
      let mixLen = 0;
      let mixPos = 0;
      let toMix  = 0;
      let volume = (this.volume * gl_volume) / 1048576;

      if (!cache.time) {
        this.playTime = cache.time = e.playbackTime;
      }

      do {
        if (!this.tickLeft) {
          if (!this.playMode) {
            this.cache = cache.write();
            this.cache.note.fill(0);
            this.process();

            this.cache.volume[0] = this.output[0].audvol;
            this.cache.volume[1] = this.output[1].audvol;
            this.cache.volume[2] = this.output[2].audvol;
            this.cache.volume[3] = this.output[3].audvol;
          }

          if (this.fadeDir && (--this.fadeFrame == 0)) {
            this.fadeFrame = this.fadeSpeed;

            this.volume += this.fadeDir;
            volume = (this.volume * gl_volume) / 1048576;

            if (!this.volume) {
              this.fadeDir = 0;
              this.node.onaudioprocess = this.stop.bind(this);
              dispatch("flodFade");
              return;

            } else if (this.volume == 64) {
              this.fadeDir = 0;
            }
          }

          this.tickLeft = this.tickSize;
        }

        toMix = this.tickLeft;
        if ((mixed + toMix) >= 8192) { toMix = 8192 - mixed; }
        mixLen = mixPos + toMix;

        let chan = this.output[0];

        do {
          if (chan.audena) {
            const level = chan.audvol * volume;
            const speed = chan.audper / this.clock;
            const split = chan.split * gl_stereo;

            const lvol = level * (1 - split);
            const rvol = level * (1 + split);

            for (let i = mixPos; i < mixLen; i++) {
              if (chan.delay) {
                chan.delay--;
                continue;
              }

              if (speed && (--chan.timer < 1.0)) {
                const sample = this.memory[chan.audloc] * 0.0078125;
                chan.audatl = sample * lvol;
                chan.audatr = sample * rvol;

                chan.audloc++;
                chan.timer += speed;

                if (chan.timer < 0.0) {
                  chan.audloc++;
                  chan.timer = speed;
                }

                if (chan.audloc >= chan.audlen) {
                  chan.audloc = chan.pointer;
                  chan.audlen = chan.pointer + chan.length;
                }
              }

              lbuf[i] += chan.audatl;
              rbuf[i] += chan.audatr;
            }
          } else {
            for (let i = mixPos; i < mixLen; i++) {
              lbuf[i] += chan.audatl;
              rbuf[i] += chan.audatr;
            }
          }
        } while (chan = chan.next);

        mixPos = mixLen;
        mixed += toMix;
        this.tickLeft -= toMix;
      } while (mixed < 8192);

      if (this.model | this.state) {
        const fl = 0.5213345843532200;
        const p0 = 0.4860348337215757;
        const p1 = 0.9314955486749749;

        let d = 1.0 - p0;

        for (let i = 0; i < 8192; i++) {
          let l = lbuf[i];
          let r = rbuf[i];

          if (this.model) {
            this.l0 = p0 * l + d * this.l0;
            this.r0 = p0 * r + d * this.r0;

            d = 1.0 - p1;
            l = this.l1 = p1 * this.l0 + d * this.l1;
            r = this.r1 = p1 * this.r0 + d * this.r1;
          }

          if (this.state) {
            d = 1.0 - fl;
            this.l2 = fl * l + d * this.l2;
            this.r2 = fl * r + d * this.r2;
            this.l3 = fl * this.l2 + d * this.l3;
            this.r3 = fl * this.r2 + d * this.r3;

            l = this.l4 = fl * this.l3 + d * this.l4;
            r = this.r4 = fl * this.r3 + d * this.r4;
          }

          if (l < -1.0) {
            l = -1.0;
          } else if (l > 1.0) {
            l = 1.0;
          }

          if (r < -1.0) {
            r = -1.0;
          } else if (r > 1.0) {
            r = 1.0;
          }

          lbuf[i] = l;
          rbuf[i] = r;
        }
      }
    };

    connect() {
      this.node = audio.createScriptProcessor(8192);
      this.node.onaudioprocess = this.mixer.bind(this);
      this.node.connect(audio.destination);
    };

    disconnect() {
      if (this.node) {
        this.node.disconnect();
        this.node.onaudioprocess = null;
        this.node = null;
      }
    };

    stop() {
      this.disconnect();
      dispatch("flodStop");
      amiga.initialize();
      cache.reset();
    };

    reset() {
      if (this.node) {
        this.disconnect();
        this.initialize();
        this.connect();
      }
    };

    parse(stream) {
      if (stream.length < 1628) { return; }

      stream.position = 60;
      if (stream.utf8(4) == "SONG") { return; }

      let score = 0;

      stream.position = 0;
      score += this.isLegal(stream.utf8(20));

      this.version = ULTIMATE_SOUNDTRACKER;
      stream.position = 42;

      for (let i = 1; i < 16; i++) {
        let value = stream.uint16;

        if (!value) {
          this.samples[i] = null;
          stream.position += 28;
          continue;
        }

        stream.position -= 24;

        const sample = new Sample();
        score += this.isLegal(stream.utf8(22));
        sample.length = value << 1;

        stream.position += 3;
        sample.volume = stream.uint8;

        if (sample.volume > 64) {
          this.version = 0;
          return;
        }

        sample.loopPtr = stream.uint16;
        sample.repeat  = stream.uint16 << 1;

        if (sample.length > 9999) {
          this.version = MASTER_SOUNDTRACKER;
        }

        stream.position += 22;
        this.samples[i] = sample;
      }

      stream.position = 470;
      this.length = stream.uint8;
      this.tempo  = stream.uint8;

      let higher = 0;

      for (let i = 0; i < 128; i++) {
        const value = stream.int8 << 8;

        if (value > higher) {
          if (value > 16128) { score--; }
          higher = value;
        }

        this.track[i] = value;
      }

      stream.position = 600;
      higher += 256;

      if ((stream.position + (higher << 2)) > stream.length) {
        this.version = 0;
        return;
      }

      this.patterns.length = higher;

      for (let i = 0; i < higher; i++) {
        const row = new Row();
        row.note = stream.uint16;

        const fx = stream.uint8;
        row.effect = fx & 0x0f;
        row.param  = stream.uint8;
        row.sample = fx >> 4;

        if (row.note) {
          if (row.note < 113 || row.note > 856) { score--; }
        }

        if (row.sample > 15) {
          score--;
          row.sample = 0;
        }

        if (this.version < TJC_SOUNDTRACKER2 && (row.param && !row.effect)) {
          this.version = TJC_SOUNDTRACKER2;
        }

        if (this.version < DOC_SOUNDTRACKER4 && row.effect > 2) {
          this.version = TJC_SOUNDTRACKER2;
        }

        if (this.version < MASTER_SOUNDTRACKER && row.effect == 15) {
          this.version = DOC_SOUNDTRACKER4;
        }

        if (row.effect == 11) {
          this.version = DOC_SOUNDTRACKER20;
        }

        this.patterns[i] = row;
      }

      if (score < 1) {
        this.version = 0;
        return;
      }

      let len = stream.position;
      stream.fill(0,0,4);

      const empty = new Sample();

      for (let i = 0; i < 16; i++) {
        const sample = this.samples[i];

        if (!sample) {
          this.samples[i] = empty;
          continue;
        }

        if (len >= stream.length) {
          sample.pointer = 0;
          continue;
        }

        sample.pointer = len;
        len += sample.length;

        let value = (sample.length < 4) ? sample.length : 4;
        stream.fill(0,sample.pointer,value);

        if (sample.loopPtr) {
          if ((sample.loopPtr + sample.repeat) > sample.length) {
            value = sample.length - sample.repeat;
            if (value < 0) { value = sample.length; }

            if (value) {
              sample.loopPtr = value;
            } else {
              sample.repeat -= sample.loopPtr;
            }
          }

          sample.length   = sample.repeat;
          sample.loopPtr += sample.pointer;
          sample.pointer  = sample.loopPtr;

        } else if (sample.repeat != 2) {
          sample.loopPtr = sample.pointer;
          sample.repeat  = sample.length;
        }
      }
    };

    process() {
      let voice = this.voices[0];

      if (!this.tick) {
        const pos = this.track[this.trackPos] + this.patternPos;

        do {
          const chan = voice.channel;
          voice.enabled = 0;

          const row = this.patterns[pos + voice.index];
          voice.period = row.note;
          voice.effect = row.effect;
          voice.param  = row.param;

          this.cache.last[voice.index] = voice.last;

          let sample = voice.sample;

          if (row.sample) {
            sample = this.samples[row.sample];
            if (!sample) { sample = this.samples[0]; }
            voice.sample = sample;
            voice.volume = sample.volume;

            if (voice.effect == 12 && ((this.version ^ 4) < 2)) {
              chan.volume = voice.param;
            } else {
              chan.volume = sample.volume;
            }

            this.cache.sample[voice.index] = row.sample;
          }

          if (row.note) {
            voice.enabled = 1;
            voice.last = voice.period;

            chan.enabled = 0;
            chan.pointer = sample.pointer;
            chan.length  = sample.length;
            chan.period  = voice.period;

            this.cache.last[voice.index] = row.note;
            this.cache.note[voice.index] = row.note;
          }

          if (voice.enabled) { chan.enabled = 1; }

          chan.pointer = sample.loopPtr;
          chan.length  = sample.repeat;

          if ((this.version ^ 2) < 2) {
            if (voice.effect == 12) {
              chan.volume = voice.param;
            } else if (voice.effect == 14) {
              voice.slide = voice.param;
            } else if (voice.effect == 15 && this.version == DOC_SOUNDTRACKER4) {
              voice.param &= 0x0f;
              if (voice.param) { this.speed = voice.param; }
            } else if (!voice.param) {
              voice.slide = 0;
            }
          }

          if (this.version >= DOC_SOUNDTRACKER20) {
            switch (row.effect) {
              case 11:
                this.trackPos = (voice.param - 1) & 127;
                this.jumpFlag ^= 1;
                break;
              case 12:
                chan.volume = voice.param;
                break;
              case 13:
                this.jumpFlag ^= 1;
                break;
              case 14:
                this.filter = voice.param;
                break;
              case 15:
                voice.param &= 0x0f;
                if (voice.param) { this.speed = voice.param; }
                break;
            }
          }
        } while (voice = voice.next);
      } else {
        do {
          this.cache.last[voice.index] = voice.last;
          if (!voice.param) { continue; }

          const chan = voice.channel;

          let value = 0;

          if (this.version == ULTIMATE_SOUNDTRACKER) {
            if (voice.effect == 1) {
              this.arpeggio(voice);
            } else if (voice.effect == 2) {
              value = voice.param >> 4;

              if (value) {
                voice.period += value;
              } else {
                voice.period -= (voice.param & 0x0f);
              }

              chan.period = voice.period;
            }

            continue;
          }

          switch (voice.effect) {
            case 0:
              this.arpeggio(voice);
              break;
            case 1:
              value = voice.param;
              if ((this.version ^ 4) < 2) { value &= 0x0f; }
              voice.last -= value;

              if (voice.last < 113) { voice.last = 113; }
              chan.period = voice.last;
              break;
            case 2:
              value = voice.param;
              if ((this.version ^ 4) < 2) { value &= 0x0f; }
              voice.last += value;

              if (voice.last > 856) { voice.last = 856; }
              chan.period = voice.last;
              break;
          }

          if (this.version == DOC_SOUNDTRACKER20) { continue; }

          let slide = 0;

          if (voice.slide && ((this.version ^ 2) < 2)) {
            slide = voice.slide;
          }

          if (voice.effect == 13 && this.version != DOC_SOUNDTRACKER9) {
            slide = voice.param;
          }

          if (slide) {
            value = slide >> 4;

            if (value) {
              voice.volume += value;
            } else {
              voice.volume -= (slide & 0x0f);
            }

            if (voice.volume < 0) {
              voice.volume = 0;
            } else if (voice.volume > 64) {
              voice.volume = 64;
            }

            chan.volume = voice.volume;
          }

          if ((this.version ^ 4) >= 2) { continue; }

          switch (voice.effect) {
            case 12:
              chan.volume = voice.param;
              break;
            case 14:
              this.filter = voice.param;
              break;
            case 15:
              voice.param &= 0x0f;

              if (voice.param && voice.param > this.tick) {
                this.speed = voice.param;
              }
              break;
          }
        } while (voice = voice.next);
      }

      if (++this.tick == this.speed) {
        this.tick = 0;
        this.patternPos += 4;

        if (this.patternPos == 256 || this.jumpFlag) {
          this.trackPos = (++this.trackPos & 127);
          this.jumpFlag = 0;
          this.patternPos = 0;

          if (this.trackPos == this.length) {
            this.trackPos = 0;
          }
        }
      }
    };

    arpeggio(voice) {
      let param = 0;

      switch (this.tick) {
        case 1:
        case 4:
          param = voice.param >> 4;
          break;
        case 2:
        case 5:
          param = voice.param &= 0x0f;
          break;
        case 3:
          voice.channel.period = voice.last;
        default:
          return;
      }

      let i = 0;

      while (this.periods[i] > voice.last) { i++; }
      param += i;

      if (param < 37) {
        voice.channel.period = this.periods[param];
      }
    };

    isLegal(text) {
      const len = text.length;
      if (len == 0) { return 0; }

      for (let i = 0; i < len; i++) {
        const code = text.charCodeAt(i);

        if (code && (code < 32 || code > 127)) {
          return 0;
        }
      }

      return 1;
    };
  }

  class AmigaChannel {
    constructor(index) {
      this.index = index;
      this.next  = null;
      this.split = (++index & 2) ? 1.0 : -1.0;
      this.initialize();

      return Object.seal(this);
    };

    get enabled() {
      return this.audena;
    };

    set enabled(value) {
      if (value != this.audena) {
        this.timer  = 1.0;
        this.audena = value;
        this.audloc = this.pointer;
        this.audlen = this.pointer + this.length;

        if (value) {
          this.delay += 2;
        }
      }
    };

    set period(value) {
      this.audper = value & 65535;
    };

    get volume() {
      return this.audvol;
    };

    set volume(value) {
      if (value < 0) {
        value = 0;
      } else if (value > 64) {
        value = 64;
      }

      this.audvol = value;
    };

    initialize() {
      this.delay   = 0;
      this.pointer = 0;
      this.length  = 0;
      this.timer   = 0.0;
      this.audena  = 0;
      this.audloc  = 0;
      this.audlen  = 0;
      this.audper  = 0;
      this.audvol  = 0;
      this.audatl  = 0.0;
      this.audatr  = 0.0;
    };
  }

  class Row {
    constructor() {
      this.note   = 0;
      this.sample = 0;
      this.effect = 0;
      this.param  = 0;
    };
  }

  class Sample {
    constructor() {
      this.pointer = 0;
      this.length  = 4;
      this.loopPtr = 0;
      this.repeat  = 0;
      this.volume  = 0;
    };
  }

  class Voice {
    constructor(index) {
      this.index = index;
      this.next  = null;
      this.initialize();
    };

    initialize() {
      this.channel = null;
      this.sample  = null;
      this.enabled = 0;
      this.period  = 0;
      this.last    = 0;
      this.effect  = 0;
      this.param   = 0;
      this.volume  = 0;
      this.slide   = 0;
    };
  }

  class AudioCache {
    constructor(size) {
      this.cache = new Array(size);
      this.size = size;
      this.rpos = 0;
      this.wpos = 0;
      this.sync = 0.1;
      this.time = 0;

      for (let i = 0; i < size; i++) {
        const o = Object.create(null);

        o.position = 0;
        o.last   = new Array(4).fill(0);
        o.note   = new Array(4).fill(0);
        o.sample = new Array(4).fill(0);
        o.volume = new Array(4).fill(0);

        this.cache[i] = o;
      }
    };

    reset() {
      this.rpos = 0;
      this.wpos = 0;
      this.time = 0;
    };

    read() {
      const o = this.cache[this.rpos];
      const d = o.position - audio.currentTime;

      if (d >= this.sync) {
        let pos = this.rpos - 1;
        if (pos < 0) { pos = 0; }
        return this.cache[pos];

      } else if (++this.rpos == this.size) {
        this.rpos = 0;
      }

      return o;
    };

    write() {
      const o = this.cache[this.wpos];

      o.position = this.time;
      o.last.fill(0);
      o.sample.fill(0);

      this.time += (amiga.tickSize / audio.sampleRate);

      if (++this.wpos == this.size) {
        this.wpos = 0;
      }

      return o;
    };
  }

  class ByteArray extends DataView {
    constructor(buffer, endian = false) {
      super(buffer.slice(0), 0, buffer.byteLength);

      this.endian = endian;
      this.length = buffer.byteLength;
      this.position = 0;
    };

    get bytesAvailable() {
      return this.length - this.position;
    };

    get uint8() {
      return this.getUint8(this.position++);
    };

    get int8() {
      return this.getInt8(this.position++);
    };

    set int8(value) {
      this.setInt8(this.position++, value);
    };

    get uint16() {
      const v = this.getUint16(this.position, this.endian);
      this.position += 2;
      return v;
    };

    get int16() {
      const v = this.getInt16(this.position, this.endian);
      this.position += 2;
      return v;
    };

    set int16(value) {
      this.setInt16(this.position, value, this.endian);
      this.position += 2;
    };

    utf8(length) {
      const v = String.fromCharCode.apply(null, new Uint8Array(this.buffer, this.position, length));
      this.position += length;
      return v.replace(/\0/g, "");
    };

    append(data) {
      const c = new Int8Array(this.length + data.length);

      c.set(new Int8Array(this.buffer));
      c.set(new Int8Array(data.buffer), this.length);

      return new ByteArray(c.buffer);
    };

    fill(value = 0, offset = 0, length = 0) {
      if (!length) {
        length = this.length - offset;
      }

      new Uint8Array(this.buffer, offset, length).fill(value);
    };
  }

  function dispatch(event) {
    document.dispatchEvent(new Event(event, {bubble:false, cancelable:false}));
  }

  function suspend() {
    if (document.hidden) {
      audio.suspend();
    } else {
      audio.resume();
    }
  }

  function sync(e) {
    if ((cache.time) && ((amiga.playTime - audio.currentTime) < cache.sync)) {
      dispatch("flodSync");
    } else {
      requestAnimationFrame(sync);
    }
  }

  const ULTIMATE_SOUNDTRACKER = 1;
  const TJC_SOUNDTRACKER2     = 2;
  const DOC_SOUNDTRACKER4     = 3;
  const MASTER_SOUNDTRACKER   = 4;
  const DOC_SOUNDTRACKER9     = 5;
  const DOC_SOUNDTRACKER20    = 6;

  let gl_memory = null;
  let gl_filter = 0;
  let gl_stereo = 1;
  let gl_volume = 64;

  const audio = new (AudioContext || webkitAudioContext);
  const cache = new AudioCache(32);
  const amiga = new Amiga();

  window.FLOD = new Player();

  dispatch("flodLoaded");
})();