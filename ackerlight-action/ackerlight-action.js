/*
  Action Service Crack
  Ackerlight (1988)
  Christian Corti & Mathew Nolan
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 368;
    canvc.height = 261;
    canvx.imageSmoothingEnabled = false;

    buf1c.width  = 448;
    buf1c.height = 41;
    buf1x.imageSmoothingEnabled = false;

    log_posx.fill(9);
    createStars();

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("flodSync", draw);

    player.version = 6;
    player.play();
  }

  function createStars() {
    const speed = [2,4,8];
    var i, obj;

    for (i = 0; i < 77; i++) {
      obj = Object.create(null);

      obj.x = Math.floor(Math.random() * 368);
      obj.y = Math.floor(Math.random() * 145);
      obj.speed = speed[Math.floor(Math.random() * 3)];

      stars[i] = Object.seal(obj);
    }
  }

  function draw() {
    var l = true;
    var chr, i, obj, v, x, y;

    canvx.fillStyle = "#000";
    canvx.fillRect(0,0,368,260);

    sc_cx += sc_speed;

    if (sc_cx >= sc_width) {
      sc_cx -= sc_width;

      do {
        v = sc_text.charAt(sc_pos++);

        switch (v) {
          case "3":
            sc_speed = 4;
            break;
          case "4":
            sc_speed = 8;
            break;
          case "!":
            sc_jump ^= 1;
            break;
          case "@":
            sc_flip++;
            break;
          default:
            chr = sc_charx[v];

            buf1x.drawImage(font, chr.x,0,chr.w,41, 320+sc_width,0,chr.w,41);

            buf1x.globalCompositeOperation = "copy";
            buf1x.drawImage(buf1c, sc_width,0,448,41, 0,0,448,41);
            buf1x.globalCompositeOperation = "source-over";

            sc_width = chr.w;
            l = false;
            break;
        }

        if (sc_pos == sc_len) { sc_pos = 0; }
      } while (l);
    }

    y = 7 + sine1[cop_pos];
    if (++cop_pos == 105) { cop_pos = 0; }

    canvx.drawImage(flag, cop_cx,0,1,42, 0,y,368,42);
    if (++cop_cx == 86) { cop_cx = 0; }

    y = 120 + log_cy;

    for (i = 0; i < 77; i++) {
      obj = stars[i];

      if (obj.y <= y) {
        x = obj.x + obj.speed;
        if (x >= 368) { x -= 368; }
        obj.x = x;

        if (obj.speed == 2) {
          canvx.fillStyle = "#777";
        } else if (obj.speed == 4) {
          canvx.fillStyle = "#aaa";
        } else {
          canvx.fillStyle = "#ddd";
        }

        canvx.fillRect(x,obj.y,1,1);
      }
    }

    for (i = 0; i < 88;) {
      x = 45 + log_posx[i];
      y = log_cy + i;

      canvx.drawImage(logo, 0,i,289,1, x,y,289,1);
      log_posx[i] = log_posx[++i];
    }

    if (log_cy < 21) {
      log_cy++;
    } else {
      x = log_sine[log_pos];

      if (x == -1) {
        log_pos = 0;
        x = log_sine[0];
      }

      log_posx[88] = x;
      log_pos += log_rand[log_frame];
    }

    if (++log_tick == 6) {
      log_tick = 0;
      if (++log_frame == log_len) { log_frame = 0; }
    }

    y = sine2[sc_sine];

    if (sc_jump) {
      if (++sc_sine == 113) { sc_sine = 0; }
    }

    if (sc_flip) {
      sc_scale += sc_step;

      if (sc_scale <= -1.0) {
        sc_step *= -1;
      } else if (sc_scale >= 1.0) {
        if (sc_flip == 2) { sc_flip = 0; }
        sc_step *= -1;
      }

      y += (41 - (41 * sc_scale)) >> 1;

      canvx.transform(1,0,0,sc_scale,0,y);
      canvx.drawImage(buf1c, sc_cx,0,320,41, 29,0,320,41);
      canvx.setTransform(1,0,0,1,0,0);
    } else {
      canvx.drawImage(buf1c, sc_cx,0,320,41, 29,y,320,41);
    }

    if (line_x >= 0) {
      canvx.drawImage(line, line_x,0,368,2, 0,151,368,2);
      canvx.drawImage(line, line_x,1,368,1, 0,260,368,1);
    }

    if ((line_x += 8) == 480) {
      line_x = 0;
    }

    requestAnimationFrame(draw);
  }

  const flag = new Image();
  const font = new Image();
  const line = new Image();
  const logo = new Image();

  flag.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAAAqCAMAAAAeaFx/AAAAS1BMVEUAAADu7u4AAO7d3d0AAN3MzMwAAMyqqqoAAKqIiIgAAIhmZmYAAGbuAADdAADMAACqAACIAABmAAD///8AAP9EREQAAET/AABEAAAMsMMUAAAAAXRSTlMAQObYZgAAAkxJREFUSMd91tuSgkAMhOH2gIionITl/Z90B6YhaWL5X8apzy3WiWIcR/hmDb5Jg2+UUNf16NVem7361Cav1hKqqkquqZ2WXFMfWnJNrSSUZZlcU1stuabeteSaWkooiiK7VBstu1RvWnapFhIul0t2qb617FK9atmlepFwOp2yS/WlZZfqWcsu1ZOEYRiyS/VPyy7Vj5ZdqoOERK/upr601d3Us7a6m3qSlme7uLv6ltbJrl6ldbKrFwlFsUxNbbQ0M/WmpZmphYSyTHOntlKaOvUupalTS2m5ZaVXO6316kO7e7WSlp0gaq+J+tRErSXMs6q6z1TVfabqBKnvRbX9EFXbD1F9yD6b0XVetf0QVdsPUV3vm6k92tapvMdfVd7jryrvse1BNI1TB3OD+mduUD90N7XF+72rdm4Mqr33HFQ7NVFt8Hrt/63Su6p2rXdV9ecm7kHsWwq1uKKiF1dO4iluPoltpwIH16s4uF7FwV3PpWdLNbhODa5Tg7ucQtNQja6p0TU1uukM2nZTo2tqdE2N7rtB15kaXFOja2p0W/S9qdE1NbqmRhfTMXU1dTVx8Tz2EFerxNU67+JxKL3mXSnNvSuluXNxP5Zeca6Wps7V0tRc3I6luXOldfbjO9pcXA/ld9tdKb/Tj18U+3PA+RCf+eZKfN4/fv90dPE5xk8IXY039sevNaxu/Gupgq5EFXQlqshufLZU6WpU6UpU6cZPAlW6GlW6ElW68XNLla5Gla5ElW68ZVTpalTpSkm1vuwE3Wea7jMNvn9EPYR51r2lRQAAAABJRU5ErkJggg==";
  font.src = "data:image/png;base64,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";
  line.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA8AAAAACBAMAAABlMKiKAAAALVBMVEUAAP8AAO4AAN0AAMwAALsAAKoAAJkAAIgAAHcAAGYAAFUAAEQAADMAACIAABHo/JMXAAAAVklEQVQoz2NYBQQzgaADCMqBIA0IQoHABQiMgUAJCASBgAEKQGyQGEgOpAakFqQHpBdkBsgskJm7geAMENwFgndQAGKDxEByo/bSx16GweKQUXtpYy8AtXe+UB3gkBcAAAAASUVORK5CYII=";
  logo.src = "data:image/png;base64,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";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d", {alpha:false});

  const sine1 = new Uint8Array([0,0,1,1,2,2,3,4,5,6,7,8,9,10,12,13,15,17,19,22,23,25,27,29,31,33,36,38,41,43,46,48,51,54,57,59,62,65,68,71,74,77,80,82,85,87,90,93,97,99,101,99,97,93,90,87,85,82,80,77,74,71,68,65,62,59,57,54,51,48,46,43,41,38,36,33,31,29,27,25,23,21,19,17,15,13,12,10,9,8,7,6,5,4,3,3,2,2,1,1,0,0,0,0,0]);
  const sine2 = new Uint8Array([160,160,160,160,160,161,161,161,161,162,162,163,163,164,164,165,166,166,167,168,169,170,171,172,172,173,174,175,177,178,179,180,181,182,184,185,186,188,189,190,192,193,195,197,198,200,201,203,204,206,207,209,210,212,213,215,213,212,210,209,207,206,204,203,201,200,198,197,195,193,192,190,189,188,186,185,184,182,181,180,179,178,177,175,174,173,172,172,171,170,169,168,167,166,166,165,164,164,163,163,162,162,161,161,161,161,160,160,160,160,160,160,160]);
  const stars = [];

  const log_rand = new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,1,0,1,0,1,0,0,1,1,0,1,1,1,0,0,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1,1,0,1,1,1,0,1,0,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,1,1,3,3,0,1,3,3,3,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,1,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,3,1,3,3,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,1,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,3,1,3,3,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,1,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,1,3,0,3,1,3,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,1,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,3,1,3,3,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,1,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,3,1,3,3,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,1,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,1,3,0,3,1,3,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,1,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,3,1,3,3,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,1,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,3,1,3,3,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,1,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,1,3,0,3,1,3,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,1,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,3,1,3,3,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,3,0,1,3,3,1,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,1,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,3,1,3,3,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,1,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,1,3,0,3,1,3,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,1,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,3,1,3,3,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,1,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,1,3,0,3,1,3,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,1,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,3,1,3,3,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,1,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,1,3,0,3,1,3,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,1,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,3,1,3,3,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,1,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,1,3,0,3,1,3,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,1,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,1,0,3,0,1,0,1,0,3,1,3,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const log_sine = new Int8Array([9,9,9,9,10,10,10,10,11,11,11,11,13,13,13,13,14,14,14,14,14,14,14,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,14,14,14,14,14,14,14,14,13,13,13,13,11,11,11,11,10,10,10,10,9,9,9,9,7,7,7,7,5,5,5,5,4,4,4,4,3,3,3,3,2,2,2,2,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,7,7,7,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]);
  const log_posx = new Uint8Array(89);
  const log_len  = log_rand.length;

  const sc_text  = "3!ackerlight      @the french lig@ht present        @action service@  cracked by groucho and ald - supplied by crocky.....4hope you enjoy this new intro coded by overloader- logo by dark angel- music by pat- charset by c-dryk...        4!@greetings to all contacts             ";
  const sc_len   = sc_text.length;
  const sc_charx = {
    "a": {x:   0,w:48}, "b": {x:  48,w:48}, "c": {x:  96,w:48}, "d": {x: 144,w:48}, "e": {x: 192,w:48}, "f": {x: 240,w:48},
    "g": {x: 288,w:48}, "h": {x: 336,w:48}, "i": {x: 384,w:32}, "j": {x: 416,w:32}, "k": {x: 448,w:48}, "l": {x: 496,w:48},
    "m": {x: 544,w:48}, "n": {x: 592,w:48}, "o": {x: 640,w:48}, "p": {x: 688,w:48}, "q": {x: 736,w:48}, "r": {x: 784,w:48},
    "s": {x: 832,w:48}, "t": {x: 880,w:48}, "u": {x: 928,w:48}, "v": {x: 976,w:51}, "w": {x:1027,w:63}, "x": {x:1090,w:48},
    "y": {x:1138,w:46}, "z": {x:1184,w:48}, "-": {x:1232,w:48}, ".": {x:1280,w:32}, " ": {x:1312,w:48}
  };

  var cop_cx  = 0;
  var cop_pos = 0;
  var line_x  = -368;

  var log_cy    = -98;
  var log_frame = 0;
  var log_pos   = 0;
  var log_tick  = 0;

  var sc_flip  = 0;
  var sc_jump  = 0;
  var sc_pos   = 0;
  var sc_scale = 1;
  var sc_sine  = 0;
  var sc_speed = 4;
  var sc_step  = -0.05;
  var sc_cx    = 0;
  var sc_width = 0;

  setTimeout(initialize, 100);
}