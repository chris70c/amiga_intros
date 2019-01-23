/*
  Mini FLOD for Intros
  Protracker
  version 7.1
  2018-11-20
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

    set ciaTimer(value = 0) {
      amiga.cia = value;
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
      if (value < PROTRACKER10) {
        value = PROTRACKER10;
      } else if (value > PROTRACKER30) {
        value = PROTRACKER30;
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

        for (let i = 32; i < length; i++) {
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

        amiga.samples[32 + i] = s;
      }

      amiga.memory = new Int8Array(gl_memory.buffer);
      amiga.initialize();
      dispatch("flodReady");
      return true;
    };

    play(mode = 0, frames = 0) {
      if ((!mode && !amiga.version) || (mode && amiga.samples.length < 33)) {
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
      this.cia     = 0;
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
        214,202,190,180,170,160,151,143,135,127,120,113,0,
        850,802,757,715,674,637,601,567,535,505,477,450,
        425,401,379,357,337,318,300,284,268,253,239,225,
        213,201,189,179,169,159,150,142,134,126,119,113,0,
        844,796,752,709,670,632,597,563,532,502,474,447,
        422,398,376,355,335,316,298,282,266,251,237,224,
        211,199,188,177,167,158,149,141,133,125,118,112,0,
        838,791,746,704,665,628,592,559,528,498,470,444,
        419,395,373,352,332,314,296,280,264,249,235,222,
        209,198,187,176,166,157,148,140,132,125,118,111,0,
        832,785,741,699,660,623,588,555,524,495,467,441,
        416,392,370,350,330,312,294,278,262,247,233,220,
        208,196,185,175,165,156,147,139,131,124,117,110,0,
        826,779,736,694,655,619,584,551,520,491,463,437,
        413,390,368,347,328,309,292,276,260,245,232,219,
        206,195,184,174,164,155,146,138,130,123,116,109,0,
        820,774,730,689,651,614,580,547,516,487,460,434,
        410,387,365,345,325,307,290,274,258,244,230,217,
        205,193,183,172,163,154,145,137,129,122,115,109,0,
        814,768,725,684,646,610,575,543,513,484,457,431,
        407,384,363,342,323,305,288,272,256,242,228,216,
        204,192,181,171,161,152,144,136,128,121,114,108,0,
        907,856,808,762,720,678,640,604,570,538,508,480,
        453,428,404,381,360,339,320,302,285,269,254,240,
        226,214,202,190,180,170,160,151,143,135,127,120,0,
        900,850,802,757,715,675,636,601,567,535,505,477,
        450,425,401,379,357,337,318,300,284,268,253,238,
        225,212,200,189,179,169,159,150,142,134,126,119,0,
        894,844,796,752,709,670,632,597,563,532,502,474,
        447,422,398,376,355,335,316,298,282,266,251,237,
        223,211,199,188,177,167,158,149,141,133,125,118,0,
        887,838,791,746,704,665,628,592,559,528,498,470,
        444,419,395,373,352,332,314,296,280,264,249,235,
        222,209,198,187,176,166,157,148,140,132,125,118,0,
        881,832,785,741,699,660,623,588,555,524,494,467,
        441,416,392,370,350,330,312,294,278,262,247,233,
        220,208,196,185,175,165,156,147,139,131,123,117,0,
        875,826,779,736,694,655,619,584,551,520,491,463,
        437,413,390,368,347,328,309,292,276,260,245,232,
        219,206,195,184,174,164,155,146,138,130,123,116,0,
        868,820,774,730,689,651,614,580,547,516,487,460,
        434,410,387,365,345,325,307,290,274,258,244,230,
        217,205,193,183,172,163,154,145,137,129,122,115,0,
        862,814,768,725,684,646,610,575,543,513,484,457,
        431,407,384,363,342,323,305,288,272,256,242,228,
        216,203,192,181,171,161,152,144,136,128,121,114,0];

      this.funkrep = [0,5,6,7,8,10,11,13,16,19,22,26,32,43,64,128];
      this.vibrato = [0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24];
      this.vibratoDepth = 0;

      this.samples      = [];
      this.voices       = [];
      this.patterns     = [];
      this.track        = [];
      this.length       = 0;
      this.speed        = 0;
      this.replay       = 0;
      this.restart      = 0;
      this.tick         = 0;
      this.breakPos     = 0;
      this.jumpFlag     = 0;
      this.patternDelay = 0;
      this.patternBreak = 0;
      this.patternPos   = 0;
      this.trackPos     = 0;

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
        this.tickSize = (rate / 60) >> 0;
      } else {
        this.clock = 3546895 / rate;
        this.tickSize = (rate / 50) >> 0;
      }

      if (this.version < PROTRACKER11) {
        this.vibratoDepth = 6;
      } else {
        this.vibratoDepth = 7;
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
      if (stream.length < 2106) { return; }

      this.cia = 0;

      stream.position = 1080;
      let id = stream.utf8(4);

      if (id != "M.K." && id != "M!K!") { return; }

      this.version = PROTRACKER10;

      stream.position = 950;
      this.length = stream.uint8;

      let keep = stream.uint8;

      if (keep == 0x7f) {
        this.version = PROTRACKER10C;
      } else if (keep != 0x78) {
        this.version = 0;
        return;
      }

      stream.position = 42;

      for (let i = 1; i < 32; i++) {
        let value = stream.uint16;

        if (!value) {
          this.samples[i] = null;
          stream.position += 28;
          continue;
        }

        stream.position -= 2;

        const sample = new Sample();
        sample.length = value << 1;

        stream.position += 2;
        sample.finetune = stream.uint8;
        sample.volume   = stream.uint8;
        sample.loopPtr  = stream.uint16;
        sample.repeat   = stream.uint16 << 1;

        stream.position += 22;
        this.samples[i] = sample;
      }

      stream.position = 952;

      let higher = 0;

      for (let i = 0; i < 128; i++) {
        const value = stream.int8 << 8;
        if (value > higher) { higher = value; }
        this.track[i] = value;
      }

      stream.position = 1084;
      higher += 256;

      this.patterns.length = higher;

      for (let i = 0; i < higher; i++) {
        let value = stream.uint32;

        const row = new Row();
        row.step   = value;
        row.note   = (value >> 16) & 0x0fff;
        row.effect = (value >>  8) & 0x0f;
        row.sample = (value >> 24) & 0xf0 | (value >> 12) & 0x0f;
        row.param  = value & 0xff;

        if (row.sample > 31) { row.sample = 0; }

        if ((row.effect > 6 && row.effect < 10) || (row.effect == 14 && ((row.param & 0x0f) > 1))) {
          if (keep == 0x78) {
            this.version = PROTRACKER10;
          } else {
            this.version = PROTRACKER10C;
          }
        }

        if (row.effect == 15 && row.param > 31) {
          this.cia = 1;
          if (this.version < PROTRACKER11) { this.version = PROTRACKER11; }
        }

        this.patterns[i] = row;
      }

      let len = stream.position;
      stream.fill(0,0,4);

      const empty = new Sample();

      for (let i = 0; i < 32; i++) {
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

        if (sample.loopPtr || sample.repeat > 2) {
          sample.length = sample.loopPtr + sample.repeat;
          sample.loopPtr += sample.pointer;
        }
      }
    };

    process() {
      let voice = this.voices[0];

      if (!this.tick) {
        if (this.patternDelay) {
          this.standardFx();
        } else {
          const pos = this.track[this.trackPos] + this.patternPos;

          do {
            const chan = voice.channel;
            voice.enabled = 0;

            if (!voice.step) { chan.period = voice.period; }

            const row = this.patterns[pos + voice.index];
            voice.step   = row.step;
            voice.effect = row.effect;
            voice.param  = row.param;

            this.cache.last[voice.index] = voice.period;

            let sample = voice.sample;

            if (row.sample) {
              sample = voice.sample = this.samples[row.sample];

              voice.pointer  = sample.pointer;
              voice.length   = sample.length;
              voice.loopPtr  = sample.loopPtr;
              voice.repeat   = sample.repeat;
              voice.finetune = sample.finetune;
              voice.volume   = sample.volume;
              voice.funkWave = sample.loopPtr;

              chan.volume = sample.volume;

              this.cache.sample[voice.index] = row.sample;
            }

            if (!row.note) {
              this.moreFx(voice);
              continue;
            } else {
              if ((voice.step & 0x0ff0) == 0x0e50) {
                voice.finetune = voice.param & 0x0f;
              } else if (voice.effect == 3 || voice.effect == 5) {
                let i = voice.finetune * 37;
                let l = i + 37;

                for (; i < l; i++) {
                  if (row.note >= this.periods[i]) { break; }
                }

                l = voice.finetune & 8;
                if (l && i != 0) { i--; }

                voice.portaPeriod = this.periods[i];
                voice.portaDir = (row.note > voice.period) ? 0 : 1;

                if (voice.period == voice.portaPeriod) {
                  voice.portaPeriod = 0;
                }

                this.moreFx(voice);
                continue;
              } else if (voice.effect == 9) {
                this.moreFx(voice);
              }
            }

            let i = 0;

            for (; i < 37; i++) {
              if (row.note >= this.periods[i]) { break; }
            }

            voice.period = this.periods[(voice.finetune * 37) + i];
            this.cache.last[voice.index] = voice.period;

            if ((voice.step & 0x0ff0) == 0x0ed0) {
              if (voice.funkSpeed) { this.updateFunk(voice); }

              this.extendedFx(voice);
              continue;
            }

            if (voice.vibratoWave < 4) { voice.vibratoPos = 0; }
            if (voice.tremoloWave < 4) { voice.tremoloPos = 0; }

            chan.enabled = 0;
            chan.pointer = voice.pointer;
            chan.length  = voice.length;
            chan.period  = voice.period;

            voice.enabled = 1;
            this.moreFx(voice);
          } while (voice = voice.next);

          voice = this.voices[0];

          do {
            const chan = voice.channel;
            if (voice.enabled) { chan.enabled = 1; }

            chan.pointer = voice.loopPtr;
            chan.length  = voice.repeat;
          } while (voice = voice.next);
        }
      } else {
        this.standardFx();
      }

      if (++this.tick == this.speed) {
        this.tick = 0;
        this.patternPos += 4;

        if (this.patternDelay) {
          if (--this.patternDelay) {
            this.patternPos -= 4;
          }
        }

        if (this.patternBreak) {
          this.patternBreak = 0;
          this.patternPos = this.breakPos;
          this.breakPos = 0;
        }

        if (this.patternPos == 256 || this.jumpFlag) {
          this.trackPos = (++this.trackPos & 127);

          this.patternPos = this.breakPos;
          this.breakPos = 0;
          this.jumpFlag = 0;

          if (this.trackPos == this.length) {
            this.trackPos = 0;
          }
        }
      }
    };

    standardFx() {
      let voice = this.voices[0];

      do {
        const chan = voice.channel;
        if (voice.funkSpeed) { this.updateFunk(voice); }

        if (!(voice.step & 0x0fff)) {
          chan.period = voice.period;
          this.cache.last[voice.index] = voice.period;
          continue;
        }

        let slide = 0;
        let value = 0;

        switch (voice.effect) {
          case 0:
            value = this.tick % 3;

            if (!value) {
              chan.period = voice.period;
              this.cache.last[voice.index] = voice.period;
              continue;
            }

            if (value == 1) {
              value = voice.param >> 4;
            } else {
              value = voice.param & 0x0f;
            }

            let i = voice.finetune * 37;
            let l = i + 37;

            for (; i < l; i++) {
              if (voice.period >= this.periods[i]) {
                chan.period = this.periods[i + value];
                break;
              }
            }
            break;
          case 1:
            voice.period -= voice.param;
            if (voice.period < 113) { voice.period = 113; }
            chan.period = voice.period;
            break;
          case 2:
            voice.period += voice.param;
            if (voice.period > 856) { voice.period = 856; }
            chan.period = voice.period;
            break;
          case 3:
          case 5:
            if (voice.effect == 5) {
              slide = 1;
            } else if (voice.param) {
              voice.portaSpeed = voice.param;
              voice.param = 0;
            }

            if (!voice.portaPeriod) { break; }

            if (voice.portaDir) {
              voice.period -= voice.portaSpeed;

              if (voice.period <= voice.portaPeriod) {
                voice.period = voice.portaPeriod;
                voice.portaPeriod = 0;
              }
            } else {
              voice.period += voice.portaSpeed;

              if (voice.period >= voice.portaPeriod) {
                voice.period = voice.portaPeriod;
                voice.portaPeriod = 0;
              }
            }

            if (voice.glissando) {
              let i = voice.finetune * 37;
              let l = i + 37;

              for (; i <= l; i++) {
                if (voice.period >= this.periods[i]) { break; }
              }

              if (i == l) { i -= 2; }
              chan.period = this.periods[i];
            } else {
              chan.period = voice.period;
            }
            break;
          case 4:
          case 6:
            if (voice.effect == 6) {
              slide = 1;
            } else if (voice.param) {
              value = voice.param & 0x0f;
              if (value) { voice.vibratoParam = (voice.vibratoParam & 0xf0) | value; }

              value = voice.param & 0xf0;
              if (value) { voice.vibratoParam = (voice.vibratoParam & 0x0f) | value; }
            }

            let vpos = (voice.vibratoPos >> 2) & 31;
            let wave = voice.vibratoWave & 3;

            if (wave) {
              value = 255;
              vpos <<= 3;

              if (wave == 1) {
                if (voice.vibratoPos > 127) {
                  value -= vpos;
                } else {
                  value = vpos;
                }
              }
            } else {
              value = this.vibrato[vpos];
            }

            value = ((voice.vibratoParam & 0x0f) * value) >> this.vibratoDepth;

            if (voice.vibratoPos > 127) {
              chan.period = voice.period - value;
            } else {
              chan.period = voice.period + value;
            }

            value = (voice.vibratoParam >> 2) & 60;
            voice.vibratoPos = (voice.vibratoPos + value) & 255;
            break;
          case 7: {
            chan.period = voice.period;

            if (voice.param) {
              value = voice.param & 0x0f;
              if (value) { voice.tremoloParam = (voice.tremoloParam & 0xf0) | value; }

              value = voice.param & 0xf0;
              if (value) { voice.tremoloParam = (voice.tremoloParam & 0x0f) | value; }
            }

            let tpos = (voice.tremoloPos >> 2) & 31;
            let wave = voice.tremoloWave & 3;

            if (wave) {
              value = 255;
              tpos <<= 3;

              if (wave == 1) {
                if (voice.tremoloPos > 127) {
                  value -= tpos;
                } else {
                  value = tpos;
                }
              }
            } else {
              value = this.vibrato[tpos];
            }

            value = ((voice.tremoloParam & 0x0f) * value) >> 6;

            if (voice.tremoloPos > 127) {
              chan.volume = voice.volume - value;
            } else {
              chan.volume = voice.volume + value;
            }

            value = (voice.tremoloParam >> 2) & 60;
            voice.tremoloPos = (voice.tremoloPos + value) & 255;
            break; }
          case 10:
            chan.period = voice.period;
            slide = 1;
            break;
          case 14:
            this.extendedFx(voice);
            break;
          default:
            chan.period = voice.period;
            break;
        }

        if (slide) {
          value = voice.param >> 4;

          if (value) {
            voice.volume += value;
          } else {
            voice.volume -= (voice.param & 0x0f);
          }

          if (voice.volume < 0) {
            voice.volume = 0;
          } else if (voice.volume > 64) {
            voice.volume = 64;
          }

          chan.volume = voice.volume;
        }

        this.cache.last[voice.index] = voice.period;
      } while (voice = voice.next);
    };

    moreFx(voice) {
      if (voice.funkSpeed) { this.updateFunk(voice); }

      switch (voice.effect) {
        case 9:
          if (voice.param) { voice.offset = voice.param; }
          let value = voice.offset << 8;

          if (this.version > PROTRACKER20) {
            if (value >= voice.sample.length) {
              voice.length = 4;
            } else {
              voice.pointer = voice.sample.pointer + value;
              voice.length  = voice.sample.length - value;
            }
          } else {
            if (value >= voice.length) {
              voice.length = 4;
            } else {
              voice.pointer += value;
              voice.length -= value;
            }
          }
          break;
        case 11:
          this.trackPos = (voice.param - 1) & 127;
          this.breakPos = 0;
          this.jumpFlag = 1;
          break;
        case 12:
          voice.volume = voice.param;
          if (voice.volume > 64) { voice.volume = 64; }
          voice.channel.volume = voice.volume;
          break;
        case 13:
          this.breakPos = ((voice.param >> 4) * 10) + (voice.param & 0x0f);

          if (this.breakPos > 63) {
            this.breakPos = 0;
          } else {
            this.breakPos <<= 2;
          }

          this.jumpFlag = 1;
          break;
        case 14:
          this.extendedFx(voice);
          break;
        case 15:
          if (!voice.param) {
            this.stop();
            break;
          }

          if (this.cia) {
            if (voice.param < 32) {
              this.speed = voice.param;
            } else {
              this.ticksize = ((audio.sampleRate * 2.5) / voice.param) >> 0;
            }
          } else {
            this.speed = voice.param;
          }
          break;
        default:
          voice.channel.period = voice.period;
          break;
      }
    };

    extendedFx(voice) {
      const chan = voice.channel;

      const effect = voice.param >> 4;
      const param  = voice.param & 0x0f;

      switch (effect) {
        case 0:
          this.filter = param;
          break;
        case 1:
          if (this.tick) { break; }
          voice.period -= param;
          if (voice.period < 113) { voice.period = 113; }
          chan.period = voice.period;
          break;
        case 2:
          if (this.tick) { break; }
          voice.period += param;
          if (voice.period > 856) { voice.period = 856; }
          chan.period = voice.period;
          break;
        case 3:
          voice.glissando = param;
          break;
        case 4:
          voice.vibratoWave = param;
          break;
        case 5:
          voice.finetune = param;
          break;
        case 6:
          if (this.tick) { break; }

          if (param) {
            if (voice.loopPos < 0) { break; }

            if (voice.loopCtr) {
              voice.loopCtr--;
            } else {
              voice.loopCtr = param;
            }

            if (voice.loopCtr) {
              this.breakPos = voice.loopPos;
              this.patternBreak = 1;
            } else {
              voice.loopPos = -1;
            }
          } else {
            voice.loopPos = this.patternPos;
          }
          break;
        case 7:
          voice.tremoloWave = param;
          break;
        case 8:
          if (this.version == PROTRACKER20) {
            let i = voice.loopPtr;
            let l = voice.length - 2;

            for (; i < len;) {
              this.memory[i] = (this.memory[i] + this.memory[++i]) >> 1;
            }

            this.memory[++i] = (this.memory[i] + this.memory[voice.pointer]) >> 1;
          }
          break;
        case 9:
          if (this.tick || !param || !voice.period) { break; }
          if (this.tick % param) { break; }

          chan.enabled = 0;
          chan.delay   = 30;
          chan.pointer = voice.pointer;
          chan.length  = voice.length;

          chan.enabled = 1;
          chan.pointer = voice.loopPtr;
          chan.length  = voice.repeat;
          chan.period  = voice.period;
          break;
        case 10:
          if (this.tick) { break; }
          voice.volume += param;
          if (voice.volume > 64) { voice.volume = 64; }
          chan.volume = voice.volume;
          break;
        case 11:
          if (this.tick) { break; }
          voice.volume -= param;
          if (voice.volume < 0) { voice.volume = 0; }
          chan.volume = voice.volume;
          break;
        case 12:
          if (this.tick == param) {
            chan.volume = voice.volume = 0;
          }
          break;
        case 13:
          if (this.tick != param || !voice.period) { break; }

          chan.enabled = 0;
          chan.delay   = 30;
          chan.pointer = voice.pointer;
          chan.length  = voice.length;

          chan.enabled = 1;
          chan.pointer = voice.loopPtr;
          chan.length  = voice.repeat;
          chan.period  = voice.period;
          break;
        case 14:
          if (this.tick || this.patternDelay) { break; }
          this.patternDelay = param + 1;
          break;
        case 15:
          if (this.tick) { break; }
          voice.funkSpeed = param;
          if (param) { this.updateFunk(voice); }
          break;
      }

      this.cache.last[voice.index] = voice.period;
    };

    updateFunk(voice) {
      if ((voice.funkPos += this.funkRep[voice.funkSpeed]) < 128) { return; }

      voice.funkPos = 0;

      if (this.version == PROTRACKER10) {
        let p1 = voice.pointer + (voice.sample.length - voice.repeat);
        let p2 = voice.funkWave + voice.repeat;

        if (p2 > p1) {
          p2 = voice.loopPtr;
          voice.channel.length = voice.repeat;
        }

        voice.channel.pointer = voice.funkWave = p2;
      } else {
        let p1 = voice.loopPtr + voice.repeat;
        let p2 = voice.funkWave + 1;

        if (p2 >= p1) { p2 = voice.loopPtr; }

        this.memory[p2] = ~this.memory[p2];
        voice.funkWave = p2;
      }
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
      this.step   = 0;
      this.note   = 0;
      this.sample = 0;
      this.effect = 0;
      this.param  = 0;
    };
  }

  class Sample {
    constructor() {
      this.pointer  = 0;
      this.length   = 4;
      this.loopPtr  = 0;
      this.repeat   = 0;
      this.volume   = 0;
      this.finetune = 0;
    };
  }

  class Voice {
    constructor(index) {
      this.index = index;
      this.next  = null;
      this.initialize();
    };

    initialize() {
      this.channel      = null;
      this.sample       = null;
      this.enabled      = 0;
      this.step         = 0;
      this.period       = 0;
      this.effect       = 0;
      this.param        = 0;
      this.volume       = 0;
      this.pointer      = 0;
      this.length       = 0;
      this.loopPtr      = 0;
      this.repeat       = 0;
      this.finetune     = 0;
      this.loopCtr      = 0;
      this.loopPos      = -1;
      this.offset       = 0;
      this.portaDir     = 0;
      this.portaPeriod  = 0;
      this.portaSpeed   = 0;
      this.glissando    = 0;
      this.tremoloParam = 0;
      this.tremoloPos   = 0;
      this.tremoloWave  = 0;
      this.vibratoParam = 0;
      this.vibratoPos   = 0;
      this.vibratoWave  = 0;
      this.funkPos      = 0;
      this.funkSpeed    = 0;
      this.funkWave     = 0;
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

    get uint32() {
      const v = this.getUint32(this.position, this.endian);
      this.position += 4;
      return v;
    };

    get int32() {
      const v = this.getInt32(this.position, this.endian);
      this.position += 4;
      return v;
    };

    set int32(value) {
      this.setInt32(this.position, value, this.endian);
      this.position += 4;
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

  const PROTRACKER10  = 1;
  const PROTRACKER10C = 2;
  const PROTRACKER11  = 3;
  const PROTRACKER20  = 4;
  const PROTRACKER30  = 5;

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