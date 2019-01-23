/*
  Crash Garret Crack
  Ackerlight (1988)
  Christian Corti
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 370;
    canvc.height = 287;
    canvx.imageSmoothingEnabled = false;

    buf1c.width  = 84;
    buf1c.height = 545;
    buf1x.imageSmoothingEnabled = false;

    buf2c.width  = 99;
    buf2c.height = 268;
    buf2x.imageSmoothingEnabled = false;

    buf3c.width  = 256;
    buf3c.height = 208;
    buf3x.imageSmoothingEnabled = false;

    buf4c.width  = 256;
    buf4c.height = 208;
    buf4x.imageSmoothingEnabled = false;

    buf3x.fillStyle = "#fff";
    buf4x.fillStyle = "#000";

    createBuffer();

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("flodSync", draw);

    player.version = 1;
    player.play();
  }

  function createBuffer() {
    var c, i;
    var p = 0;
    var y = 90;

    buf1x.drawImage(wild, 0,1,84,84, 0,0,84,84);

    for (i = 0; i < 5; i++) {
      buf1x.drawImage(wild, 0,0,84,85, 0,y,84,85);
      y += 91;
    }

    font.set([384,960,992,1888,1584,3640,3096,8188,16380,14342,28678,61455,0,0,0,0,65408,32736,28912,28784,28896,32704,32704,28784,28728,28792,32752,65472,0,0,0,0,992,4088,14360,28680,57344,57344,57344,57344,28676,30732,16380,4080,0,0,0,0,32704,16368,14392,14364,14350,14350,14350,14350,14364,14396,16368,65472,0,0,0,0,65504,32736,28704,28672,29056,32640,32640,29056,28680,28696,32760,65528,0,0,0,0,65504,32736,28704,28672,29440,32512,32512,29440,28672,28672,28672,63488,0,0,0,0,992,4088,15384,30728,28672,61440,61566,61566,28686,30750,16382,4070,0,0,0,0,63612,28728,28728,28728,28728,32760,32760,28728,28728,28728,28728,63612,0,0,0,0,1984,896,896,896,896,896,896,896,896,896,896,1984,0,0,0,0,124,56,56,56,56,56,56,56,7224,7224,3696,1984,0,0,0,0,61552,28896,29120,29568,30464,32256,32512,29568,29120,28896,28784,63608,0,0,0,0,63488,28672,28672,28672,28672,28672,28672,28672,28688,28720,32752,65520,0,0,0,0,63550,30780,31868,31868,31868,30428,30684,29596,29596,28956,28700,63550,0,0,0,0,61502,30748,31772,32284,32540,30620,29660,29180,28924,28796,28732,63518,0,0,0,0,2016,8184,15420,28686,24582,57351,57351,57351,28686,30750,8184,2016,0,0,0,0,65280,32704,28896,28768,28768,28896,32704,32512,28672,28672,28672,63488,0,0,0,0,2016,8184,15420,28686,24582,57351,57351,57351,28686,30958,16380,4080,56,28,0,0,65408,32736,28784,28720,28720,28784,32736,32704,28896,28784,28728,63548,0,0,0,0,1920,8176,14384,28672,15360,8128,1008,120,32824,57464,65520,40928,0,0,0,0,65534,65534,50054,33666,896,896,896,896,896,896,896,1984,0,0,0,0,63550,28700,28700,28700,28700,28700,28700,28700,28700,12316,14392,4080,0,0,0,0,61470,24588,28700,12312,14392,6192,7280,3168,3808,1984,1984,896,0,0,0,0,61455,57351,24966,24966,14316,13932,13932,7224,7224,7224,2064,2064,0,0,0,0,61560,57400,28784,14560,7616,3968,1792,3968,7616,14560,28784,61560,0,0,0,0,61470,28700,14392,7280,3808,1984,896,896,896,896,896,1984,0,0,0,0,32760,32760,24688,16608,448,896,1792,3584,7176,14360,32760,65528,0,0,0,0,960,1984,3520,448,448,448,448,448,448,448,448,448,2032,2032,0,0,1920,8160,28792,28728,24632,112,224,896,3840,7168,28672,57352,65528,65528,0,0,1920,16352,28784,24624,112,224,1920,224,112,56,56,57464,65520,16320,0,0,112,240,496,880,1648,3184,6256,12400,24688,65532,65532,112,112,248,0,0,32752,32736,24576,24576,24576,24576,32704,32752,120,56,56,24632,61552,32736,0,0,992,3640,6200,12288,28672,28672,65504,63544,61468,28700,28700,12316,14392,4064,0,0,65520,65520,32864,192,384,896,768,1792,1536,3584,3584,7680,7680,7680,0,0,2016,7224,12300,12300,12300,7224,4080,4080,14364,28686,28686,28686,30750,8184,0,0,1920,16352,28784,57400,57400,57400,61560,32760,7992,56,48,24688,28896,8064,0,0,2016,7224,14364,28686,28686,61455,61455,61455,61455,28686,28686,14364,7224,2016,0,0,960,960,960,960,960,960,960,384,0,0,960,960,960,0,0,0,2016,4080,7928,7288,248,496,960,960,0,0,960,960,960,0,0,0,0,0,0,0,0,0,0,0,0,1792,1792,1792,768,768,1536,3072,96,192,384,384,896,896,896,896,896,384,384,192,96,0,0,0,1536,768,384,384,448,448,448,448,448,384,384,768,1536,0,0,0,0,0,0,0,0,0,0,0,0,960,960,960,0,0,0,0,0,0,0,960,960,960,0,0,0,960,960,960,0,0,0,0,896,896,896,384,384,768,1536,0,0,0,0,0,0,0,0,0,16376,2192,2128,2096,7184,7184,2064,32528,7184,7184,7184,13840,8720,8760,84,254,1184,1296,2320,2080,1088,0,4064,4126,6194,8178,8190,8176,16380,61431,61455,16380,1984,8176,15288,12568,12568,5016,7536,3424,51139,58703,6832,1984,1984,3120,61455,49155,65535,49148,40965,49149,40965,49149,40965,49149,32769,65535,49183,57311,54239,54239,54239,57311,7280,5200,5456,4064,1984,1984,4064,4064,4064,4064,4064,4064,4000,4000,1856,896,1984,6448,10536,16644,24844,33090,33154,57614,32770,32770,24588,16388,10536,6448,1984,0,0,768,1156,1124,3608,3584,16256,26560,53216,65504,65504,65504,65504,32704,16256,7936,0,6,10,20,40,80,160,320,17024,13568,6656,7168,11776,20992,57600,49152,12,30,30,30,8158,8254,24540,24536,24632,16368,8160,3008,3008,7136,6112,4032,1016,3596,14338,24578,16803,50089,34529,33963,64737,33973,38097,37998,30768,0,0,0,0,18448,33840,64524,30722,13314,32764,31740,14332,4092,4092,4094,1982,1306,1298,1060,0,496,1548,1252,2306,2050,2050,2050,2050,1028,3596,7664,14336,28672,57344,49152,0,64,112,120,88,72,72,72,136,136,132,7808,12032,16128,7680,0,0,12,14,30,54,126,476,248,368,560,1088,2176,4352,8704,19456,61440,128,128,992,1168,2184,4548,4772,32767,4772,4548,2184,1168,992,128,128,0,8188,6132,8180,6140,6004,7740,7196,6156,6156,7324,8060,5684,8180,6140,6132,8188,0,0,0,0,0,256,1152,768,640,1088,0,0,0,0,0,0,0,0,0,0,0,256,1088,896,1280,4928,1408,2048,0,0,0,0,0,0,0,0,128,32,1408,832,3488,5952,640,2112,0,0,0,0,0,0,0,2112,16,2752,2336,1988,2880,6016,2304,4736,528,8192,0,0,0,0,8208,3136,16800,4688,640,3936,5760,3792,8960,3488,4480,8210,0,0,8192,32832,41476,21104,9408,6864,27396,1480,1952,13732,2896,2376,20992,8978,18506,32768,2304,41097,21138,3872,45209,1702,44080,10693,18400,22218,1888,9942,5048,13488,32773,19264,1600,26893,31984,5018,6103,16126,11192,32751,24317,30687,48125,28509,19830,48094,11696,19033,65535,49155,33737,34789,34213,34785,34209,34401,39881,47117,47245,40089,49155,65535,54615,65535,0,0,0,4094,8190,8188,4064,4192,57792,57472,57728,57472,57728,61568,44800,57344,16380,12300,9556,8868,8196,8324,8196,8708,12300,16380,10260,65535,43691,54613,43691,65535,43703,41637,51894,43685,44021,0,12294,6156,8188,4964,6476,6828,4088,3640,1904,992,896,1984,2080,2720,4112,15288,4368,1984,2336,2080,2336,4064,1088,1984,640,1728,0,0,6,8,776,14084,32738,32754,16382,8184,16368,22464,32512,30720,0,0,49806,58014,32508,45034,47066,33858,30780,1984,0,65534,43690,43690,65534,0,16376,0,28672,51200,44544,35712,55520,28720,6168,3588,774,898,1538,1362,1666,1706,902,252,27537,11156,8578,16376,49144,2043,13256,34760,40909,16320,9124,8965,27441,27012,210,46544,32447,20145,16513,16385,16385,19481,16833,17377,31775,16385,21845,21845,21845,16385,24579,32767,32768,49026,63566,63038,63198,62174,61722,40242,33806,64190,64574,33730,40946,61564,32816,32768,6,1994,3988,7736,7408,14840,13304,10232,4088,8176,16368,24544,42944,49152,0,0,992,992,320,320,1904,2056,2056,3064,2648,3064,2872,2776,3064,2056,2056,4088,1584,608,0,16380,12288,320,320,864,1824,3376,6424,12544,256,256,768,768,1024,1536,1024,1024,1792,1024,1920,1984,1856,1984,1920,1920,1920,1920,4032,8160,256,256,896,1344,1984,64832,33728,43359,33749,43359,33749,43359,33749,43391,33781,43903,0,0,0,0,0,4100,6156,5142,13878,21973,54613,21845,65535,12300,12300,12300,65535,49137,40957,49151,45055,48639,33645,40889,40897,40945,40945,49137,63993,63613,65023,65535,1792,8128,6240,15408,11800,15176,4524,17830,4486,258,802,1600,63488,256,58880,0,14,124,224,192,192,224,112,56,28,12,3982,8190,63740,28720,61440,53248,0,384,576,576,384,384,384,384,384,3504,7128,14364,16380,14476,16380,8184,0,1040,448,8184,8196,65535,27222,16380,5064,8196,49155,0,0,0,0,0,32928,16720,8352,4496,2432,1152,7136,7648,8176,6136,2040,2040,1008,544,544,544,256,3840,7936,7936,3840,3840,4032,4064,4080,2036,2036,2034,2034,2034,2034,4092,6,451,2033,4089,40959,65534,65532,28668,65404,32316,7196,5140,5140,5140,5140,10280,248,8152,8276,8276,16498,23666,43690,48889,43689,65535,16388,24436,21844,24436,21876,24436,0,1008,1336,2344,2596,4644,4642,32766,65534,65534,65534,53222,18468,12312,0,0,960,2032,696,1016,504,240,224,448,384,4088,6540,8188,6436,8188,5268,4088,6144,7168,13312,7196,7742,8190,8190,8190,8190,8190,4092,1016,160,288,33064,10852,512,12800,8064,4192,4672,5952,4672,4160,4188,4220,8188,636,15996,8184,8184,4080,49155,65535,55323,7128,7128,6552,4080,2016,960,960,2016,4080,3120,6168,4104,12300,15360,7792,3312,112,28672,61664,25072,3296,7680,7808,3138,78,60,56,32,32,384,944,1807,65120,32736,16327,28864,57373,3072,896,124,0,22391,21845,22118,9557,0,16380,16386,36849,61455,41925,26278,10836,11700,10644,11316,9892,9156,16380,8196,8184,8184,5240,5240,8184,704,2016,704,2016,704,2016,704,2016,704,2016,704,960,35037,35037,35037,35037,35037,35037,35037,35037,35037,56797,56797,56797,56797,56797,56797,56797,16624,16808,16400,16778,17360,16458,17088,17088,23256,24568,23552,24063,24039,62951,30081,30593,0,0,0,1792,7808,9456,18184,31823,25567,11194,26879,40977,45101,39997,34785,30750,13196,9092,8580,16380,8184,2016,960,960,4080,8184,16380,14364,12300,4104,4104,12300,0,384,896,1816,1656,4080,4032,7936,16112,28668,65534,65535,16382,4094,16382,32766,8200,16376,9096,15736,9928,11176,9096,15480,16120,16376,16376,16376,16376,8176,16368,10280,12,41502,19486,12,9152,53232,8184,8056,7737,24443,65401,24571,32767,65535,65535,65535,1792,8064,10192,28240,23264,65512,48832,58772,51088,53168,44228,31204,27968,16336,5504,1536,896,896,896,896,16376,16376,16376,896,896,896,896,896,896,896,896,896,0,1648,1904,14176,14182,12302,908,4064,4080,8176,8176,8176,8176,8160,4064,1984,3504,29256,37448,37496,37768,37764,40642,24610,16898,17412,9224,9328,7120,4112,4112,4112,0,56,112,224,448,896,448,224,448,896,1792,896,960,1792,3072,4096,14392,31868,65278,65534,65534,65534,65534,32764,16376,8176,4064,1984,896,256,0,0,32768,32768,33536,35968,36992,26608,1168,1168,1168,2032,2032,2032,2032,2032,2032,0,0,0,1904,4088,8188,12302,0,14062,3548,7128,7040,8064,8064,8064,3840]);

    for (i = 0; i < 48;) {
      table1[i++] = p;
      table1[i++] = 0x8c00;
      table1[i++] = 0xc800;
      p += 9;
    }

    p = buff1 + 224;

    for (i = 1; i < 16; i++) {
      c = sc_text[i];

      if (c != 32) {
        c = (c - 65) * 16;
        font.copyWithin(p, c, c + 16);
      }

      p -= 16;
    }
  }

  function line(x1, y1, x2, y2, pattern, width = 0xc000) {
    var f, i, t, w;
    var dx = x2 - x1;
    var dy = y2 - y1;

    var f1 = buf3x.fillRect.bind(buf3x);
    var f2 = buf3x.clearRect.bind(buf3x);

    var bltadat = width;
    var bltbdat = pattern;
    var octant  = 0;

    if (dx < 0) {
      dx = -dx;

      if (dy < 0) {
        dy = -dy;

        if (dx < dy) {
          i = dx;
          dx = dy;
          dy = i;

          octant = 0x0c;
        } else {
          octant = 0x1c;
        }
      } else {
        if (dx < dy) {
          i = dx;
          dx = dy;
          dy = i;

          octant = 0x08;
        } else {
          octant = 0x14;
        }
      }
    } else {
      if (dy < 0) {
        dy = -dy;

        if (dx < dy) {
          i = dx;
          dx = dy;
          dy = i;

          octant = 0x04;
        } else {
          octant = 0x18;
        }
      } else {
        if (dx < dy) {
          i = dx;
          dx = dy;
          dy = i;

          octant = 0x00;
        } else {
          octant = 0x10;
        }
      }
    }

    var bltamod = 4 * (dy - dx);
    var bltbmod = 4 * dy;
    var bltaptr = (2 * dy) - dx;
    var bashift = x1 & 0x0f;

    var blitsign = true;

    dx = 16;
    x1 -= bashift;

    do {
      f = (bltbdat & 1) ? f1 : f2;
      t = 0x8000;
      w = bltadat >> bashift;

      for (i = 0; i < 16; i++) {
        if (w & t) { f(x1+i,y1,1,1); }
        t >>= 1;
      }

      if (!blitsign) {
        bltaptr += bltamod;

        if (octant & 0x10) {
          if (octant & 0x08) { y1--; } else { y1++; }
        } else {
          if (octant & 0x08) {
            if (bashift-- == 0) {
              bashift = 15;
              x1 -= 16;
            }
          } else {
            if (++bashift == 16) {
              bashift = 0;
              x1 += 16;
            }
          }
        }
      } else {
        bltaptr += bltbmod;
      }

      if (octant & 0x10) {
        if (octant & 0x04) {
          if (bashift-- == 0) {
            bashift = 15;
            x1 -= 16;
          }
        } else {
          if (++bashift == 16) {
            bashift = 0;
            x1 += 16;
          }
        }
      } else {
        if (octant & 0x04) { y1--; } else { y1++; }
      }

      blitsign = 0 > bltaptr;

      bltbdat = ((bltbdat << 1) | (bltbdat >>> 15)) & 0xffff;
    } while (dx--);
  }

  function draw() {
    var adr, chr, i, idx, j, pbuf1, pbuf2, stx, sty, val;
    var ctr = 0;
    var x1, y1, x2, y2;

    canvx.drawImage(back, 0,0,1,287, 0,0,370,287);

    buf2x.clearRect(0,0,99,268);
    y1 = cop_cy;

    for (i = 0; i < 268; i++) {
      buf2x.drawImage(buf1c, 0,y1,84,1, bpl_scr[i],i,84,1);

      y1 += bpl_mod[i];
      if (y1 >= 545) { y1 -= 545; }
    }

    if (++cop_cy == 545) { cop_cy = 0; }

    buf2x.globalCompositeOperation = "source-in";
    buf2x.drawImage(fore, 0,0,1,268, 0,0,99,268);
    buf2x.globalCompositeOperation = "source-over";

    canvx.drawImage(buf2c, 0,0,99,268,  21,18,99,268);
    canvx.drawImage(buf2c, 0,0,99,268, 257,18,99,268);

    if (--sc_ctr == 0) {
      sc_ctr = 2;

      pbuf1 = buff1;
      pbuf2 = buff2;

      buf3x.clearRect(0,0,256,208);

      for (i = 0; i < 16; i++) {
        adr = table1[ctr];
        val = table2[adr++];

        if (val < 0) {
          table1[ctr] = adr;
          ctr += 3;
        } else {
          if (adr <= 144) {
            idx = adr - 136;

            if (idx == 8) {
              font.copyWithin(pbuf2, pbuf1, pbuf1 + 16);
            } else {
              idx *= 16;

              for (j = 0; j < 16; j++) {
                font[pbuf2 + j] = fade[idx++] & font[pbuf1 + j];
              }
            }
          } else if (adr > 270) {
            idx = adr - 136;

            if (idx == 142) {
              font.fill(0, pbuf2, pbuf2 + 16);
            } else {
              idx = (idx - 134) * 16;

              for (j = 0; j < 16; j++) {
                font[pbuf2 + j] = (~fade[idx++]) & font[pbuf2 + j];
              }
            }

            if (adr == 279) {
              adr = 135;
              table1[ctr + 1] = 0x8c00;
              table1[ctr + 2] = 0xc800;

              chr = sc_text[sc_pos];

              if (chr == 32) {
                font.fill(0, pbuf1, pbuf1 + 16);
              } else {
                chr = (chr - 65) * 16;
                font.copyWithin(pbuf1, chr, chr + 16);
              }

              if (++sc_pos == sc_len) { sc_pos = 0; }
            }
          }

          table1[ctr++] = adr;

          val *= 4;
          idx = val + 2;

          stx = table3[idx++];
          sty = table3[idx];

          stx =  (stx * 4) & 0xffff;
          sty = -(sty * 4) & 0xffff;

          idx = (table1[ctr] + sty) & 0xffff;
          sty = (table1[ctr + 1] + stx) & 0xffff;
          stx = idx;

          table1[ctr++] = stx;
          table1[ctr++] = sty;

          x1 = table3[val++];
          y1 = table3[val++];
          x2 = -y1;
          y2 =  x1;

          x1 = (x1 + stx) & 0xffff;
          x2 = (x2 + stx) & 0xffff;
          y1 = (y1 + sty) & 0xffff;
          y2 = (y2 + sty) & 0xffff;

          stx = table3[val++];
          sty = table3[val];

          for (j = 0; j < 16; j++) {
            line((x1 >> 8), (y1 >> 8), (x2 >> 8), (y2 >> 8), font[pbuf2 + j]);

            x1 = (x1 + stx) & 0xffff;
            x2 = (x2 + stx) & 0xffff;
            y1 = (y1 + sty) & 0xffff;
            y2 = (y2 + sty) & 0xffff;
          }
        }

        pbuf1 += 16;
        pbuf2 += 16;
      }
    }

    buf4x.fillRect(0,0,256,208);
    buf4x.globalCompositeOperation = "destination-in";
    buf4x.drawImage(buf3c,0,0);
    buf4x.globalCompositeOperation = "source-over";

    y1 = 10;
    y2 = 80;

    for (i = 62; i < 260; i++) {
      canvx.drawImage(buf4c, 0,y1,256,1, 21+bpl_scr[i],y2++,256,1);
      y1 += bpl_mod[i];
    }

    canvx.drawImage(log1, 88,77);
    canvx.drawImage(buf3c,53,18);
    canvx.drawImage(log2, 0,0,164,142, 119,56,164,142);

    requestAnimationFrame(draw);
  }

  const back = new Image();
  const fore = new Image();
  const log1 = new Image();
  const log2 = new Image();
  const wild = new Image();

  back.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAEfBAMAAABykLHlAAAALVBMVEUAAP8AAO8AAN4AAM4AAL0AAK0AAJwAAIwAAHMAAGMAAFIAAEIAADEAACEAABBlYnymAAAAQUlEQVQoz2NQYBBgAAEBIMuAwYEhgCGBoYChgWECwwKGDQwHGC4wPADCC0DWBqDIBKBMAVBFAFClwajeEaIXJwAA9tV2Uf0+epcAAAAASUVORK5CYII=";
  fore.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAEMBAMAAAD30sHQAAAALVBMVEX//wDv7wDe3wDOzwC9ugCtqgCcmgCMigBzdQBjZQBSVQBCRQAxMAAhIAAQEACulCJYAAAAQklEQVQoz2N4wHCB4QDDBoYFDBMYGhgKGBIYAhgcGAwYFBgEGIAASCoAeQ5A0QSgbANQ1QKg6gNAXQ9G9Q4DvTgAAKFOb5H/CcT2AAAAAElFTkSuQmCC";
  log1.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALAAAABXAQMAAACeOF0nAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAzxJREFUOMtt072u0zAUB/ATAhgkVINYGBAeGFhhAkSFB0YG3gDYWCuxVALVZmK8IwtSH4EXQCLAwIKUR8BXDBUTLhlwuMaHYzsmyYUj9cO/Hp38nbhQCj2s4Fitoxs0AFemrCwA95GlmzKadY3YVBpRj4y4dxUiTVNoZ+wh8kagn3EARSxfIs4YQRKIfZBNURr7NRBrCoJbM3arLoCggCLInS1aBfXEE1t6ic4Vrn245ogcDTo48hO+6IEjDWpbj4XZ73A/MoL4pIPShXv/jfg3avHxtZKFedcfEnts5OEVtS3Bxe5wn9jIvZRtCS7bj/tArIx0cvu9BEfJO8rtlEGLov3L6kFiacPqJy/brMJmm1i4cOPrq86VfL/kzoG0ondXP90szLsfzzpXoeVHjh3c6X0J8vnnrkc0nH7xT48GVvL29xYRNafgfTcMqbzffdkSA3WrfWHWH7XvSAOxxxc/B1byllfEDhjiwYuhW7QGvw6HhjlZ5W7W/ZgcjQpZm25V2NyzYIQRGJhFALHYKOLLcP5EbStX9xYUNoom1IFeeilsgAAbCBxd9b6RiA2AoYUCBVLfrenLGgSiBVgBWoyMvvaqWcJthTTpFigXewVxkEbABRmjLUB4qWWMUqOwXNfbyAyYT6e0/G/YAYbItc9H42RmITAlrILAWB8kplrgu8jg89pirnPqzZT7rOGSJAYDy8whs78stoUn1VwvrCYa4PHVzLeGRz0cEMNmLEz+b5iTjyDeq+uZWX5y3MDD1P0482nIrE+8nfIJhlSO6yryCiQtUl9ky6Fap+7CKsVewGlbOETGWHoBZwuno1Ll3ZyBiw0tGlCZT0X2Q9Jaw7CqI9u4L4hcYb5kyhd3uoyLlMsUjteIi8spFwxDbHnUK4hhIdZ4wXhOeEydd3k4TE7DGVrIU5yDcpvpkw3t6FelO21INuPzWQ9MYer8vKTO8cp0wPzYCpcpBFTnYORxXI4z8nLCrIFS/P9cNyOL4XN+GbgLYz0fv24mfAX+m4qP8+w0bDMLMu8p+x/Lw1BqtMn1azdj0ZSjP2M2dKGecR1yUA/zUk16N8dY+PgW4FgxNMBx3jwe7n9KII4x/gCpJHRM+/T2VQAAAABJRU5ErkJggg==";
  log2.src = "data:image/png;base64,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";
  wild.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABbAQMAAADX8zBXAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAcVJREFUOMut07GK3DAQBmAZF2rMqt3CWHmEDYHcFsbOoxhcpFWXKwKrzk1g26TKo0RLijQH9wq6Kq3hGheLdP+MrD0wV54w1oelGUuWR1CTQeRWxLhkqxhj9snjSiwCIpZkOeMWkpXFTSd3POjY918oyHPoPFDHweVlpq7lmRM/ajiNZCt+oK88bGlizy4dpYRzUtOn95P9aoMxpyP7SDFFcgvbIlpyjbzY7pUWu0uOs44O3sHUZkkW7AWuk/9eS5v9J8DH5FMo3OoQ48ZGFMnCwzLZkvXNA6fBPDcIr8kRNsJjFOHJi6DNYR9GPLn0FTSyMHk/B3GZq/L/ZHsPu6WR/yYr9q/Wgfy9V9Nkm57c9VrCin36TZYW1s/hLXv1dE022YiFpVvIPRkLlFPUAR5WL9ihKcQH8iz8zZYs1gYfMwu3cV13Wp0tXIsOqz6fHZ/F3bdPvx5/eHgnxvHjz4dq4LMbbpbZu+xHdmmHEbGVr2E3jMipXIvXsStlaQF+GNsGNrAZx8O+qpyH7+8+H/bq4UJuu448Oripa/JXu/7IuZOW3eQfmcJSXbCXVC/pUDd1lOtrW3e5Hjd1mut3W9e53t+zvQCbxB5DfrOZhAAAAABJRU5ErkJggg==";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d");
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d");
  const buf3c = document.createElement("canvas");
  const buf3x = buf3c.getContext("2d");
  const buf4c = document.createElement("canvas");
  const buf4x = buf4c.getContext("2d");

  const fade = new Uint16Array([0,0,0,0,0,256,1152,768,640,1088,0,0,0,0,0,0,0,0,0,0,0,256,1088,896,1280,4928,1408,2048,0,0,0,0,0,0,0,0,128,32,1408,832,3488,5952,640,2112,0,0,0,0,0,0,0,2112,16,2752,2336,1988,2880,6016,2304,4736,528,8192,0,0,0,0,8208,3136,16800,4688,640,3936,5760,3792,8960,3488,4480,8210,0,0,8192,32832,41476,21104,9408,6864,27396,1480,1952,13732,2896,2376,20992,8978,18506,32768,2304,41097,21138,3872,45209,1702,44080,10693,18400,22218,1888,9942,5048,13488,32773,19264,1600,26893,31984,5018,6103,16126,11192,32751,24317,30687,48125,28509,19830,48094,11696,19033,65535,49155,33737,34789,34213,34785,34209,34401,39881,47117,47245,40089,49155,65535,54615,65535,0,0,0,4094,8190,8188,4064,4192,57792,57472,57728,57472,57728,61568,44800,57344]);
  const font = new Uint16Array(2432);

  const bpl_scr = new Uint8Array([4,7,9,10,11,12,13,13,14,14,14,15,15,15,15,15,15,14,14,14,13,13,12,11,10,9,7,4,0,0,4,7,9,10,11,12,13,13,14,14,14,15,15,15,15,15,15,14,14,14,13,13,12,11,10,9,7,4,0,0,4,7,9,10,11,12,13,13,14,14,14,15,15,15,15,15,15,14,14,14,13,13,12,11,10,9,7,4,0,0,4,7,9,10,11,12,13,13,14,14,14,15,15,15,15,15,15,14,14,14,13,13,12,11,10,9,7,4,0,0,4,7,9,10,11,12,13,13,14,14,14,15,15,15,15,15,15,14,14,14,13,13,12,11,10,9,7,4,0,0,4,7,9,10,11,12,13,13,14,14,14,15,15,15,15,15,15,14,14,14,13,13,12,11,10,9,7,4,0,0,4,7,9,10,11,12,13,13,14,14,14,15,15,15,15,15,15,14,14,14,13,13,12,11,10,9,7,4,0,0,4,7,9,10,11,12,13,13,14,14,14,15,15,15,15,15,15,14,14,14,13,13,12,11,10,9,7,4,0,0,4,7,9,10,11,12,13,13,14,14,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15]);
  const bpl_mod = new Uint8Array([3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,6,6,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,6,6,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,6,6,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,6,6,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,6,6,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,6,6,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,6,6,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,6,6,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);

  const sc_text = new Uint8Array([179,143,65,67,75,69,82,76,73,71,72,84,143,179,32,80,82,69,83,69,78,84,83,107,139,67,82,65,83,72,32,71,65,82,82,69,84,84,139,106,70,73,82,83,84,32,79,70,32,65,76,76,32,65,32,66,73,71,32,72,69,76,76,79,32,84,79,32,79,85,82,32,78,69,87,77,69,77,66,69,82,32,73,78,32,67,65,78,65,68,65,106,106,106,78,79,87,32,84,72,69,32,65,67,75,69,82,70,85,78,32,71,82,69,69,84,83,107,143,96,98,100,100,100,68,65,82,75,104,86,69,82,89,32,68,65,82,75,32,83,84,85,70,70,105,143,65,32,84,69,65,77,104,65,32,66,73,71,32,72,69,76,76,79,32,84,79,32,66,32,84,69,65,77,105,143,65,73,65,143,65,76,80,72,65,32,70,76,73,71,72,84,104,70,76,89,32,79,86,69,82,32,84,72,69,32,77,65,71,105,143,65,77,73,71,65,32,73,67,69,104,72,69,89,32,71,79,79,78,73,69,83,32,67,79,85,76,68,32,89,79,85,32,83,69,78,68,32,85,83,32,68,73,83,75,32,68,73,84,73,69,82,32,84,72,65,78,32,84,72,69,32,79,78,69,83,32,89,79,85,32,83,69,78,68,32,66,69,70,79,82,69,105,143,65,77,73,71,65,32,76,79,86,69,82,83,104,85,83,69,32,65,32,83,72,69,65,84,72,32,87,72,69,78,32,89,79,85,32,70,85,67,75,32,89,79,85,82,32,77,79,85,83,69,105,143,65,78,67,143,65,80,84,143,65,88,88,69,83,83,104,72,69,89,32,77,73,75,69,32,83,79,82,82,89,32,65,78,79,84,72,69,82,32,70,82,69,78,67,72,32,84,69,88,84,32,71,65,77,69,105,143,66,70,66,83,104,70,79,76,76,79,87,32,89,79,85,82,32,87,79,82,75,105,143,66,73,83,79,70,84,91,99,99,91,104,78,79,87,32,89,79,85,32,65,82,69,32,73,78,32,84,72,69,32,71,82,69,69,84,83,32,89,79,85,32,67,65,78,32,83,69,78,68,32,85,83,32,89,79,85,82,32,76,73,83,84,32,79,70,32,65,68,82,69,83,83,105,143,66,79,79,84,66,79,89,83,104,71,72,79,83,84,32,83,69,78,68,73,78,71,105,143,66,83,32,79,78,69,104,84,82,89,32,84,79,32,66,85,89,32,65,78,79,84,72,69,82,32,65,77,73,71,65,32,87,73,84,72,32,71,82,69,69,84,73,78,71,83,32,84,89,80,69,82,103,87,72,69,78,32,68,73,68,32,89,79,85,82,32,71,82,69,69,84,83,32,66,69,67,79,77,69,32,72,73,83,84,79,82,73,67,65,76,32,77,79,78,85,77,69,78,84,83,102,105,143,67,65,83,67,83,65,68,69,104,68,79,32,78,79,84,32,70,65,76,76,32,68,79,87,78,105,143,67,65,84,76,79,78,32,67,82,69,87,143,67,66,67,104,68,73,68,32,89,79,85,82,32,71,82,79,85,80,32,65,32,68,69,77,79,102,105,143,67,66,83,143,67,72,65,77,80,83,104,81,85,73,84,69,32,84,72,69,32,79,78,76,89,32,87,72,79,32,74,85,83,84,73,70,89,32,72,73,83,32,82,65,78,75,73,78,71,32,79,70,32,76,69,65,68,73,78,71,32,83,73,88,105,143,67,79,80,80,69,82,32,67,82,69,87,104,72,79,87,32,73,84,32,73,83,32,80,79,83,83,73,66,76,69,32,84,72,65,84,32,84,78,84,32,73,83,32,89,79,85,82,32,66,69,83,84,32,67,79,78,84,65,67,84,32,73,78,32,70,82,65,78,67,69,103,80,76,69,65,83,69,32,83,69,78,68,32,77,69,32,84,72,69,73,82,32,78,69,88,84,32,67,82,65,67,75,105,143,68,65,143,68,69,70,74,65,77,104,70,82,69,78,67,72,32,78,69,87,83,32,83,79,79,78,69,82,32,79,78,76,89,32,70,79,82,32,89,79,85,105,143,68,69,76,84,65,32,70,79,82,67,69,104,67,79,83,83,65,84,32,65,71,65,73,78,105,143,68,69,88,73,79,78,143,68,82,32,77,65,66,85,83,69,32,79,82,71,65,83,77,32,67,82,65,67,75,73,78,71,104,83,69,78,68,32,87,79,76,70,71,65,78,71,32,65,77,65,68,69,85,83,32,80,65,67,75,65,71,69,32,66,65,67,75,105,143,68,79,77,73,78,65,84,79,82,83,104,87,72,65,84,32,68,79,32,89,79,85,32,68,79,77,73,78,65,84,69,102,105,143,68,79,78,65,76,68,32,83,79,70,84,104,70,85,67,75,32,89,79,85,82,32,77,73,67,75,69,89,32,77,79,85,83,69,32,68,79,78,65,76,68,105,143,69,67,69,32,67,82,69,87,143,70,65,83,84,32,71,69,78,69,82,65,84,73,79,78,143,70,67,87,143,70,76,89,73,78,71,32,82,65,66,66,73,84,83,104,83,69,65,82,67,72,73,78,71,32,70,79,82,32,70,76,89,73,78,71,32,67,65,82,82,79,84,105,143,70,84,32,95,100,100,143,70,85,78,32,70,65,67,84,79,82,89,143,70,85,78,88,104,71,73,86,69,32,65,32,75,73,83,83,32,84,79,32,74,69,65,78,32,77,65,82,73,69,105,143,70,85,84,85,82,87,79,82,76,68,104,87,72,69,78,32,68,79,69,83,32,89,79,85,82,32,78,69,87,32,87,79,82,108,68,32,66,69,67,79,77,69,32,84,82,85,69,102,105,143,71,69,78,69,82,65,84,73,79,78,32,88,143,71,73,71,65,70,76,79,80,83,143,71,83,67,143,72,73,71,72,32,83,79,67,73,69,84,89,143,72,73,71,72,76,65,78,68,69,82,104,83,84,73,76,76,32,65,76,73,86,69,105,143,72,79,84,76,73,78,69,143,72,81,67,143,73,66,66,104,86,69,82,89,32,66,65,68,32,84,79,78,71,85,69,105,143,73,67,69,32,66,82,69,65,75,69,82,143,73,67,73,143,74,65,90,90,67,65,84,104,87,72,69,82,69,32,73,83,32,89,79,85,82,32,71,65,77,69,102,105,143,75,73,76,76,69,82,87,65,84,84,143,76,69,86,69,76,32,79,78,69,104,87,72,69,78,32,68,79,32,89,79,85,32,80,65,83,83,32,84,79,32,84,72,69,32,72,73,71,72,69,82,32,76,69,86,69,76,105,143,76,73,71,72,84,70,79,82,67,69,104,83,79,79,78,69,82,32,65,32,86,73,83,73,84,32,73,78,32,70,82,65,78,67,69,102,105,143,77,65,68,79,78,78,65,32,65,83,83,79,67,73,65,84,73,79,78,104,87,72,79,83,69,32,84,72,65,84,32,83,84,85,70,70,105,143,77,65,68,32,77,79,78,75,83,104,65,82,69,32,89,79,85,32,82,69,65,76,76,89,32,77,65,68,103,83,69,78,68,32,65,77,73,71,65,32,68,73,83,75,32,78,69,88,84,32,84,73,77,69,105,143,77,69,71,65,70,79,82,67,69,104,80,76,69,65,83,69,32,80,79,76,73,67,69,32,77,65,75,69,32,65,32,69,70,70,79,82,84,32,84,79,32,67,65,84,67,72,32,78,65,83,84,89,32,83,72,73,84,105,143,77,69,83,104,83,84,79,80,32,89,79,85,82,32,77,69,68,73,84,65,84,73,79,78,32,65,78,68,32,83,69,78,68,32,85,83,32,78,69,87,83,105,143,77,89,71,79,78,104,67,79,78,71,82,65,84,85,76,65,84,73,79,78,83,32,70,79,82,32,67,79,78,71,82,65,84,85,76,65,84,69,32,85,83,105,143,78,69,84,87,79,82,75,104,65,82,69,32,89,79,85,32,70,82,69,69,102,105,143,78,69,87,32,79,82,68,69,82,104,72,65,86,69,32,89,79,85,32,65,32,80,82,79,66,76,69,77,32,79,70,32,82,65,78,71,105,143,78,70,67,143,79,75,83,32,73,77,80,79,82,84,32,68,73,86,73,83,73,79,78,104,89,69,65,72,72,72,72,72,72,72,72,72,72,72,105,143,79,82,65,67,76,69,143,80,65,82,65,68,73,83,69,104,71,79,69,83,32,84,79,32,69,86,73,76,105,143,80,69,78,84,65,71,79,78,143,80,72,82,32,67,82,69,87,143,80,79,87,69,82,83,84,65,84,73,79,78,143,81,85,65,68,82,65,78,84,72,143,82,65,71,69,104,72,65,83,32,73,78,84,69,82,67,69,80,84,79,82,32,65,32,32,80,82,79,66,76,69,77,32,68,85,82,73,78,71,32,72,73,83,32,70,76,89,32,84,79,32,85,83,105,143,82,65,77,68,79,77,32,65,67,67,69,83,83,143,82,65,83,32,70,82,65,78,67,69,143,82,65,84,83,32,73,78,67,104,70,85,67,75,32,89,79,85,82,32,77,79,85,83,69,105,143,82,67,65,80,143,83,67,65,73,80,143,83,67,70,104,83,87,73,83,83,32,66,85,84,32,70,65,83,84,105,143,83,72,85,84,32,66,69,82,76,73,78,104,84,79,79,32,83,72,79,82,84,32,87,79,82,68,83,32,73,78,32,89,79,85,82,32,76,69,84,84,69,82,105,143,83,73,76,73,67,79,78,32,76,69,65,71,85,69,143,83,73,78,78,69,82,83,104,65,82,69,32,89,79,85,32,65,76,73,86,69,102,105,143,83,75,65,82,143,83,75,89,76,73,78,69,143,83,84,65,82,32,84,82,69,75,143,83,84,69,69,76,32,80,85,76,83,69,143,83,87,65,84,67,72,104,72,69,76,76,79,32,84,79,32,84,72,69,32,80,79,76,73,67,69,105,143,84,65,85,143,84,67,67,143,84,69,84,82,65,71,79,78,143,84,71,77,32,67,82,69,87,104,83,84,79,80,32,67,82,89,73,78,71,32,89,79,85,32,65,82,69,32,78,79,87,32,73,78,32,79,85,82,32,71,82,69,69,84,73,78,71,83,105,143,84,72,69,32,65,77,73,71,65,32,71,65,78,71,143,84,72,69,32,66,65,78,68,104,73,70,32,84,72,69,32,66,65,78,68,32,68,73,68,78,108,84,32,69,88,73,83,84,32,87,69,32,87,73,76,76,32,78,79,84,32,73,78,86,69,78,84,32,84,72,69,77,105,143,84,72,69,32,67,79,78,78,69,67,84,73,79,78,143,80,82,69,83,69,78,84,76,89,32,87,69,32,67,65,78,32,66,69,71,73,78,32,83,87,65,80,80,73,78,71,105,143,84,72,69,32,79,85,84,82,85,78,78,69,82,83,143,84,72,69,32,83,80,82,69,65,68,32,70,79,82,67,69,32,73,78,84,143,84,78,68,143,84,78,77,32,67,82,69,87,143,84,79,79,84,83,32,70,82,79,77,32,83,84,65,82,76,73,78,69,143,84,82,73,76,79,71,89,32,65,78,68,32,97,85,80,32,67,82,69,87,143,84,82,73,83,84,65,82,104,67,79,78,71,82,65,84,85,76,65,84,73,79,78,32,70,79,82,32,74,79,73,78,32,84,72,69,32,83,76,69,69,80,73,78,71,32,83,73,88,105,143,84,83,75,32,67,82,69,87,104,87,72,65,84,32,73,83,32,84,72,69,32,77,65,84,84,69,82,32,87,73,84,72,32,70,82,69,78,67,72,32,83,85,80,80,76,73,69,82,105,143,87,65,82,32,70,65,76,67,79,78,143,87,79,68,104,70,85,78,78,89,32,71,82,69,69,84,73,78,71,83,32,70,76,79,82,73,65,78,105,143,88,32,77,69,78,106,106,106,106,78,79,87,32,65,32,83,80,69,67,73,65,76,32,84,79,32,78,65,83,84,89,32,83,72,73,84,107,118,117,111,109,140,69,78,68,32,79,70,32,77,69,83,83,65,71,69]);
  const sc_len  = sc_text.length;

  const table1 = new Uint16Array(48);
  const table2 = new Int8Array([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,36,36,37,37,38,38,39,39,40,40,41,41,42,42,43,43,44,44,45,45,46,46,47,47,48,48,49,49,50,50,51,51,52,52,53,53,54,54,55,55,56,56,57,57,58,58,59,59,60,60,61,61,62,62,63,63,64,64,65,65,66,66,67,67,68,68,69,69,70,70,71,71,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,30,30,31,31,32,32,33,33,34,34,35,35]);
  const table3 = new Uint16Array([63488,63488,0,256,63317,63674,22,256,63163,63874,44,252,63027,64087,66,247,62911,64311,87,240,62814,64545,108,232,62738,64786,127,221,62683,65033,146,209,62650,65027,164,196,62639,0,181,181,62650,252,196,164,62683,502,209,146,62738,749,221,127,62814,990,232,108,62911,1224,240,87,63027,1448,247,66,63163,1661,252,44,63317,1861,255,22,63488,2048,256,0,63674,2218,255,65513,63874,2372,252,65491,64087,2508,247,65469,64311,2624,240,65448,64545,2721,232,65427,64786,2797,221,65408,65033,2852,209,65389,65283,2885,196,65371,0,2896,181,65354,252,2885,164,65339,502,2852,146,65326,749,2797,127,65314,990,2721,108,65303,1224,2624,87,65295,1448,2508,66,65288,1661,2372,44,65283,1861,2218,22,65280,2048,2048,0,65279,2218,1861,65513,65280,2372,1661,65491,65283,2508,1448,65469,65288,2624,1224,65448,65295,2721,990,65427,65303,2797,749,65408,65314,2852,502,65389,65326,2885,252,65371,65339,2896,0,65354,65354,2885,65283,65339,65371,2852,65033,65326,65389,2797,64786,65314,65408,2721,64545,65303,65427,2624,64311,65295,65448,2508,64087,65288,65469,2372,63874,65283,65491,2218,63674,65280,65513,2048,63488,65279,0,1861,63317,65280,22,1661,63163,65283,44,1448,63027,65288,66,1224,62911,65295,87,990,62814,65303,108,749,62738,65314,127,502,62683,65326,146,252,62650,65339,164,0,62639,65354,181,65283,62650,65371,196,65033,62683,65389,209,64786,62738,65408,221,64545,62814,65427,232,64311,62911,65448,240,64087,63027,65469,247,63874,63163,65491,252,63674,63317,65513,255]);

  var buff1 = 2176;
  var buff2 = 1920;

  var cop_cy = 0;
  var sc_ctr = 1;
  var sc_pos = 16;

  setTimeout(initialize, 100);
}