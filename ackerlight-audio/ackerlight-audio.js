/*
  Audiomaster II Crack
  Ackerlight (1988)
  Christian Corti & Mathew Nolan
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 364;
    canvc.height = 287;
    canvx.imageSmoothingEnabled = false;

    buf1c.width  = 304;
    buf1c.height = 111;
    buf1x.imageSmoothingEnabled = false;

    buf2c.width  = 352;
    buf2c.height = 14;
    buf2x.imageSmoothingEnabled = false;

    buf3c.width  = 352;
    buf3c.height = 115;
    buf3x.imageSmoothingEnabled = false;

    createStars();

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("flodSync", draw);

    player.version = 4;
    player.play();
  }

  function createStars() {
    const speed = [4,6,8,10];
    var i, obj;

    for (i = 0; i < 50; i++) {
      obj = Object.create(null);

      obj.x = 29 + Math.floor(Math.random() * 320);
      obj.y =  6 + Math.floor(Math.random() * 181);
      obj.speed = speed[Math.floor(Math.random() * 4)];

      stars[i] = Object.seal(obj);
    }
  }

  function draw() {
    var l = true;
    var h, i, obj, x, y;

    canvx.drawImage(back, 0,0,1,287, 0,0,364,287);

    for (i = 0; i < 50; i++) {
      obj = stars[i];

      x = obj.x + obj.speed;
      if (x >= 349) { x -= 320; }
      obj.x = x;

      if (obj.speed == 4) {
        canvx.fillStyle = "#bbeeff";
      } else if (obj.speed == 6) {
        canvx.fillStyle = "#99ccff";
      } else if (obj.speed == 8) {
        canvx.fillStyle = "#77aadd";
      } else {
        canvx.fillStyle = "#fff";
      }

      canvx.fillRect(x,obj.y,1,1);
    }

    canvx.drawImage(tfl1, 0,0,304,111, 41,58,304,111);

    if (--log_frame == 0) {
      if (log_dir) {
        if (++log_step == 2) {
          if (++log_line1 == 0) { log_cy -=  1; }
          if (++log_line2 == 0) { log_cy -=  3; }
          if (++log_line3 == 0) { log_cy -= 23; }
          log_step = 0;
        }

        y = log_cy;

        for (i = 0; i < 25; i++) {
          if (i == log_line1) {
            h = 2;
          } else if (i == log_line2) {
            h = 4;
          } else if (i == log_line3) {
            h = 24;
          } else {
            h = 1;
          }

          canvx.drawImage(logo, 0,i,299,1, 30,y,299,h);
          y += h;
        }

        if (log_line3 == 25) {
          log_dir = 0;
          log_frame = 100;
          log_line1 = 22;
          log_line2 = 23;
          log_line3 = 24;
        } else {
          log_frame = 1;
        }
      } else {
        y = log_cy;

        for (i = 0; i < 25; i++) {
          if (i == log_line1) {
            h = 2;
          } else if (i == log_line2) {
            h = 4;
          } else if (i == log_line3) {
            h = 24;
          } else {
            h = 1;
          }

          canvx.drawImage(logo, 0,i,299,1, 30,y,299,h);
          y += h;
        }

        if (++log_step == 2) {
          if (--log_line1 == -1) { log_cy +=  1; }
          if (--log_line2 == -1) { log_cy +=  3; }
          if (--log_line3 == -1) { log_cy += 23; }
          log_step = 0;
        }

        if (log_line3 == -1) {
          log_dir = 1;
          log_frame = 100;
          log_line1 = -1;
          log_line2 = -2;
          log_line3 = -3;
        } else {
          log_frame = 1;
        }
      }
    } else {
      canvx.drawImage(logo, 0,0,299,25, 30,log_cy,299,25);
    }

    buf1x.drawImage(spot,spot_cx,spot_cy);
    buf1x.globalCompositeOperation = "source-in";
    buf1x.drawImage(tfl2,0,0);
    buf1x.globalCompositeOperation = "copy";

    spot_cx += spot_ix;
    if (spot_cx == 224 || (spot_cx == -34 && spot_ix < 0)) { spot_ix *= -1; }

    spot_cy += spot_iy;
    if (spot_cy == 34 || spot_cy == -46) { spot_iy *= -1; }

    canvx.drawImage(buf1c,41,58);

    if (++sc_tick == 16) {
      sc_tick = sc_delay;

      do {
        i = sc_text.charCodeAt(sc_pos++) - 32;

        switch (i) {
          case 65:  // 01
            sc_delay = 0;
            sc_tick  = 0;
            sc_speed = 15;
            break;
          case 66:  // 02
            sc_delay = 8;
            sc_tick  = 8;
            sc_speed = 14;
            break;
          case 67:  // 03
            sc_delay = 12;
            sc_tick  = 12;
            sc_speed = 12;
            break;
          case 68:  // 04
            sc_delay = 14;
            sc_tick  = 14;
            sc_speed = 8;
            break;
          case 69:  // 05
            sc_delay = 15;
            sc_tick  = 15;
            sc_speed = 0;
            break;
          case 70:  // 06
            sc_delay = 0;
            sc_tick  = 0;
            sc_speed = 16;
            break;
          default:
            buf2x.drawImage(font, 0,14*i,16,14, 336,0,16,14);
            l = false;
            break;
        }

        if (sc_pos == sc_len) { sc_pos = 0; }
      } while (l);
    }

    if (sc_speed != 16) {
      x = 16 - sc_speed;

      buf2x.globalCompositeOperation = "copy";
      buf2x.drawImage(buf2c, x,0,352,14, 0,0,352,14);
      buf2x.globalCompositeOperation = "source-over";
    }

    buf3x.clearRect(0,0,352,115);
    x = 0;

    for (i = 0; i < 320; i += 4) {
      buf3x.drawImage(buf2c, i,0,4,14, i,8+sc_sine[x++],4,14);
    }

    buf3x.scale(1,-1);
    x = 0;

    for (i = 0; i < 320; i += 4) {
      buf3x.drawImage(buf2c, i,0,4,14, i,-115+sc_sine[x++],4,14);
    }

    buf3x.setTransform(1,0,0,1,0,0);
    buf3x.globalCompositeOperation = "source-in";
    buf3x.drawImage(copp, 0,0,1,115, 0,0,368,115);
    buf3x.globalCompositeOperation = "source-over";

    canvx.drawImage(buf3c, 0,0,320,115, 25,171,320,115);

    sc_sine.push(sc_sine.shift());
    sc_sine.push(sc_sine.shift());
    sc_sine.push(sc_sine.shift());

    requestAnimationFrame(draw);
  }

  const back = new Image();
  const copp = new Image();
  const font = new Image();
  const logo = new Image();
  const spot = new Image();
  const tfl1 = new Image();
  const tfl2 = new Image();

  back.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAEfCAIAAAAP3DuBAAAALHRFWHRDcmVhdGlvbiBUaW1lAE1vbiAyMCBKdW4gMjAxNiAxNDowNDo1MCAtMDYwMKeXiiYAAAAHdElNRQfgBhQUBS2pLCfWAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAABGdBTUEAALGPC/xhBQAAAKtJREFUeNrt0kENwzAMBVBDMIVAMIVAMIVAMI1ACIVCCIVCKIVC2OzqR502H3ea5uhJVWJHVfSJPopdceKqU9ecuQ6GPUWPYIbvW5iplEIiQrVWUlVqrZGZUe/9Et+xF2fRE70xE7Pf/Zt//UYx3YlYqVjJWOlYCVkpeU3KgA0m7HDACY8LQwGBCgoNDDoM2GDCDgecsNb07nfZGomesERLaKImJFESnPD3fwLWlJDhbHIeYAAAAABJRU5ErkJggg==";
  copp.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABzCAMAAABuIZhxAAAAUVBMVEX/7u67u6qqqqqZmaqIiKp3d6pmZqpVVapERKozM6oiIqoREar/zMz/u7v/qqr/mZn/iIj/d3f/Zmb/VVX/RET/MzP/IiL/ERH/3d3/////AAA8oss3AAAAS0lEQVQI153Lxw2AMAAEwSVnZ4yh/0LxhysAjU66z3IDhZ0Dg8XhCUQSJ5mLpy7Xn4gEPA6L4WCnwO8WoJFWOullkFEmmWWRVbbPC9rwBUFMP2WkAAAAAElFTkSuQmCC";
  font.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAM9AQMAAACv52FXAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAi1JREFUSMfdlkFunEAQRT9CMrvhBs0hssWNchMfwUsstwZOkCP4JFnMKqucYYRyApa9QCifqsYVBiM5URQpbr0F/v0pun/1tIz3j/yCYkA5GsVAUTEP+XjjdZvFBWWP8tiZMZMh2SrAGfyTIqcWQ0bP6/MIRKCFESmmOrT9y+FWPBCAFn9tlMbvvDWiiqhrYcL9hEb5ioaKQANtqTtCfoC8u6kJMiGPKMblxQrwov/qVAUCnUSfKfr165noBZ8jqha+RWjRtuhmktqazSRV1nrNiCZK0PUbNfNRVtXLqsxPj6FOrWk7CnaEbhKwvVsFsq/5lpOBTFY/p2dYQuMoesPGVv+PhvV9l+cf33VZr1eo3aKuJal3rTO6iG6Cc0Y1kY1CQ6fnjVMe3umv1QigyCkaFls3oOMXI1yA80sFw4sYaRDbTNYpLFQD0WfVk+fYaXQ9WdfpYOs8Cx5BRE6VM4qZgd+g+RzqjPSY5IFS37I/82dHGIhlUo3EciPq0X057LiDO2mqKZ+HOzyelrYGvnu23J6veHqhviFocfKC7ornGU8z2lmzMlsxrEc0IJiuX6Go26Ht4CzFfY/eV3NCcZVzEre9iGhG3I+oqQfU0tZwkoKieHqApkd1oShX6CT69gb79J0cdpM2UteHbG8qW7ysX7dA7L8XwrJZT9sNbA0bZM1i4zQTtnIf8j462hStVtcb/3ZH6ROBTo/HgIeIz4zoB4pvKL/Ir8YnzwjlJ4RAqdNi38giAAAAAElFTkSuQmCC";
  logo.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASsAAAAZBAMAAACbTxWVAAAAGFBMVEUAAAC46P8QQHAwYJhQiLhwqNiYyP8AIFAyRrELAAAAAXRSTlMAQObYZgAABVBJREFUSMd9Vk13lDAU5egviFXcxsSPbUwyXeMQxq1teXErnZLu66J/3/vCAIGq77Rz8uZ+vJscYKiWenVK1EosNIUuDiKNPT4N0SBqw4SbOlH8xThFIcY+kwz++9AlUY8U6FhVw4jOzKZzv1MVrkNNFLYuMTWr/jDUfbDQD9SDIBKFKK7kgZI4y0wQIyXDOJsmDBD1WZ5ETQGc7Dfa6lT3BP5cl36nKlwjoralSxfTw6p/nQQM7qpX1+BRHGpsbBBWOoq1zftyN2M8S8aJ8Z6nWBkG7oc0Ukc47iqkPtrVdup3qtKVcJw7l3RcT/s6DSmR43hpLWXa65R0PlSsYLjDpT8Vbe9yr4pYU79Xra5j3LswshwWtjIMZys/16leS5vwdRg8017xSpk97r4Na52dcae6VsW1xbj6t2uVbhiHqii3xDrQjUApeS3KcjAQItM+hm9CaLPFfeOAr2Ul97qMhV69UC2uVT3w1K3LEuv1SGjZgFKBo+9zGDC6wIIdHhoPvODLPLCIxb1+obq4oqYppQsj65V1+aK72Y4hCNQhiUS9EFcO+O4097HQ+zIWetfsVbPriHw8NWynXvSvVwEbvFHKOfyFMMXSUYiaALwNcsKXks4u668cqwM/FLG49znWFXMcjNXiilhhinlULjh8aZ0PNN/JMMSwDzDIuRU4rVXahWM2OMRB5OMMbcX4SYjUR/5Q8s53FLHtLtaslHSzjYUesViFqXUiWD1YM7vW1OfT7Xmix4hWO9/dyfmwnp+f3c/n59AEfPKuLH/4IBP6uX57WwEvShn6vuklAW/LWOh9dnX9zNKmdOWpRx1ad3qPpUVAmvTXAl88eVC7pseY8rkzPK5y52QFvChtxm1MGTlAoefeZ1dNi09TuvLUadR7ppYPeHb8/MiE8d+xfne3VQW8KLfbt5UJfFvouffZVY8zy/89lnjcxDqkN09PT3q8f3oKTfr55Yu2q60ANpeoZQW8KG0GqJb67czw+OVL+Thl3GVXVc+q0JSuPDVTa0hd8YBPCnWiW6W8Efd8wcc01GmkVDflbfdZ3FfAyzKb3lM1oNcpOMe3VExZ75rMEgutdOV+2kbK1OXXkO70XM6IN9b6LuZXiDg8SHHWmu/J4ACnvmK8cFxxdvlEP9K9tdepD0gFF+ivoDNZ9RZTnVXWumZRZV83xRpA0ma5ssgtBYMz9kmUBpFiqo9yQK/g0Drt3IFkxiNQiol6bWYcIaAPPxJ6nHNATn4XAD678iO7pnQHWrOogkN/ySKu5iUKW/NLKZPObVFKMmrZwQI+hB3uTHqYcN/xyjdxg+uGv927ajO7endg/HJaICmzXFl8kgHlQ1AmUlgLPfVAJV4gtA+oLQ4kTjgqvsWqAb/EEeulqza0UV2yTNTLYY3Udcd8nFgoeejLgsHYdS1zdUe82uJWLngl3nUd+A8l7prIrjuVMlvV5YEUAc2xYiKi6ThHLOSnQEXB9h1RYO4rAu5MiTN/wSvBehPHEkdM2rsya6u6xCJallUXY7zNTaxjxHtkl2hcKjRDinEyiAm42eJKrjjk0F9TNxa4ofzt/1VLLECXWF65oBSvRue8wlv3yL9Lbn7C1EdtP07vkVeusxlXILQ44OCUnPBV/4laoL6jvs3vAqSdVZMKInYOYa+aY4E6xzrC/pjXd0o7rHTfKkjBQOnmgSNmA8G/7RnXVvvWan7NkBO+6l+HFjoX+tZl/q1D+Isr74NzHfeqKcuFmit75JXlFd9zFvo5l+Hfdpu5Vy50ZDJuOZHmMXLCC712vB3ouSWjPeNQ8TawVCx7qeKaqag/lIf05welSs4AAAAASUVORK5CYII=";
  spot.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAABfAQMAAAC0gom2AAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAMNJREFUOMvVlEsOhCAQRCWzcMkRPApHc47mUTiCSxaGnkE+L3TChLibXvliqG6lq5a7JC6trIhvIMKrl3zrXWBLcBbYE1z52chd7QiHbAZfz6PgMgTEkhxiIkUMubXCkZXRBnIbGrkKIbehkdSKCoy0YoA0Qg8rcPRgAf8DNuDswQFhFnbgmgWh4p/Cg89+8nvHlzV72+N1Ga+YAcYLq/eajddeGFsGZynPMYL2KQ7W3sb1Kg+QUxmi0oXcUYmks4oU+wCSZnWnIAvUSQAAAABJRU5ErkJggg==";
  tfl1.src = "data:image/png;base64,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";
  tfl2.src = "data:image/png;base64,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";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d");
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d");
  const buf3c = document.createElement("canvas");
  const buf3x = buf3c.getContext("2d");

  const sc_sine = [3,3,2,2,2,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,2,2,2,3,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,35,36,36,36,37,37,37,37,37,38,38,38,38,38,38,38,38,37,37,37,37,37,36,36,36,35,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4];
  const sc_text = "e    ACKERLIGHT      f          e  THE FRENCH LIGHT !!! f      e                 dPRESENTS             e         AEGIS AUDIOMASTER II f             b                ORIGINAL BY KEBRA.  THIS INTRO WAS CODED BY SHARLAAN   f                e LOGO BY C.DRYK    f           e           MUSIC BY PAT     f         e               cHI TO:                  e   ALL OUR FRIENDS !!! f                                    e                  ";
  const sc_len  = sc_text.length;

  const stars = [];

  var log_cy    = 5;
  var log_dir   = 0;
  var log_frame = 82;
  var log_line1 = 22;
  var log_line2 = 23;
  var log_line3 = 24;
  var log_step  = 0;

  var sc_delay = 0;
  var sc_pos   = 0;
  var sc_speed = 0;
  var sc_tick  = 0;

  var spot_cx = -46;
  var spot_cy = -45;
  var spot_ix = 2;
  var spot_iy = 1;

  setTimeout(initialize, 100);
}