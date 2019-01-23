/*
  Mega-Demo "Forces of the Pyramids"
  Kefrens (1989)
  Christian Corti 2018
*/
(function() {
"use strict";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});

  canvc.width  = 752;
  canvc.height = 574;
  canvx.fillStyle = "#000";
  canvx.imageSmoothingEnabled = false;

  let loader;
  let player;

  window.addEventListener("load", () => {

    function initialize() {
      buf1c.width  = 752;
      buf1c.height = 574;
      buf1x.imageSmoothingEnabled = false;

      buf2c.width  = 640;
      buf2c.height = 400;
      buf2x.imageSmoothingEnabled = false;

      buf2x.drawImage(back, 0,0);
      buf2x.globalCompositeOperation = "source-atop";

      ld_req.responseType = "arraybuffer";

      document.getElementById("frame").appendChild(canvc);

      startup();
    }

    function startup() {
      switch (ld_ctr) {
        case 0:
          buf1x.fillStyle = "#05a";
          buf1x.fillRect(0,0,752,574);

          buf1x.drawImage(back, 0,0,752,120, 74,36,752,120);
          buf1x.drawImage(back, 0,120,752,1, 74,156,752,200);
          buf1x.drawImage(back, 0,320,752,80, 74,356,752,80);

          buf1x.drawImage(fore, 0,0,34,16, 669,38,34,16);
          buf1x.drawImage(fore, 34,0,10,18, 78,114,10,18);
          break;
        case 20:
          buf1x.fillRect(78,114,10,18);
          buf1x.drawImage(fore, 34,0,10,18, 78,168,10,18);
          break;
        case 22:
          buf1x.fillRect(78,168,10,18);
          buf1x.drawImage(back, 0,132,752,16, 74,168,752,16);
          buf1x.drawImage(fore, 34,0,10,18, 78,186,10,18);
          break;
        case 24:
          buf1x.fillRect(78,186,10,18);
          buf1x.drawImage(back, 0,156,752,2, 74,192,752,2);
          buf1x.drawImage(fore, 34,0,10,18, 78,222,10,18);
          break;
        case 26:
          buf1x.fillRect(78,222,10,18);
          buf1x.drawImage(back, 0,186,752,14, 74,222,752,14);
          buf1x.drawImage(fore, 34,0,10,18, 78,258,10,18);
          break;
        case 28:
          buf1x.fillRect(78,258,10,18);
          buf1x.drawImage(back, 0,222,752,14, 74,258,752,14);
          buf1x.drawImage(fore, 34,0,10,18, 78,294,10,18);
          break;
        case 30:
          buf1x.fillRect(78,294,10,18);
          buf1x.drawImage(back, 0,258,752,14, 74,294,752,14);
          buf1x.drawImage(fore, 34,0,10,18, 78,330,10,18);
          break;
        case 32:
          buf1x.fillRect(78,330,10,18);
          buf1x.drawImage(back, 0,294,752,16, 74,330,752,16);
          buf1x.drawImage(fore, 34,0,10,18, 78,366,10,18);
          break;
        case 34:
          ld_ctr = 0;
          loadPart();
          return;
      }

      ld_ctr++;

      canvx.drawImage(buf1c, 0,0);
      requestAnimationFrame(startup);
    }

    function amiga() {
      buf1x.fillStyle = "#05a";
      buf1x.fillRect(0,0,752,574);

      buf1x.drawImage(back, 74,36);

      buf1x.drawImage(fore, 0,0,34,16, 669,38,34,16);
      buf1x.drawImage(fore, 34,0,10,18, 78,366,10,18);
    }

    function decrunch1() {
      if (ld_off & 1) {
        buf1x.fillRect(0,37,752,538);
        buf1x.drawImage(dec1, ld_col,0,1,18, 0,0,752,36);

        buf2x.drawImage(dec1, ld_col,18,1,200, 0,0,640,600);

        buf1x.drawImage(buf2c, 74,36);
        buf1x.drawImage(fore, 0,0,34,16, 669,38,34,16);
        buf1x.drawImage(fore, 34,0,10,18, 78,366,10,18);

        if (++ld_col == 80) { ld_col = 0; }
      }

      ld_off ^= 1;
    }

    function decrunch2() {
      if (ld_off & 1) {
        buf1x.fillRect(0,0,752,574);

        let y1 = (Math.random() * 200) >> 0;
        let y2 = 0;

        do {
          y2 += 2 + ((Math.random() * 20) >> 0);

          buf1x.drawImage(dec2, 0,y1,376,1, 0,y2,752,2);

          if (++y1 > 199) { y1 = 0; }
        } while (y2 < 574);

        buf1x.drawImage(fore, 0,0,34,16, 669,38,34,16);
        buf1x.drawImage(fore, 34,0,10,18, 78,366,10,18);
      }

      ld_off ^= 1;
    }

    function loadPart() {
      if (ld_ctr == 0) {
        amiga();

        ld_dat = intros[ld_pos++];

        if (ld_pos > 7) {
          buf1x.fillRect(78,366,10,18);
          buf1x.drawImage(fore, 44,0,14,16, 79,366,14,16);
          buf1x.drawImage(fore, 34,0,10,18, 102,366,10,18);

          canvx.drawImage(buf1c, 0,0);
          return;
        }

        load();
        buf1x.fillStyle = "#004";

      } else if (ld_ctr < 60) {
      } else if (ld_ctr < 220) {
        decrunch1();
      } else if (ld_ctr < 260) {
        buf1x.fillStyle = "#fff";
        decrunch2();
      } else {

        if (ld_rdy) {
          ld_ctr = 0;
          ld_rdy = 0;
          ld_dat[0]();
          return;
        }

        ld_ctr -= 40;
      }

      ld_ctr++;
      canvx.drawImage(buf1c, 0,0);
      requestAnimationFrame(loadPart);
    }

    function load() {
      if (ld_dat[2]) {
        ld_req.open("GET", "modules/"+ ld_dat[2], true);
        ld_req.addEventListener("load", loadSamples);
      } else {
        ld_req.open("GET", "modules/"+ ld_dat[1], true);
        ld_req.addEventListener("load", loadModule);
      }

      ld_req.send(null);
    }

    function loadModule(e) {
      ld_req.removeEventListener("load", loadModule);

      if (player.load(ld_req.response)) {
        ld_rdy = 1;
      }
    }

    function loadSamples(e) {
      ld_req.removeEventListener("load", loadSamples);

      if (player.loadSamples(ld_req.response)) {
        ld_req.open("GET", "modules/"+ ld_dat[1], true);
        ld_req.addEventListener("load", loadModule);
        ld_req.send(null);
      }
    }

    const buf1c = document.createElement("canvas");
    const buf1x = buf1c.getContext("2d", {alpha:false});
    const buf2c = document.createElement("canvas");
    const buf2x = buf2c.getContext("2d");

    const back = new Image();
    const fore = new Image();
    const dec1 = new Image();
    const dec2 = new Image();

    back.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAGQAQMAAAAEPUNmAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAABJhJREFUeNrt3T3r01AUBvAnXmgcLna9Ym0QwfkGJ/ElOvotIoG6KFYcrBBsQNCl6lrw7Vs43xJIHURXBYeI0i4OkT9IhdJ607QqKIK2tUc8h3J6mpZfuU3yTBeK+aZqXD22AAbzvfl85r6dBOuBI7j2sQVw5i1eHn++9xhr1ag7HgEXtwA2r70rHnonHl+drQmGaLmzLYDTF0f2xsHLE4/j7nyt2h544Pze+Ez9xOOuRxT8PLqxV9x4uYHLBtsD385PHbO33pn1wHGOi+NtgHNbeXe+fpVgjs2D/0Jib7g2DxpstMTmwUGxGDQaOIvgllPEQeJUxxqLLrH80umOwFQtRwmDcChU5idCrShbTSxL7wjMEF9RF9vt03ft4lupBZ2khjhSg+KDd9gea6qB+XSmBAPX7AbM/H7U19GB0OBS6kxigRqy64/eHXzo34sOzo4fzgc9UYJ+L9wV2EuVjqQFWylUVivByw+igz2/F00QHAoHPa8CsQswVVng3oI+I8NnCFPoTEKo7EJ/AQrgQj80k0hUSzY7AAdFrIWbdEQjbCOoD/JYwiniC/0LxSev6RSwUy5P3wKm/h2zC9AAnQN2uvmLTzkT1Jbj3wf/gcQ2pt34GrDfyqUDDnItVwH7/RvEQLcK2Js4bJt3OFPxSTpgqi0oqoA1OBAp499rqewiIbAowSpgY8hoEge9SM8iOmCmSrAK2BqkQE1LJzeRIAR2mlgG7BQ2UadeEyY+fYsMaKrhx4AlB9JN7GGBRjVb26MIpgqymh0DPyEJxtJN85teuWSHJFhkUoba+IkF66AI6pmsvy3iIFksmSKojJQ1XdOA0T5FcCjjppu+mnoQhfZAEKSfhwwyyCCDDDLIIIMMMsgggwwyyCCDDP5bYCN0ZvByZ1q223ANOVCGyFbNKRs90MBAogThjHAA5MB6gknZprY5TyEScuBqyc/LJT8GcnpguDgf1WVzzzZyYHXrwUlXtx45kH4eMsggBdAbf551n3xrOTmQ/m/IIIMMMsgggwwy+Htgd/l8liy42hNl6IKPyt3UdduogsFiN3UvNIYqqKvd1KGJ6YICNV3uq6YKxovd1DJsT6mC9POQQQYZZJBBBjcGOi4gSYNC2EYadNN23DhsCINC9DN5ICQNqpmUpMGjykgJwqAzVHGzSRmkn4cMMsgggwwyuBHQ2de9Ywxueu/3d4iCt/3ehRzHZUs9Jwq+0MrJ4ffcE7eJgrMz6p0/8+/f+UwVfKpVVNgl115TBe1l01LVZUMV7N4ZKXvrjVSHJkg/DxlkkEEGGWRwTfB5N1mNdeCcAdwCZWkXQpMA/a/gwQTGAEItP0wEtEsbtmPPzRErOMUbD+Lg7ev127p90h4jAZ6RUT/ze0B2CjAjPxEfb59Ihh19UYIGqGWkTHDHIFMWzIJE2BN1J3ulI9eQAZFphAvwmZ0EOlplSkcIaYCxO0xir24Q25NyNfPgGt2pt1Tn9H1DA/xJ5auBLEgrsRlkkEEGGWSQQQYZZJBBBhlkkEEGGWSQQQYZZPAPaz6nDhry4HPyoBHUwekeg/8BKDYO0v9n3i/31dCNRIIG4AAAAABJRU5ErkJggg==";
    fore.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAASBAMAAAD4atBAAAAAD1BMVEUAAAAAACL/iAAAVar///8frDmMAAAAAXRSTlMAQObYZgAAAEpJREFUKM9jQABBCFACAWMXY2MTZ2MSZMEUWNYEKGvsQkAWZh6aLFAGZDT5ssYu+GVpZC8QEykLAghZFxcXoMHkyULZ+GQRgBxZAEBEKXPJeSQLAAAAAElFTkSuQmCC";
    dec1.src = "data:image/png;base64,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";
    dec2.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXgAAADICAMAAADV/gpVAAAAV1BMVEX///+qEapEAESIAIgAAADuAO4zETMRERF3AHfuEe67ALvdAN2IEYgiESLMAMyqAKozADMiACJVAFVmAGZmEWbMEcwiMyJEEUT/AP8RABHuIu5mImYiIiLCFsFxAAADcklEQVR42uzd6VYaQRCG4U+ySMRAFpJIkvu/Tmfm4EFlak6jwHzV/T7KiP84zNJV1ZvGbQIC5vAroLe4CQi4ph8B1WYREMathsOqf/Vvnw7IxKmd+RhQLrcdSc8Ow1+8ZHThteNzQICLZUDwsBhocaySSCS1bwEB13Q7ilDYwiLQVq6GuqwDeh+ikpmQqTaLejzaShKpe5ir7ZFEZuaqv6hqutJQWeNnk///DKhErV9KRh8CwrHVKEbfNM+pjTjZNiDw7LTEeBqksAxUM4SP2JvwMZdPAeEFGmxMY9BSxb4HlAlXlTGnbj3C2CIEBbOj5nQ68odiZLsYQUeJE6YamaAtoD2oh1NCBhuGzfNut//dH/b/7oTzug8IxL6oxrojb3cBASW4dCg35+nzTNsj9TcgXNbvgHCELz8TJigYo2pIUoMBtSK8f+H/Zpb+75CpMmC12NeAcFEM0gRxyukYaAR2fkLgptNe9wCYLgMiKlJ+cmHkeBAQbNBgT261jLb5PKpesV7HqwUNh2j5VX9bP8eVj+k7Qd1Pb3jHncCdcC1/xgmw8y9wjghERCAo4z8oi/pZFR4CwjSiwsY57SEFI9SdCtFbVWg50PBSd9Dwlvq9DWYRYqItUNwabAKCB27tK7g/UK0Lte3GsOpfGWaiGGPaJytj45KCfqSODr4EBF+cNFBFdEW42JDNQBRjsi8+2iQeVWb+B+SEuXGYUTU9tL5Gqup7ZRmpyEiToJSQECctGU5YMpwwQxesblIuBXV0PxSoGsGQRmMMZ5zmuvcsjViViE4wm+1WbEuWYjmYuwOx0RbYpa12rJBsjCSq0CogMDME55tgXE8KuQ4IknGBCrWgJkVc3q6HA/WvTttL4jGzI1u1kLH+NHrsA5INRSXkrfHP/gHAMLs3IINDSyGgo6rX7n1s7w5SIISBIIp2Fr3Ndu5/0yFBcBBlxIVWtf+hOUFTJp2oTnh2gGhUUT4WaUcIox2BE88BetCooncOn3jvcin9k4moex2WSXwf3ofSDL9IOHI67Ao6mPv6KpiNClJKUBQls7hSxotmLFP0bbdx5lBoQ8dGZuQchhi38TQRRKOV0m8etraM416uoH7ul/Eb63OIDDLe1udA4C/O7LyFdU+KnSJh1pWFDdVFEyswUBh4Pn6CKgPRg2NrHbRx7ZTGF3/yjFGFPahgAAAAAElFTkSuQmCC";

    const intros = [
      [part1, "classic_razmo.bin", ""],
      [part2, "ultimate.bin", ""],
      [part3, "weird_day.bin", "p3_samples.bin"],
      [part4, "kefrens1.bin", ""],
      [part5, "round_one.bin", "p5_samples.bin"],
      [part6, "legend.bin", ""],
      [part7, "jjk107.bin", ""]
    ];

    const ld_req = new XMLHttpRequest();

    let ld_ctr = 0;
    let ld_pos = 0;
    let ld_rdy = 0;
    let ld_off = 1;
    let ld_col = 0;
    let ld_dat = null;

    loader = loadPart;
    player = window.FLOD;

    setTimeout(initialize, 100);
  });

/*
  Another Demo
  Kefrens (1989)
  Part 1 of Mega-Demo "Forces of the Pyramids"
  Replay: DOC Soundtracker VI
  Christian Corti 2018
*/
  function part1() {

    function initialize() {
      buf1c.width  = 376;
      buf1c.height = 287;
      buf1x.imageSmoothingEnabled = false;

      buf2c.width  = 384;
      buf2c.height = 18;
      buf2x.imageSmoothingEnabled = false;

      buf3c.width  = 384;
      buf3c.height = 50;
      buf3x.imageSmoothingEnabled = false;

      buf4c.width  = 384;
      buf4c.height = 100;
      buf4x.imageSmoothingEnabled = false;

      setup();
    }

    function setup() {
      buf1x.fillStyle = "#000";
      buf1x.fillRect(0,0,376,287);

      buf1x.drawImage(logo, 0,0,320,56, 37,18,320,56);
      buf1x.drawImage(logo, 320,0,1,57, 0,230,376,57);

      buf3x.fillStyle = "#000";
      buf4x.fillStyle = "#000";

      for (let i = 0; i < sc_len; i++) {
        sc_code[i] = code.indexOf(sc_text.charAt(i));
      }

      rf_copp.fill(0);

      canvc.addEventListener("click", exit);
      document.addEventListener("flodSync", draw);

      player.version = 3;
      player.play();
    }

    function exit(e) {
      cancelAnimationFrame(afid);
      canvc.removeEventListener("click", exit);
      document.removeEventListener("flodSync", draw);

      player.reset();
      loader();
    }

    function draw() {
      canvx.drawImage(buf1c, 0,0,376,287, 0,0,752,574);

      buf1x.fillStyle = "#000";
      buf1x.fillRect(0,74,376,156);

      if (sc_off) {
        sc_off--;
      } else {
        scroll();
      }

      scrollfx();
      reflection();

      for (let i = 0; i < 10; i++) {
        let p = rb_ptrs[i];
        let y = rb_sine[p];

        if (++p >= 1522) { p = 0; }
        rb_ptrs[i] = p;

        buf1x.drawImage(logo, 321,(i * 5),1,5, 0,y,376,5);
      }

      afid = requestAnimationFrame(draw);
    }

    function scroll() {
      if (sc_ctr == 0) {
        let cx = sc_code[sc_pos];

        if (++sc_pos == sc_len) {
          sc_pos = 0;
        }

        if (cx == 53) {
          sc_off = 100;
          return;
        }

        buf2x.clearRect(352,1,32,17);

        switch (cx) {
          case 48:
            sv_flag = 1;
            cx = 47;
            break;
          case 49:
            sc_spd = 3;
            sc_chr = 10;
            cx = sc_code[sc_pos++];
            break;
          case 50:
            sc_spd = 4;
            sc_chr = 8;
            cx = sc_code[sc_pos++];
            break;
          case 51:
            sl_pos  = 0;
            su_flag = 1;
            cx = 47;
            break;
          case 52:
            sl_pos  = 1275;
            sd_flag = 1;
            cx = 47;
            break;
          case 54:
            sv_flag = 0;
            cx = 47;
            break;
          case 55:
            sh_flag = 1;
            cx = 47;
            break;
          case 56:
            sh_copp.fill(5);
            sh_flag = 0;
            cx = 47;
            break;
          case 57:
            sc_spd = 1;
            sc_chr = 32;
            cx = sc_code[sc_pos++];
            break;
          case 58:
            sc_spd = 15;
            sc_chr = 2;
            cx = sc_code[sc_pos++];
            break;
        }

        sc_ctr = sc_chr;
        cx *= 32;

        buf2x.drawImage(font, cx,0,32,17, 352,1,32,17);
      }

      const w = 384 - sc_spd;

      buf2x.globalCompositeOperation = "copy";
      buf2x.drawImage(buf2c, sc_spd,1,w,17, 0,1,w,17);
      buf2x.globalCompositeOperation = "source-over";

      sc_ctr--;
    }

    function scrollfx() {
      buf3x.fillRect(0,0,384,50);
      buf4x.fillRect(0,0,384,100);

      if (sv_flag) {
        let s = 0;

        for (let i = 47; i >= 0; i--) {
          let p = sv_curr[s];
          let x = i * 8;

          buf3x.drawImage(buf2c, x,0,8,18, (13 + x),sv_sine[p],8,18);

          if (++p >= 110) { p = 0; }
          sv_curr[s++] = p;
        }
      } else if (sh_flag) {
        for (let i = 1; i < 18; i++) {
          buf3x.drawImage(buf2c, 0,i,384,1, sh_copp[i],(i - 1),384,1);
        }

        sh_copp.copyWithin(0,1);
        sh_copp[49] = sh_sine[sh_pos];

        if (++sh_pos == 63) {
          sh_pos = 0;
        }
      } else {
        buf3x.drawImage(buf2c, 0,1,379,17, 5,0,379,17);
      }

      for (let i = 0; i < 50; i++) {
        const p = sl_pos + i;
        const y = sl_copp[p];
        const h = sl_copp[p + 1] - y;
        if (!h) { continue; }
        buf4x.drawImage(buf3c, 0,i,384,h, 0,y,384,h);
      }

      if (su_flag) {
        sl_pos += 51;

        if (sl_pos == 1326) {
          sl_pos  = 1275;
          su_flag = 0;
        }
      } else if (sd_flag) {
        sl_pos -= 51;

        if (sl_pos < 0) {
          sl_pos  = 0;
          sd_flag = 0;
        }
      }

      buf1x.drawImage(buf4c, 0,0,371,100, 5,85,371,100);
    }

    function reflection() {
      buf1x.fillStyle = "#00f";
      buf1x.fillRect(0,255,376,17);

      for (let i = 0; i < 43; i++) {
        let p = rf_curr[i];

        rf_copp[      i] = rf_copp[ 43 + i];
        rf_copp[ 43 + i] = rf_copp[ 86 + i];
        rf_copp[ 86 + i] = rf_copp[129 + i];
        rf_copp[129 + i] = rf_copp[172 + i];
        rf_copp[172 + i] = rf_copp[215 + i];
        rf_copp[215 + i] = rf_copp[258 + i];
        rf_copp[258 + i] = rf_copp[301 + i];
        rf_copp[301 + i] = rf_copp[344 + i];
        rf_copp[344 + i] = rf_copp[387 + i];
        rf_copp[387 + i] = rf_copp[430 + i];
        rf_copp[430 + i] = rf_copp[473 + i];
        rf_copp[473 + i] = rf_copp[516 + i];
        rf_copp[516 + i] = rf_copp[559 + i];
        rf_copp[559 + i] = rf_copp[602 + i];
        rf_copp[602 + i] = rf_copp[645 + i];
        rf_copp[645 + i] = rf_copp[688 + i];
        rf_copp[688 + i] = rf_copp[731 + i];
        rf_copp[731 + i] = sh_sine[p];

        if (++p == 63) { p = 0; }
        rf_curr[i] = p;
      }

      let x = 0;
      let r = 0;
      let l = sh_copp[49];

      for (let y = 1; y < 18; y++) {
        for (let p = 0; p < 42; p += 2) {
          buf1x.drawImage(buf2c, x,y,16,1, (5 + x + l),(254 + y),16,1);
          x += 16;

          let v = rf_copp[r + p];
          if (v > 7) { v = rf_copp[r + p + 1]; }
          l += (v - l);
        }

        l = rf_copp[r + 42];
        x = 0;
        r += 43;
      }
    }

    const buf1c = document.createElement("canvas");
    const buf1x = buf1c.getContext("2d", {alpha:false});
    const buf2c = document.createElement("canvas");
    const buf2x = buf2c.getContext("2d");
    const buf3c = document.createElement("canvas");
    const buf3x = buf3c.getContext("2d", {alpha:false});
    const buf4c = document.createElement("canvas");
    const buf4x = buf4c.getContext("2d", {alpha:false});

    const font = new Image();
    const logo = new Image();

    font.src = "data:image/png;base64,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";
    logo.src = "data:image/png;base64,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";

    const code = "abcdefghijklmnopqrstuvwxyz0123456789!()-;':\",.? \u00a2\u00a9\u00ae\u00b2\u00b3\u00b9\u00bc\u00bd\u00be\u00e5\u00f0";

    const sc_text = "\u00be   \u00a9  kefrens are back with\u00b2another demo\u00b9\u00b9\u00b9\u00b3\u00f0           \u00a2\u00a9done by\u00b2   mellica  \u00b9\u00b9\u00b9 in 1989.......  and the music done by     razmo   \u00b9   \u00b3 the place is bamiga sector 1's copyparty, yeah a big special hello to them....\u00f0            \u00bc\u00a9if\u00bdyou don't know who is typing then look here ---\u00b2mellica --- ok! i will first of all say hello to all the new kefrens members....            atomic team and defcon are dead coz they joined us...   message to\u00b3the amiga freak of trilogy ( hello old freak, i hope you like our mega demo?)       qrd of trilogy (well are you working on some new demo? hope you are..)....    and now\u00f0            \u00a2\u00a9the member list of kefrens and after that the greetings.....      members:      \u00be      promax (coder), razmo (coder, music and gfx), mellica (coder and gfx), metallion (coder), axe (coder), megabyte (coder), murphy (coder), jason (coder), nightlight (music), blazer (music), lazer (gfx and music), the whiz kid (gfx), spyro (gfx), box (gfx), zycho (gfx and music), magician x (swapping), icu2 (swapping and gfx), noname (swapping) and pentagram (swapping).... now you have seen the names and if any one else says that they are a kefrens member, then they are lying....      and now \u00f0           \u00bc\u00ae bbbooooommmmm crazzzzz   sorry about the keyboard, but icu2 did't get it.....         ok !   here is icu2 !!! i think, that thiz party is a fucking great party !! first of all, i would like to send my best regards to my mates in subway and the dream team (thanx for showing up, and thanx for the stickers !!!)   ok !  let's party !!!! \u00a2              we in kefrens sends our very special golden regards to: subway and the dream team (my fucking best pals) - rebels - northstar and fairlight - tsk crew and the accummulators - cosmos - the silents - bamiga sector one (denmark) - mad monks - x men - deathstar (germany) - the agents - it - trilogy - the band (hi stefan !!) - the supply team - plasma force - sunriders - the web inc. - the dominators - triangle - phallanx - tat - the gang - accession - 4th dimension - coolcat (australia) ....           \u00bc  \u00bd  (ups !!) ok !  i will leave now, cause i have to talk with all the other cool guys at the party (ofcourse including the other members of kefrens !!)  ....  se ya, and if ya wanna swap, than write to:  \u00be\u00b9\u00b9\u00e5  kefrens   poste restante   3450 alleroed   denmark ....\u00a9 ok, i will now leave the board !!! anyone interested in typin' ???                              ";
    const sc_len  = sc_text.length;
    const sc_code = [];

    const sl_copp = [24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,48,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,46,48,50,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,44,46,48,50,52,54,55,56,57,58,59,60,61,62,63,64,65,66,67,67,69,70,71,72,73,74,75,76,77,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,42,44,46,48,50,52,54,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,40,42,44,46,48,50,52,54,56,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,38,40,42,44,46,48,50,52,54,56,58,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,13,14,15,16,17,18,19,20,21,22,23,24,25,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,12,13,14,15,16,17,18,19,20,21,22,23,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,75,76,77,78,79,80,81,82,83,84,85,86,87,11,12,13,14,15,16,17,18,19,20,21,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,77,78,79,80,81,82,83,84,85,86,87,88,10,11,12,13,14,15,16,17,18,19,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,79,80,81,82,83,84,85,86,87,88,89,9,10,11,12,13,14,15,16,17,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,81,82,83,84,85,86,87,88,89,90,8,9,10,11,12,13,14,15,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,83,84,85,86,87,88,89,90,91,7,8,9,10,11,12,13,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,85,86,87,88,89,90,91,92,6,7,8,9,10,11,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,87,88,89,90,91,92,93,5,6,7,8,9,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,89,90,91,92,93,94,4,5,6,7,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,91,92,93,94,95,3,4,5,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,93,94,95,96,2,3,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,95,96,97,1,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,97,98,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100];

    const sh_sine = [7,8,9,10,10,11,11,12,12,13,13,13,14,14,14,15,15,15,15,15,15,15,15,14,14,14,13,13,12,11,10,9,8,7,6,5,4,3,3,2,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,3,3,4,5,6];
    const sh_copp = new Array(50);

    const sv_sine = [18,17,16,15,14,13,12,11,11,10,9,9,8,7,6,6,5,5,4,4,3,3,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,3,4,5,5,6,7,8,8,9,10,11,12,13,14,15,16,17,18,19,20,21,21,22,23,24,24,25,26,27,27,28,28,28,28,29,29,29,30,30,30,30,30,30,30,30,30,30,29,29,29,28,28,27,27,26,25,24,23,22,22,21,20,20,19,18];
    const sv_curr = [0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44];

    const rb_ptrs = [0,4,8,12,16,20,24,28,32,36];
    const rb_sine = [204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,205,205,205,205,205,205,205,205,205,205,205,206,206,206,206,206,206,206,206,207,207,207,207,207,207,207,208,208,208,208,208,208,208,209,209,209,209,209,210,210,210,210,210,210,211,211,211,211,211,212,212,212,212,213,213,213,213,213,214,214,214,214,214,215,215,215,215,216,216,216,216,216,217,217,217,217,218,218,218,218,218,219,219,219,219,219,220,220,220,220,220,221,221,221,221,221,221,222,222,222,222,222,222,222,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,222,222,222,222,222,222,221,221,221,221,220,220,220,219,219,219,218,218,218,217,217,217,216,216,215,215,214,214,213,213,212,212,211,211,210,210,209,209,208,207,207,206,206,205,205,204,203,203,202,201,201,200,200,199,198,198,197,196,196,195,195,194,194,193,192,192,191,191,190,190,189,189,188,188,187,187,187,186,186,186,185,185,185,185,184,184,184,184,184,184,184,184,184,184,184,184,184,184,184,184,185,185,185,185,186,186,186,187,187,188,188,189,190,190,191,191,192,193,193,194,195,196,196,197,198,199,200,201,201,202,203,204,205,206,207,207,208,209,210,211,212,213,213,214,215,216,216,217,218,218,219,219,220,221,221,221,222,222,223,223,223,223,223,223,223,223,223,223,223,223,223,223,222,222,221,221,220,220,219,219,218,217,216,216,215,214,213,212,211,210,209,208,207,206,205,204,203,202,201,200,199,198,197,196,195,194,193,192,191,190,189,189,188,187,187,186,185,185,185,184,184,184,184,184,184,184,184,184,184,184,185,185,186,186,187,188,188,189,190,191,192,193,194,195,196,197,198,199,201,202,203,204,206,207,208,209,210,212,213,214,215,216,217,218,219,219,220,221,221,222,222,223,223,223,223,223,223,223,223,223,223,222,222,221,220,219,219,218,217,216,215,213,212,211,210,208,207,206,204,203,202,200,199,198,196,195,194,193,191,190,189,188,187,187,186,185,185,184,184,184,184,184,184,184,184,184,185,185,186,187,188,189,190,191,192,193,194,196,197,199,200,202,203,205,206,208,209,210,212,213,214,216,217,218,219,220,221,221,222,223,223,223,223,223,223,223,223,222,222,221,220,219,218,217,216,215,214,212,211,209,208,206,204,203,201,199,198,196,195,193,192,191,189,188,187,186,186,185,184,184,184,184,184,184,184,184,185,186,186,187,188,190,191,192,194,195,197,199,200,202,204,205,207,209,211,212,214,215,217,218,219,220,221,222,222,223,223,223,223,223,223,223,222,221,220,219,218,217,215,214,212,211,209,207,205,203,202,200,198,196,195,193,191,190,189,187,186,186,185,184,184,184,184,184,184,184,185,186,187,188,189,191,192,194,196,197,199,201,203,205,207,209,211,213,214,216,217,219,220,221,222,223,223,223,223,223,223,223,222,221,220,219,218,216,215,213,211,209,207,205,203,201,199,197,195,193,192,190,189,187,186,185,184,184,184,184,184,184,184,185,186,187,189,190,192,193,195,197,199,201,204,206,208,210,212,214,215,217,219,220,221,222,223,223,223,223,223,223,222,221,220,219,217,216,214,212,210,208,206,203,201,199,197,195,193,191,189,188,187,185,185,184,184,184,184,184,185,186,187,188,189,191,192,190,189,187,186,185,184,184,184,184,184,184,185,186,187,189,190,192,194,196,198,200,202,204,207,209,211,213,215,217,218,220,221,222,223,223,223,223,223,223,222,222,221,219,218,216,215,213,211,209,207,205,202,200,198,196,194,193,191,189,188,187,186,185,184,184,184,184,184,184,185,186,187,188,189,191,192,194,196,198,200,202,204,206,208,210,212,214,215,217,218,220,221,222,222,223,223,223,223,223,223,222,221,220,219,218,217,215,213,212,210,208,206,204,202,200,198,196,195,193,191,190,189,187,186,185,185,184,184,184,184,184,184,184,185,186,187,188,189,191,192,194,195,197,199,201,203,204,206,208,210,212,213,215,216,218,219,220,221,222,222,223,223,223,223,223,223,223,222,221,221,220,218,217,216,214,213,211,210,208,206,205,203,201,199,198,196,195,193,192,190,189,188,187,186,185,185,184,184,184,184,184,184,184,185,185,186,187,188,189,190,191,193,194,196,197,199,200,202,203,205,207,208,210,211,213,214,216,217,218,219,220,221,222,222,223,223,223,223,223,223,223,223,222,222,221,220,219,219,217,216,215,214,213,211,210,208,207,205,204,202,201,199,198,196,195,194,192,191,190,189,188,187,186,186,185,185,184,184,184,184,184,184,184,184,185,185,186,186,187,188,189,190,191,192,193,194,196,197,198,200,201,202,204,205,206,208,209,210,212,213,214,215,216,217,218,219,220,221,221,222,222,223,223,223,223,223,223,223,223,223,223,222,222,221,220,220,219,218,217,216,215,214,213,212,211,210,209,207,206,205,204,202,201,200,199,198,197,195,194,193,192,191,190,190,189,188,187,187,186,185,185,185,184,184,184,184,184,184,184,184,184,184,184,185,185,186,186,187,188,188,189,190,191,191,192,193,194,195,196,197,198,199,200,201,202,203,205,206,207,208,209,210,211,212,213,213,214,215,216,217,218,218,219,220,220,221,221,222,222,222,223,223,223,223,223,223,223,223,223,223,223,223,223,222,222,222,221,221,220,220,219,219,218,217,217,216,215,214,214,213,212,211,210,210,209,208,207,206,205,204,204,203,202,201,200,199,198,198,197,196,195,195,194,193,192,192,191,190,190,189,189,188,188,187,187,186,186,186,185,185,185,184,184,184,184,184,184,184,184,184,184,184,184,184,184,184,184,184,185,185,185,185,186,186,186,187,187,188,188,189,189,190,190,191,191,192,192,193,193,194,194,195,196,196,197,197,198,199,199,200,201,201,202,202,203,204,204,205,205,206,207,207,208,208,209,209,210,211,211,212,212,213,213,214,214,215,215,216,216,216,217,217,218,218,218,219,219,219,220,220,220,220,221,221,221,221,222,222,222,222,222,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,223,222,222,222,222,222,222,222,221,221,221,221,221,221,220,220,220,220,220,219,219,219,219,219,218,218,218,218,217,217,217,217,217,216,216,216,216,215,215,215,215,215,214,214,214,214,213,213,213,213,213,212,212,212,212,212,211,211,211,211,211,210,210,210,210,210,209,209,209,209,209,209,208,208,208,208,208,208,207,207,207,207,207,207,207,206,206,206,206,206,206,206,206,205,205,205,205,205,205,205,205,205,205,205,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204];

    const rf_curr = [0,5,10,15,20,25,30,35,40,45,50,55,60,55,50,45,40,35,30,25,20,15,10,5,0,5,10,15,20,25,30,35,40,45,50,55,60,55,50,45,40,35,30];
    const rf_copp = new Array(774);

    let sc_off = 0;
    let sc_pos = 0;
    let sc_ctr = 0;
    let sc_spd = 3;
    let sc_chr = 10;

    let sl_pos = 0;
    let sh_pos = 0;

    let su_flag = 0;
    let sd_flag = 0;
    let sh_flag = 0;
    let sv_flag = 0;

    let afid = 0;

    setTimeout(initialize, 100);
  }

/*
  Part 2 Demo
  Kefrens (1989)
  Part 2 of Mega-Demo "Forces of the Pyramids"
  Replay: Master Soundtracker 1.0
  Christian Corti 2018
*/
  function part2() {

    function initialize() {
      buf1c.width  = 376;
      buf1c.height = 287;
      buf1x.imageSmoothingEnabled = false;

      buf2c.width  = 512;
      buf2c.height = 188;
      buf2x.imageSmoothingEnabled = false;

      buf3c.width  = 320;
      buf3c.height = 155;
      buf3x.imageSmoothingEnabled = false;

      buf4c.width  = 400;
      buf4c.height = 64;
      buf4x.imageSmoothingEnabled = false;

      buf5c.width  = 400;
      buf5c.height = 32;
      buf5x.imageSmoothingEnabled = false;

      setup();
    }

    function setup() {
      sc_back.fill("#300");

      canvc.addEventListener("click", exit);
      document.addEventListener("flodSync", draw);

      player.version = 4;
      player.play();
    }

    function exit(e) {
      cancelAnimationFrame(afid);
      canvc.removeEventListener("click", exit);
      document.removeEventListener("flodSync", draw);

      player.reset();
      loader();
    }

    function draw() {
      buf1x.drawImage(copp, 0,0,1,287, 0,0,376,287);
      buf2x.clearRect(0,0,512,188);

      if (im_curr[2]) {
        stars();
        next();
        background();
      } else {
        next();
        background();
        stars();
      }

      buf1x.drawImage(logo, lo_sine[lo_pos],18);

      if (++lo_pos == 118) {
        lo_pos = 0;
      }

      scroll();

      buf1x.drawImage(buf2c, 76,0,376,188, 0,74,376,188);
      buf1x.drawImage(buf5c, sc_step,0,368,32, 5,230,368,32);

      canvx.drawImage(buf1c, 0,0,376,287, 0,0,752,574);

      afid = requestAnimationFrame(draw);
    }

    function background() {
      if (im_wait) {
        im_wait--;
      } else {
        if (im_dir) {
          if (im_y == 153) {
            im_dir = 0;

            if (++im_idx > 4) { im_idx = 1; }

            im_curr = im_data[im_idx];
            bb_flag = im_curr[0];
          } else {
            im_y++;
            im_h--;
          }
        } else {
          if (im_y == 1) {
            im_dir = 1;
            im_wait = im_curr[1];
          } else {
            im_y--;
            im_h++;
          }
        }
      }

      buf2x.drawImage(back, 0,im_curr[3],320,im_h, 113,im_y,320,im_h);
    }

    function bobs() {
      buf3x.clearRect(0,0,320,155);

      let p = 0;

      for (let i = 0; i < 25; i++) {
        let x1 = bb_pos[p + 0];
        let y1 = bb_pos[p + 1];
        let x2 = bb_pos[p + 2];
        let y2 = bb_pos[p + 3];

        let x = bobs_x[x1] + bobs_x[x2];
        let y = bobs_y[y1] + bobs_y[y2] + 3;

        buf3x.drawImage(font, 858,0,16,16, x,y,16,16);

        x1 += bb_val[bb_idx2 + 2];
        y1 += bb_val[bb_idx2 + 1];
        x2 += bb_val[bb_idx2 + 0];
        y2 += bb_val[bb_idx2 + 3];

        if (x1 > 700) { x1 -= 701; }
        if (y1 > 700) { y1 -= 701; }
        if (x2 > 700) { x2 -= 701; }
        if (y2 > 700) { y2 -= 701; }

        bb_pos[p + 0] = x1;
        bb_pos[p + 1] = y1;
        bb_pos[p + 2] = x2;
        bb_pos[p + 3] = y2;

        p += 4;
      }

      if (im_curr[0]) { return; }

      buf2x.drawImage(buf3c, 0,0,320,im_h, 113,im_y,320,im_h);
    }

    function next() {
      if (bb_flag) {
        bb_flag = 0;
        bb_idx1 += 8;
        bb_idx2 += 8;

        if (bb_idx1 > 72) {
          bb_idx1 = 0;
          bb_idx2 = 4;
        }

        let v1 = bb_val[bb_idx1 + 0];
        let v2 = bb_val[bb_idx1 + 1];
        let v3 = bb_val[bb_idx1 + 2];
        let v4 = bb_val[bb_idx1 + 3];

        let p1 = v1;
        let p2 = v2;
        let p3 = v3;
        let p4 = v4;

        for (let i = 0; i < 100;) {
          bb_pos[i++] = p1;
          bb_pos[i++] = p2;
          bb_pos[i++] = p3;
          bb_pos[i++] = p4;

          p1 += v1;
          p2 += v2;
          p3 += v3;
          p4 += v4;
        }
      } else {
        bobs();
      }
    }

    function scroll() {
      if (sc_wait) {
        sc_wait--;
      } else {
        sc_step += sc_speed;

        if (sc_step >= 33) {
          sc_step = 0;

          do {
            let cx = sc_text.charCodeAt(sc_pos);

            if (++sc_pos == sc_len) {
              sc_pos = 0;
            }

            if (cx == 61) {
              sc_wait = 100;
              sc_step = 33;
              break;
            }

            if (cx == 62) {
              sc_speed = 11;
            } else if (cx == 60) {
              sc_speed = 3;
            } else {
              buf4x.globalCompositeOperation = "copy";
              buf4x.drawImage(buf4c, 33,0,367,64, 0,0,367,64);
              buf4x.globalCompositeOperation = "source-over";

              if (cx == 32) {
                cx = 165;
              } else {
                cx = (cx - 33) * 33;
              }

              buf4x.drawImage(font, cx, 0,33,32, 367, 0,33,32);
              buf4x.drawImage(font, cx,32,33,32, 367,32,33,32);
              break;
            }
          } while (true);
        }
      }

      sc_back.copyWithin(0,1);
      sc_back[25] = br_back[sc_copp];

      if (++sc_copp == 145) {
        sc_copp = 0;
      }

      for (let i = 0; i < 25; i++) {
        buf5x.fillStyle = sc_back[i];
        buf5x.fillRect(0,(3 + i),400,1);
      }

      buf5x.fillRect(0,28,400,1);

      let y1 = sc_bars[sc_bar1];
      let y2 = sc_bars[sc_bar2];
      let y3 = sc_bars[sc_bar3];

      if (++sc_bar1 == 78) { sc_bar1 = 0; }
      if (++sc_bar2 == 78) { sc_bar2 = 0; }
      if (++sc_bar3 == 78) { sc_bar3 = 0; }

      for (let i = 0; i < 15; i++) {
        buf5x.fillStyle = br_cols[i];

        if (i < 5) {
          buf5x.fillRect(0,y1++,400,1);
        } else if (i < 10) {
          buf5x.fillRect(0,y2++,400,1);
        } else {
          buf5x.fillRect(0,y3++,400,1);
        }
      }

      buf5x.globalCompositeOperation = "destination-in";
      buf5x.drawImage(buf4c, 0,32,400,32, 0,0,400,32);

      buf5x.globalCompositeOperation = "source-over";
      buf5x.drawImage(buf4c, 0,0,400,32, 0,0,400,32);
    }

    function stars() {
      let y = 12;

      let col1 = "";
      let col2 = "";

      for (let i = 0; i < 88; i++) {
        if (y >= im_y) {
          col1 = im_curr[4];
          col2 = im_curr[5];
        } else {
          col1 = "#aaa";
          col2 = "#555";
        }

        let x1 = sp_star1[i];
        let x2 = sp_star2[i];
        let x3 = sp_star3[i];

        if (y >= 151) { x1 = (x1 + 6) & 511; }
        if (y >= 162) { x2 = (x2 + 4) & 511; }
        if (y >= 173) { x3 = (x3 + 2) & 511; }

        buf2x.fillStyle = col1;
        buf2x.fillRect(x1,y,1,1);
        buf2x.fillRect(x2,y,1,1);

        buf2x.fillStyle = col2;
        buf2x.fillRect(x3,y,1,1);

        if (y < 151) { x1 = (x1 + 6) & 511; }
        if (y < 162) { x2 = (x2 + 4) & 511; }
        if (y < 173) { x3 = (x3 + 2) & 511; }

        sp_star1[i] = x1;
        sp_star2[i] = x2;
        sp_star3[i] = x3;

        y += 2;
      }
    }

    const buf1c = document.createElement("canvas");
    const buf1x = buf1c.getContext("2d", {alpha:false});
    const buf2c = document.createElement("canvas");
    const buf2x = buf2c.getContext("2d");
    const buf3c = document.createElement("canvas");
    const buf3x = buf3c.getContext("2d");
    const buf4c = document.createElement("canvas");
    const buf4x = buf4c.getContext("2d");
    const buf5c = document.createElement("canvas");
    const buf5x = buf5c.getContext("2d");

    const back = new Image();
    const copp = new Image();
    const font = new Image();
    const logo = new Image();

    back.src = "data:image/png;base64,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";
    copp.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAEfCAIAAAAP3DuBAAAAMElEQVQ4jWNiYPjPxMDAMALwezIxsv6B9sMoHjlYkGwsCNRPLiY/nwCxIAN2jN2PAH2GIaSHQujDAAAAAElFTkSuQmCC";
    font.src = "data:image/png;base64,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";
    logo.src = "data:image/png;base64,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";

    const sc_text = "OK! KEFRENS ARE HERE AGAIN WITH ANOTHER CREATION DONE BY \" MELLICA \"=== WELL FIRST OF ALL THIS DEMO WAS RELEASED  AT BS1'S COPY-PARTY THE 12-02-1989...... IT IS A GREAT COPY-PARTY......     OKEY I WILL SEND MY SPECIAL HELLOS TO THE AMIGA FREAK AND QRD OF TRILOGY AND OFCAUSE ALSO TO LITEACE OF DEXION........      WELL>!!!!!      I THINK ICU2 WANTS TO WRITE SOMETHING TO YA OUT THERE          < YEEEESSS !  HE WAS FUCKING RIGHT !! THIS IS ICU2 RAPING THE KEYBOARD ... OK !  AT THIS MOMENT OF THE PARTY (19.30.SATURDAY) SOME OF THE BIG GROUPS HAS LEFT THE PARTY (LIKE THE BAND ETC.) BUT STILL THIS IS SOME NICE GUYS LIKE: THE DREAM TEAM, TRILOGY, BEASTIE BOYS, THE SUPPLY TEAM (DK AND FRG), THE SILENTS, BAMIGA SECTOR ONE (OFCOURSE !), DEXION, REBELS AND OFCOURSE US (KEFRENS)  OK !  THE ONLY FAULT WITH THIZ PARTY, IS THE MANY FUCKING LAMERS, SITTING AND PLAYING INTERNATIONAL KARATE PLUS . OK ! ENOUGH ABOUT THIS FINE PARTY !! LET'S FUCK OFF WITH SOMEGREETINGS !!!  WE SENDS OUR MEGA-GOLDEN REGARDS TO :  SUBWAY AND THE DREAM TEAM - REBELS - NORTHSTAR AND FAIRLIGHT - TSK CREW AND THE ACCUMMULATORS - COSMOS - THE BAND - THE SILENTS - BAMIGA SECTOR ONE (DK) - MAD MONKS - X MEN - DEATHSTAR (GERMANY) - THE AGENTS - BEASTIE BOYS - IT - TRILOGY - THE SUPPLY TEAM - PLASMA FORCE - SUNRIDERS - THE WEB INC. - DOMINATORS - ACCESSION - COOLCAT (AUSTRALIA) ... SORRY, IF YOU ARE FORGOTTEN, BUT WE LOST OUR GREETINGLIST !!!  SEE YA IN THE NEXT KEFRENS DEMO !!      HI DUDES, THIZ IS THE WHIZ KID TYPING RIGHT NOW.....!   I DISAGREE WITH ICU2 ABOUT THE FAULTS IN THIS PARTY, I THINK IT'S A PAIN IN THE .... TO HEAR THAT LOUD MUSIC FROM THE ONES WHO HOLD THIS IN ANY OTHER WAY PERFECT PARTY.!!!!    THIS GREAT PARTY HAS GOT IT ALL, GREAT GROUPS, WHICH SHOW EVEN GREATER DEMO'S AND THE MOVIES SHOWN IN THE BASE-MENT ARE ALSO GREAT (COCKTAIL,WILLOW,RED HEAT AND MANY OTHERS) SO AS YOU SEE THE PARTY IS PERFECT, BUT WHAT DID YOU EXPECT WHEN BAMIGA SECTOR ONE & THE WARFALCONS THROW A PARTY.!!!!    I JUST WANNA SAY HI TO A COUPLE OF CONTACTS LIKE: AGENCY(HELLO ANDERS WHEN WILL I GET SOME DISKS!!!!)    AND ALLAN (THE NEW EINSTEIN IN MATH.) SEND VIDEOS SOON       THE WORDS ARE SLIPPING MY MIND, SO I'LL LET ANOTHER MEMBER FROM KEFRENS TAKE OVER THE BURDEN OF WRITING SOME TEXT TO KEEP YA ALL HAPPY, WAITING FOR OUR NEXT PRODUCTS.!!!!           METALLION WAS HERE 11.FEB-89.....       OOOPPS  ICU2, JUST SAID THAT I DID NOT WRITE ENOUGH TEXT, SO I KEEP HANGING ON A LITTLE BIT MORE, THOUGH I DONT HAVE A FUC.... IDEA OF WHAT TO WRITE IN THIS NICE ADCSINUSBOBBY-PIXELCOLORPICTURE-STARSPRITES DEMO OF MELLICAS ??  ANYWAY I HOPE YOU WATCHING FREAKS LIKES OUR PRODUCTS AND THAT YOU WILL KEEP ON MAKING THE AMIGA-SCENE SO GREAT.. YA KNOW, LOTS A DEMOS AND SO ON ..... BYE TO THIS DEMO FROM METALLION FOR THIS TIME .....    ";
    const sc_len  = sc_text.length;
    const sc_bars = [3,3,3,3,3,3,3,3,3,4,4,4,5,5,6,7,7,8,8,9,10,11,12,13,14,15,16,17,18,19,19,20,20,21,22,22,23,23,23,24,24,24,24,24,24,24,24,24,23,23,23,22,22,21,20,20,19,19,18,17,16,15,14,13,12,11,10,9,8,8,7,7,6,5,5,4,4,4];
    const sc_back = new Array(26);

    const bobs_x = [70,70,71,71,72,73,73,74,75,75,76,76,77,78,78,79,80,80,81,81,82,83,83,84,85,85,86,86,87,88,88,89,89,90,91,91,92,92,93,94,94,95,95,96,97,97,98,98,99,99,100,101,101,102,102,103,103,104,104,105,105,106,107,107,108,108,109,109,110,110,111,111,112,112,113,113,114,114,115,115,116,116,117,117,118,118,118,119,119,120,120,121,121,121,122,122,123,123,124,124,124,125,125,125,126,126,127,127,127,128,128,128,129,129,129,130,130,130,131,131,131,132,132,132,132,133,133,133,133,134,134,134,134,135,135,135,135,136,136,136,136,136,137,137,137,137,137,137,138,138,138,138,138,138,138,138,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,138,138,138,138,138,138,138,138,137,137,137,137,137,137,136,136,136,136,136,135,135,135,135,134,134,134,134,133,133,133,133,132,132,132,132,131,131,131,130,130,130,129,129,129,128,128,128,127,127,127,126,126,126,125,125,124,124,124,123,123,122,122,122,121,121,120,120,119,119,118,118,118,117,117,116,116,115,115,114,114,113,113,112,112,111,111,110,110,109,109,108,108,107,107,106,106,105,104,104,103,103,102,102,101,101,100,99,99,98,98,97,97,96,95,95,94,94,93,92,92,91,91,90,89,89,88,88,87,86,86,85,85,84,83,83,82,81,81,80,80,79,78,78,77,76,76,75,75,74,73,73,72,71,71,70,70,69,68,68,67,66,66,65,65,64,63,63,62,61,61,60,59,59,58,58,57,56,56,55,55,54,53,53,52,51,51,50,50,49,48,48,47,47,46,45,45,44,44,43,43,42,41,41,40,40,39,39,38,37,37,36,36,35,35,34,34,33,32,32,31,31,30,30,29,29,28,28,27,27,26,26,25,25,24,24,23,23,22,22,22,21,21,20,20,19,19,18,18,18,17,17,16,16,15,15,15,14,14,14,13,13,12,12,12,11,11,11,10,10,10,9,9,9,8,8,8,7,7,7,7,6,6,6,6,5,5,5,5,4,4,4,4,3,3,3,3,3,2,2,2,2,2,2,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,9,9,9,10,10,10,11,11,11,12,12,12,13,13,13,14,14,15,15,15,16,16,17,17,17,18,18,19,19,20,20,21,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,30,30,31,31,32,32,33,33,34,35,35,36,36,37,37,38,38,39,40,40,41,41,42,42,43,44,44,45,45,46,47,47,48,48,49,50,50,51,51,52,53,53,54,54,55,56,56,57,58,58,59,59,60,61,61,62,62,63,64,64,65,66,66,67,68,68,69,69,70,71];
    const bobs_y = [60,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,58,58,58,58,58,58,58,58,58,58,58,58,57,57,57,57,57,57,57,57,57,57,56,56,56,56,56,56,56,56,55,55,55,55,55,55,55,54,54,54,54,54,54,53,53,53,53,53,53,52,52,52,52,52,52,51,51,51,51,51,50,50,50,50,50,49,49,49,49,49,48,48,48,48,48,47,47,47,47,46,46,46,46,46,45,45,45,45,44,44,44,44,43,43,43,43,42,42,42,42,41,41,41,41,40,40,40,40,39,39,39,39,38,38,38,38,37,37,37,37,36,36,36,36,35,35,35,34,34,34,34,33,33,33,33,32,32,32,32,31,31,31,30,30,30,30,29,29,29,29,28,28,28,27,27,27,27,26,26,26,26,25,25,25,25,24,24,24,23,23,23,23,22,22,22,22,21,21,21,21,20,20,20,20,19,19,19,19,18,18,18,18,17,17,17,17,16,16,16,16,15,15,15,15,14,14,14,14,14,13,13,13,13,12,12,12,12,12,11,11,11,11,10,10,10,10,10,9,9,9,9,9,8,8,8,8,8,8,7,7,7,7,7,6,6,6,6,6,6,5,5,5,5,5,5,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,5,5,5,5,5,5,6,6,6,6,6,6,7,7,7,7,7,7,8,8,8,8,8,9,9,9,9,9,10,10,10,10,10,11,11,11,11,11,12,12,12,12,13,13,13,13,13,14,14,14,14,15,15,15,15,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,24,24,25,25,25,25,26,26,26,26,27,27,27,27,28,28,28,29,29,29,29,30,30,30,30,31,31,31,31,32,32,32,33,33,33,33,34,34,34,34,35,35,35,36,36,36,36,37,37,37,37,38,38,38,38,39,39,39,39,40,40,40,40,41,41,41,41,42,42,42,42,43,43,43,43,44,44,44,44,45,45,45,45,45,46,46,46,46,47,47,47,47,47,48,48,48,48,49,49,49,49,49,50,50,50,50,50,51,51,51,51,51,51,52,52,52,52,52,53,53,53,53,53,53,54,54,54,54,54,54,54,55,55,55,55,55,55,55,56,56,56,56,56,56,56,56,57,57,57,57,57,57,57,57,57,58,58,58,58,58,58,58,58,58,58,58,58,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59];
    const bb_val = [28,28,28,28,7,0,0,7,28,16,24,8,1,3,12,2,16,9,11,7,5,7,9,5,26,29,29,13,8,5,9,4,28,28,28,28,6,6,4,4,0,0,0,0,12,6,17,18,0,28,28,0,7,4,4,3,4,20,1,0,11,0,11,10,4,19,14,13,459,0,215,0,28,28,20,20,7,0,0,7];
    const bb_pos = new Uint16Array(100);

    const im_data = [
      [1, 80,1,  0,"#cce","#620"],
      [1, 80,1,155,"#cce","#620"],
      [0,512,1,310,"#ff0","#550"],
      [1, 80,0,465,"#26d","#139"],
      [0,512,1,310,"#f00","#500"]
    ];

    const lo_sine = [25,27,29,30,32,33,35,36,37,39,40,40,41,42,43,44,44,45,46,46,47,48,48,49,50,50,51,51,51,52,52,52,52,52,52,52,52,52,52,52,51,51,50,50,49,49,48,47,46,46,45,44,43,42,40,39,37,35,34,32,29,28,27,25,24,22,21,20,18,17,17,16,15,14,13,13,12,11,11,10,9,9,8,7,7,6,6,6,5,5,5,5,5,5,5,5,5,5,5,6,6,7,7,8,8,9,10,11,11,12,13,14,15,17,18,20,22,23];

    const sp_star1 = [160,68,144,202,124,166,176,452,472,466,32,388,232,160,90,50,228,38,96,288,68,64,432,226,32,102,352,82,306,422,480,494,334,320,292,238,98,416,464,222,6,176,154,102,2,428,328,310,272,96,198,272,46,68,136,402,50,104,18,190,462,422,274,398,454,162,210,430,354,42,302,0,42,320,508,380,170,412,78,180,62,480,122,480,210,138,78,0];
    const sp_star2 = [128,452,400,330,124,230,496,132,120,242,480,4,424,288,58,370,196,422,106,64,164,224,432,322,160,486,128,242,50,70,0,238,110,448,356,78,162,480,400,286,38,240,314,454,130,332,456,86,496,32,294,176,110,324,232,50,434,168,82,62,430,102,402,270,198,322,370,78,226,298,494,288,458,192,92,60,490,28,206,180,446,128,378,0,402,266,430,224];
    const sp_star3 = [160,68,144,202,124,166,176,452,472,466,32,388,232,160,90,50,228,38,96,288,68,64,432,226,32,102,352,82,306,422,480,494,334,320,292,238,98,416,464,222,6,176,154,102,2,428,328,310,272,96,198,272,46,68,136,402,50,104,18,190,462,422,274,398,454,162,210,430,354,42,302,0,42,320,508,380,170,412,78,180,62,480,122,480,210,138,78,0];

    const br_cols = ["#500","#a00","#f00","#a00","#500","#510","#a30","#f80","#530","#a10","#505","#a0a","#f0f","#a0a","#505"];
    const br_back = [
      "#111","#222","#333","#444","#555","#666","#777","#888","#999","#aaa","#bbb","#ccc","#ddd","#eee","#fff","#eee","#ddd","#ccc","#bbb","#aaa","#999","#888","#777","#666","#555","#444","#333","#222","#111",
      "#010","#020","#030","#040","#050","#060","#070","#080","#090","#0a0","#0b0","#0c0","#0d0","#0e0","#0f0","#0e0","#0d0","#0c0","#0b0","#0a0","#090","#080","#070","#060","#050","#040","#030","#020","#010",
      "#110","#220","#330","#440","#550","#660","#770","#880","#990","#aa0","#bb0","#cc0","#dd0","#ee0","#ff0","#ee0","#dd0","#cc0","#bb0","#aa0","#990","#880","#770","#660","#550","#440","#330","#220","#110",
      "#011","#022","#033","#044","#055","#066","#077","#088","#099","#0aa","#0bb","#0cc","#0dd","#0ee","#0ff","#0ee","#0dd","#0cc","#0bb","#0aa","#099","#088","#077","#066","#055","#044","#033","#022","#011",
      "#100","#200","#300","#400","#500","#600","#700","#800","#900","#a00","#b00","#c00","#d00","#e00","#f00","#e00","#d00","#c00","#b00","#a00","#900","#800","#700","#600","#500","#400","#300","#200","#100"
    ];

    let bb_flag = 0;
    let bb_idx1 = 72;
    let bb_idx2 = 72;

    let im_curr = im_data[0];
    let im_wait = 0;
    let im_idx  = 0;
    let im_dir  = 0;
    let im_h    = 0;
    let im_y    = 155;

    let lo_pos = 0;

    let sc_wait  = 0;
    let sc_pos   = 0;
    let sc_step  = 30;
    let sc_speed = 3;
    let sc_copp  = 0;
    let sc_bar1  = 0;
    let sc_bar2  = 31;
    let sc_bar3  = 15;

    let afid = 0;

    setTimeout(initialize, 100);
  }

/*
  Ball Demo
  Kefrens (1989)
  Part 3 of Mega-Demo "Forces of the Pyramids"
  Replay: DOC Soundtracker 2.0
  Christian Corti 2018
*/
  function part3() {

    function initialize() {
      buf1c.width  = 376;
      buf1c.height = 287;
      buf1x.imageSmoothingEnabled = false;

      buf2c.width  = 416;
      buf2c.height = 58;
      buf2x.imageSmoothingEnabled = false;

      setup();

      loop();
    }

    function setup() {
      buf1x.fillStyle = "#000";
      buf1x.fillRect(0,0,376,287);
      buf1x.drawImage(back, 37,15);

      for (let i = 0; i < 96; i++) {
        scroll();
      }

      buf1x.drawImage(buf2c, 13,0,320,58, 37,217,320,58);

      canvx.drawImage(buf1c, 0,0,376,287, 0,0,752,574);

      player.version = 6;

      player.setSample(0,16,487,10);
      player.setSample(1,17,487,10);
      player.play(1);
    }

    function exit() {
      canvc.removeEventListener("click", exit);
      loop = fadeout;
    }

    function jungle() {
      if (fx_pos == 5) {
        loop = fadein;
        player.play();
      } else if (--fx_ctr == 0) {
        fx_ctr = fx_time[++fx_pos];

        player.setSample(2,18,358,20);
        player.setSample(3,18,358,20);
      }

      requestAnimationFrame(loop);
    }

    function fadein() {
      if (--bb_ctr == 0) {
        bb_ctr = 4;
        bb_src += 93;

        if (bb_src == 1023) {
          canvc.addEventListener("click", exit);
          loop = draw;
        }
      }

      draw();
    }

    function fadeout() {
      if (--bb_ctr == 0) {
        bb_ctr = 4;
        bb_src -= 93;

        if (bb_src < 0) {
          canvx.fillStyle = "#000";
          canvx.fillRect(0,0,752,574);

          player.reset();
          setTimeout(loader, 300);
          return;
        }
      }

      draw();
    }

    function draw() {
      buf1x.drawImage(back, 37,15);
      buf1x.fillRect(0,217,376,58);

      ball();
      equalizer();
      scroll();

      buf1x.drawImage(buf2c, (sc_step + 13),0,320,58, 37,217,320,58);

      canvx.drawImage(buf1c, 0,0,376,287, 0,0,752,574);

      requestAnimationFrame(loop);
    }

    function ball() {
      let x = bb_sine[bb_pos++];
      let y = bb_sine[bb_pos++];

      bb_pos += 2;

      if (bb_pos == 720) {
        bb_pos = 0;
      }

      buf1x.drawImage(sprt, bb_src,0,93,94, x,y,93,94);
    }

    function equalizer() {
      const o = player.audioCache;

      if (o.sample[0]) { eq_bar0 = 376; }
      if (o.sample[1]) { eq_bar1 = 376; }
      if (o.sample[2]) { eq_bar2 = 376; }
      if (o.sample[3]) { eq_bar3 = 376; }

      if (eq_bar0 > 0) {
        buf1x.drawImage(sprt, 1116,0,1,12, 0,217,eq_bar0,12);
        eq_bar0 -= 12;
      }

      if (eq_bar1 > 0) {
        buf1x.drawImage(sprt, 1116,0,1,12, 0,232,eq_bar1,12);
        eq_bar1 -= 12;
      }

      if (eq_bar2 > 0) {
        buf1x.drawImage(sprt, 1116,0,1,12, 0,247,eq_bar2,12);
        eq_bar2 -= 12;
      }

      if (eq_bar3 > 0) {
        buf1x.drawImage(sprt, 1116,0,1,12, 0,262,eq_bar3,12);
        eq_bar3 -= 12;
      }
    }

    function scroll() {
      if (sc_wait) {
        sc_wait--;
      } else {
        sc_step += 4;

        if (sc_step == 48) {
          sc_step = 0;

          buf2x.globalCompositeOperation = "copy";
          buf2x.drawImage(buf2c, 48,0,368,58, 0,0,368,58);
          buf2x.globalCompositeOperation = "source-over";

          do {
            let cx = sc_text.charCodeAt(sc_pos);

            if (++sc_pos == sc_len) {
              sc_pos = 0;
            }

            if (cx == 0x20) {
              break;
            } else if (cx == 0xb1) {
              sc_wait = 48;
              continue;
            }

            cx = (cx - 33) * 48;
            buf2x.drawImage(font, cx,0,48,58, 368,0,48,58);
            break;
          } while (true);
        }
      }
    }

    const buf1c = document.createElement("canvas");
    const buf1x = buf1c.getContext("2d", {alpha:false});
    const buf2c = document.createElement("canvas");
    const buf2x = buf2c.getContext("2d");

    const back = new Image();
    const font = new Image();
    const sprt = new Image();

    back.src = "data:image/png;base64,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";
    font.src = "data:image/png;base64,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";
    sprt.src = "data:image/png;base64,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";

    const sc_text = "120289 IS THE RELEASE DATE OF THIS DEMO CALLED \"BALL\" DEMO... ALL CODING BY AXE OF KEFRENS. THIS DEMO WAS FINISHED 24-01-1989 BUT WAS FIRST RELEASED AT THE BAMIGA SECTOR ONE COPY-PARTY IN DENMARK... I AM MOST SORRY THAT I COULD NOT JOIN THE OTHER MEMBERS OF KEFRENS AT THE COPY-PARTY BUT NEXT TIME... AND NOW SOME FACTS ABOUT THIS DEMO AND HOW IT WAS CREATED: ALL CODING AND IDEAS BY AXE OF KEFRENS - THE NICE WIZBALL WAS DRAWN BY JOE OF TSK-CREW - THE NICE PICTURE WAS CREATED BY AN UNKNOWN BUT THANKS ANYWAY - THE FONTS WAS RIPPED FROM A MEGAFORCE DEMO BY AXE AND ALL THE SPECIAL FONTS LIKE !@#$%&*()-+=:;\",.<>/ WAS DRAWN AND ADDED BY AXE - THE GREAT MUSIC IS CALLED \"WEIRD DAY\" AND WAS COMPOSED BY NIGHTLIGHT OF KEFRENS. HE TOLD ME THAT IT WAS A WEIRD DAY WHEN IT WAS COMPOSED - THE SAMPLED SOUND WAS RIPPED FROM \"SWORD OF SODAN\" BY PROMAX OF KEFRENS - AND WHILE WRITING FACTS: ATOMIC TEAM DOES NOT EXIST ANYMORE. ALL SIX MEMBERS HAS JOINED KEFRENS 22-01-1989. BUT DO NOT CRY... KEFRENS WILL STILL PRODUCE DEMOS AND INTROS OF EVEN HIGHER QUALITY IF POSSIBLE!!! THE SIX MEMBERS WHO HAS JOINED KEFRENS ARE: AXE (CODER) - PROMAX (CODER) - MEGABYTE (CODER) - NIGHTLIGHT (MUSICARTIST) - MAGICIAN X (SWAPPER) - LAZER (GRAPHICSARTIST) - FROM NOW ON KEFRENS COUNTS 13 MEMBERS: RAZMO - MELLICA - METALLION - ICU2 - NONAME - THE WHIZ KID - PENTAGRAM - AXE - PROMAX - MEGABYTE - NIGHTLIGHT - MAGICIAN X - LAZER... AND NOW SOME OTHER FACTS: FRONTLINE WAS NEARLY DESTROYED BUT ONE MEMBER ON THE C64 HAS CONTINUED THE GROUP. MAGICIAN X HAD JOINED ATOMIC TEAM AND IS NOW A MEMBER OF KEFRENS. BUT ROYAL SALUTES TO RAZTER OF FRONTLINE FOR HIS GREAT WORK ON THE C64... AND NOW FOR THE GREETINGS. PLEASE NOTICE THAT IN THIS DAY I DID NOT HAVE THE RANK LIST OF KEFRENS SO THE GREETINGS WILL BE FOR THE CONTACTS AND FRIENDS OF ATOMIC TEAM: BAMIGA SECTOR ONE * DDD * DEFJAM * DEXION * DISKBUSTERS * FRONTLINE * HEXAGON * LAZERBRAIN * NORTHERN LIGHTS * PLASMAFORCE * THE FAB FAMILY * TST * ZAXS * AND NO ONE ELSE... SPECIAL GREETINGS TO: DOC (THE SOUNDTRACKER) * MEGAFORCE (THEIR MANY DEMOS) * TRIANGLE, IPEC ELITE, FASHION, BEASTIE BOYS AND EPSILON FOR THEIR GREAT MEGA DEMOS. THIS IS THE END...      ";
    const sc_len  = sc_text.length;

    const bb_sine = [149,15,151,15,153,15,155,15,157,15,159,15,161,15,163,15,165,15,167,15,169,15,171,15,173,16,175,16,177,16,179,16,181,16,182,17,184,17,186,17,188,18,190,18,192,18,194,19,195,19,197,19,199,20,201,20,202,21,204,21,206,21,208,22,209,22,211,23,213,23,214,24,216,24,217,25,219,25,221,26,222,27,224,27,225,28,226,28,228,29,229,30,231,30,232,31,233,32,235,32,236,33,237,34,238,34,240,35,241,36,242,37,243,37,244,38,245,39,246,40,247,40,248,41,249,42,250,43,251,44,252,44,253,45,253,46,254,47,255,48,256,49,256,50,257,50,258,51,258,52,259,53,259,54,260,55,260,56,260,57,261,57,261,58,261,59,262,60,262,61,262,62,262,63,262,64,262,65,262,66,262,66,262,67,262,68,262,69,262,70,262,71,262,72,262,73,261,74,261,75,261,76,260,76,260,77,260,78,259,79,259,80,258,81,258,82,257,83,256,83,256,84,255,85,254,86,254,87,253,88,252,88,251,89,250,90,249,91,248,92,247,92,246,93,245,94,244,95,243,96,242,96,241,97,240,98,239,98,237,99,236,100,235,101,234,101,232,102,231,103,229,103,228,104,227,105,225,105,224,106,222,106,221,107,219,107,218,108,216,109,214,109,213,110,211,110,209,111,208,111,206,112,204,112,203,112,201,113,199,113,197,114,195,114,194,114,192,115,190,115,188,115,186,116,184,116,183,116,181,116,179,117,177,117,175,117,173,117,171,118,169,118,167,118,165,118,163,118,161,118,159,118,157,118,155,118,153,118,151,118,149,119,148,118,146,118,144,118,142,118,140,118,138,118,136,118,134,118,132,118,130,118,128,118,126,117,124,117,122,117,120,117,118,116,116,116,115,116,113,116,111,115,109,115,107,115,105,114,104,114,102,114,100,113,98,113,96,112,95,112,93,112,91,111,90,111,88,110,86,110,85,109,83,109,81,108,80,107,78,107,77,106,75,106,74,105,72,105,71,104,70,103,68,103,67,102,65,101,64,101,63,100,62,99,60,98,59,98,58,97,57,96,56,96,55,95,54,94,53,93,52,92,51,92,50,91,49,90,48,89,47,88,46,88,45,87,45,86,44,85,43,84,43,83,42,83,41,82,41,81,40,80,40,79,39,78,39,77,39,76,38,76,38,75,38,74,37,73,37,72,37,71,37,70,37,69,37,68,37,67,37,66,37,66,37,65,37,64,37,63,37,62,37,61,37,60,38,59,38,58,38,57,39,57,39,56,39,55,40,54,40,53,41,52,41,51,42,50,43,50,43,49,44,48,45,47,46,46,46,45,47,44,48,44,49,43,50,42,51,41,52,40,53,40,54,39,55,38,56,37,57,37,58,36,59,35,61,34,62,34,63,33,64,32,66,32,67,31,68,30,70,30,71,29,73,28,74,28,75,27,77,27,78,26,80,25,82,25,83,24,85,24,86,23,88,23,90,22,91,22,93,21,95,21,97,21,98,20,100,20,102,19,104,19,105,19,107,18,109,18,111,18,113,17,115,17,117,17,118,16,120,16,122,16,124,16,126,16,128,15,130,15,132,15,134,15,136,15,138,15,140,15,142,15,144,15,146,15,148,15];
    const fx_time = [320,200,565,70,88];

    let fx_pos = 0;
    let fx_ctr = fx_time[0];

    let bb_ctr = 6;
    let bb_pos = 0;
    let bb_src = 0;

    let eq_bar0 = 0;
    let eq_bar1 = 0;
    let eq_bar2 = 0;
    let eq_bar3 = 0;

    let sc_wait = 0;
    let sc_pos  = 0;
    let sc_step = 0;

    let loop = jungle;

    setTimeout(initialize, 100);
  }

/*
  Part 4 Demo
  Kefrens (1989)
  Part 4 of Mega-Demo "Forces of the Pyramids"
  Replay: DOC Soundtracker VI
  Christian Corti 2018
*/
  function part4() {

    function initialize() {
      buf1c.width  = 376;
      buf1c.height = 287;
      buf1x.imageSmoothingEnabled = false;

      buf2c.width  = 352;
      buf2c.height = 128;
      buf2x.imageSmoothingEnabled = false;

      buf3c.width  = 352;
      buf3c.height = 16;
      buf3x.imageSmoothingEnabled = false;

      buf4c.width  = 368;
      buf4c.height = 39;
      buf4x.imageSmoothingEnabled = false;

      buf5c.width  = 352;
      buf5c.height = 37;
      buf5x.imageSmoothingEnabled = false;

      setup();
    }

    function setup() {
      for (let i = 0; i < 18; i++) {
        spr_buff[i] = {x:0, y:0};
      }

      for (let i = 0; i < grt_len; i++) {
        grt_code[i] = code1.indexOf(grt_text.charAt(i));
      }

      grt_copp.fill("#000");

      for (let i = 0; i < scr_len; i++) {
        scr_code[i] = code2.indexOf(scr_text.charAt(i));
      }

      back_cols.fill("#000");
      band_cols.fill("#000");

      scr_bplcon.fill(21);
      scr_colors.fill("#000");
      scr_lights.fill(0x000000ff);

      for (let i = 0; i < 37;) {
        scr_bplptr[i] = ++i;
      }

      canvc.addEventListener("click", exit);
      document.addEventListener("flodSync", draw);

      player.version = 3;
      player.play();
    }

    function exit(e) {
      cancelAnimationFrame(afid);
      canvc.removeEventListener("click", exit);
      document.removeEventListener("flodSync", draw);

      player.reset();
      loader();
    }

    function draw() {
      buf1x.drawImage(copp, 0,0,1,287, 0,0,376,287);
      buf1x.drawImage(misc, 49,0,204,21, 95,174,204,21);

      top();
      scroll();
      scrollfx();

      canvx.drawImage(buf1c, 0,0,376,287, 0,0,752,574);

      afid = requestAnimationFrame(draw);
    }

    function background() {
      for (let i = 1; i < 14; i += 2) {
        fade_cols[i] = back_palette[back_ptr++];
      }

      if (back_ptr > 41) { back_ptr = 0; }
    }

    function band() {
      for (let i = 1; i < 14; i += 2) {
        fade_cols[i] = band_palette[back_ptr++];
      }

      if (band_ptr > 41) { band_ptr = 0; }
    }

    function darken() {
      const pix = buf5x.getImageData(0,0,352,37);
      const buf = new DataView(pix.data.buffer);
      const len = buf.byteLength;

      let r = 0;
      let p = 0;

      scr_lights.copyWithin(0,1);
      scr_lights[36] = highlight[high_ptr];

      if (++high_ptr == 48) {
        high_ptr = 0;
      }

      for (let i = 0; i < len; i += 4) {
        let c = buf.getUint32(i);

        if (c == 0xffff00ff) {
          c = 0xddbb00ff;
        } else if (c == 0xeedd00ff) {
          c = 0xccaa00ff;
        } else if (c == 0xeecc00ff) {
          c = 0xcc9900ff;
        } else if (c == 0xddbb00ff) {
          c = 0xbb8800ff;
        } else if (c == 0xccaa00ff) {
          c = 0xbb7700ff;
        } else if (c == 0xcc9900ff) {
          c = 0xaa6600ff;
        } else if (c == 0xbb8800ff) {
          c = 0x996600ff;
        } else if (c == 0xbb7700ff) {
          c = 0x995500ff;
        } else if (c == 0xaa6600ff) {
          c = 0x884400ff;
        } else if (c == 0x996600ff) {
          c = 0x883300ff;
        } else if (c == 0x995500ff) {
          c = 0x773300ff;
        } else if (c == 0x884400ff) {
          c = 0x662200ff;
        } else if (c == 0x883300ff) {
          c = 0x552200ff;
        } else if (c == 0x773300ff) {
          c = 0x441100ff;
        } else if (c == 0xffffccff) {
          c = scr_lights[p];
        }

        if (++r == 352) {
          r = 0;
          p++;
        }

        buf.setUint32(i, c);
      }

      buf5x.putImageData(pix, 0,0);
    }

    function fade() {
      let fx = 0;

      for (let i = 0; i < 14; i += 2) {
        let f = fade_cols[i];
        let c = fade_cols[i + 1];

        let r1 = parseInt(f.charAt(1), 16);
        let g1 = parseInt(f.charAt(2), 16);
        let b1 = parseInt(f.charAt(3), 16);

        let r2 = parseInt(c.charAt(1), 16);
        let g2 = parseInt(c.charAt(2), 16);
        let b2 = parseInt(c.charAt(3), 16);

        if (r1 < r2) {
          r1++;
          fx = 1;
        } else if (r1 > r2) {
          r1--;
          fx = 1;
        }

        if (g1 < g2) {
          g1++;
          fx = 1;
        } else if (g1 > g2) {
          g1--;
          fx = 1;
        }

        if (b1 < b2) {
          b1++;
          fx = 1;
        } else if (b1 > b2) {
          b1--;
          fx = 1;
        }

        fade_cols[i] = "#" + r1.toString(16) + g1.toString(16) + b1.toString(16);
      }

      band_flag = band_cols[6] != "#000";

      return fx;
    }

    function scroll() {
      chr_step -= scr_speed;

      if (chr_step == 0) {
        chr_step = chr_size;

        do {
          let cx = scr_code[scr_pos];

          if (++scr_pos == scr_len) {
            scr_pos = 0;
          }

          if (cx > 47) {
            switch (cx) {
              case 48:
                if (flip_flag == 0 && stop_flag == 0) {
                  flip_flag = 1;
                  flip_ptr = 3799;
                  flip_dir = 1;
                }
                break;
              case 49:
                if (flip_flag == 0 && stop_flag == 0) {
                  flip_flag = 1;
                  flip_ptr = 0;
                  flip_dir = 1;
                }
                break;
              case 50:
                if (fade_flag == 0) {
                  for (let i = 1; i < 14; i += 2) {
                    back_cols[i] = "#000";
                  }

                  fade_cols = back_cols;
                  fade_flag = 1;
                  back_flag = 1;
                }
                break;
              case 51:
                if (fade_flag == 0) {
                  fade_cols = back_cols;
                  fade_flag = 1;
                  back_flag = 1;
                  background();
                }
                break;
              case 52:
                if (stop_flag) {
                  refl_flag = 1;
                  refl_dir = -1;
                  refl_max = 31
                  stop_flag = 0;
                }
                break;
              case 53:
                if (stop_flag == 0 && flip_flag == 0) {
                  refl_flag = 1;
                  refl_dir = 1;
                  refl_max = 65;
                  stop_flag = 1;
                }
                break;
              case 54:
                if (fade_flag == 0) {
                  for (let i = 1; i < 14; i += 2) {
                    band_cols[i] = "#000";
                  }
                  fade_cols = band_cols;
                  fade_flag = 1;
                }
                break;
              case 55:
                if (fade_flag == 0) {
                  fade_flag = 1;
                  fade_cols = band_cols;
                  band();
                }
                break;
              case 56:
                if (sine_flag == 0 && elas_flag == 0) {
                  sine_ptr = 123;
                  sine_flag = 1;
                  sine_dir = 1;
                }
                break;
              case 57:
                if (sine_flag == 0 && elas_flag == 0) {
                  sine_ptr = 0;
                  sine_flag = 1;
                  sine_dir = 1;
                }
                break;
              case 58:
                if (sine_flag == 0) {
                  elas_flag = 1;
                }
                break;
              case 59:
                if (sine_flag == 0 && elas_flag == 0) {
                  sine_ptr = 246;
                  sine_flag = 1;
                  sine_dir = 1;
                }
                break;
              case 60:
                chr_step = 80;
                chr_size = 80;
                scr_blit = 0;
                scr_speed = 1;
                break;
              case 61:
                chr_step = 40;
                chr_size = 40;
                scr_blit = 1;
                scr_speed = 1;
                break;
              case 62:
                chr_step = 40;
                chr_size = 40;
                scr_blit = 2;
                scr_speed = 2;
                break;
              case 63:
                chr_step = 40;
                chr_size = 40;
                scr_blit = 4;
                scr_speed = 4;
                break;
              case 64:
                chr_step = 40;
                chr_size = 40;
                scr_blit = 8;
                scr_speed = 8;
                break;
            }
          } else {
            chr_ptr = cx * 40;
            break;
          }
        } while (1);

        buf4x.drawImage(font2, chr_ptr,0,8,37, 352,1,8,37);
        chr_ptr += 8;
      } else if (chr_step == 8 || chr_step == 16 || chr_step == 24 || chr_step == 32) {
        buf4x.drawImage(font2, chr_ptr,0,8,37, 352,1,8,37);
        chr_ptr += 8;
      }

      buf4x.globalCompositeOperation = "copy";
      buf4x.drawImage(buf4c, scr_blit,1,360,37, 0,1,360,37);
      buf4x.globalCompositeOperation = "source-over";
    }

    function scrollfx() {
      let dark = 0;

      if (sine_flag) {
        if (!sine_dir && --sine_ctr == 0) {
          sine_flag = 0;
          sine_ctr = 40;
        } else {
          scr_bplcon.copyWithin(1,0);
          scr_bplcon[0] = 21 + sine_data[sine_ptr + sine_pos];

          if (sine_dir && ++sine_pos == 123) {
            sine_dir = 0;
            sine_pos = 0;
          }
        }
      }

      if (flip_flag && !stop_flag) {
        let ptr = flip_ptr + flip_pos;

        for (let i = 0; i < 37; i++) {
          scr_bplptr[i] = flip_data[ptr++];
        }

        if (--flip_wait == 0) {
          flip_wait = 10;

          if (flip_dir) {
            if (++flip_add > 8) {
              flip_add = 0;
              flip_dir = 0;
            }
          }
        }

        flip_pos += flip_step[flip_add];

        if (flip_pos > 3798) {
          flip_pos = 0;

          if (!flip_dir) {
            flip_flag = 0;
          }
        }

        if (flip_pos > 950 && flip_pos < 2850) {
          dark = 1;
        }
      }

      if (fade_flag) {
        if (--fade_ctr == 0) {
          fade_flag = fade();
          fade_ctr = 8;
        }
      }

      if (back_flag) {
        for (let i = 0; i < 37; i++) {
          scr_colors[i] = back_cols[back_rows[i]];
        }
      }

      if (band_flag) {
        let r1 = band_sine[band_pos1];
        let r2 = (band_sine[band_pos2] >> 1) + 7;

        for (let i = 0; i < 14; i += 2) {
          let col = band_cols[i];
          scr_colors[r1++] = col;
          scr_colors[r2++] = col;
        }

        band_pos1 += 1;
        if (band_pos1 >= 90) { band_pos1 = 0; }

        band_pos2 += 2;
        if (band_pos2 >= 90) { band_pos2 -= 90; }
      }

      if (refl_flag) {
        let pos = 1;
        let add = 1;

        for (let i = 0; i < 37; i++) {
          let ptr = (pos * refl_skip) >> 5;

          if (ptr > 37) {
            add = -1;
            ptr = 38;
          }

          pos += add;
          scr_bplptr[i] = ptr;
        }

        refl_skip += refl_dir;

        if (refl_skip == refl_max) {
          refl_flag = 0;
        }
      }

      if (elas_flag) {
        for (let i = 0; i < 37; i++) {
          scr_bplcon[i] = 21 + ((elas_rows[i] * elas_amp) >> 4);
        }

        if (++elas_pos > 117) {
          elas_flag = 0;
          elas_pos = 0;
        }

        elas_amp = elas_data[elas_pos];
      }

      if (dark) {
        buf5x.clearRect(0,0,352,37);

        for (let i = 0; i < 37; i++) {
          buf1x.fillStyle = scr_colors[i];
          buf1x.fillRect(0,(230 + i),376,1);
          buf5x.drawImage(buf4c, 0,scr_bplptr[i],352,1, scr_bplcon[i],i,352,1);
        }

        darken();
        buf1x.drawImage(buf5c, 0,230);
      } else {
        for (let i = 0; i < 37; i++) {
          buf1x.fillStyle = scr_colors[i];
          buf1x.fillRect(0,(230 + i),376,1);
          buf1x.drawImage(buf4c, 0,scr_bplptr[i],352,1, scr_bplcon[i],(230 + i),352,1);
        }

        scr_lights.copyWithin(0,1);
        scr_lights[36] = highlight[high_ptr];

        if (++high_ptr == 48) {
          high_ptr = 0;
        }

        const pix = buf1x.getImageData(21,230,352,37);
        const buf = new DataView(pix.data.buffer);
        const len = buf.byteLength;

        let r = 0;
        let p = 0;

        for (let i = 0; i < len; i += 4) {
          if (buf.getUint32(i) == 0xffffccff) {
            buf.setUint32(i, scr_lights[p]);
          }

          if (++r == 352) {
            r = 0;
            p++;
          }
        }

        buf1x.putImageData(pix, 21,230);
      }
    }

    function sort(a, b) {
      return b.y - a.y;
    }

    function top() {
      buf2x.clearRect(0,0,352,128);

      let dy = 46;
      let sy = (((spr_y[logo_pos] - 135) * logo_amp) >> 8) + 135;

      for (let i = 0; i < 128; i++) {
        buf1x.drawImage(logo, 0,sy,352,1, 21,dy++,352,1);
        buf2x.drawImage(logo, 352,sy,352,1, 0,i,352,1);
        sy += logo_skip[i];
      }

      buf2x.globalCompositeOperation = "source-in";
      buf2x.drawImage(copp, 1,0,1,128, 0,0,352,128);
      buf2x.globalCompositeOperation = "source-over";

      buf1x.drawImage(buf2c, 21,46);

      logo_pos += 12;

      if (logo_pos > 720) { logo_pos -= 720; }

      if (--logo_int == 0) {
        logo_int = 5;

        if (logo_amp == logo_max) {
          logo_max =  0;
          logo_dir = -1;
        }

        logo_amp += logo_dir;

        if (logo_amp == 0) {
          logo_max = 230;
          logo_dir = 1;
          logo_int = 400;
        }
      }

      if (grt_state == 10) {
        if (--grt_frame < 0) {
          grt_frame = 2;

          grt_copp.copyWithin(0,1,8);
          grt_copp.copyWithin(9,8);
          grt_copp.fill(grt_data[grt_cols1],7,9);

          buf3x.globalCompositeOperation = "source-atop";

          for (let i = 0; i < 16; i++) {
            buf3x.fillStyle = grt_copp[i];
            buf3x.fillRect(0,i,352,1);
          }

          buf3x.globalCompositeOperation = "source-over";

          if (++grt_cols1 == grt_cols2) {
            grt_state = 11;
          }
        }
      } else if (grt_ready == 1) {
        if (--grt_pause == 0) {
          grt_state = 10;
          grt_ready = 0;
          grt_cols2 += 23;
        }
      } else {
        if (grt_pos == 0) {
          buf3x.clearRect(0,0,352,16);
        }

        let cx = grt_code[grt_ptr + grt_pos] * 16;
        let dx = grt_pos * 16;

        buf3x.drawImage(font1, cx,0,16,16, dx,0,16,16);

        if (grt_pos++ == 20) {
          grt_ptr += 21;
          grt_pos = 0;

          grt_state = 10;
          grt_ready = 1;
          grt_pause = 140;

          cx = grt_code[grt_ptr - 1];

          if (cx == 59) {
            grt_cols1 = grt_pal1;
            grt_cols2 = grt_pal2;
          } else if (cx == 60) {
            grt_cols1 = grt_pal3;
            grt_cols2 = grt_pal4;
          } else {
            grt_cols1 = grt_pal5;
            grt_cols2 = grt_pal6;
          }

          if (grt_ptr >= grt_len) {
            grt_ptr = 0;
          }
        }
      }

      buf1x.drawImage(buf3c, 0,0,352,16, 37,198,352,16);

      let x = spr_posx;
      let y = spr_posy;

      for (let i = 0; i < 18; i++) {
        let c = spr_buff[i];
        c.x = spr_x[x];
        c.y = spr_y[y];

        x += 700;
        if (x > 720) { x -= 720; }

        y += 30;
        if (y > 720) { y -= 720; }
      }

      spr_buff.sort(sort);

      for (let i = 0; i < 18; i++) {
        let c = spr_buff[i];
        buf1x.drawImage(misc, 33,23,16,17, (c.x + 61),(c.y - 26),16,17);
      }

      buf1x.drawImage(misc, 0,0,33,40, (spr_x[x] + 53),(spr_y[y] - 40),33,40);

      spr_posx += 3;
      if (spr_posx > 720) { spr_posx -= 720; }

      spr_posy += 5;
      if (spr_posy > 720) { spr_posy -= 720; }
    }

    const buf1c = document.createElement("canvas");
    const buf1x = buf1c.getContext("2d", {alpha:false});
    const buf2c = document.createElement("canvas");
    const buf2x = buf2c.getContext("2d");
    const buf3c = document.createElement("canvas");
    const buf3x = buf3c.getContext("2d");
    const buf4c = document.createElement("canvas");
    const buf4x = buf4c.getContext("2d");
    const buf5c = document.createElement("canvas");
    const buf5x = buf5c.getContext("2d");

    const copp  = new Image();
    const font1 = new Image();
    const font2 = new Image();
    const logo  = new Image();
    const misc  = new Image();

    copp.src  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAEfCAIAAADk64CCAAAAnklEQVQ4y+3RwRFAMBCF4TfpYFvQAq1QgrSgBC1ECbRCCWrYEjgkDpkxyca6cfrG+B8ZDIAKMADoji1xL2YRl4GpdBAz6OYxnWpOCbYmmwQWkpaBCf4qhqUM4pLWbNJx4dsv5mzSyB82PjsEPNx7WEwrLdc6kew4DMD+/xUzP9zdMurmfemgFZd1PsGPCiLSYK39+hd0zgEwzKzhlbOc4jGgPS74c7YAAAAASUVORK5CYII=";
    font1.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA8AAAAAQAQMAAADjzoRqAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAABHdJREFUOMt11dkPzEAYAPBvWoxzPhaJsDqI+w5xprZLSByJW3hxZYUXbD1poraVuJ5ciTdhH/gThHhR8YD/QJCoSHjCxIslNfXNdIU4+qVzfN3d33T22y4E2kbR7z1UkAQ8oPwfwW2L1JfYc7NAywLipAx0QvNAgzl6sJxTx/NAY8YVgJuH4EOTubnbY1l9OADQ3B5JaUP3e5QKqE0o/0fw6jr1hPHMtFBU1yT1QAdToNwMABXlclpYOnycgH2wXDiTxHBMxwC9Lj0MIwcA/AlwC3v/hWUFy8zMmIXNvILdHHJGsOxRTjUaLBt9lqWn0wEjne64QTKtD986EGAN1OsAEKIN2e+5B6BCP6T8H8Ft26AeOoHMYhlJtwgh4hH6XoQG5imxuYFj6asIWTbDgeapfNF0pzvy/DQYM3zr7trtNTB0JgAc5zaw3/OJOXw8Hh2HNo1/RetJfxQf5wf8CGUWYYj8VQhEe8tFyA0s4Ccc4fIwQjef78CkZWrDM6e7dMlKmFLbfsds9ZD1Fq7Q+b/DiuDL7X/A7V4bD0T0kQSDhzcMDL7vVfA4cFMILUx37Htuvp41R/LezutOd/rdBiyt7Vo34EqQD3lqVslRC2oF2OAsB4G5AHyNFyhrA8HN+iOFt0CFnEqINlrWqSg1RLKothosjAUqRsXl+YMWbmXhYFas2Ox05x1L0g3ztp+r3XZg0MIKLgyIOXENLC2cEVziE6LQnKh/wjznmuUWTtyiUTelBcpU9S9YalRuKT+3T414vpUNHwDamdR5OGdDcmn15G0DWebAwK0ABtAWVqhE8gsWJb6nbGlOLH/BbuFmBmba1fF/YHqVDsqTXwZfbLLZDiQDRq5+NGlYR+6dt//7/u9Os37DwgL/gnPKnBRfLHwES/4TnoGK9XhqYN4DJA4jZLnvBb/BSEtz8zhIyvFzmwOnORAM3Lb/9OTxHdla3GR0x1OnTKlgbmCxkKJdfcdCUWaGSAjWBGtAAyOKk7IHCrkpLpkDJ5iH9I4Igf+CAVhKxecl5YSjzYGjLkO79Xb1oyPX/JetaVu+1m5Dze5Pv4Cw4g18QIjI5gKbOyKiA9zA/KYoGzEoz8JBGvZhQn7C1c/JHlFw4smqfZOGbroK9/aM6DxcU1v1qTVr68ABV+AMa1oYzSHthqOBQ0/4iIRKagHbwg8JQnQLLOMGKB87gZslQFwd0CwiliH+DrOUpXF58HEnmFSrvWEfFnxzumuWrnrXWrzjHKSw9idcVkFIaeBEC89+AWhzoaBNI7hkPXwdSVDmEYnKlpUtLp7ZcQYHAKpHppvRwr4xyo88tHEdPBi70+muneo/32t/TsAs7KFlNZYe0IkuwR6akcdtLvGQPjzFEhReDpFVsG37cGqe1Sy3m6zcPhwol+bDx41psU9D7zuTmlN9b/Xk7ecAYCSk1MYNrrnGgusY6GxgFhQxNyPbAn8Y80BLugYHkIfIaWHYM7AsCNaB5qksAs1yQ9q/RbvVsv+3GDXgBc/pdgofGrR3hA4w8A95LGdD28PgoQAAAABJRU5ErkJggg==";
    font2.src = "data:image/png;base64,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";
    logo.src  = "data:image/png;base64,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";
    misc.src  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP0AAAAoCAMAAAACGAxSAAAAQlBMVEUAAAAAAAC7u7uIiIiZZgCqZgB3d3e7iADMqgBERETduwDd3d2ZVQDMzMyIRACqAACIMwDu3QD/AAB3MwAAAKpmMwC4n9kzAAAAAXRSTlMAQObYZgAAAx9JREFUaN7cWItuwjAMDAkV1YLQEOX/f3W2G9dtT7MpFZ2026jv8jg40qZAmuOkSJ/B85n+FvD8EP1zb8AjPR7pMDwY6yYn++b834K0ATZ4r3s8uVnMm5zwW+PfbrexpNcBY3e4+7MnZnDO+s3xr9eJmVBybRW4Eu2I3X1D9MDngeFh+Dj+ea3OAhZcmBlnsp5kg0J3NAw8pNE42oh8P33XLSXBuByXXIbAqM51dwwjD+uB12Wyc8L78S9rfTFq2vikjDu4gGIXMLw4DoSxgo3pt9P3qJX1/OiBiyKYcN1xZK8cDH0ntMGrPufMRXkU/8uIHFUTZSDXoYtxsbsK5YzXPOB1acX0pVDi0iILL376u9a7SmsADuquLbG7DVIee6DR0sageTWxijyK6E2dF2XAYYytQ+xu5xFzxyNeepw3O9VzS8/l1/RyHUtRriIZBS4KWR+742WPHuiCfWajurf0DMnNB2ftec+ctlPmsPkChz2XH8pjd5tnPIEH2Ghxt/wyrX2LX8qkGMW5HysxqYIOwKV2OsE6Qnc0jD2gD5oEtbTwg6w6/5EgNS5+qd5nMan4yYwBvAkYFLujoe9hfWFTrZX3uVPNA+cft75hyFV2Aer1P4dT2YVD3RGVlrelJ4xnwaDpK/2739ZuVPbheHeMT+lrzu1Oz1dCpTYnPH9blmPah8PdMf2p8qVOKLPbPjdxl/PbiTz24Wh3RJH0hZAVLCR9ceY9CWkfjndHlKo3fKkmakn/Hz/l11EKwyAQBFB1QViKCN7/sF1nHWxoTzCdgPl+OGvM+eIbyLAbv/blD8L/HIaj/9CPIhr+20zGeM39B305+MXMlvxPfC+qIf5V8ZCfbOp1K5D6kFu1WB/67ljzNbzoBWf+XC2P/zVLa8AftztX19TXrTfobU1rFXryOxdF/Oaj+giKD/zVR9xl9aW24Oexh6m/+LHlbL9k80Of/Ajx1KPw3Hrdzed9J/A/9F1aX6qFH7F28Lf5Ofmyzd96sy23SOrJd4ded+yTDzp7f/Uj2OJbDz5C/IMvjwf/4m8w+fL44EeA//YrXnLfu1wlATGGOi4AAAAASUVORK5CYII=";

    const code1 = "abcdefghijklmnopqrstuvwxyz0123456789.,'()-!?&KABTPMSRDFCEGH\xb9\xb2\xb3 ";
    const code2 = "abcdefghijklmnopqrstuvwxyz1234567890.,!?&-()KEB OPQRSTUVWXYZ\xbb\xb9\xb2\xb3\xa2";

    const logo_skip = [4,3,3,3,3,3,2,2,2,2,2,2,2,2,1,2,1,2,1,2,1,2,1,1,2,1,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,2,1,2,1,2,1,2,1,2,2,2,2,2,2,2,2,2,3,3,3,3,4];

    const spr_x = [255,255,255,255,255,255,255,255,255,255,255,254,254,254,254,254,254,254,253,253,253,253,253,252,252,252,252,251,251,251,251,250,250,250,249,249,249,248,248,248,247,247,247,246,246,245,245,244,244,244,243,243,242,242,241,241,240,240,239,238,238,237,237,236,236,235,234,234,233,233,232,231,231,230,229,229,228,227,227,226,225,224,224,223,222,222,221,220,219,218,218,217,216,215,214,214,213,212,211,210,209,209,208,207,206,205,204,203,202,202,201,200,199,198,197,196,195,194,193,192,191,190,189,188,187,186,185,184,183,182,181,180,179,178,177,176,175,174,173,172,171,170,169,168,167,166,165,164,163,162,160,159,158,157,156,155,154,153,152,151,150,149,147,146,145,144,143,142,141,140,139,138,136,135,134,133,132,131,130,129,127,126,125,124,123,122,121,120,119,117,116,115,114,113,112,111,110,109,108,106,105,104,103,102,101,100,99,98,97,96,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60,59,58,57,56,55,54,53,53,52,51,50,49,48,47,46,46,45,44,43,42,41,41,40,39,38,37,37,36,35,34,33,33,32,31,31,30,29,28,28,27,26,26,25,24,24,23,22,22,21,21,20,19,19,18,18,17,17,16,15,15,14,14,13,13,12,12,11,11,11,10,10,9,9,8,8,8,7,7,7,6,6,6,5,5,5,4,4,4,4,3,3,3,3,2,2,2,2,2,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,2,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,10,10,11,11,11,12,12,13,13,14,14,15,15,16,17,17,18,18,19,19,20,21,21,22,22,23,24,24,25,26,26,27,28,28,29,30,31,31,32,33,33,34,35,36,37,37,38,39,40,41,41,42,43,44,45,46,46,47,48,49,50,51,52,53,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,95,96,97,98,99,100,101,102,103,104,105,106,108,109,110,111,112,113,114,115,116,117,119,120,121,122,123,124,125,126,127,129,130,131,132,133,134,135,136,138,139,140,141,142,143,144,145,146,147,149,150,151,152,153,154,155,156,157,158,159,160,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,202,203,204,205,206,207,208,209,209,210,211,212,213,214,214,215,216,217,218,218,219,220,221,222,222,223,224,224,225,226,227,227,228,229,229,230,231,231,232,233,233,234,234,235,236,236,237,237,238,238,239,240,240,241,241,242,242,243,243,244,244,244,245,245,246,246,247,247,247,248,248,248,249,249,249,250,250,250,251,251,251,251,252,252,252,252,253,253,253,253,253,254,254,254,254,254,254,254,255,255,255,255,255,255,255,255,255,255,255];
    const spr_y = [127,128,128,129,129,130,130,131,132,132,133,133,134,134,135,135,136,137,137,138,138,139,139,140,141,141,142,142,143,143,144,144,145,145,146,147,147,148,148,149,149,150,150,151,151,152,152,153,153,154,154,155,155,156,157,157,158,158,159,159,160,160,160,161,161,162,162,163,163,164,164,165,165,166,166,167,167,167,168,168,169,169,170,170,170,171,171,172,172,173,173,173,174,174,175,175,175,176,176,176,177,177,178,178,178,179,179,179,180,180,180,181,181,181,182,182,182,182,183,183,183,184,184,184,184,185,185,185,185,186,186,186,186,187,187,187,187,187,188,188,188,188,188,189,189,189,189,189,189,190,190,190,190,190,190,190,191,191,191,191,191,191,191,191,191,191,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,191,191,191,191,191,191,191,191,191,191,190,190,190,190,190,190,190,189,189,189,189,189,189,188,188,188,188,188,187,187,187,187,187,186,186,186,186,185,185,185,185,184,184,184,184,183,183,183,182,182,182,182,181,181,181,180,180,180,179,179,179,178,178,178,177,177,176,176,176,175,175,175,174,174,173,173,173,172,172,171,171,170,170,170,169,169,168,168,167,167,167,166,166,165,165,164,164,163,163,162,162,161,161,160,160,159,159,159,158,158,157,157,156,155,155,154,154,153,153,152,152,151,151,150,150,149,149,148,148,147,147,146,145,145,144,144,143,143,142,142,141,141,140,139,139,138,138,137,137,136,135,135,134,134,133,133,132,132,131,130,130,129,129,128,128,127,126,126,125,125,124,124,123,122,122,121,121,120,120,119,119,118,117,117,116,116,115,115,114,113,113,112,112,111,111,110,110,109,109,108,107,107,106,106,105,105,104,104,103,103,102,102,101,101,100,100,99,99,98,97,97,96,96,95,95,94,94,94,93,93,92,92,91,91,90,90,89,89,88,88,87,87,87,86,86,85,85,84,84,84,83,83,82,82,81,81,81,80,80,79,79,79,78,78,78,77,77,76,76,76,75,75,75,74,74,74,73,73,73,72,72,72,72,71,71,71,70,70,70,70,69,69,69,69,68,68,68,68,67,67,67,67,67,66,66,66,66,66,65,65,65,65,65,65,64,64,64,64,64,64,64,63,63,63,63,63,63,63,63,63,63,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,63,63,63,63,63,63,63,63,63,63,64,64,64,64,64,64,64,65,65,65,65,65,65,66,66,66,66,66,67,67,67,67,67,68,68,68,68,69,69,69,69,70,70,70,70,71,71,71,72,72,72,72,73,73,73,74,74,74,75,75,75,76,76,76,77,77,78,78,78,79,79,79,80,80,81,81,81,82,82,83,83,84,84,84,85,85,86,86,87,87,87,88,88,89,89,90,90,91,91,92,92,93,93,94,94,94,95,95,96,96,97,97,98,99,99,100,100,101,101,102,102,103,103,104,104,105,105,106,106,107,107,108,109,109,110,110,111,111,112,112,113,113,114,115,115,116,116,117,117,118,119,119,120,120,121,121,122,122,123,124,124,125,125,126,126,127];

    const spr_buff = new Array(18);

    const grt_text = "B first of all to  B\xb3members of KkefrensK\xb9 F and welcome to D \xb3the new members from\xb2atomicAteam & defcon\xb9E salutes also to  E\xb3M      subway      M\xb9B  and dream team  B\xb9B      rebels      B\xb9D northstar & flt. D\xb3S    tsk & acc.    R\xb9F     the band     F\xb9D     pirahnas     M\xb2H      cosmos      H\xb9E   the silents.   E\xb2H    mad monks.    H\xb9C bamiga sector 1. C\xb9K    the agents    K\xb2B     trilogy.     B\xb9M      dexion      M\xb9D the supply team. D\xb3D   plasma force   D\xb9D    lightmann     D\xb2Coutlaws  (the end)B\xb3F and lots a more  E\xb2H   great people   M\xb9   sorry to those   \xb2      we forgot     \xb3                    \xb3   KABTPMSRDFCEGH   \xb9                     ";
    const grt_code = [];
    const grt_len  = grt_text.length;
    const grt_copp = new Array(16);

    const grt_data = [
      "#000","#111","#222","#333","#444","#555","#666","#777","#888","#999","#aaa","#bbb","#ccc","#ddd","#eee","#fff",
      "#fff","#eee","#ddd","#ccc","#bbb","#aaa","#999","#888","#777","#666","#555","#444","#333","#222","#111","#000",
      "#000","#000","#000","#000","#000","#000","#000",
      "#000","#100","#210","#420","#620","#730","#840","#950","#960","#a60","#b70","#b80","#c90","#ca0","#db0","#ec0",
      "#ec0","#db0","#ca0","#c90","#b80","#b70","#a60","#960","#950","#840","#730","#620","#420","#210","#100","#000",
      "#000","#000","#000","#000","#000","#000","#000",
      "#000","#011","#012","#023","#024","#035","#036","#047","#048","#059","#05a","#06b","#06c","#07d","#07e","#08f",
      "#08f","#07e","#07d","#06c","#06b","#05a","#059","#048","#047","#036","#035","#024","#023","#012","#011","#000",
      "#000","#000","#000","#000","#000","#000","#000"
    ];

    const grt_pal1 = 0;
    const grt_pal2 = 16;
    const grt_pal3 = 39;
    const grt_pal4 = 55;
    const grt_pal5 = 78;
    const grt_pal6 = 94;

    const scr_text = "      \xa2allright you\xb3 dudes!!  here is \xa2metallioRn\xbbXO \xb9 \xb2o\xb3f\xa2  ( KE V)W \xbb \xb9 \xb2h\xb3eading down at yourX Tcommy.... with a newZS demo for the\xa2   bs1   R\xbbY \xa2 & warfalconsR\xbbY \xb9-\xb2p\xb3arty 11.feb-89V.... i just wanna tell ya, that if your out for B golden B regards B, look in the fade-scrolly above.. & if your looking for crazy writing, just keep on hanging your eyes at thisZ pixel-mover.. cos this piece gonna contain lots a shit from members of BkefrensPB.  i aint in the mood for writing long scrollys right now, so i we give the amiga to mellica       yeah this is mellica of KE typing a little crazy text for you......  ok lets give the scroll some lifeO he he this was the first one, you wanna see the next? ... ... ... i could not hear you ... okey look hereU ohhh what effect ... here is a nother oneQ oh it is so clean now....   T yeah this is great, now you can read it better, but what about the color bars...Slets get them backRV ok.....  Pnow some special hellos of mineV ... .... the amiga freakY and qrd of trilogyV and also toVY liteace of dexion........    i think i will give the keybordO to the whiz kid of kefrensWVR so here you  go.........  thank you mellicaaaaa    ohhh was that mellica well thank you anyway.!!!!   i find it rather hard to come up with any ideas for something to write, but i will try..!! how about trying out all those special features in this awesome scroller which by the way was written by the one and only: metallion of   ( KE V) W  now i will proceed with the promised showing off with the special features.....!!! watch O and another P ,Q coooooolR T cooooler   S Ubars out  V new bars on, and another cool feature W and here it is       stop   \xbbY \xb3and zizakZ the speeds are of course also controlled by the scroll, but i think it is enough for now so i will return to the normal bullshit text...!!!       check the great greetings above the chars were drawn by me, the snake-looking thing flying around upthere is by mellica these chars are by icu2, and improved by metallion, of course was the great coding done by metallion, i wont write any  greetz to contacts coz i have got so little time to write this demo and all the others must be finished soon, so we can put em on a disk and turn them in...!!!!!, so byyyeeee from the whiz kid of    KE   Y  so we will all be seeing  each other in another product from kefrens, over and out..!!       the next few lines will be written by some great fellows by Tsubway & Wdream-team........    yo hello and a good day to you, here is... P  subway  and the  P dream team speaking to all you crazy computer freaks in Phappy denmark.....        at first of all we like to say hi to our partners in Paustria...    and second a big hi to all the computer sharks in Pkefrens...    for us it was a fucking long train trip to join this party, but nevermind we dont die on it....      Plets make fun !!! well what about some golden regards from Psubway and the  dream team.....      okay, here they are...     hi to : Pkefrens, Pmegaforce, Pthe band, Ptrilogy, Pvision factory and the beyonders, Pworld of wonders, Pinv. crime, Pmad monks and all we know...      have a nice day and see ya later!               ";
    const scr_code = [];
    const scr_len  = scr_text.length;

    const sine_data = [0,0,-1,-1,-1,-2,-2,-3,-3,-4,-4,-5,-5,-6,-6,-7,-7,-7,-7,-8,-8,-8,-8,-8,-8,-8,-8,-7,-7,-7,-7,-6,-6,-5,-5,-4,-4,-3,-3,-2,-1,-1,0,1,1,2,2,3,4,4,5,5,5,6,6,6,7,7,7,7,7,7,7,7,7,7,6,6,6,5,5,5,4,4,3,2,2,1,1,0,0,-1,-1,-2,-3,-3,-4,-4,-5,-5,-6,-6,-7,-7,-7,-7,-8,-8,-8,-8,-8,-8,-8,-8,-7,-7,-7,-7,-6,-6,-5,-5,-4,-4,-3,-3,-2,-2,-1,-1,-1,0,0,0,-1,0,-1,1,-2,1,-2,2,-3,3,-4,4,-5,5,-6,6,-7,6,-7,7,-8,7,-8,7,-8,7,-8,6,-7,6,-7,5,-6,4,-5,3,-4,2,-3,0,-1,-1,0,-2,1,-3,2,-4,3,-5,4,-6,5,-7,6,-8,7,-8,7,-8,7,-8,7,-8,7,-7,6,-6,5,-6,5,-5,4,-4,3,-2,1,-1,0,-1,1,-2,2,-3,3,-4,4,-5,5,-6,6,-7,6,-7,7,-8,7,-8,7,-8,7,-8,6,-7,6,-7,5,-6,4,-5,3,-4,2,-3,2,-2,0,-1,0,-1,0,0,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,0,0];
    const sine_rows = new Int8Array(38);

    const flip_data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,2,3,4,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,34,35,36,37,2,3,4,5,6,7,8,9,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,29,30,31,32,33,34,35,36,37,2,3,4,5,6,7,8,9,10,11,12,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,26,27,28,29,30,31,32,33,34,35,36,37,3,4,5,5,6,7,8,9,10,11,12,13,14,14,15,16,17,18,19,20,21,22,23,24,24,25,26,27,28,29,30,31,32,33,33,34,35,36,3,4,5,6,7,8,8,9,10,11,12,13,14,15,15,16,17,18,19,20,21,22,23,23,24,25,26,27,28,29,30,30,31,32,33,34,35,36,4,5,5,6,7,8,9,10,11,11,12,13,14,15,16,16,17,18,19,20,21,22,22,23,24,25,26,27,27,28,29,30,31,32,33,33,34,35,4,5,6,7,8,8,9,10,11,12,13,13,14,15,16,17,17,18,19,20,21,21,22,23,24,25,25,26,27,28,29,30,30,31,32,33,34,34,5,6,7,7,8,9,10,11,11,12,13,14,14,15,16,17,17,18,19,20,21,21,22,23,24,24,25,26,27,27,28,29,30,31,31,32,33,34,6,7,7,8,9,10,10,11,12,12,13,14,15,15,16,17,18,18,19,20,20,21,22,23,23,24,25,26,26,27,28,28,29,30,31,31,32,33,7,7,8,9,9,10,11,11,12,13,14,14,15,16,16,17,18,18,19,20,20,21,22,22,23,24,24,25,26,27,27,28,29,29,30,31,31,32,8,8,9,9,10,11,11,12,13,13,14,15,15,16,16,17,18,18,19,20,20,21,22,22,23,23,24,25,25,26,27,27,28,29,29,30,30,31,8,9,10,10,11,11,12,13,13,14,14,15,15,16,17,17,18,18,19,20,20,21,21,22,23,23,24,24,25,25,26,27,27,28,28,29,30,30,9,10,10,11,11,12,13,13,14,14,15,15,16,16,17,17,18,18,19,20,20,21,21,22,22,23,23,24,24,25,25,26,27,27,28,28,29,29,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,11,12,12,13,13,13,14,14,15,15,16,16,16,17,17,18,18,19,19,19,20,20,21,21,22,22,22,23,23,24,24,25,25,25,26,26,27,27,12,13,13,13,14,14,15,15,15,16,16,16,17,17,18,18,18,19,19,19,20,20,20,21,21,22,22,22,23,23,23,24,24,25,25,25,26,26,13,14,14,14,15,15,15,16,16,16,17,17,17,17,18,18,18,19,19,19,20,20,20,21,21,21,21,22,22,22,23,23,23,24,24,24,25,25,15,15,15,15,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,19,20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,16,16,16,16,16,17,17,17,17,17,18,18,18,18,18,18,19,19,19,19,19,20,20,20,20,20,20,21,21,21,21,21,22,22,22,22,22,23,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,18,18,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,18,18,18,18,18,18,18,18,18,18,18,18,21,21,21,21,21,21,21,20,20,20,20,20,20,20,20,19,19,19,19,19,19,19,18,18,18,18,18,18,18,18,17,17,17,17,17,17,17,17,22,22,22,22,22,21,21,21,21,21,20,20,20,20,20,20,19,19,19,19,19,18,18,18,18,18,18,17,17,17,17,17,16,16,16,16,16,15,23,23,23,23,22,22,22,22,21,21,21,21,20,20,20,20,19,19,19,19,19,18,18,18,18,17,17,17,17,16,16,16,16,15,15,15,15,14,25,24,24,24,23,23,23,22,22,22,21,21,21,21,20,20,20,19,19,19,18,18,18,17,17,17,17,16,16,16,15,15,15,14,14,14,13,13,26,25,25,25,24,24,23,23,23,22,22,22,21,21,20,20,20,19,19,19,18,18,18,17,17,16,16,16,15,15,15,14,14,13,13,13,12,12,27,26,26,25,25,25,24,24,23,23,22,22,22,21,21,20,20,19,19,19,18,18,17,17,16,16,16,15,15,14,14,13,13,13,12,12,11,11,28,27,27,26,26,25,25,24,24,23,23,22,22,21,21,20,20,19,19,19,18,18,17,17,16,16,15,15,14,14,13,13,12,12,11,11,10,10,29,28,28,27,27,26,25,25,24,24,23,23,22,22,21,21,20,20,19,18,18,17,17,16,16,15,15,14,14,13,13,12,11,11,10,10,9,9,30,29,28,28,27,27,26,25,25,24,24,23,23,22,21,21,20,20,19,18,18,17,17,16,15,15,14,14,13,13,12,11,11,10,10,9,8,8,30,30,29,29,28,27,27,26,25,25,24,23,23,22,22,21,20,20,19,18,18,17,16,16,15,15,14,13,13,12,11,11,10,9,9,8,8,7,31,31,30,29,29,28,27,27,26,25,24,24,23,22,22,21,20,20,19,18,18,17,16,16,15,14,14,13,12,11,11,10,9,9,8,7,7,6,32,31,31,30,29,28,28,27,26,26,25,24,23,23,22,21,20,20,19,18,18,17,16,15,15,14,13,12,12,11,10,10,9,8,7,7,6,5,33,32,31,31,30,29,28,27,27,26,25,24,24,23,22,21,21,20,19,18,17,17,16,15,14,14,13,12,11,11,10,9,8,7,7,6,5,4,34,33,32,31,30,30,29,28,27,26,25,25,24,23,22,21,21,20,19,18,17,17,16,15,14,13,13,12,11,10,9,8,8,7,6,5,4,4,34,33,33,32,31,30,29,28,27,27,26,25,24,23,22,22,21,20,19,18,17,16,16,15,14,13,12,11,11,10,9,8,7,6,5,5,4,3,35,34,33,32,31,30,30,29,28,27,26,25,24,23,23,22,21,20,19,18,17,16,15,15,14,13,12,11,10,9,8,8,7,6,5,4,3,2,35,34,33,33,32,31,30,29,28,27,26,25,24,24,23,22,21,20,19,18,17,16,15,14,14,13,12,11,10,9,8,7,6,5,5,4,3,2,36,35,34,33,32,31,30,29,28,27,26,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,12,11,10,9,8,7,6,5,4,3,2,1,36,35,34,33,32,31,30,29,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,9,8,7,6,5,4,3,2,1,36,35,34,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,4,3,2,1,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,36,35,34,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,4,3,2,1,36,35,34,33,32,31,30,29,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,9,8,7,6,5,4,3,2,1,36,35,34,33,32,31,30,29,28,27,26,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,12,11,10,9,8,7,6,5,4,3,2,1,35,34,33,33,32,31,30,29,28,27,26,25,24,24,23,22,21,20,19,18,17,16,15,14,14,13,12,11,10,9,8,7,6,5,5,4,3,2,35,34,33,32,31,30,30,29,28,27,26,25,24,23,23,22,21,20,19,18,17,16,15,15,14,13,12,11,10,9,8,8,7,6,5,4,3,2,34,33,33,32,31,30,29,28,27,27,26,25,24,23,22,22,21,20,19,18,17,16,16,15,14,13,12,11,11,10,9,8,7,6,5,5,4,3,34,33,32,31,30,30,29,28,27,26,25,25,24,23,22,21,21,20,19,18,17,17,16,15,14,13,13,12,11,10,9,8,8,7,6,5,4,4,33,32,31,31,30,29,28,27,27,26,25,24,24,23,22,21,21,20,19,18,17,17,16,15,14,14,13,12,11,11,10,9,8,7,7,6,5,4,32,31,31,30,29,28,28,27,26,26,25,24,23,23,22,21,20,20,19,18,18,17,16,15,15,14,13,12,12,11,10,10,9,8,7,7,6,5,31,31,30,29,29,28,27,27,26,25,24,24,23,22,22,21,20,20,19,18,18,17,16,16,15,14,14,13,12,11,11,10,9,9,8,7,7,6,30,30,29,29,28,27,27,26,25,25,24,23,23,22,22,21,20,20,19,18,18,17,16,16,15,15,14,13,13,12,11,11,10,9,9,8,8,7,30,29,28,28,27,27,26,25,25,24,24,23,23,22,21,21,20,20,19,18,18,17,17,16,15,15,14,14,13,13,12,11,11,10,10,9,8,8,29,28,28,27,27,26,25,25,24,24,23,23,22,22,21,21,20,20,19,18,18,17,17,16,16,15,15,14,14,13,13,12,11,11,10,10,9,9,28,27,27,26,26,25,25,24,24,23,23,22,22,21,21,20,20,19,19,19,18,18,17,17,16,16,15,15,14,14,13,13,12,12,11,11,10,10,27,26,26,25,25,25,24,24,23,23,22,22,22,21,21,20,20,19,19,19,18,18,17,17,16,16,16,15,15,14,14,13,13,13,12,12,11,11,26,25,25,25,24,24,23,23,23,22,22,22,21,21,20,20,20,19,19,19,18,18,18,17,17,16,16,16,15,15,15,14,14,13,13,13,12,12,25,24,24,24,23,23,23,22,22,22,21,21,21,21,20,20,20,19,19,19,18,18,18,17,17,17,17,16,16,16,15,15,15,14,14,14,13,13,23,23,23,23,22,22,22,22,21,21,21,21,20,20,20,20,19,19,19,19,19,18,18,18,18,17,17,17,17,16,16,16,16,15,15,15,15,14,22,22,22,22,22,21,21,21,21,21,20,20,20,20,20,20,19,19,19,19,19,18,18,18,18,18,18,17,17,17,17,17,16,16,16,16,16,15,21,21,21,21,21,21,21,20,20,20,20,20,20,20,20,19,19,19,19,19,19,19,18,18,18,18,18,18,18,18,17,17,17,17,17,17,17,17,20,20,20,20,20,20,20,20,20,20,20,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,18,18,18,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,18,18,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,16,16,16,16,16,17,17,17,17,17,18,18,18,18,18,18,19,19,19,19,19,20,20,20,20,20,20,21,21,21,21,21,22,22,22,22,22,23,15,15,15,15,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,19,20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,13,14,14,14,15,15,15,16,16,16,17,17,17,17,18,18,18,19,19,19,20,20,20,21,21,21,21,22,22,22,23,23,23,24,24,24,25,25,12,13,13,13,14,14,15,15,15,16,16,16,17,17,18,18,18,19,19,19,20,20,20,21,21,22,22,22,23,23,23,24,24,25,25,25,26,26,11,12,12,13,13,13,14,14,15,15,16,16,16,17,17,18,18,19,19,19,20,20,21,21,22,22,22,23,23,24,24,25,25,25,26,26,27,27,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,9,10,10,11,11,12,13,13,14,14,15,15,16,16,17,17,18,18,19,20,20,21,21,22,22,23,23,24,24,25,25,26,27,27,28,28,29,29,8,9,10,10,11,11,12,13,13,14,14,15,15,16,17,17,18,18,19,20,20,21,21,22,23,23,24,24,25,25,26,27,27,28,28,29,30,30,8,8,9,9,10,11,11,12,13,13,14,15,15,16,16,17,18,18,19,20,20,21,22,22,23,23,24,25,25,26,27,27,28,29,29,30,30,31,7,7,8,9,9,10,11,11,12,13,14,14,15,16,16,17,18,18,19,20,20,21,22,22,23,24,24,25,26,27,27,28,29,29,30,31,31,32,6,7,7,8,9,10,10,11,12,12,13,14,15,15,16,17,18,18,19,20,20,21,22,23,23,24,25,26,26,27,28,28,29,30,31,31,32,33,5,6,7,7,8,9,10,11,11,12,13,14,14,15,16,17,17,18,19,20,21,21,22,23,24,24,25,26,27,27,28,29,30,31,31,32,33,34,4,5,6,7,8,8,9,10,11,12,13,13,14,15,16,17,17,18,19,20,21,21,22,23,24,25,25,26,27,28,29,30,30,31,32,33,34,34,4,5,5,6,7,8,9,10,11,11,12,13,14,15,16,16,17,18,19,20,21,22,22,23,24,25,26,27,27,28,29,30,31,32,33,33,34,35,3,4,5,6,7,8,8,9,10,11,12,13,14,15,15,16,17,18,19,20,21,22,23,23,24,25,26,27,28,29,30,30,31,32,33,34,35,36,3,4,5,5,6,7,8,9,10,11,12,13,14,14,15,16,17,18,19,20,21,22,23,24,24,25,26,27,28,29,30,31,32,33,33,34,35,36,2,3,4,5,6,7,8,9,10,11,12,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,26,27,28,29,30,31,32,33,34,35,36,37,2,3,4,5,6,7,8,9,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,29,30,31,32,33,34,35,36,37,2,3,4,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,34,35,36,37,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,33,34,35,36,37,0,0,0,1,2,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,28,29,30,31,32,33,34,35,36,37,0,0,0,1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24,26,27,28,29,30,31,32,33,34,35,36,37,0,0,0,0,1,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20,21,22,24,25,26,27,28,29,30,31,32,33,35,36,37,0,0,0,0,0,1,2,3,4,5,7,8,9,10,11,12,13,15,16,17,18,19,20,21,23,24,25,26,27,28,29,31,32,33,34,35,36,37,0,0,0,0,0,0,1,3,4,5,6,7,8,10,11,12,13,14,16,17,18,19,20,21,23,24,25,26,27,29,30,31,32,33,34,36,37,0,0,0,0,0,0,0,1,2,3,4,6,7,8,9,10,12,13,14,15,17,18,19,20,22,23,24,25,27,28,29,30,31,33,34,35,36,0,0,0,0,0,0,0,0,0,1,2,4,5,6,7,9,10,11,13,14,15,17,18,19,20,22,23,24,26,27,28,29,31,32,33,35,36,37,0,0,0,0,0,0,0,0,0,0,1,3,4,5,7,8,9,11,12,14,15,16,18,19,20,22,23,25,26,27,29,30,31,33,34,36,37,0,0,0,0,0,0,0,0,0,0,0,0,2,3,4,6,7,9,10,12,13,15,16,18,19,21,22,23,25,26,28,29,31,32,34,35,37,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,5,7,8,10,11,13,14,16,18,19,21,22,24,25,27,29,30,32,33,35,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,5,7,9,11,12,14,16,17,19,21,23,24,26,28,29,31,33,34,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28,30,32,34,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,5,7,9,11,13,15,17,19,21,23,25,27,29,32,34,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,5,7,10,12,14,17,19,21,24,26,28,31,33,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,6,8,11,14,16,19,22,25,27,30,33,35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,6,9,13,16,19,22,26,29,32,35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,7,11,15,19,23,27,31,35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,8,14,19,24,30,35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,11,19,27,35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,19,35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,19,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,27,19,11,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,30,24,19,14,8,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,31,27,23,19,15,11,7,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,32,29,26,22,19,16,13,9,6,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,33,30,27,25,22,19,16,14,11,8,6,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,36,33,31,28,26,24,21,19,17,14,12,10,7,5,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,36,34,32,29,27,25,23,21,19,17,15,13,11,9,7,5,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,36,34,32,30,28,27,25,23,21,19,17,15,14,12,10,8,6,4,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,36,34,33,31,29,28,26,24,22,21,19,17,16,14,12,11,9,7,6,4,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,36,35,33,32,30,29,27,25,24,22,21,19,18,16,14,13,11,10,8,7,5,3,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,35,34,32,31,29,28,26,25,23,22,21,19,18,16,15,13,12,10,9,7,6,5,3,2,0,0,0,0,0,0,0,0,0,0,0,0,37,36,34,33,31,30,29,27,26,25,23,22,20,19,18,16,15,14,12,11,10,8,7,5,4,3,1,0,0,0,0,0,0,0,0,0,0,37,36,35,33,32,31,29,28,27,26,24,23,22,20,19,18,17,15,14,13,11,10,9,7,6,5,4,2,1,0,0,0,0,0,0,0,0,0,36,35,34,33,31,30,29,28,27,25,24,23,22,20,19,18,17,15,14,13,12,10,9,8,7,6,4,3,2,1,0,0,0,0,0,0,0,37,36,34,33,32,31,30,29,27,26,25,24,23,21,20,19,18,17,16,14,13,12,11,10,8,7,6,5,4,3,1,0,0,0,0,0,0,37,36,35,34,33,32,31,29,28,27,26,25,24,23,21,20,19,18,17,16,15,13,12,11,10,9,8,7,5,4,3,2,1,0,0,0,0,0,37,36,35,33,32,31,30,29,28,27,26,25,24,22,21,20,19,18,17,16,15,14,12,11,10,9,8,7,6,5,4,3,1,0,0,0,0,37,36,35,34,33,32,31,30,29,28,27,26,24,23,22,21,20,19,18,17,16,15,14,13,12,10,9,8,7,6,5,4,3,2,1,0,0,0,37,36,35,34,33,32,31,30,29,28,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,6,5,4,3,2,1,0,0,0,37,36,35,34,33,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,0,37,36,35,34,33,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0,0,37,36,35,34,33,32,31,30,29,28,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,6,5,4,3,2,1,0,0,0,37,36,35,34,33,32,31,30,29,28,27,26,24,23,22,21,20,19,18,17,16,15,14,13,12,10,9,8,7,6,5,4,3,2,1,0,0,0,0,37,36,35,33,32,31,30,29,28,27,26,25,24,22,21,20,19,18,17,16,15,14,12,11,10,9,8,7,6,5,4,3,1,0,0,0,0,0,37,36,35,34,33,32,31,29,28,27,26,25,24,23,21,20,19,18,17,16,15,13,12,11,10,9,8,7,5,4,3,2,1,0,0,0,0,0,0,37,36,35,33,32,31,30,29,27,26,25,24,23,21,20,19,18,17,16,14,13,12,11,10,8,7,6,5,4,3,1,0,0,0,0,0,0,0,0,36,35,34,33,31,30,29,28,27,25,24,23,22,20,19,18,17,15,14,13,12,10,9,8,7,5,4,3,2,1,0,0,0,0,0,0,0,0,37,36,35,33,32,31,29,28,27,26,24,23,22,20,19,18,17,15,14,13,11,10,9,7,6,5,4,2,1,0,0,0,0,0,0,0,0,0,0,37,36,34,33,31,30,29,27,26,25,23,22,20,19,18,16,15,14,12,11,9,8,7,5,4,3,1,0,0,0,0,0,0,0,0,0,0,0,0,37,35,34,32,31,29,28,26,25,23,22,21,19,18,16,15,13,12,10,9,7,6,4,3,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,36,35,33,32,30,29,27,25,24,22,21,19,18,16,14,13,11,10,8,7,5,3,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,36,34,33,31,29,28,26,24,23,21,19,17,16,14,12,11,9,7,5,4,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,36,34,32,30,28,27,25,23,21,19,17,15,13,12,10,8,6,4,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,36,34,32,29,27,25,23,21,19,17,15,13,11,9,7,5,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,36,33,31,29,26,24,21,19,17,14,12,10,7,5,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,33,30,27,25,22,19,16,14,11,8,5,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,32,29,26,22,19,16,13,9,6,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,31,27,23,19,15,11,7,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,30,24,19,14,8,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,27,19,11,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,19,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,19,35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,11,19,27,35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,8,14,19,24,30,35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,7,11,15,19,23,27,31,35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,6,9,13,16,19,22,26,29,32,35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,6,8,11,14,16,19,22,25,27,30,33,35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,5,7,10,12,14,17,19,21,24,26,28,31,33,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,5,7,9,11,13,15,17,19,21,23,25,27,29,32,34,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28,30,32,34,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,6,7,9,11,12,14,16,17,19,21,22,24,26,28,29,31,33,34,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,5,7,8,10,11,13,14,16,18,19,21,22,24,25,27,29,30,32,33,35,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,5,6,7,9,10,12,13,15,16,18,19,21,22,23,25,26,28,29,31,32,34,35,37,0,0,0,0,0,0,0,0,0,0,0,0,1,3,4,5,7,8,10,11,12,14,15,16,18,19,20,22,23,25,26,27,29,30,31,33,34,36,37,0,0,0,0,0,0,0,0,0,0,1,2,4,5,6,7,9,10,11,13,14,15,17,18,19,20,22,23,24,26,27,28,29,31,32,33,35,36,37,0,0,0,0,0,0,0,0,1,2,3,4,6,7,8,9,10,12,13,14,15,17,18,19,20,22,23,24,25,27,28,29,30,31,33,34,35,36,0,0,0,0,0,0,0,0,1,3,4,5,6,7,8,10,11,12,13,14,16,17,18,19,20,21,23,24,25,26,27,29,30,31,32,33,34,36,37,0,0,0,0,0,0,1,2,3,4,5,7,8,9,10,11,12,13,15,16,17,18,19,20,21,23,24,25,26,27,28,29,31,32,33,34,35,36,37,0,0,0,0,0,1,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20,21,22,24,25,26,27,28,29,30,31,32,33,35,36,37,0,0,0,0,1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24,26,27,28,29,30,31,32,33,34,35,36,37,0,0,0,1,2,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,28,29,30,31,32,33,34,35,36,37,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,33,34,35,36,37,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37];
    const flip_step = [38,114,152,190,152,114,76,76,38];

    const elas_rows = [0,-1,-1,-2,-2,-3,-3,-4,-4,-5,-5,-6,-6,-6,-6,-7,-7,-7,-7,-7,-7,-7,-7,-6,-6,-6,-6,-5,-5,-4,-4,-3,-3,-2,-2,-1,-1,0]
    const elas_data = [0,13,16,7,-7,-16,-12,0,11,16,10,-1,-11,-15,-9,0,9,14,12,5,-5,-12,-13,-9,0,7,12,13,9,2,-6,-11,-12,-9,-3,0,6,10,12,10,7,2,-4,-8,-11,-10,-8,-3,0,4,7,9,10,9,7,3,-1,-4,-7,-9,-9,-8,-6,-3,0,3,5,7,8,8,8,7,6,3,1,-1,-4,-5,-7,-8,-8,-7,-6,-4,-2,0,1,3,4,5,6,6,7,7,6,6,5,4,3,2,1,0,-2,-3,-4,-4,-5,-6,-6,-6,-5,-5,-4,-3,-3,-1,0,0];

    const back_palette = [
      "#210","#310","#420","#520","#630","#730","#840",
      "#003","#004","#005","#006","#007","#008","#009",
      "#666","#555","#444","#333","#222","#111","#000",
      "#200","#300","#400","#500","#600","#700","#800",
      "#000","#010","#020","#030","#040","#050","#060",
      "#000","#111","#222","#333","#444","#555","#666"
    ];

    const band_palette = [
      "#014","#028","#04c","#06f","#04c","#028","#014",
      "#301","#602","#904","#c06","#904","#602","#301",
      "#444","#888","#ccc","#fff","#ccc","#888","#444",
      "#020","#040","#060","#080","#060","#040","#020",
      "#033","#066","#099","#0cc","#099","#066","#033",
      "#310","#630","#950","#c60","#950","#630","#310"
    ];

    const highlight = new Uint32Array([
      0xffffffff,0xffffffff,0xffffeeff,0xffffeeff,0xffffddff,0xffffddff,0xffffccff,0xffffccff,
      0xffffbbff,0xffffbbff,0xffffaaff,0xffffaaff,0xffff99ff,0xffff99ff,0xffff88ff,0xffff88ff,
      0xffff77ff,0xffff77ff,0xffff66ff,0xffff66ff,0xffff55ff,0xffff55ff,0xffff44ff,0xffff44ff,
      0xffff44ff,0xffff44ff,0xffff55ff,0xffff55ff,0xffff66ff,0xffff66ff,0xffff77ff,0xffff77ff,
      0xffff88ff,0xffff88ff,0xffff99ff,0xffff99ff,0xffffaaff,0xffffaaff,0xffffbbff,0xffffbbff,
      0xffffccff,0xffffccff,0xffffddff,0xffffddff,0xffffeeff,0xffffeeff,0xffffffff,0xffffffff
    ]);

    const band_sine = [30,30,30,30,29,29,29,28,28,27,26,26,25,24,23,22,22,21,20,19,18,17,16,14,13,12,11,10,9,8,7,7,6,5,4,4,3,2,2,1,1,1,0,0,0,0,0,0,0,1,1,1,2,2,3,4,4,5,6,7,8,8,9,10,11,12,13,14,16,17,18,19,20,21,22,23,23,24,25,26,26,27,28,28,29,29,29,30,30,30];
    const band_cols = new Array(14);

    const back_rows = [0,2,0,2,4,6,0,2,4,6,8,10,0,2,4,6,8,10,12,10,8,6,4,2,0,10,8,6,4,2,0,6,4,2,0,2,0];
    const back_cols = new Array(14);

    const scr_bplcon = new Array(37);
    const scr_bplptr = new Array(37);
    const scr_colors = new Array(37);
    const scr_lights = new Uint32Array(37);

    let logo_pos = 0;
    let logo_amp = 0;
    let logo_max = 230;
    let logo_dir = 1;
    let logo_int = 1;

    let spr_posx = 0;
    let spr_posy = 0;

    let grt_state = 0;
    let grt_ready = 0;
    let grt_pause = 0;
    let grt_frame = 400;
    let grt_ptr   = 0;
    let grt_pos   = 0;
    let grt_cols1 = grt_pal1;
    let grt_cols2 = grt_pal2;

    let scr_pos   = 0;
    let scr_speed = 2;
    let scr_blit  = 2;
    let scr_shift = 0;
    let chr_ptr   = 0;
    let chr_step  = 2;
    let chr_size  = 40;

    let sine_flag = 0;
    let sine_ctr  = 40;
    let sine_dir  = 0;
    let sine_ptr  = 0;
    let sine_pos  = 0;

    let flip_flag = 0;
    let stop_flag = 0;
    let flip_wait = 2;
    let flip_add  = 0;
    let flip_dir  = 0;
    let flip_ptr  = 0;
    let flip_pos  = 0;

    let refl_flag = 0;
    let refl_dir  = 1;
    let refl_max  = 0;
    let refl_skip = 32;

    let elas_flag = 0;
    let elas_amp  = 0;
    let elas_pos  = 0;

    let fade_flag = 0;
    let fade_ctr  = 10;
    let fade_cols = null;

    let back_flag = 0;
    let back_ptr  = 0;

    let band_flag = 0;
    let band_ptr  = 0;
    let band_pos1 = 0;
    let band_pos2 = 25;

    let high_ptr  = 0;

    let afid = 0;

    setTimeout(initialize, 100);
  }

/*
  Psychoball Demo
  Kefrens (1989)
  Part 5 of Mega-Demo "Forces of the Pyramids"
  Replay: DOC Soundtracker 2.0
  Christian Corti 2018
*/
  function part5() {

    function initialize() {
      buf1c.width  = 512;
      buf1c.height = 261;
      buf1x.imageSmoothingEnabled = false;

      buf2c.width  = 292;
      buf2c.height = 70;
      buf2x.imageSmoothingEnabled = false;

      buf3c.width  = 384;
      buf3c.height = 52;
      buf3x.imageSmoothingEnabled = false;

      buf4c.width  = 352;
      buf4c.height = 168;
      buf4x.imageSmoothingEnabled = false;

      buf5c.width  = 96;
      buf5c.height = 101;
      buf5x.imageSmoothingEnabled = false;

      setup();

      loop();
    }

    function setup() {
      canvx.fillStyle = "#000";
      canvx.fillRect(0,0,752,574);

      canvx.drawImage(logo, 0, 0,292,70, 102,34,584,140);
      canvx.drawImage(logo, 0,70,292,70, 102,34,584,140);

      player.version = 6;
    }

    function exit(e) {
      cancelAnimationFrame(afid);
      canvc.removeEventListener("click", exit);

      player.reset();
      loader();
    }

    function part1() {
      gb_ctr++;

      if (gb_ctr == 212) {
        player.setSample(0,16,256,64);
        player.setSample(1,16,256,64);
        player.play(1);

      } else if (gb_ctr == 256) {
        stars();
        equalizer();

        buf1x.drawImage(logo, 0, 0,292,70, 127,0,292,70);
        buf1x.drawImage(logo, 0,70,292,70, 127,0,292,70);

        canvx.fillStyle = "#02a";
        canvx.fillRect(0,480,752,58);
        canvx.drawImage(buf1c, 113,0,320,261, 74,34,640,522);

      } else if (gb_ctr == 288) {
        player.setSample(0,17,256,32);
        player.setSample(1,17,256,32);

      } else if (gb_ctr == 511) {
        gb_pos = 1;
        loop = part2;
      }

      requestAnimationFrame(loop);
    }

    function part2() {
      stars();
      equalizer();

      buf1x.drawImage(logo, 0, 0,292,70, 127,0,292,70);
      buf1x.drawImage(logo, 0,70,292,70, 127,0,292,70);

      canvx.drawImage(buf1c, 113,0,320,261, 74,34,640,522);

      if (++gb_ctr == 767) {
        gb_pos = 2;
        loop = part3;
      }

      requestAnimationFrame(loop);
    }

    function part3() {
      stars();
      raster();
      equalizer();
      scroll();

      canvx.drawImage(buf1c, 113,0,320,261, 74,34,640,522);

      gb_ctr++;

      if (gb_ctr == 2577) {
        player.play();
      } else if (gb_ctr == 2583) {
        canvc.addEventListener("click", exit);

        gb_pos = 3;
        loop = part4;
      }

      requestAnimationFrame(loop);
    }

    function part4() {
      gb_ctr++;

      if (gb_ctr == 3087) {
        gb_pos = 4;
      } else if (gb_ctr == 3599) {
        gb_pos = 5;
        loop = part5;
      }

      stars();
      raster();
      equalizer();
      scroll();
      balls();

      canvx.drawImage(buf1c, 113,0,320,261, 74,34,640,522);

      afid = requestAnimationFrame(loop);
    }

    function part5() {
      stars();
      raster();
      vertical();
      equalizer();
      scroll();
      balls();

      canvx.drawImage(buf1c, 113,0,320,261, 74,34,640,522);

      afid = requestAnimationFrame(loop);
    }

    function balls() {
      let x = 150;

      if (gb_pos >= 4) {
        pb_data[0] += pb_data[1];

        let a = pb_data[0] - 19202048;
        let b = a >> 11;
        let c = pb_data[0] >> 16;

        if (a < 0) { b = -(-a >> 11); }
        pb_data[1] -= b;

        a = ~(c) & 15;
        b = c >> 3;
        if (b & 1) { b--; }

        x = (((64 - b) << 3) + a) - 83;
      }

      let px = pb_pos;
      let py = (256 + px) & 1023;

      for (let i = 0; i < 3; i++) {
        buf1x.drawImage(sprt, 0,0,93,94, (x + pb_sine[px]),pb_sine[py],93,94);
        px = (px + 341) & 1023;
        py = (py + 341) & 1023;
      }

      pb_pos = (pb_pos + 10) & 1023;
    }

    function equalizer() {
      if (gb_pos >= 3) {
        const o = player.audioCache;

        if (o.sample[0]) { eq_bar0 = 71; }
        if (o.sample[1]) { eq_bar1 = 71; }
        if (o.sample[2]) { eq_bar2 = 71; }
        if (o.sample[3]) { eq_bar3 = 71; }
      }

      buf1x.drawImage(sprt, 0,94,16,1, 229,(152 + (71 - eq_bar0)),16,eq_bar0);
      buf1x.drawImage(sprt, 0,94,16,1, 253,(152 + (71 - eq_bar1)),16,eq_bar1);
      buf1x.drawImage(sprt, 0,94,16,1, 277,(152 + (71 - eq_bar2)),16,eq_bar2);
      buf1x.drawImage(sprt, 0,94,16,1, 301,(152 + (71 - eq_bar3)),16,eq_bar3);

      let y0 = eq_bar0 > 29 ? 29 : eq_bar0 - 1;
      let y1 = eq_bar1 > 29 ? 29 : eq_bar1 - 1;
      let y2 = eq_bar2 > 29 ? 29 : eq_bar2 - 1;
      let y3 = eq_bar3 > 29 ? 29 : eq_bar3 - 1;

      buf1x.drawImage(sprt, 16,94,16,1, 229,223,16,y0);
      buf1x.drawImage(sprt, 16,94,16,1, 253,223,16,y1);
      buf1x.drawImage(sprt, 16,94,16,1, 277,223,16,y2);
      buf1x.drawImage(sprt, 16,94,16,1, 301,223,16,y3);

      if (eq_bar0 > 13) { eq_bar0 -= 2; }
      if (eq_bar1 > 13) { eq_bar1 -= 2; }
      if (eq_bar2 > 13) { eq_bar2 -= 2; }
      if (eq_bar3 > 13) { eq_bar3 -= 2; }
    }

    function raster() {
      buf2x.drawImage(logo, 0,70,292,70, 0,0,292,70);
      buf2x.globalCompositeOperation = "source-atop";

      let cp = rs_pos;

      for (let i = 0; i < 7; i++) {
        let y = 16 + rs_sine[cp];
        buf2x.drawImage(sprt, 93,0,1,8, 9,y,276,8);
        cp = (cp + 16) & 255;
      }

      rs_pos = (rs_pos + 3) & 255;

      buf2x.globalCompositeOperation = "source-over";
      buf2x.drawImage(logo, 0,0,292,70, 0,0,292,70);

      buf1x.drawImage(buf2c, 127,0);
    }

    function scroll() {
      if (sc_grow) {
        if (sc_offy) {
          sc_offy--;
        } else {
          sc_grow = 0;
        }
      }

      if (sc_jump) { sc_sine += 3; }

      if (sc_wait) {
        sc_wait--;
      } else {
        sc_offx += 4;

        if (sc_offx == 32) {
          sc_offx = 0;

          buf3x.globalCompositeOperation = "copy";
          buf3x.drawImage(buf3c, 32,0,352,52, 0,0,352,52);
          buf3x.globalCompositeOperation = "source-over";

          do {
            let cx = sc_text.charCodeAt(sc_pos);

            if (++sc_pos == sc_len) {
              sc_pos = 207;
            }

            if (cx == 32) {
              break;
            } else if (cx > 32) {
              cx = (cx - 33) * 32;
              buf3x.drawImage(font, cx,0,32,52, 352,0,32,52);
              break;
            }

            if (cx >= 2 && cx <= 10) {
              sc_skip = (cx - 2) << 2;
              continue;
            }

            switch (cx) {
              case 0x01:
                sc_wait = 200;
                break;
              case 0x0b:
                sc_jump = 0;
                break;
              case 0x0c:
                sc_jump = 1;
                break;
              case 0x0d:
                sc_sine = 64;
                sc_offy = 26;
                break;
              case 0x0e:
                sc_grow = 1;
                break;
            }
          } while (true);

          sc_sine += sc_skip;
        }
      }

      buf4x.clearRect(0,0,352,168);

      let s = sc_sine & 255;

      for (let x = 0; x < 352; x += 32) {
        const y = rs_sine[s] + sc_offy;
        s = (s + sc_skip) & 255;

        buf4x.drawImage(buf3c, x, 0,32,26, x,y,32,26);
        buf4x.drawImage(buf3c, x,26,32,26, x,(142 - y),32,26);
      }

      buf1x.drawImage(buf4c, (1 + sc_offx),  0,320,58, 113,180,320,58);
      buf1x.drawImage(buf4c, (1 + sc_offx),110,320,14, 113,238,320,14);
    }

    function stars() {
      buf1x.fillStyle = "#000";
      buf1x.fillRect(0,0,512,223);
      buf1x.fillRect(0,252,512,9);

      buf1x.fillStyle = "#02a";
      buf1x.fillRect(0,223,512,29);

      let y = 0;

      for (let i = 0; i < 131; i++) {
        let x = sf_posx[i];
        let c = sf_move[i];

        buf1x.fillStyle = sf_cols[c];
        buf1x.fillRect(x,y,1,1);

        sf_posx[i] = (x + c) & 511;
        y += 2;
      }

      buf1x.drawImage(disk,  0,0,98,101, 113,76,98,101);
      buf1x.drawImage(disk, 98,0,98,101, 335,76,98,101);
    }

    function vertical() {
      if (vs_ctr) {
        vs_ctr--;
      } else {
        vs_pos++;

        if (vs_pos == vs_alt) {
          vs_ctr = 200;
          vs_alt = vs_posy[vs_ptr];

          if (++vs_ptr == vs_len) {
            vs_ptr = 0;
          }
        } else if (vs_pos == 1787) {
          vs_pos = 59;
        }
      }

      buf5x.globalCompositeOperation = "copy";
      buf5x.drawImage(text, 0,vs_pos,96,101, 0,0,96,101);

      buf5x.globalCompositeOperation = "source-atop";
      buf5x.drawImage(sprt, 93, 8,1,3, 0, 0,96,3);
      buf5x.drawImage(sprt, 93,11,1,3, 0,98,96,3);

      buf1x.drawImage(buf5c, 0,0,96,101, 225,76,96,101);
    }

    const buf1c = document.createElement("canvas");
    const buf1x = buf1c.getContext("2d", {alpha:false});
    const buf2c = document.createElement("canvas");
    const buf2x = buf2c.getContext("2d");
    const buf3c = document.createElement("canvas");
    const buf3x = buf3c.getContext("2d");
    const buf4c = document.createElement("canvas");
    const buf4x = buf4c.getContext("2d");
    const buf5c = document.createElement("canvas");
    const buf5x = buf5c.getContext("2d");

    const disk = new Image();
    const font = new Image();
    const logo = new Image();
    const sprt = new Image();
    const text = new Image();

    disk.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAABlBAMAAADgyFETAAAAGFBMVEUAAAC7u7v///9mZmYAAP+IiIjd3d1ERETghip1AAAAAXRSTlMAQObYZgAABwpJREFUaN6c2MGO2jAQBmDUVup5YtnnEiDnNSOXa4V4gcFye3aq9bkSqvr6nTgIs5kswfsf4GLz68NxiFnN5LPTqw+F/MtzA5EAmo80rAE0rkQkAWHIt/qGTzAEFyFoIaf5CCJHPYZ8zYTCqEdkyJ/3R10yIcdsayuO8TZZHd4l0G1Qsz39qGv4cjqub9P1POTioDS07elUV3E6tW3pAH+YIdg3DVtmVCKObzoUQ+SlWho4R2ZUIbZtWzrk5cuEkn4oyIxKxFDSwT1EEophmxmViGNxTCDoQFQURg1CVIDHbCB4G/78wqhD8Cu8jX4p63DP2BZGHeJYEGU9ykIsMKoRZTk+K4AKRh2CY19W1toKRjVCKbVCZSsY1QhlcWURoYJRiQBExcuN94y1YFQjmnsE8nJ/xXtGq/ZWMKoQamPbe8RwN0RmlAZrNoJRhdhHxR0FgfkOhVgaEjSCUYVYQ+KOguDdnRmOxgbnKYFgVCEgaefHDu1HxMgIo0Gjg64XjApE14NHGh1hRBRGv7EAIVCfBKMCkTodAlftuxvixmg2SJo7yBjBqEDEqLmBNO7XBTEy9gq1AwMA5lUynkf8jPwWwRPaTUYUxsatgUyMJqZIgvE0QptkojFRQ+P3BcHBPbrGxNR2qY2gQDCeRIAF06a+5Z61xw0jCoNR1LWc/PvuxN54ck/48emC02vE/YAoHS6EJjfEYSwJxlMIbQHA5I51CJPDxlcdNLUcblhgLCC4o+VoCjR5VrsE0MxIwHnAWEZwEiMIwmH6wOlI2/w1LTAWEfmrUqS9eHJ2AJumA1hgLCM4/XoP4OUBjCBCqbCCsYhQpQIM6BfpvpBRTYQx6IxgLCCiRxhj1jbqw9wJ5gLadrefEiMYC4iIaK8IRXCYPcP8I+3PIwMRKf0WjAeI70kj4ojYOdL/5g9iLmjXXRHoTBKMB4gUPV4ZvafgR4RkuJGhkeNmGA8RHjk0IvwNIVaDMsPnCkiC8QCRrrMyQpeVEAwLeI4ZgcEmyXgfkVTAzDA7BFUQgvEXdOg8DnGYJON9RMLrtD4Q/Hp0tifQZ58RHs08Yx4R0WWG2xFM9oS4U4HbDSNDwJ/zjHnEK4bgEfHsYXJ3khcVeGb4YcLPLvbTLf4t/9sx3did6V9dCOgY4UBcTmKLB2Z4R6QpJdNNGOcVZzdB9DElTVp7x4ggN7bc4qFhBAFAn2CyGjv4xgj435od7LgJA2EATnroOb8tvNfaKPRsRnSfgyD3XKjqc7d72NfvGG+GkF2VsmBFibBIfn14jJFzuRsJxApAwQwbZGL/q6iAMzUBgKriMB+NEirtO9XzkeDTUlbo6ALkclpgAMxo+MNUMVYzRvkVXz7hTz1DDDEOPSM6RgBLiDzFM8PE6PhlbhmwT6fjg8ItonfjiX1GyMReKCpcEiN9sx96fcPw6sH0T1bfILypTIpIiDOknBYZwY4RQwSsnRjOw377qaDdhFAKiNUYoYIgFhmhu+jQmuiqAiZODNtC1aVFoSZE7NEOzC2CPzdBEEtFFYquDAEc0QcTIYwyZVkAtSAQ+RSOQAh10wYppyVGQKiJGSmiHSCMEq+tFgSqIkUwgsqAIIglhgd/wcMM1bicCyNFnI4pQhDjQj1UPXRNAXoZIY+GoatbwwoU33tcGc4DaV4A2l0RML9asKIvyiZMD4DLDM4gGwe+UIUChDFFCAKwreEToyJOmBDLjIbowhEOqABhTBGCAAbAccSZqGPECgZRUzlWwEJ+rMB1LNBKMBRY4YaOaA2CGcQMjoAC5NfGdjik9ykXsOAIRhAjVjJa5yIG5NZC/hFILkFxqxCdK9YieG4QBeUs7HKEAp8YiHhOrGNwRFtFeY7WbyO8PCXHoeAIRqxlNEFFhbv2cDg83ffZaEMniBWMl4YZVvZbff78cTh8fnW1uMoY0b2sQsi6EZQFZoOR1+4cComwAd06hKziwUOav4/QkKaDrNjr2nMoSsiFehshFwp1K3enlQxfk8ddRf3m/rkL0FRqQaxklER3ESr127sIoloQ6+eGMOhtBAmC6GOI+c6kH19ThBaY7DF+rE0MD5S3ETWgZxulWxhSPtaPk3uc3lpJkQliI0PD9L0G8sM/o4zp4SfEDgwNONxGwPHbVoQwGg8070V0gO4EsYnRAR4YUsQp9R3TcTXSGkFsZaSRtehgcl/PKpVqQBDbGWNBwUPlPsuAsaQEsZ1BuTz9NUK/dmxHzHbt1TzCTvvuuzDGtbRpgNwDdN24ygpiM+PRJ4XPNZurVieFfhbEVsYzITeJyI0etyPkpu7fi9ByE99lwOcRC3fxLff0Uz4+LtzFNzDUtcPujRDGFCGIvRlThCB2ZdA8ggSxI4OcvR4qR4LYk1G70/Xo6EpB7McQhDAYsXNGRkyM/074C/hAvgmVx7GnAAAAAElFTkSuQmCC";
    font.src = "data:image/png;base64,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";
    logo.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASQAAACMBAMAAAAn78noAAAAGFBMVEUAAAAAIqrMiESIRACZVRG7dyLuqmb/zIgGByVNAAAAAXRSTlMAQObYZgAAC3hJREFUeNrsmkGv0zAMx6sGvkflpeMaLd19ajbOqO3jjCox7hz4/LSe63/mjPceIBAHcmEvdZxfHMd2UyrbXPXPtVj90eZ+YUio/kRzv7HkGP6IIcLDCcKr1KWf2dhgNQczETgU982o3PE1K3LHZFWWyu0ux7zjoZ27M56/oSBLi/E1nnOkIFOEh8zOqInxHsGl0KWSaBi3X6FyNAb++TSFR0Tn+143fA7rvAprmOOlvR/w5il1Q971dB7Gkmg+yS+/yL6nlcX1V/+I6OJ5Vmwb7dZ/uiA7xHQA6oi80bC/EuVW6omnN6PaICte1R8a8jFe6PqZe+02jXAPJqp33D+yrUIVt0cMOlBFo0F6P+8p5Qa5XtM90TKqnrlvwfiwIlVVTdySZXKd0Ltz5D8vy+APvB2UVhNO8SyD4tIu1FSVTq+YFVGbxKJxoaYvPkJg7VkIrj7wkui0am8qbu1Hmoxn9lSPYq32aWm0zEk3xmubFmUz0ZRi5JmWVi2692O+MMZs1jX7RaqnVUP97qsgVstAonV++jKn2K8PGV2QfN8QJT4vsqBV4iROOsuUlZitYbteryRNlCyTz7owt064dPEfLLWJ0A2x065xEB2CJL28g0wlC2IJ0U4yDbsSm5ZNMlemtcdtm1gHSxmRehoqcRbtSkdWaJBO3e3H3ar1RPfyr+zk4fZHSxbJR1pnm3gruadESofGdgWhkG3p0Vs0rwdFHr4NGWGbLnbMzg2yLn0CJMxfdg2bAqz4MdIOIfKO8TZv4m4zoLc6SiTIoOtQIrXPIIkUOlwjewjlEkl2qhutKSwvngM/ObF3GiSvOwhnwsapFkUSPzsoUJvWWLDDdECyy+T5BWjiCHLCwQfSTn7UPkqgyd1bteDALUYC0grEgSbpdFiYRcKRohQDRy8g1UH0K1LdBgQ5PgBwJiAdGqZFNGij1kqimyZeGCuxSDgeKDccZUfOASnPB9FkrF70yW8aEbAgpupoYmKGYqRbICRWsW1Iyqo+HDn4KsvVPtxlg731751w1FMAaS1JBOasd0HrpZ5paCCilpE242ZzOVbEBvWKdLohjSbt+mCQZN/agG5sLyBPeXnyaZ2fPbSBGcxcYjjOcoIUbkgnW38GHDk1K4k6RQpWd5v3vJ83kwAJfgr9jMTPgaTK0VC2vlUkGEm2oETydx2aTw9q6P4OybEicbY2IMgAKWsGyRsjYb0lEjoKJJ4LqSGo/zw1i3JxtUo3zrRwF5go5EayXuGwcS8iQch1QErD0h9VDu5tG5D2voOREMgTdtk4vMuR+jw+b6fWXVIFpEOz9FOOhOXBqDlSfSUYCQeMi+TuKehsI3yRR+IgZfYiH4OLl60q1ORPcFsEPXh3zK0kx3QsPWXR3tFnQVK7ue68kfjAKoAkKU5iH5AGE+VzM3FCmGySgw8ASbJ15TPGNnFt6hVpfV8wSAzFVgCSPkEupCkGqZuXNrM4hiAPGKQ8AaKgaNigTqP3bBIrshqQjk2RnvVlQm1mkND3DBKmk+lZH5nEitwPj3NA4j5dYAODWCRfvRoJm1Q392Il0lGQkH+5z7Y8CYP+V5DQSqRTHr0gvjMjYSSDhPNWIvnXIXmDlHIkmGZnK3t4jUU6GSQr35vZLRJCFNaYIzlF6hotvGHhn0OiADlo+BESuA1Sry87qOkJ+M9vHIzCK9mPJRJLmHbSQM6BQoxrN9rHgbSm7wj2eCkIONJKmy4WyXqyOd71LdzMbNxBkNSZ/JGmFFFOyXOTdh8aT+PXoj/fktUA8GREF65KDtjoCyFQIY4tS78oEJ4DCeyl1+eUQRUSTd1An5VR3IJvfbwgeSldE6aEnfObKrWiL9y4NBMqd2PhNS8tSR5IdXuON1P2bdDKiVvM3xOBdDI+aw4cUhfMlKcmK8ciXJzhTi3qW0YCEjdEox1eGesXkXrZ4AYvSVlqsnIe1dahDLzRTuDCwR5R67NDGZZkqthrVWVq/fKtGEWlmAlMMgEYFUmTYn0/P5VIg4ZUroYUydj4SCJnnRDvreouXv+cqt7GVpKKEC5aIMles7mECRFuBPlskVgeRxzbDZ88trERJBQFRCm3SIGEEyEDRJ3LjcJBRuTMC7mImWOZ9JPDRZHUP9dIGnAXYFeKKK/Vpw86Wt0k9lSZiym8nzFDgGPyTsqotke+kyF8Nz3FuN3x/xCpDaxPKmJeLkptvlOWjnB/JM+44lHHxI0P+R5hGEiLAGddMb0NlT2yeJdVxKIbJURt64WjvjJWOodo0Hux2queLN9BsSl/ytLE9eC4FmWfjfAHuViuQDENjRk0UQX9uNgpGgXr3TLVUbPW9ZtN87YclhUnNgyoDNITcjq8xKou0wS3tyPzic3317lEgonzkxqHHMlA1aRX5bvnkU6FKyEvUordZd8UY8xgLX54GuUx4+RDSU8ojR/unLmyyWv5YSHiIFTcStf2yrynBWINY1v8m/oZbOrmbeLDTotgjgT9MOLDt2/3kRKTkXzWwocg2qzAgixDqSOaw6qCZQ+8S3LjzcKojTqaT3CTZruJ5nYeRKut3/h2ZEhsXmJ7i5BbqfZXShvfyGtpU+TgmxZDUwoMyTgx6JdFersiCdMouVyyEHl8SxtoUYEMI/ZraI0CiTtZ8321cJXPsS72+5bnTFuJ5ATSDZMsA5/tnpDOukmRaNYkoWmFdtu+DbI/3cBOxGLHCZo1fQ5e6zSeRiVit31qT1gGHjKSVn0HtsBlFiLQH3mhoiYGXDg5fpwgjQVnH/G7kSX1z1bs98L/d3Bh3VsO8gOIsNBTBTUYYpTkz/RxIfEmYfjz/+WkcvvbZ+bDNRVyYk8QWbJSb26YaAewyMutE+sc5wfSEcp+t71aCT4AvPEPFUHZ32saV1L1jzQX8ONfa/8iUvW/fW/P3nIbh2EoDJs74Nn/ZgfQNP2DQ12dFuiD+TIZSqI/K4p86RNPPPHEKOKod86bdYsgqyoSZ4NrhHRDWQWhFltzEpqXVnaY8Z4N1ZqSNX6TolZLOySDa90WWZnJGVsXSwWfXtlObxJ2yHiNsSigF4lIKotUyHAia9/mgKQxScmYASn6KeqTLQEpOqSWriRatkmc8y6JUy7LqkMiRqRri3QdkViJlKWjRdSaUY8QheQ/iHBSOKmsMdrWJD6vSdRekLJOXq0dU1LaMHIB6dWL4xJGst2g2ilSSRQjRiS/FgxIoqXUDstEI30tP0hlW5XNbk6vdpVEx27tLEjaSNX6eZsUlDsjBSRljxTKA1JAUi5INnSLFP9JOiUxSaRnJA5mC29AuiBdJyTlGUkHpFAekpikj0nqkq6W1yGpbENVkDuk7JJCeUZqY9aC7K+lqLhKansYJC1I/EzrHMw3z6tDUhfuu3yuSJXNvaIZl6SW1ozUBqxJWUhmpVckJNNyLU4jhZM0WhJ0XZIIDt/S90jkf47UliDJBenqkIjrh0jEhKQOqYiyR8pfJ8WEdH1MImHOPRIXx89IcUiqewcPO+WZ8IDUPixJZNmiIsek95iQ5CTLVVJ0SZMrYTCWiCGppkk5PZIEuws/K6tzn6Qt0uIbPycxgmB5bpDSEmSmJJ2SeOyZkabPmmsSh9oksRj2Sdr64nSb1P69RdIRKWObVJ/Lt0hlfa1INNYR9bum+jYpfc3HaMEx87skH1AF0SV5N4hDEs3zFxvmrQJFz5hukJPqZTKsfUICDCnpRaKQ7H2LNCfZiY9I6TNTbh/VJYGohwgldaiaJKb3lOkOWVSSIA2uxCMSMSX5f2LwYtJIfoPkpDASpdxOyElQ56SoCgp+V5Uoe0Zi3vsgZjtHJJKdI0Gi1ogU76Tug21YmfcXnsrOjXT3l5RG8pMbkYiynV1Mowc5a7TOoMuWPyedR4zHZv8tTcxeMfPHu+u3A1Kbzj8TXzPwh0RPPPHEE9P4B4vkcVtvSooTAAAAAElFTkSuQmCC";
    sprt.src = "data:image/png;base64,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";
    text.src = "data:image/png;base64,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";

    const sc_text = "\u000b\u000d\u0002SAY WHAT ???  \u0001\u000e       WHAT IS THIS??   A DEMO WITHOUT ANY BLITTER ANIMATION???....\u000c SORRY!!!  THIS DEMO WAS MADE ON THE ATARI ST, SO I HAVE A GOOD EXCUSE!!!!!...  BUT ANYWAY LETS START.....             \u0009YES THIS WAS MY LITTLE SURPRISE !!!!     I HOPE YOU LIKE IT !!   IF YOU ARE STUPID YOU STILL THINK THAT THIS DEMO WAS MADE ON THE ST !!     LETS NOT TALK ABOUT COMPUTERS WITHOUT CLASS, LETS TALK ABOUT WHO MADE THE CODING BEHIND IT ALL...            \u000d\u000b\u0002PROMAX   \u0001\u000e         \u000a YEAAARHH..      THAT IS ME. YOU KNOW ME FROM ATOMIC TEAM,\u000c I MADE THE SKULL DEMO, THE MUSIC-HACKER ECT.  I JOINED KEFRENS TOGETHER WITH THE REST OF THE TEAM, AND HAVE NOW MADE KEFRENS AN EVEN MORE POWERFULL TEAM !!!  YOU ARE LISTENING TO THE NOISE OF ART, MADE BY...            \u000d\u000b\u0002NIGHTLIGHT \u0001\u000e\u000c       THE\u000c FAMOUS NOTE JUGGLER ALSO FROM KEFRENS !!            \u000a AND LAST BUT NOT LEAST THE GRAPHICS..  LOGO GENERATED TO PERFECTION BY MY SELF !!  COULD YOU HEAR THE LAUGHTER ??    THE TWO DISKS WERE DRAWN BY...          \u000bLAZER   \u0001\u000cAND THE CIRCELING BALLS WERE DRAWN BY JOE FROM TSK, THANKS !!    SO NOW YOU KNOW ALL ABOUT THIS DEMO, OR DO YOU ???  I FORGOT TO MENTION THAT IT WAS RELEASED ON THE BAMIGA SECTOR ONE COPY-PARTY THE 12. OF FEBRUARY 1989.  IT IS A VERY GOOD PARTY, SO I MUST THANK YOU BS1.  I ALSO FORGOT TO TELL YOU THE NAME OF THIS DEMO, IT IS CALLED PSYCHOBALL \u0001!?!   YOU ARE OF COURSE KEEN TO KNOW SOMETHING ABOUT MY FUTURE PROJECTS, BUT I TELL YOU NOTHING!!  SORRY !!   ICU2 HAS ALREADY GUESSED WHAT!! ICU2 IS, IF YOU DONT KNOW ABOUT HIM ALREADY, ONE OF OUR FASTEST SWAPPERS (AMIGA - VHS) SO GIVE HIM A CALL IF YOU ARE INTERESTED.  TALKING ABOUT MEMBERS WE ARE NOW 19 MEMBERS?? SHOCKED ??  YOU KNOW, KEFRENS IS A GROWING GROUP !!      MEMBERS ARE: METALLION, RAZMO, AXE, NIGHTLIGHT, MURPHY, BOX, MEGABYTE, MAGICIAN X, ICU2, LAZER, NONAME, MELLICA, PENTAGRAM, JASON, SPYRO, THE WHIZ KID, ZYCHO, BLAZER, PROMAX AND NO ONE ELSE !!   I'M GETTING SICK AND TIRED OF LOOKING AT THIS WAVEING SCROLLER, SO LET CHANGE TO A MORE MODERATE SHAKING LEVEL....           \u0005NICE !!!!   NOW I CAN THINK AGAIN!!!    \u000bBEFORE YOU FALL ASLEEP, LETS MAKE THE DAY PERFECT AND END UP WITH THE GREETINGS.. EH ???...!!!      SO HERE THEY ARE AS I REMEMBER ICU2 MENTIONED THEM  --               \u0009\u000cSUBWAY AND THE DREAM TEAM  --  ROADRUNNERS  --  THE MAD MONKS  --  NORTHSTAR AND FAIRLIGHT  --  TSK-CREW AND THE ACCUMMULATORS  --  COSMOS  --  THE SILENTS  --  X-MEN (UK & FINLAND)  --  DEATHSTAR (GERMANY)  --  IPEC ELITE  --  THE SUNRIDERS  --  THE AGENTS  --  BAMIGA SECTOR ONE  --  THE WEB INC  --  BROS  --  IT  --  PLASMAFORCE  --  THE DOMINATORS  --  THE SUPPLY TEAM  --  TRIANGLE  --  RISKY BUISNESS BOYS  --  CHANNEL 42  --  PHALLANX  --  THE ARCADIA TEAM  --  ACCESSION  --  THE GANG  --  7UP CREW  --  4TH DIMENTION  --  COOLCAT (AUSTRALIA)  --  COMMANDOFRONTIERS  --  ZIGZAG  --  THE NEW VISIONS  --  HORIZON  --  TOP SWAP  --  DADDY  --  SCRATCH  --  ATOMIC INTELLIGENCE     - END OF GREETINGS -                        \u0009\u000c";
    const sc_len  = sc_text.length;

    const pb_data = new Int32Array([19267584,327680]);
    const pb_sine = [75,75,76,76,77,77,78,78,79,79,80,80,81,81,81,82,82,83,83,84,84,85,85,86,86,86,87,87,88,88,89,89,90,90,91,91,91,92,92,93,93,94,94,95,95,95,96,96,97,97,98,98,99,99,99,100,100,101,101,102,102,102,103,103,104,104,105,105,105,106,106,107,107,107,108,108,109,109,110,110,110,111,111,112,112,112,113,113,114,114,114,115,115,116,116,116,117,117,117,118,118,119,119,119,120,120,120,121,121,122,122,122,123,123,123,124,124,124,125,125,125,126,126,126,127,127,127,128,128,128,129,129,129,130,130,130,131,131,131,131,132,132,132,133,133,133,134,134,134,134,135,135,135,136,136,136,136,137,137,137,137,138,138,138,138,139,139,139,139,140,140,140,140,140,141,141,141,141,142,142,142,142,142,143,143,143,143,143,144,144,144,144,144,144,145,145,145,145,145,145,146,146,146,146,146,146,146,147,147,147,147,147,147,147,148,148,148,148,148,148,148,148,148,148,149,149,149,149,149,149,149,149,149,149,149,149,149,149,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,149,149,149,149,149,149,149,149,149,149,149,149,149,149,148,148,148,148,148,148,148,148,148,148,147,147,147,147,147,147,147,146,146,146,146,146,146,146,145,145,145,145,145,145,144,144,144,144,144,144,143,143,143,143,143,142,142,142,142,142,141,141,141,141,140,140,140,140,140,139,139,139,139,138,138,138,138,137,137,137,137,136,136,136,136,135,135,135,134,134,134,134,133,133,133,132,132,132,131,131,131,131,130,130,130,129,129,129,128,128,128,127,127,127,126,126,126,125,125,125,124,124,124,123,123,123,122,122,122,121,121,120,120,120,119,119,119,118,118,117,117,117,116,116,116,115,115,114,114,114,113,113,112,112,112,111,111,110,110,110,109,109,108,108,107,107,107,106,106,105,105,105,104,104,103,103,102,102,102,101,101,100,100,99,99,99,98,98,97,97,96,96,95,95,95,94,94,93,93,92,92,91,91,91,90,90,89,89,88,88,87,87,86,86,86,85,85,84,84,83,83,82,82,81,81,81,80,80,79,79,78,78,77,77,76,76,75,75,75,74,74,73,73,72,72,71,71,70,70,69,69,69,68,68,67,67,66,66,65,65,64,64,64,63,63,62,62,61,61,60,60,59,59,59,58,58,57,57,56,56,55,55,55,54,54,53,53,52,52,51,51,51,50,50,49,49,48,48,48,47,47,46,46,45,45,45,44,44,43,43,43,42,42,41,41,40,40,40,39,39,38,38,38,37,37,36,36,36,35,35,34,34,34,33,33,33,32,32,31,31,31,30,30,30,29,29,28,28,28,27,27,27,26,26,26,25,25,25,24,24,24,23,23,23,22,22,22,21,21,21,20,20,20,19,19,19,19,18,18,18,17,17,17,16,16,16,16,15,15,15,14,14,14,14,13,13,13,13,12,12,12,12,11,11,11,11,10,10,10,10,10,9,9,9,9,8,8,8,8,8,7,7,7,7,7,6,6,6,6,6,6,5,5,5,5,5,5,4,4,4,4,4,4,4,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,4,4,4,4,4,4,4,5,5,5,5,5,5,6,6,6,6,6,6,7,7,7,7,7,8,8,8,8,8,9,9,9,9,10,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13,14,14,14,14,15,15,15,16,16,16,16,17,17,17,18,18,18,19,19,19,19,20,20,20,21,21,21,22,22,22,23,23,23,24,24,24,25,25,25,26,26,26,27,27,27,28,28,28,29,29,30,30,30,31,31,31,32,32,33,33,33,34,34,34,35,35,36,36,36,37,37,38,38,38,39,39,40,40,40,41,41,42,42,43,43,43,44,44,45,45,45,46,46,47,47,48,48,48,49,49,50,50,51,51,51,52,52,53,53,54,54,55,55,55,56,56,57,57,58,58,59,59,59,60,60,61,61,62,62,63,63,64,64,64,65,65,66,66,67,67,68,68,69,69,69,70,70,71,71,72,72,73,73,74,74,75];

    const rs_sine = [16,16,17,17,18,18,18,19,19,20,20,20,21,21,21,22,22,22,23,23,24,24,24,25,25,25,26,26,26,26,27,27,27,28,28,28,28,29,29,29,29,30,30,30,30,30,30,31,31,31,31,31,31,31,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,31,31,31,31,31,31,31,30,30,30,30,30,30,29,29,29,29,28,28,28,28,27,27,27,26,26,26,26,25,25,25,24,24,24,23,23,22,22,22,21,21,21,20,20,20,19,19,18,18,18,17,17,16,16,16,15,15,14,14,14,13,13,12,12,12,11,11,11,10,10,10,9,9,8,8,8,7,7,7,6,6,6,6,5,5,5,4,4,4,4,3,3,3,3,2,2,2,2,2,2,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,6,6,6,6,7,7,7,8,8,8,9,9,10,10,10,11,11,11,12,12,12,13,13,14,14,14,15,15,16];

    const sf_posx = [300,362,448,498,32,90,140,210,366,296,506,464,60,118,172,242,500,422,384,302,224,150,84,14,434,484,318,332,190,246,48,106,38,112,184,234,280,352,388,458,102,48,246,72,434,2,290,362,106,44,250,168,346,288,456,388,40,110,184,194,310,380,424,486,316,374,428,2,14,72,154,224,380,314,496,480,44,106,192,258,2,436,366,316,210,132,94,28,450,500,306,352,180,230,64,126,50,128,166,248,262,336,402,472,116,68,230,88,422,496,312,378,122,58,230,180,330,268,474,404,56,128,168,216,298,364,442,504,18,72,160];
    const sf_move = [2,4,6,4,6,4,2,4,6,4,2,4,4,2,4,6,6,4,2,4,2,4,6,4,6,4,2,4,2,6,4,2,4,2,6,4,6,2,2,4,6,4,6,4,2,6,2,6,4,2,4,6,4,6,2,2,4,6,4,2,2,4,4,6,4,2,4,6,6,4,2,4,2,4,6,2,2,4,6,4,6,4,2,4,6,4,2,4,4,2,4,6,6,4,2,4,2,4,6,4,6,4,2,4,2,6,4,2,4,2,6,4,6,2,2,4,6,4,6,4,2,6,2,6,4,2,4,6,4,6,2];
    const sf_cols = ["#000","#000","#666","#000","#aaa","#000","#eee"];

    const vs_posy = [98,218,323,429,479,602,720,818,930,1035,1114,1200,1273,1365,1440,1517,1561,1640,1720];
    const vs_len  = vs_posy.length;

    let gb_ctr = 0;
    let gb_pos = 0;

    let pb_pos = 0;
    let rs_pos = 0;

    let eq_bar0 = 11;
    let eq_bar1 = 11;
    let eq_bar2 = 11;
    let eq_bar3 = 11;

    let sc_wait = 0;
    let sc_pos  = 0;
    let sc_offx = 4;
    let sc_offy = 0;
    let sc_sine = 0;
    let sc_skip = 0;
    let sc_grow = 0;
    let sc_jump = 0;

    let vs_ctr = 0;
    let vs_alt = 98;
    let vs_pos = 0;
    let vs_ptr = 1;

    let loop = part1;

    let afid = 0;

    setTimeout(initialize, 100);
  }

/*
  Part 6 Demo
  Kefrens (1989)
  Part 7 of Mega-Demo "Forces of the Pyramids"
  Replay: DOC Soundtracker VI
  Christian Corti 2018
*/
  function part6() {

    function initialize() {
      buf1c.width  = 376;
      buf1c.height = 287;
      buf1x.imageSmoothingEnabled = false;

      buf2c.width  = 312;
      buf2c.height = 8;
      buf2x.imageSmoothingEnabled = false;

      setup();
    }

    function setup() {
      canvx.fillStyle = "#000";
      canvx.fillRect(0,0,376,287);

      cl_objs.length = 1500;
      cl_objs.fill(0,724);

      update();

      for (let i = 0; i < sc_len; i++) {
        sc_code[i] = code.indexOf(sc_text.charAt(i));
      }

      canvc.addEventListener("click", exit);
      document.addEventListener("flodSync", draw);

      player.version = 3;
      player.play();
    }

    function exit(e) {
      cancelAnimationFrame(afid);
      canvc.removeEventListener("click", exit);
      document.removeEventListener("flodSync", draw);

      player.reset();
      loader();
    }

    function draw() {
      buf1x.fillStyle = bg_col;
      buf1x.fillRect(0,0,376,230);

      flash();
      buf1x.fillStyle = fg_col;
      vectors();
      scroll();
      sines();

      buf1x.fillStyle = "#003";
      buf1x.fillRect(0,230,376,57);
      buf1x.drawImage(logo, (62 + cl_data[sc_sine[0]]),198);

      canvx.drawImage(buf1c, 0,0,376,287, 0,0,752,574);

      afid = requestAnimationFrame(draw);
    }

    function blit(x1, y1, x2, y2, width = 0x8000, pattern = 0xffff) {
      let dx = x2 - x1;
      let dy = y2 - y1;
      let i  = 0;

      const f1 = buf1x.fillRect.bind(buf1x);
      const f2 = buf1x.clearRect.bind(buf1x);

      let bltadat = width;
      let bltbdat = pattern;
      let octant  = 0;

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

      const bltamod = 4 * (dy - dx);
      const bltbmod = 4 * dy;

      let bltaptr = (4 * dy) - (2 * dx);
      let bashift = x1 & 0x0f;
      let bltsign = 0 > bltaptr;

      x1 -= bashift;

      do {
        let f = (bltbdat & 1) ? f1 : f2;
        let t = 0x8000;
        let w = bltadat >> bashift;

        for (i = 0; i < 16; i++) {
          if (w & t) { f((x1 + i),y1,1,1); }
          t >>= 1;
        }

        if (!bltsign) {
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

        bltsign = 0 > bltaptr;
        bltbdat = ((bltbdat << 1) | (bltbdat >>> 15)) & 0xffff;
      } while (dx--);
    }

    function flash() {
      if (fl_ctr == 985) {
        sk_ptr1 = cl_objs[cl_pos++];
        sk_ptr2 = cl_objs[cl_pos++];
        sk_ptr3 = cl_objs[cl_pos++];
        sk_ptr4 = cl_objs[cl_pos++];

        sk_skp1 = cl_objs[cl_pos++];
        sk_skp2 = cl_objs[cl_pos++];
        sk_skp3 = cl_objs[cl_pos++];
        sk_skp4 = cl_objs[cl_pos++];

        dt_ptr1 = cl_objs[cl_pos++];
        dt_ptr2 = cl_objs[cl_pos++];
        dt_ptr3 = cl_objs[cl_pos++];
        dt_ptr4 = cl_objs[cl_pos++];

        dt_skp1 = cl_objs[cl_pos++];
        dt_skp2 = cl_objs[cl_pos++];
        dt_skp3 = cl_objs[cl_pos++];
        dt_skp4 = cl_objs[cl_pos++];

        update();

        if (cl_pos == 96) { cl_pos = 0; }
      } else if (fl_ctr == 1000) {
        fl_ctr = 0;
        fl_pos = 0;
        sk_idx = 0;
      } else if (fl_ctr > 969) {
        bg_col = fl_cols[fl_pos];
        fg_col = fl_cols[30 + fl_pos];
        sk_idx = fl_pos * 15;
        fl_pos++;
      }

      fl_ctr++;
    }

    function update() {
      let p1 = 0;
      let p2 = 362;
      let p3 = 0;
      let p4 = 362;

      for (let i = 0; i < 96;) {
        sk_ptrs[i++] = p1;
        sk_ptrs[i++] = p2;
        sk_ptrs[i++] = p3;
        sk_ptrs[i++] = p4;

        p1 += sk_ptr1;
        p2 += sk_ptr2;
        p3 += sk_ptr3;
        p4 += sk_ptr4;
      }

      p1 = 0;
      p2 = 362;
      p3 = 0;
      p4 = 362;

      for (let i = 0; i < 192;) {
        dt_ptrs[i++] = p1;
        dt_ptrs[i++] = p2;
        dt_ptrs[i++] = p3;
        dt_ptrs[i++] = p4;

        p1 += dt_ptr1;
        p2 += dt_ptr2;
        p3 += dt_ptr3;
        p4 += dt_ptr4;
      }
    }

    function vectors() {
      for (let i = 0; i < 48;) {
        let x1 = vc_objs[i];
        let y1 = vc_objs[i + 1];
        let x2 = vc_objs[i + 2];
        let y2 = vc_objs[i + 3];

        blit((113 + vc_data[x2]), (18 + vc_data[y2]), (113 + vc_data[x1]), (18 + vc_data[y1]));

        x1 += 3;
        y1 += 3;
        x2 += 3;
        y2 += 3;

        if (x1 > 360) { x1 -= 360; }
        if (y1 > 722) { y1 -= 360; }
        if (x2 > 360) { x2 -= 360; }
        if (y2 > 722) { y2 -= 360; }

        vc_objs[i++] = x1;
        vc_objs[i++] = y1;
        vc_objs[i++] = x2;
        vc_objs[i++] = y2;
      }
    }

    function sines() {
      let p1 = 0;
      let p2 = 0;

      for (let i = 0; i < 24; i++) {
        let x1 = sk_ptrs[p1 + 0];
        let x2 = sk_ptrs[p1 + 2];
        let y1 = sk_ptrs[p1 + 1];
        let y2 = sk_ptrs[p1 + 3];

        let x = 37 + (cl_data[x1] + cl_data[x2]);
        let y = 18 + (cl_data[y1] + cl_data[y2]);

        buf1x.drawImage(sprt, sk_idx,0,15,14, x,y,15,14);

        x1 += sk_skp1;
        y1 += sk_skp2;
        x2 += sk_skp3;
        y2 += sk_skp4;

        if (x1 > 360) { x1 -= 360; }
        if (y1 > 722) { y1 -= 360; }
        if (x2 > 360) { x2 -= 360; }
        if (y2 > 722) { y2 -= 360; }

        sk_ptrs[p1 + 0] = x1;
        sk_ptrs[p1 + 2] = x2;
        sk_ptrs[p1 + 1] = y1;
        sk_ptrs[p1 + 3] = y2;

        x1 = dt_ptrs[p2 + 0];
        x2 = dt_ptrs[p2 + 2];
        y1 = dt_ptrs[p2 + 1];
        y2 = dt_ptrs[p2 + 3];

        x = 37 + (cl_data[x1] + cl_data[x2]);
        y = 18 + (cl_data[y1] + cl_data[y2]);

        buf1x.fillRect(x,y,1,1);

        x1 += dt_skp1;
        y1 += dt_skp2;
        x2 += dt_skp3;
        y2 += dt_skp4;

        if (x1 > 360) { x1 -= 360; }
        if (y1 > 722) { y1 -= 360; }
        if (x2 > 360) { x2 -= 360; }
        if (y2 > 722) { y2 -= 360; }

        dt_ptrs[p2 + 0] = x1;
        dt_ptrs[p2 + 2] = x2;
        dt_ptrs[p2 + 1] = y1;
        dt_ptrs[p2 + 3] = y2;

        x1 = dt_ptrs[p2 + 4];
        x2 = dt_ptrs[p2 + 6];
        y1 = dt_ptrs[p2 + 5];
        y2 = dt_ptrs[p2 + 7];

        x = 37 + (cl_data[x1] + cl_data[x2]);
        y = 18 + (cl_data[y1] + cl_data[y2]);

        x1 += dt_skp1;
        y1 += dt_skp2;
        x2 += dt_skp3;
        y2 += dt_skp4;

        if (x1 > 360) { x1 -= 360; }
        if (y1 > 722) { y1 -= 360; }
        if (x2 > 360) { x2 -= 360; }
        if (y2 > 722) { y2 -= 360; }

        dt_ptrs[p2 + 4] = x1;
        dt_ptrs[p2 + 6] = x2;
        dt_ptrs[p2 + 5] = y1;
        dt_ptrs[p2 + 7] = y2;

        p1 += 4;
        p2 += 8;
      }
    }

    function scroll() {
      let x = 24;

      for (let i = 0; i < 66; i++) {
        let v = sc_sine[i];
        let y = 58 + cl_data[v];

        buf1x.drawImage(buf2c, x,0,4,8, (37 + x),y,4,8);

        x += 4;
        v += 5;

        if (v > 722) { v -= 360; }
        sc_sine[i] = v;
      }

      if (sc_step == 10) {
        sc_step = 0;

        let cx = sc_code[sc_pos] * 24;

        if (++sc_pos == sc_len) {
          sc_pos = 0;
        }

        buf2x.drawImage(font, cx,0,24,8, 288,0,24,8);
      }

      buf2x.globalCompositeOperation = "copy";
      buf2x.drawImage(buf2c, 3,0,309,8, 0,0,309,8);

      if (fl_pos) {
        buf2x.globalCompositeOperation = "source-atop";
        buf2x.fillStyle = fg_col;
        buf2x.fillRect(0,0,312,8);
      }

      buf2x.globalCompositeOperation = "source-over";

      sc_step++;
    }

    const buf1c = document.createElement("canvas");
    const buf1x = buf1c.getContext("2d", {alpha:false});
    const buf2c = document.createElement("canvas");
    const buf2x = buf2c.getContext("2d");

    const font = new Image();
    const logo = new Image();
    const sprt = new Image();

    font.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABFAAAAAIAQMAAADk25n2AAAABlBMVEUAAACZmZl+9SADAAAAAXRSTlMAQObYZgAAAXpJREFUOMttU0Fqw0AMlOtDjqYv8DdSSPC3GmhxwB9LT/5G+oImN5cuUjWr2QXHWYZFK4+k8UoroyWzlPebmTpgNxo2DBHsX0omd34FXsNgrKhY5lRP7A6JdRDLNCyTRoULGYlU7Ucpk9o3jg+ggjcdpyi8uNNTr5PQ76hSYKs4GgO4PIBoUZVoMhXOhOOsdieNECSi/anDjGIyXKzXNgci1phQumswWfIdBEpJIuPqVhK7YAL0StXwLPj0o3aKv4w9ObIUOnu74f499ojA0cPBKczhHG2SutggStnZhVJYYCMlqlLBsYh4UUNhEoZpcaGDLX5sXcwp+yErLgbwYhgXSqGCjZRtg+hhpdoC68vc7ByLFEI3X23WccZfdjexe/ajiAaYKo4HkX3Vs21Qsx5bkcexNQymdaX3fy4azMbAbO1sE+sNpvTA4K1UpgNSPngZz8d29ZhF6mOuBp7rDkd8/WWnPMVYJkYl6oFTpCRhZjIdGNg9pWwf8z9eT5qTXCANkQAAAABJRU5ErkJggg==";
    logo.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMUAAABMBAMAAAAvqW7TAAAAGFBMVEUAAAAAADNmAABEADP/AACqAACIADPdADO+S0MvAAAAAXRSTlMAQObYZgAABTNJREFUWMO0lF2u4yAMhaNIfZ92BakVbwTBe8cK+9/KOP6JQ2l02+nNeUiBg/lyoGEYhnEaRNo8R0i75jmQcSnT1lTeCYxEHiMnPCUI5oyT0XIW3hmMRN7aeL+8VbKwtE5gxMsn0tOYpXUWQ2Lg4jFO2itkEp7DGDBiTOOiDFDZW2jH4J9bwUB9kvhVZRO0I87nVjA0hl9YmFUKXLRTvrMSaQxR+EyNUvb/03KGxogTglWznVOSnkwwa86ddVzljKcYqa4SLtsoPdvRpE5ndVWzB3HGU4z0WBuLBsw4SC9VnQsAmPfWZSW6BV41Syj+1YypZqLhB8alPJQhUSt1DLecsb70xmAVjyGznOEbouNVLDvEtLMutlfOUMsZ2RhqR5BgSE1j+RckVjDcGq1KGaN+k6gxPmMMXPoOI7ZfTyNGyjEjpr7HAJiUUXFqGXTIKA1j+XGv9DZBixHC9IJxqfXxEcP/u2V6mSOBfk1+kWknF7H2jGrfIC/bM7IKhVEqUMdY2DaGqcyPjqFmz0AZDUapBDi1DIBqfjCIuhxQKzGn26so0kEswKKW0dxuWXqVgT0jLr6GURP4Gg9bcdYgwdAjANrdkOkVA8Jq96qa8sZgLDUMAhaSMvA4h1kdYwQVBoOWCBILjTh5DYvHesbeKhQM157R1G6dsamZDhhuHTOuwrjx9PvVxCN0dd2W6k5vQWMRyWDeD+b0948xpPhbBihjOWD4/Nu9Xwg/ZNQDhk9BerHQN4xCwdCCG+f8hhGDcDcGMIPHAHxlTA3jdn+TAU8MfpLPZ8YaYwvyr9tyS3EciKFoLyFgmO/JrGBMwNnA9AbC9AKCoLIAg739KZ2ypKoum9CE+Wl9JLbulU697ARdqZuDNQxGSAQS6Q+qKgaD7RjclyPGJ/b3s5Y6wyVik9hZqoIB0OYda4XKJW4us4FGvxqGEYuk8deqbHIu6d1P23PrYAbeiTarj7rtu08EScPb+lRDgsG8rIMdY37EcDeLhWR3SH80cDAB27KQYGTRqsJGONFH3hMJcnbK8IcEg3Pmz/Qtav28RdOeGAzGSrJU1YwsxsBu21m0YGDRFKkmmu9mEslzI53eVIwOW72vVZ00qSaa72wSyVaC8Z/jWzEGvx3G8n2xsGQEOfebbzSJZCvBmLzJJCN6shhJ1l3Jud98YhLJsZGUMTzEGjwmwTXbIISkd0XCsvnNN40qYcxJaaTfb67RADO6Mfqu5kZyhkoo+JGcQZl4g02/rjmyTfquV7tDWjVwVAOUkGBAFGugbtVZTXWTTHXXxWeFpDFb1ZaUSlIGg7eF5BIXl3nWlPpRQnIgksbDqrAYkBYwVHMVH+7SZBn7DZB+b6bVqsgWhtgROTkDUfVqgybB5QyXiJCGRFUwOEeb5X7ytQKJxJU/ktTsH92QLkjB4HkIRpmkzzEYRMt4KkXyUoRpqRhYWJ2XGalOLuIM8w9j32h6hbHOwcCx3yh9kfE4YGB/lSGFsR4wmto4V03NeMxAWp4wdjd20JzXkOsYJj1nJEprBi8CkVJz0Uh7x9ol2jnDf6EqxpUBBcPeiYUxJ415j3FxqWVoPbExFnthVQziOhfGejyPhLR+ZgyJFvQojCRMo2WkNcc0wighssNIkrJhlpbhRSopY10ShTUjaSW1YV+u988MXNtggsGNB79R68oytAz2Y2NM3GTIzqODsWPo57VmsAotQ+76be5Jb36kdOeA1oxHkejeMdiOPLL9eSw9g/gaYyz/h9gPtrNlzIeMymrSMSOH/of7B05MDblKxrmbAAAAAElFTkSuQmCC";
    sprt.src = "data:image/png;base64,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";

    const code = "abcdefghijklmnopqrstuvwxyz0123456789,.'?!:()- ";

    const sc_text = "                         welcome to your first experience of the cosmiticial orgasm in democodin' !!!  we (in kefrens) are proud to present ya ... bouncing bones ... coding, painting and music was done by razmo of the megamighty kefrens. theese words of wisdom was typed by icu2 of the same group (kefrens) ... first of all, i wanna welcome our newest members to this gang .. we says hi to all members of: atomic team and all members of: defcon 5 .... if you wanna contact the untouchable (well almost !!) kefrens, ya should write to:   k e f r e n s       p o s t e  r e s t a n t e      3 4 5 0  a l l e r o e d       d e n m a r k  .... all scandinavian lamerletters will n o t be returned (discs will be taken for presents !!!)  if you not have guessed it yet (think not !)  this scrolly waz written at the great copyparty held by bamiga sector one and the warfalcons (good luck guys !!) in denmark .. we sends our best regards to theese crews for a nice time !!  our special goldies will reach the following crews in ranked order ofcourse !!!   subway and the dream team   rebels   northstar and fairlight   tsk-crew and the accummulators   cosmos   the silents   bs1 (dk)   the band   mad monks   x-men   deathstar (germany)   the agents   it   trilogy   the supply team   plasma force   sunriders   the web inc.   triangle   the dominators   accession   coolcat (australia)   alcatraz (new !)   zub zero (new !)   top swap   the link   the gang   .... i'm sorry, if yo not waz mentioned but i lost my greetinglist at home ... to those fellows i can only say one thing:  sorry !!!  ok !  i will now leave this keyboard to another member of kefrens ...   see ya !!!           hi there thiz is the whiz kid  typing a few lines for your entertainment, so what can i write, let's see...... how about some slagging off to a dude who promised a demodisc for a long time ago, but we have still not seen anything from him (he knows it when he sees this text.!!!)       i'm fresh out off words, so i'll turn the board over to someone else.......               ok! now it's my turn to type a few words, my name is mellica.......       ok! a big hello to qrd and the amiga freak of trilogy ------   also a big hello to liteace(cool freak) ofdexion.....     and now get ready for action, razmo the mega cool guy wants to write a lot of shit to you......           ello ere vrybody! hope yar having a cool time here at bamiga-sector 1 and warfalcons copyparty!!! i hope you like my little demo here, i'm sorry about the lack of graphix but as you all know(i think) i had to spend a lot of time working on my new product named: sound-machine!!! ... if ya havent gotten it already im sure you will get it very soon! i have worked on it for a very long time and it wasn't very much fun correcting those dirty bugs! anyway, use it! it's quite usefull! ... ... ... i would now like to send some music greetings to some cool composers. i'm sorry if you are not mentioned but not everybody has got 1 mega byte!(if you know what i mean?) ... music greetings to:(no special order! all make good music his own way!)      sll(nice work! keep it up!)   biboy(cool! keep it up too! and thanks for the greet!) ... ... ... jesper kyd(cool too! keep up!) ... ... ... i've got nothing more to say! bye!... ....  .   .  ... ... . .                                                         ";
    const sc_len  = sc_text.length;
    const sc_code = [];
    const sc_sine = [362,364,366,368,370,372,374,376,378,380,382,384,386,388,390,392,394,396,398,400,402,404,406,408,410,412,414,416,418,420,422,424,426,428,430,432,434,436,438,440,442,444,446,448,450,452,454,456,458,460,462,464,466,468,470,472,474,476,478,480,482,484,486,488,490,492];

    const vc_data = [80,81,83,84,86,87,88,90,91,92,94,95,97,98,99,101,102,103,105,106,107,109,110,111,112,114,115,116,117,119,120,121,122,123,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,145,146,147,148,148,149,150,151,151,152,152,153,154,154,155,155,156,156,156,157,157,158,158,158,158,159,159,159,159,160,160,160,160,160,160,160,160,160,160,160,160,160,159,159,159,159,159,158,158,158,157,157,157,156,156,155,155,154,154,153,153,152,152,151,150,150,149,148,147,147,146,145,144,143,143,142,141,140,139,138,137,136,135,134,133,132,131,130,129,128,126,125,124,123,122,121,119,118,117,116,114,113,112,111,109,108,107,105,104,103,101,100,99,97,96,95,93,92,90,89,88,86,85,84,82,81,79,78,77,75,74,72,71,70,68,67,66,64,63,61,60,59,57,56,55,53,52,51,50,48,47,46,44,43,42,41,40,38,37,36,35,34,33,31,30,29,28,27,26,25,24,23,22,21,20,19,18,18,17,16,15,14,13,13,12,11,11,10,9,9,8,7,7,6,6,5,5,4,4,3,3,3,2,2,2,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,4,4,4,5,5,6,6,7,8,8,9,9,10,11,11,12,13,14,15,15,16,17,18,19,20,21,22,22,23,24,25,26,28,29,30,31,32,33,34,35,36,38,39,40,41,42,44,45,46,47,49,50,51,53,54,55,57,58,59,61,62,63,65,66,67,69,70,72,73,74,76,77,78,0,160,160,160,160,160,160,160,159,159,159,159,159,158,158,158,157,157,157,156,156,155,155,154,154,153,153,152,151,151,150,149,149,148,147,146,146,145,144,143,142,141,140,140,139,138,137,136,135,134,133,132,131,129,128,127,126,125,124,123,121,120,119,118,117,115,114,113,112,110,109,108,106,105,104,102,101,100,98,97,96,94,93,91,90,89,87,86,85,83,82,80,79,78,76,75,73,72,71,69,68,67,65,64,62,61,60,58,57,56,54,53,52,50,49,48,47,45,44,43,42,40,39,38,37,36,35,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,16,15,14,13,12,12,11,10,10,9,8,8,7,7,6,6,5,5,4,4,3,3,3,2,2,2,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,2,2,2,3,3,3,4,4,5,5,6,6,7,7,8,8,9,10,10,11,12,12,13,14,15,16,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,36,37,38,39,40,42,43,44,45,47,48,49,50,52,53,54,56,57,58,60,61,62,64,65,66,68,69,71,72,73,75,76,77,79,80,82,83,84,86,87,89,90,91,93,94,95,97,98,100,101,102,104,105,106,108,109,110,111,113,114,115,116,118,119,120,121,122,124,125,126,127,128,129,130,131,133,134,135,136,137,138,139,139,140,141,142,143,144,145,146,146,147,148,149,149,150,151,151,152,152,153,154,154,155,155,156,156,156,157,157,158,158,158,159,159,159,159,159,160,160,160,160,160,160,0];
    const vc_objs = [5,367,58,367,58,367,58,420,5,367,32,394,58,367,32,394,58,420,32,394,58,420,5,367,185,547,238,547,238,547,238,600,185,547,212,574,238,547,212,574,238,600,212,574,238,600,185,547];

    const cl_data = [75,76,78,79,80,82,83,84,85,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,105,107,108,109,110,111,112,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,131,132,133,134,135,136,136,137,138,138,139,140,140,141,142,142,143,143,144,144,145,145,146,146,147,147,147,148,148,148,149,149,149,149,149,150,150,150,150,150,150,150,150,150,150,150,150,150,149,149,149,149,149,148,148,148,148,147,147,146,146,146,145,145,144,144,143,143,142,141,141,140,140,139,138,137,137,136,135,134,134,133,132,131,130,129,128,127,127,126,125,124,123,122,121,120,118,117,116,115,114,113,112,111,110,108,107,106,105,104,102,101,100,99,98,96,95,94,93,91,90,89,87,86,85,84,82,81,80,78,77,76,74,73,72,71,69,68,67,65,64,63,61,60,59,58,56,55,54,53,51,50,49,48,46,45,44,43,42,41,39,38,37,36,35,34,33,32,31,30,28,27,26,25,25,24,23,22,21,20,19,18,17,16,16,15,14,13,13,12,11,11,10,9,9,8,7,7,6,6,5,5,4,4,4,3,3,2,2,2,2,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,2,2,2,3,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,11,11,12,13,14,14,15,16,17,18,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,39,40,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,70,71,72,74,0,80,80,80,80,80,80,80,80,80,80,79,79,79,79,79,79,78,78,78,78,78,77,77,77,77,76,76,76,75,75,75,74,74,74,73,73,72,72,72,71,71,70,70,69,69,68,68,67,67,66,66,65,65,64,64,63,62,62,61,61,60,60,59,58,58,57,56,56,55,54,54,53,53,52,51,51,50,49,48,48,47,46,46,45,44,44,43,42,42,41,40,39,39,38,37,37,36,35,35,34,33,33,32,31,31,30,29,29,28,27,27,26,25,25,24,23,23,22,21,21,20,20,19,18,18,17,17,16,16,15,15,14,13,13,12,12,11,11,10,10,10,9,9,8,8,7,7,7,6,6,6,5,5,5,4,4,4,3,3,3,3,2,2,2,2,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,6,6,7,7,7,8,8,9,9,10,10,10,11,11,12,12,13,13,14,14,15,16,16,17,17,18,18,19,20,20,21,21,22,23,23,24,25,25,26,26,27,28,28,29,30,30,31,32,33,33,34,35,35,36,37,37,38,39,39,40,41,42,42,43,44,44,45,46,46,47,48,48,49,50,50,51,52,52,53,54,54,55,56,56,57,58,58,59,59,60,61,61,62,62,63,64,64,65,65,66,66,67,67,68,68,69,69,70,70,71,71,72,72,72,73,73,74,74,74,75,75,75,76,76,76,77,77,77,77,78,78,78,78,78,79,79,79,79,79,79,79,80,80,80,80,80,80,80,80,0];
    const cl_objs = [0,15,15,30,2,4,0,4,0,8,8,8,3,4,0,2,24,24,8,8,3,3,3,3,8,8,16,8,4,0,0,0,30,30,26,28,4,5,2,3,8,24,16,16,2,0,2,0,15,15,15,15,0,0,3,5,0,8,8,0,3,3,3,3,0,6,8,24,7,6,5,0,0,0,8,8,6,4,0,4,1,16,0,6,0,1,4,6,6,6,4,16,6,4,5,0];

    const sk_ptrs = new Array(96);
    const dt_ptrs = new Array(192);

    const fl_cols = [
      "#000","#111","#222","#333","#444","#555","#666","#777","#888","#999","#aaa","#bbb","#ccc","#ddd","#eee",
      "#fff","#eee","#ddd","#ccc","#bbb","#aaa","#999","#888","#777","#666","#555","#444","#333","#222","#111",
      "#999","#999","#999","#aaa","#aaa","#aaa","#bbb","#bbb","#ccc","#ccc","#ddd","#ddd","#eee","#eee","#fff",
      "#fff","#eee","#eee","#ddd","#ddd","#ccc","#ccc","#bbb","#bbb","#aaa","#aaa","#aaa","#999","#999","#999"
    ];

    let bg_col = fl_cols[0];
    let fg_col = fl_cols[30];

    let fl_ctr = 0;
    let fl_pos = 0;
    let cl_pos = 0;

    let sc_pos  = 0;
    let sc_step = 0;

    let sk_idx  = 0;
    let sk_ptr1 = 0;
    let sk_ptr2 = 0;
    let sk_ptr3 = 0;
    let sk_ptr4 = 0;
    let sk_skp1 = 0;
    let sk_skp2 = 0;
    let sk_skp3 = 0;
    let sk_skp4 = 0;

    let dt_ptr1 = 0;
    let dt_ptr2 = 0;
    let dt_ptr3 = 0;
    let dt_ptr4 = 0;
    let dt_skp1 = 0;
    let dt_skp2 = 0;
    let dt_skp3 = 0;
    let dt_skp4 = 0;

    let afid = 0;

    setTimeout(initialize, 100);
  }

/*
  Latest Stuff
  Kefrens (1989)
  Part 7 of Mega-Demo "Forces of the Pyramids"
  Replay: Master Soundtracker 1.0
  Christian Corti 2018
*/
  function part7() {

    function initialize() {
      buf1c.width  = 376;
      buf1c.height = 287;
      buf1x.imageSmoothingEnabled = false;

      buf2c.width  = 32;
      buf2c.height = 548;
      buf2x.imageSmoothingEnabled = false;

      setup();
    }

    function setup() {
      let v = 0;

      for (let i = 0; i < 10; i++) {
        st1_hrz[i] = v;
        st2_hrz[i] = v;
        st3_hrz[i] = v;

        v += Math.floor(Math.random() * 256);

        if (v >= 280) { v = 0; }
      }

      for (let i = 0; i < sc_len; i++) {
        sc_code[i] = code.indexOf(sc_text.charAt(i));
      }

      canvc.addEventListener("click", exit1);
      document.addEventListener("flodSync", draw);

      player.version = 4;
      player.play();
    }

    function exit1(e) {
      cancelAnimationFrame(afid);
      canvc.removeEventListener("click", exit1);
      document.removeEventListener("flodSync", draw);

      buf1x.drawImage(back,  0,0,376,287,   0, 0,376,287);
      buf1x.drawImage(cols,  0,0, 32,256,  60,14, 32,256);
      buf1x.drawImage(cols, 32,0, 32,256, 300,14, 32,256);

      canvx.drawImage(buf1c, 0,0,376,287, 0,0,752,574);

      requestAnimationFrame(fade);
    }

    function exit2() {
      document.removeEventListener("flodFade", exit2);

      player.reset();
      setTimeout(loader, 1000);
    }

    function draw() {
      buf1x.drawImage(back, 0,14,376,273, 0,14,376,273);

      if (sp_flag) { blink(); }
      stars();
      scroll();

      if (--str_ctr == 0) {
        str_ctr = 3;

        if (str_spd != str_dir) {
          if (str_spd < str_dir) {
            str_dir--;
          } else {
            str_dir++;
          }
        }
      }

      equalizer();

      buf1x.drawImage(back, 0,0,376,14, 0,0,376,14);

      canvx.drawImage(buf1c, 0,0,376,287, 0,0,752,574);

      afid = requestAnimationFrame(draw);
    }

    function blink() {
      buf1x.drawImage(sprt, sp_ptr,0,16,13, sp_data[sp_pos],sp_data[sp_pos + 1],16,13);

      if (--sp_ctr == 0) {
        sp_ctr = 3;
        sp_ptr += 16;

        if (sp_ptr == 256) {
          sp_flag = 0;
          sp_pos += 2;
          sp_ptr  = 0;

          if (sp_pos == 8) { sp_pos = 0; }
        }
      }
    }

    function equalizer() {
      for (let i = 0; i < 26; i++) {
        if (eq_data[i] > 1) {
          eq_data[i]--;
        }
      }

      let o = player.audioCache;

      for (let i = 0; i < 4; i++) {
        let n = o.last[i];

        if (n) {
          let p = eq_note.indexOf(n);
          if (p < 0) { p = 1; }

          if (eq_data[p - 1] < 41) {
            eq_data[p - 1] += 1;
          }

          if (eq_data[p] < 41) {
            eq_data[p] += 3;
          }

          if (eq_data[p + 1] < 41) {
            eq_data[p + 1] += 1;
          }
        }
      }

      let x = 93;

      for (let i = 0; i < 26; i++) {
        let v = eq_data[i];
        let y = 270 - v;

        while (y < 270) {
          buf1x.fillStyle = eq_cols[v];
          buf1x.fillRect(x,y,6,1);
          v -= 2;
          y += 2;
        }

        x += 8;
      }
    }

    function fade() {
      if (tx_h != 0) {
        buf1x.drawImage(text, 0,0,128,tx_h, 133,64,128,tx_h);
        tx_h++;
      } else {
        buf1x.drawImage(back, 0,14,1,256, ex_x,14,1,256);
        buf1x.drawImage(back, 0,14,1,256, ex_w,14,1,256);
        buf1x.drawImage(back, 0,ex_h,1,1, 0,ex_h,376,1);

        ex_x++;
        ex_w--;

        if (--ex_h == 197) { tx_h = 1; }
      }

      canvx.drawImage(buf1c, 0,0,376,287, 0,0,752,574);

      if (tx_h < 116) {
        requestAnimationFrame(fade);
      } else {
        document.addEventListener("flodFade", exit2);
        player.stop(4);
      }
    }

    function scroll() {
      buf1x.drawImage(cols, 32,  0,32,104, 300, 14,32,104);
      buf1x.drawImage(cols, 32,184,32, 72, 300,198,32, 72);
      buf1x.drawImage(cols,  0,104,32, 80,  60,118,32, 80);

      buf2x.globalCompositeOperation = "copy";
      buf2x.drawImage(buf2c, 0,2,32,546, 0,0,32,546);
      buf2x.globalCompositeOperation = "source-over";

      const pix = buf2x.getImageData(0,256,32,2);
      const buf = new DataView(pix.data.buffer);
      const len = buf.byteLength;

      for (let i = 0; i < len; i += 4) {
        let c = buf.getUint32(i);

        if (c == 0xccbb00ff) {
          c = 0xaa7722ff;
        } else if (c == 0xaa7722ff) {
          c = 0x995511ff;
        } else if (c == 0x995522ff) {
          c = 0x773311ff;
        }

        buf.setUint32(i, c);
      }

      buf2x.putImageData(pix, 0,256);

      if (--sc_step == 0) {
        sc_step = 19;

        do {
          let cx = sc_code[sc_pos];

          if (++sc_pos == sc_len) {
            sc_pos = 0;
          }

          if (cx == 40) {
            str_spd = -(sc_code[sc_pos++] - 30);
          } else if (cx == 41) {
            str_spd = sc_code[sc_pos++] - 30;
          } else if (cx == 42) {
            sc_font = 0;
          } else if (cx == 43) {
            sc_font = 32;
          } else if (cx == 44) {
            sp_flag = 1;
          } else {
            cx *= 32;
            buf2x.drawImage(font, cx,sc_font,32,32, 0,516,32,32);
            break;
          }
        } while (true);
      }

      let y1 = 255;
      let y2 = 260;

      for (let i = 0, dy = 14; i < 256; i++, dy++) {
        buf1x.drawImage(buf2c, 0,y1--,32,1, sc_loff[i],dy,32,1);
        buf1x.drawImage(buf2c, 0,y2++,32,1, sc_roff[i],dy,32,1);
      }

      buf1x.drawImage(cols, 32,104,32, 80, 300,118,32, 80);
      buf1x.drawImage(cols,  0,  0,32,104,  60, 14,32,104);
      buf1x.drawImage(cols,  0,184,32, 72,  60,198,32, 72);
    }

    function stars() {
      let v = 0;
      let x = 0;
      let y = 0;

      let p1 = st1_pos;
      let p2 = st2_pos;
      let p3 = st3_pos;

      for (let i = 0; i < 10; i++) {
        p1 += 52;

        if (p1 < 0) {
          p1 += 516;
        } else if (p1 > 515) {
          p1 -= 516;
        }

        v = st1_hrz[i];
        x = (st_posx[p1] * v) >> 8;

        if (x >= 104 || x < -104) {
          st1_hrz[i] = Math.floor(Math.random() * 256) >> 4;
        } else {
          y = 90 + ((st_posy[p1] * v) >> 8);

          if (y < 38 || y >= 202) {
            buf1x.fillStyle = "#fff";
          } else if (y < 48 || y >= 192) {
            buf1x.fillStyle = "#eee";
          } else if (y < 58 || y >= 182) {
            buf1x.fillStyle = "#ddd";
          } else if (y < 68 || y >= 172) {
            buf1x.fillStyle = "#ccc";
          } else if (y < 78 || y >= 162) {
            buf1x.fillStyle = "#bbb";
          } else if (y < 88 || y >= 152) {
            buf1x.fillStyle = "#aaa";
          } else if (y < 98 || y >= 142) {
            buf1x.fillStyle = "#999";
          } else {
            buf1x.fillStyle = "#888";
          }

          buf1x.fillRect((196 + x),y,1,1);

          if (v > 230) {
            v += 8;
          } else if (v > 184) {
            v += 6;
          } else if (v > 138) {
            v += 4;
          } else if (v > 92) {
            v += 3;
          } else if (v > 46) {
            v += 2;
          } else {
            v++;
          }

          if (v >= 280) {
            v = Math.floor(Math.random() * 256) >> 4;
          }

          st1_hrz[i] = v;
        }

        p2 += 52;

        if (p2 < 0) {
          p2 += 516;
        } else if (p2 > 515) {
          p2 -= 516;
        }

        v = st2_hrz[i];
        x = (st_posx[p2] * v) >> 8;

        if (x >= 104 || x < -104) {
          st2_hrz[i] = Math.floor(Math.random() * 256) >> 4;
        } else {
          y = 90 + (((st_posy[p2] + 10) * v) >> 8);

          if (y < 38 || y >= 202) {
            buf1x.fillStyle = "#fff";
          } else if (y < 48 || y >= 192) {
            buf1x.fillStyle = "#eee";
          } else if (y < 58 || y >= 182) {
            buf1x.fillStyle = "#ddd";
          } else if (y < 68 || y >= 172) {
            buf1x.fillStyle = "#ccc";
          } else if (y < 78 || y >= 162) {
            buf1x.fillStyle = "#bbb";
          } else if (y < 88 || y >= 152) {
            buf1x.fillStyle = "#aaa";
          } else if (y < 98 || y >= 142) {
            buf1x.fillStyle = "#999";
          } else {
            buf1x.fillStyle = "#888";
          }

          buf1x.fillRect((196 + x),y,1,1);

          if (v > 230) {
            v += 10;
          } else if (v > 184) {
            v += 8;
          } else if (v > 138) {
            v += 6;
          } else if (v > 92) {
            v += 4;
          } else if (v > 46) {
            v += 2;
          } else {
            v++;
          }

          if (v >= 280) {
            v = Math.floor(Math.random() * 256) >> 4;
          }

          st2_hrz[i] = v;
        }

        p3 += 52;

        if (p3 < 0) {
          p3 += 516;
        } else if (p3 > 515) {
          p3 -= 516;
        }

        v = st3_hrz[i];
        x = (st_posx[p3] * v) >> 8;

        if (x >= 104 || x < -104) {
          st3_hrz[i] = Math.floor(Math.random() * 256) >> 4;
        } else {
          y = 115 + (((st_posy[p3] + 30) * v) >> 8);

          if (y < 38 || y >= 202) {
            buf1x.fillStyle = "#fff";
          } else if (y < 48 || y >= 192) {
            buf1x.fillStyle = "#eee";
          } else if (y < 58 || y >= 182) {
            buf1x.fillStyle = "#ddd";
          } else if (y < 68 || y >= 172) {
            buf1x.fillStyle = "#ccc";
          } else if (y < 78 || y >= 162) {
            buf1x.fillStyle = "#bbb";
          } else if (y < 88 || y >= 152) {
            buf1x.fillStyle = "#aaa";
          } else if (y < 98 || y >= 142) {
            buf1x.fillStyle = "#999";
          } else {
            buf1x.fillStyle = "#888";
          }

          buf1x.fillRect((196 + x),y,1,1);

          if (v > 230) {
            v += 13;
          } else if (v > 184) {
            v += 10;
          } else if (v > 138) {
            v += 7;
          } else if (v > 92) {
            v += 5;
          } else if (v > 46) {
            v += 3;
          } else {
            v += 2;
          }

          if (v >= 280) {
            v = Math.floor(Math.random() * 256) >> 4;
          }

          st3_hrz[i] = v;
        }
      }

      st1_pos += str_dir;

      if (st1_pos < 0) {
        st1_pos += 516;
      } else if (st1_pos > 515) {
        st1_pos -= 516;
      }

      st2_pos += str_dir;

      if (st2_pos < 0) {
        st2_pos += 516;
      } else if (st2_pos > 515) {
        st2_pos -= 516;
      }

      st3_pos += str_dir;

      if (st3_pos < 0) {
        st3_pos += 516;
      } else if (st3_pos > 515) {
        st3_pos -= 516;
      }
    }

    const buf1c = document.createElement("canvas");
    const buf1x = buf1c.getContext("2d", {alpha:false});
    const buf2c = document.createElement("canvas");
    const buf2x = buf2c.getContext("2d");

    const back = new Image();
    const cols = new Image();
    const font = new Image();
    const sprt = new Image();
    const text = new Image();

    back.src = "data:image/png;base64,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";
    cols.src = "data:image/png;base64,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";
    font.src = "data:image/png;base64,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";
    sprt.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAAANAgMAAADqNwvGAAAACVBMVEUAAAD//////4i9GUH8AAAAAXRSTlMAQObYZgAAAJxJREFUKM+tkjEOwjAMRb+jtBJbRroxcBCOwBEYOAhHYOgBGDgo/8vygJK2ilonT4qlH9txjC3L3AK9ZkBJwAXdduN6cfVZBooB1zFwP6+nIncKC3A6A9MUuG9GpCHVRXsDAxkf5Em+gfuJ2Cyd9H8XQ6izkz6B/EpTB7BZGdqZVdHgQRZKF9Z+cynqiXSrzW53G3nHPx89Ybtm+wfCpR4170hZ3wAAAABJRU5ErkJggg==";
    text.src = "data:image/png;base64,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";

    const code = " abcdefghijklmnopqrstuvwxyzK?-0123456789VHWMS";

    const sc_text = "    V6   H3   V2   S    W oV1oops H4yeahhS   there is a Sscroller in this demo  - - -metallion H6of K kefrH8eV4ns K preSsents latest stuff for the wondermigaS     before this turns into a mega greetings demo  H3i wanna tell ya that  this nice picture was made bya Snew membeV5r of kefrens called K box K   thanx to you pall  you sure know H2how toS handle the pixels     music was made by the great master oSf st  jesper kyd    this font was made by theV1 H2whiz kid  MandS this was drawn by myself - - - -    all coding and design by K metalliSon K    it was V6finiSshed at the bamiga sectoSr 1  and  warSfalcons  copyparty  12 feb 89  H2  i just wanna say hello tSo some nice guys i met at the party V4   hello to  litSeace and others of dexion  -  the amiga freakS and qrd of trilogy  -  cat of shadow software  and some other paH3lls fromS  subway and dreamteam  -  the band  -  warfalcons   and lotSs a other freaks i dont remember righH6t now  - -S - - - ok no more shit now   some otheSr membersV2 of kefrens gonna write some text H8now  so bySe to you and hello to - - -  yeah this is mellica in another scroll  oohhhh shit i really dont know what to write   but anywayS lets type some H6shit first of all there is lot of cool demos here so it will be a very hard competition     S well what do you think about this demo cool eh    well i think so     V9 S H7 okey lets stop this crap and giveS H6the keyboaSrd to another kefrens member mmmhhhh lets see who should it be razmo eeehhhh the whiz kSidV4 yeah yeah        hi there thiz is the whiz kid, oh wait a moment  hold on..!! mmmm  i think i will write with these chars..!!     Wor maybe these chars, yeah i think i will use those chars ,coz i made em, i really cannot find anything to write about i have lost count of all those demos i have written in today, so i am fed up with writing scrolltexts, this means nothing more from me  bye bye     ok i am back     heres icu2 of the megamighty kefrens  this copyparty is really wery fucking great, cause i am meeting a lot of my best pals      ok    i have to admit that i made a little ?? mistake in the other demos by not metentioning vision factory and co -the beyonders- between the cool crews at this party  but i was not sure  if you had leaven this party  so i will now mention all the cool crews  witch have visited the party the 11-2-89   vision factory and the beyonders - subway and the dream team - pirahnas - trilogy - the supply team - beastie boys - the silents - bamiga sector one -ofcourse- - rebels - goonies and ofcourse us -kefrens-   i will only send my top 15 regards duke to lack of time, so here they go   subway and the dream team - rebels--old roadrunners-- northstar and fairlight - tsk and acc - cosmos - the band - the silents - bamiga sector one dk - trilogy - pirahnas - mad monks - the agents - it - the supply team-hi martin - the sunriders    ok    see ya later   by the way   write to us at   kefrens   poste restante      3450 alleroed      denmark                 see yo all in our next demos                                ";
    const sc_len  = sc_text.length;
    const sc_code = [];

    const sc_loff = [179,176,173,171,169,167,164,162,160,158,155,153,151,149,146,144,142,140,138,136,133,131,129,127,125,123,121,119,117,115,113,111,109,107,105,103,101,99,97,95,93,91,90,88,86,84,82,81,79,77,76,74,73,71,69,68,66,65,63,62,61,59,58,57,55,54,53,51,50,49,48,47,46,45,44,43,42,41,40,39,38,38,37,36,35,35,34,33,33,32,32,31,31,30,30,30,29,29,29,29,28,28,28,28,28,28,28,28,28,28,29,29,29,30,30,31,31,32,33,33,34,35,36,37,38,39,40,41,42,43,44,45,46,48,49,50,51,53,54,55,57,58,59,61,62,63,65,66,67,69,70,71,72,74,75,76,77,78,79,80,81,82,83,84,85,86,87,87,88,89,89,90,90,91,91,91,92,92,92,92,92,92,92,92,92,91,91,91,90,90,89,89,88,87,87,86,85,84,83,82,81,80,79,78,77,76,75,74,72,71,70,69,67,66,65,63,62,61,59,58,57,55,54,53,51,50,49,48,46,45,44,43,42,41,40,39,38,37,36,35,34,33,33,32,31,31,30,30,29,29,29,28,28,28,28,28];
    const sc_roff = [181,184,187,189,191,193,196,198,200,202,205,207,209,211,214,216,218,220,222,224,227,229,231,233,235,237,239,241,243,245,247,249,251,253,255,257,259,261,263,265,267,269,270,272,274,276,278,279,281,283,284,286,287,289,291,292,294,295,297,298,299,301,302,303,305,306,307,309,310,311,312,313,314,315,316,317,318,319,320,321,322,322,323,324,325,325,326,327,327,328,328,329,329,330,330,330,331,331,331,331,332,332,332,332,332,332,332,332,332,332,331,331,331,330,330,329,329,328,327,327,326,325,324,323,322,321,320,319,318,317,316,315,314,312,311,310,309,307,306,305,303,302,301,299,298,297,295,294,293,291,290,289,288,286,285,284,283,282,281,280,279,278,277,276,275,274,273,273,272,271,271,270,270,269,269,269,268,268,268,268,268,268,268,268,268,269,269,269,270,270,271,271,272,273,273,274,275,276,277,278,279,280,281,282,283,284,285,286,288,289,290,291,293,294,295,297,298,299,301,302,303,305,306,307,309,310,311,312,314,315,316,317,318,319,320,321,322,323,324,325,326,327,327,328,329,329,330,330,331,331,331,332,332,332,332,332];

    const sp_data = [173,70,201,70,177,22,189,22];

    const st1_hrz = new Array(10);
    const st2_hrz = new Array(10);
    const st3_hrz = new Array(10);

    const st_posx = [160,160,160,160,160,160,160,160,160,160,159,159,159,159,159,159,158,158,158,158,158,157,157,157,157,156,156,156,155,155,155,154,154,153,153,153,152,152,151,151,150,150,149,149,148,148,147,147,146,146,145,144,144,143,143,142,141,141,140,139,139,138,137,136,136,135,134,133,133,132,131,130,129,129,128,127,126,125,124,123,-126,-127,-128,-129,-129,-130,-131,-132,-133,-133,-134,-135,-136,-136,-137,-138,-139,-139,-140,-141,-141,-142,-143,-143,-144,-144,-145,-146,-146,-147,-147,-148,-148,-149,-149,-150,-150,-151,-151,-152,-152,-153,-153,-153,-154,-154,-155,-155,-155,-156,-156,-156,-157,-157,-157,-157,-158,-158,-158,-158,-158,-159,-159,-159,-159,-159,-159,-160,-160,-160,-160,-160,-160,-160,-160,-160,-160,-160,-160,-160,-160,-160,-160,-160,-160,-160,-159,-159,-159,-159,-159,-159,-158,-158,-158,-158,-158,-157,-157,-157,-157,-156,-156,-156,-155,-155,-155,-154,-154,-153,-153,-153,-152,-152,-151,-151,-150,-150,-149,-149,-148,-148,-147,-147,-146,-146,-145,-144,-144,-143,-143,-142,-141,-141,-140,-139,-139,-138,-137,-136,-136,-135,-134,-133,-133,-132,-131,-130,-129,-129,-128,-127,-126,-125,-124,-123,-123,-122,-121,-120,-119,-118,-117,-116,-115,-114,-113,-112,-111,-110,-109,-108,-107,-106,-105,-104,-103,-102,-101,-100,-99,-97,-96,-95,-94,-93,-92,-91,-89,-88,-87,-86,-85,-84,-82,-81,-80,-79,-78,-76,-75,-74,-73,-71,-70,-69,-68,-66,-65,-64,-63,-61,-60,-59,-57,-56,-55,-53,-52,-51,-49,-48,-47,-45,-44,-43,-41,-40,-39,-37,-36,-35,-33,-32,-31,-29,-28,-26,-25,-24,-22,-21,-19,-18,-17,-15,-14,-13,-11,-10,-8,-7,-6,-4,-3,-1,0,1,3,4,6,7,8,10,11,13,14,15,17,18,19,21,22,24,25,26,28,29,31,32,33,35,36,37,39,40,41,43,44,45,47,48,49,51,52,53,55,56,57,59,60,61,63,64,65,66,68,69,70,71,73,74,75,76,78,79,80,81,82,84,85,86,87,88,89,91,92,93,94,95,96,97,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,123,124,125,126,127,128,129,129,130,131,132,133,133,134,135,136,136,137,138,139,139,140,141,141,142,143,143,144,144,145,146,146,147,147,148,148,149,149,150,150,151,151,152,152,153,153,153,154,154,155,155,155,156,156,156,157,157,157,157,158,158,158,158,158,159,159,159,159,159,159,160,160,160,160,160,160,160,160,160];
    const st_posy = [23,24,25,26,27,29,30,31,32,33,34,35,36,37,38,40,41,42,43,44,45,46,47,48,49,50,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,87,88,89,90,91,92,93,94,95,96,97,98,99,99,100,101,102,103,104,101,100,99,99,98,97,96,95,94,93,92,91,90,89,88,87,86,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,67,66,65,64,63,62,61,60,59,58,57,56,55,54,53,52,50,49,48,47,46,45,44,43,42,41,40,38,37,36,35,34,33,32,31,30,29,27,26,25,24,23,22,21,20,19,17,16,15,14,13,12,11,10,9,8,6,5,4,3,2,1,0,-1,-2,-3,-4,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15,-16,-17,-18,-19,-20,-21,-23,-24,-25,-26,-27,-28,-29,-30,-31,-32,-33,-34,-35,-36,-37,-38,-39,-40,-41,-41,-42,-43,-44,-45,-46,-47,-48,-49,-50,-51,-52,-53,-53,-54,-55,-56,-57,-58,-59,-59,-60,-61,-62,-63,-64,-64,-65,-66,-67,-68,-68,-69,-70,-71,-71,-72,-73,-74,-74,-75,-76,-76,-77,-78,-78,-79,-80,-80,-81,-82,-82,-83,-84,-84,-85,-85,-86,-86,-87,-88,-88,-89,-89,-90,-90,-91,-91,-92,-92,-93,-93,-93,-94,-94,-95,-95,-96,-96,-96,-97,-97,-97,-98,-98,-98,-99,-99,-99,-100,-100,-100,-100,-101,-101,-101,-101,-102,-102,-102,-102,-102,-103,-103,-103,-103,-103,-103,-103,-104,-104,-104,-104,-104,-104,-104,-104,-104,-104,-104,-104,-104,-104,-104,-104,-104,-104,-104,-104,-104,-103,-103,-103,-103,-103,-103,-103,-102,-102,-102,-102,-102,-101,-101,-101,-101,-100,-100,-100,-100,-99,-99,-99,-98,-98,-98,-97,-97,-97,-96,-96,-96,-95,-95,-94,-94,-93,-93,-93,-92,-92,-91,-91,-90,-90,-89,-89,-88,-88,-87,-86,-86,-85,-85,-84,-84,-83,-82,-82,-81,-80,-80,-79,-78,-78,-77,-76,-76,-75,-74,-74,-73,-72,-71,-71,-70,-69,-68,-68,-67,-66,-65,-64,-64,-63,-62,-61,-60,-59,-59,-58,-57,-56,-55,-54,-53,-53,-52,-51,-50,-49,-48,-47,-46,-45,-44,-43,-42,-41,-41,-40,-39,-38,-37,-36,-35,-34,-33,-32,-31,-30,-29,-28,-27,-26,-25,-24,-23,-21,-20,-19,-18,-17,-16,-15,-14,-13,-12,-11,-10,-9,-8,-7,-6,-4,-3,-2,-1,0,1,2,3,4,5,6,8,9,10,11,12,13,14,15,16,17,19,20,21,22];

    const eq_data = [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0];
    const eq_note = [0,0,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127];
    const eq_cols = ["#00e","#00e","#00e","#00d","#00d","#00d","#00d","#00c","#00c","#00c","#00c","#00b","#00b","#00b","#00b","#00a","#00a","#00a","#00a","#009","#009","#009","#009","#008","#008","#008","#008","#007","#007","#007","#007","#006","#006","#006","#006","#005","#005","#005","#005","#004","#004","#004","#004","#003","#003","#003","#003"];

    let str_ctr = 1;
    let str_dir = 0;
    let str_spd = 0;
    let st1_pos = 0;
    let st2_pos = 26;
    let st3_pos = 10;

    let sc_pos  = 0;
    let sc_step = 3;
    let sc_font = 0;

    let sp_flag = 0;
    let sp_ctr  = 4;
    let sp_pos  = 0;
    let sp_ptr  = 0;

    let tx_h = 0;
    let ex_x = 19;
    let ex_w = 363;
    let ex_h = 270;

    let afid = 0;

    setTimeout(initialize, 100);
  }
})();