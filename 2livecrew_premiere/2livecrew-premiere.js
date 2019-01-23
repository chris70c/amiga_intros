/*
  Premiere Crack
  Two Live Crew (1992)
  Christian Corti & Mathew Nolan
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 320;
    canvc.height = 256;
    canvx.imageSmoothingEnabled = false;

    buf1c.width  = 340;
    buf1c.height = 16;
    buf1x.imageSmoothingEnabled = false;

    buf2c.width  = 340;
    buf2c.height = 166;
    buf2x.imageSmoothingEnabled = false;

    txt1c.width  = 340;
    txt1c.height = 16;
    txt1x.imageSmoothingEnabled = false;

    txt2c.width  = 340;
    txt2c.height = 166;
    txt2x.imageSmoothingEnabled = false;

    cur1c = buf1c;
    cur1x = buf1x;
    cur2c = buf2c;
    cur2x = buf2x;
    swp1c = txt1c;
    swp1x = txt1x;
    swp2c = txt2c;
    swp2x = txt2x;

    createFont();
    createStars();

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("flodSync", () => {
      canvx.drawImage(logo,0,0);
      draw();
    });

    player.version = 2;
    player.play();
  }

  function createFont() {
    var j = 0;
    var i, img, len, pix;

    font1c.width  = 960;
    font1c.height = 16;
    font1x.imageSmoothingEnabled = false;

    font1x.drawImage(font,0,0);

    img = font1x.getImageData(0,0,960,16);
    pix = img.data;
    len = pix.length;

    for (i = 0; i < len; i += 4) {
      if (pix[i] == 255) {
        pix[i] = copper1[j];
        pix[i + 1] = copper1[j + 1];
        pix[i + 2] = copper1[j + 2];
      }

      if (i % 3840 == 0) { j += 3; }
    }

    font1x.putImageData(img,0,0);

    font2c.width  = 960;
    font2c.height = 16;
    font2x.imageSmoothingEnabled = false;

    font2x.setTransform(1,0,0,-1,0,16);
    font2x.drawImage(font,0,0);
    font2x.setTransform(1,0,0,1,0,0);

    img = font2x.getImageData(0,0,960,16);
    pix = img.data;
    len = pix.length;

    j = 0;

    for (i = 0; i < len; i += 4) {
      if (pix[i] == 255) {
        pix[i] = copper2[j];
        pix[i + 1] = copper2[j + 1];
        pix[i + 2] = copper2[j + 2];
      }

      if (i % 3840 == 0) { j += 3; }
    }

    font2x.putImageData(img,0,0);
  }

  function createStars() {
    var i, obj;
    var star_rnd = [1,2,4,6];

    for (i = 0; i < star_max; i++) {
      obj = Object.create(null);
      obj.x = Math.floor(Math.random() * 315);
      obj.y = Math.floor(Math.random() * 161);

      obj.spd = star_rnd[Math.floor(Math.random() * 4)];
      obj.bmp = 5 * Math.floor(Math.random() * 11);
      star_bmp[i] = Object.seal(obj);
    }
  }

  function draw() {
    var chr, i, obj, p, tempc, tempx;

    if (paused) {
      twist_spd = 0.6;

      if (++timer >= delay) {
        timer = 0;
        paused = false;
      }
    } else {
      cur1x.clearRect(0,0,340,16);
      cur1x.drawImage(swp1c, 2,0,338,16, 0,0,338,16);

      cur2x.clearRect(0,0,340,16);
      cur2x.drawImage(swp2c, 2,0,338,16, 0,0,338,16);

      twist_spd = 0.3;
      wait += scroll_spd;
    }

    if (wait >= 16) {
      chr = (scroll_txt.charCodeAt(scroll_pos) - 32) << 4;

      if (chr == 1040) {
        paused = true;
        delay = 200;
      } else if (chr == 1056) {
        paused = true;
        delay = 150;
      }

      cur1x.drawImage(font2c, chr,0,16,16, 320,0,16,16);
      cur2x.drawImage(font1c, chr,0,16,16, 320,0,16,16);

      wait = 0;
      if (++scroll_pos == scroll_len) { scroll_pos = 0; }
    }

    translate += twist_spd;
    swp1x.clearRect(0,0,340,16);

    swp1x.setTransform(1,-twist_val,0,1,0,translate);
    swp1x.drawImage(cur1c, 0,0,320,16, 0,-16,320,16);
    swp1x.drawImage(cur1c, 0,0,320,16, 0, 16,320,16);
    swp1x.drawImage(cur1c, 0,0,320,16, 0, 48,320,16);
    swp1x.drawImage(cur1c, 0,0,320,16, 0, 80,320,16);

    swp1x.setTransform(1,twist_val,0,1,0,-translate);
    swp1x.drawImage(cur2c, 0,0,320,16, 0,-64,320,16);
    swp1x.drawImage(cur2c, 0,0,320,16, 0,-32,320,16);
    swp1x.drawImage(cur2c, 0,0,320,16, 0,  0,320,16);
    swp1x.drawImage(cur2c, 0,0,320,16, 0, 32,320,16);

    swp1x.setTransform(1,0,0,1,0,0);
    if (translate >= 32) { translate -= 32; }

    swp2x.fillRect(0,0,320,166);

    for (i = 0; i < star_max; i++) {
      obj = star_bmp[i];

      p = obj.x + obj.spd;
      if (p >= 320) { p = 0; }
      obj.x = p;

      swp2x.drawImage(star, obj.bmp,0,5,5, p,obj.y,5,5);
    }

    sin_spd = (sin_spd - 1) & 0x1ff;

    for (i = 0; i < 320; i++) {
      p = (sin_spd + i) & 0x1ff;
      swp2x.drawImage(swp1c, i,0,1,16, i,sin_pos[p],1,16);
    }

    canvx.clearRect(0,83,320,166);
    canvx.drawImage(swp2c,0,83);

    if (!paused) {
      tempc = cur1c;
      tempx = cur1x;
      cur1c = swp1c;
      cur1x = swp1x;
      swp1c = tempc;
      swp1x = tempx;

      tempc = cur2c;
      tempx = cur2x;
      cur2c = swp2c;
      cur2x = swp2x;
      swp2c = tempc;
      swp2x = tempx;
    }

    requestAnimationFrame(draw);
  }

  const font = new Image();
  const logo = new Image();
  const star = new Image();

  font.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA8AAAAAQAQMAAADjzoRqAAAABlBMVEUAAAD/AAAb/40iAAAAAXRSTlMAQObYZgAAAtxJREFUOMvF1TuO2zAQBuBZuFC3LNIG1jUWSEBeadOlICgdIcdJZfAEOQOPwHIED8j8MxK9xj6yZSzQsDWiPg6Hoohoyl+fvz6TfZ6IHgvdfc6uTLnXXmfqzbXe5jrvFwhRol6JXOkVkdKbXsG+N/Lsmcpj9YgVbTNi7PWo5/KIK+gtjC6n9Qb7wC536aJwQPdFFtbAA74DdTFYEGGFw4ATUz0zenfWthg86PfhJPTl15QPOC0yG+w90B0WDZyQ67wOGBHpGh2wMLEXv6CnthdYEvsb/FSOnwQ/Rvr2+wZLjCFTouQ9U0RUksSCAU5lEYcI+MopEkdQFMGhr9+YSVLzMXLUJlBY//kkkkgO+EcecCH0xK0G/MDcAHvyETAD1lEr7PIiUyFvsMYszgd8rUytdc/jOOANk5/kgQ+YaMBksCsDPtWt7RkfMEva4XldBNOdTusZGb+Ge2HC1F8GPDK+XuYaGP0GfNT4gPc6apvKtU15lkkrWHslRswGGWw+nEzZcxcFe+6ZUUuDs8FtwEtVGFc2VzCf5VPYZdxIJxVdbG23wDuc9EsOmN/A6w2OfOG4yAEj6orLn8JYtxfAdZIBL2h3GSOT7z//lXGXraHfDdYyzuthvVfjJ9pv31Ez2ys8obpzk0R3NXbraY1x1Ni+PQir8fVyVZivrTMlPTvX3nThBvoARtBg9ZreiMDiYH8qCN+tarfqzLB/Bduq3vymcNmkV/I73FCqKad3YXuOByz4a7BlHDFuZHz/HJPBL8+xwTFubINoMeKcbJZxjHOVlERn8G2Nx85lcCGmBdXFIYRq6RLBfyHA+86lGfc2di6mfefCUMQWVlrEzkm3nq6wFwyht7fwba9+NrhS4Bc4iFsBM6LHXq0w+7FXMwWDA3My2Ae2c0nhwK7o/v0BPN5ORRsOVwyugKvDYsICKRbVFXfA4+3E5AzWzAw+4xe5P3qFPUYFb6yzwf/v8xd1JUWuPzxtEQAAAABJRU5ErkJggg==";
  logo.src = "data:image/png;base64,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";
  star.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAFCAIAAABuC+O3AAAAVklEQVQoz2NgoDFwcHAgntvR0YGHS5pNaJpJkj1x4gSyFJCLrABZL5D94sULFNOQNaNJO8AALllkmzpgAK4RIgtnQwAmF6ILYjKcDQHEhuhgCctBni4BKIV1AdBaqfIAAAAASUVORK5CYII=";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d");
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d");
  const txt1c = document.createElement("canvas");
  const txt1x = txt1c.getContext("2d");
  const txt2c = document.createElement("canvas");
  const txt2x = txt2c.getContext("2d");

  const font1c = document.createElement("canvas");
  const font1x = font1c.getContext("2d");
  const font2c = document.createElement("canvas");
  const font2x = font2c.getContext("2d");

  const copper1 = new Uint8Array([0x44,0x44,0x44,0x66,0x66,0x66,0x88,0x88,0x88,0xaa,0xaa,0xaa,0xcc,0xcc,0xcc,0xdd,0xdd,0xdd,0xee,0xee,0xee,0xff,0xff,0xff,0xff,0xff,0xff,0xee,0xee,0xee,0xdd,0xdd,0xdd,0xcc,0xcc,0xcc,0xaa,0xaa,0xaa,0x88,0x88,0x88,0x66,0x66,0x66,0x44,0x44,0x44]);
  const copper2 = new Uint8Array([0xbb,0x33,0xbb,0xaa,0x33,0xaa,0x99,0x22,0x99,0x88,0x22,0x88,0x77,0x22,0x77,0x66,0x22,0x66,0x55,0x22,0x55,0x44,0x11,0x44,0x44,0x11,0x44,0x55,0x22,0x55,0x66,0x22,0x66,0x77,0x22,0x77,0x88,0x22,0x88,0x99,0x22,0x99,0xaa,0x33,0xaa,0xbb,0x33,0xbb]);
  const sin_pos = new Uint8Array([75,75,76,77,78,79,80,81,82,83,84,85,86,86,87,88,89,90,91,92,93,94,95,95,96,97,98,99,100,101,101,102,103,104,105,106,107,107,108,109,110,111,111,112,113,114,115,115,116,117,118,118,119,120,121,121,122,123,123,124,125,126,126,127,128,128,129,129,130,131,131,132,132,133,134,134,135,135,136,136,137,137,138,138,139,139,140,140,141,141,141,142,142,143,143,143,144,144,144,145,145,145,146,146,146,147,147,147,147,147,148,148,148,148,148,149,149,149,149,149,149,149,149,149,149,149,149,149,150,149,149,149,149,149,149,149,149,149,149,149,149,149,148,148,148,148,148,147,147,147,147,147,146,146,146,145,145,145,144,144,144,143,143,143,142,142,141,141,141,140,140,139,139,138,138,137,137,136,136,135,135,134,134,133,132,132,131,131,130,129,129,128,128,127,126,126,125,124,123,123,122,121,121,120,119,118,118,117,116,115,115,114,113,112,111,111,110,109,108,107,107,106,105,104,103,102,101,101,100,99,98,97,96,95,95,94,93,92,91,90,89,88,87,86,86,85,84,83,82,81,80,79,78,77,76,75,75,74,73,72,71,70,69,68,67,66,65,64,64,63,62,61,60,59,58,57,56,55,55,54,53,52,51,50,49,48,48,47,46,45,44,43,42,42,41,40,39,38,38,37,36,35,34,34,33,32,31,31,30,29,28,28,27,26,26,25,24,23,23,22,21,21,20,20,19,18,18,17,17,16,15,15,14,14,13,13,12,12,11,11,10,10,9,9,8,8,8,7,7,6,6,6,5,5,5,4,4,4,3,3,3,2,2,2,2,2,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,2,2,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,8,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,17,17,18,18,19,20,20,21,21,22,23,23,24,25,26,26,27,28,28,29,30,31,31,32,33,34,34,35,36,37,38,38,39,40,41,42,42,43,44,45,46,47,47,48,49,50,51,52,53,54,54,55,56,57,58,59,60,61,62,63,63,64,65,66,67,68,69,70,71,72,73,74]);

  const star_bmp = [];
  const star_max = 50;

  const scroll_txt = "  --- YEAH ---    a   TWO LIVE CREW IS BACK ON YOUR SCREEN WITH A NEW RELEASE:      --- PREMIERE ---  a    CRACKED, TRAINED AND NICE INTRO CODED BY:   THE SHADOW FREAK. b     GRAPHIC DESIGN BY:    INVISIBLE RISE.  b     HD-INSTALL BY:  THE UNKNOWN GENIUS.b     THE HD-INSTALL IS ON THE 3RD DISK.    SPECIAL GREETINGS TO ALL TWO LIVE CREW MEMBERS ALL OVER THE WORLD.     TO USE TRAINER PRESS F-KEYS DURING GAME.    F1 FOR NEW POWER, F2 FOR NEW AMMO, F3 FOR 8 LIVES, F4 TO ACTIVATE CHEATMODE AND F6 TO SKIP LEVEL.    PLEASE MAKE SURE THAT YOU USE THE LEVELSKIP ONLY OUTDOORS BECAUSE THE GFX WILL BE DESTROYED AT THE NEXT LEVEL.    GREETINGS TO:  MEMBERS OF FUN...   SYNERGY...   DENICE-CO...   PI...   ATTACK...   THE ALIENS...   MCPP...   BLACK STEEL CREW...   TUETE...   RAP...   JCC...   EFG...   RECALL...   UHP...   CRB...   PCS...   STEVE...   RED BARON...   STRUPPI...   MC MAJOR...   SKID ROW...   CRYSTAL...   VISION FACTORY...   THE COMPANY...   TRSI...   ANGELS...   GENESIS...   DEFJAM...   ORACLE...   ALPHAFLIGHT...   QUARTEX...   FAIRLIGHT...   AGILE...         THATS ALL FOR THIS TIME BUT WE HOPE TO SEE YOU LATER ON THE NEXT GREAT CRACK BY THE ON EAST SIDE OF GERMANY LEADING FORCE !  AND REMEMBER:   TWO LIVE CREW - MAKES YOUR LIVE MORE HAPPY !                SCROLL RESTARTS  b               ";
  const scroll_len = scroll_txt.length;

  var cur1c, cur1x;
  var cur2c, cur2x;
  var swp1c, swp1x;
  var swp2c, swp2x;

  var delay     = 0;
  var paused    = false;
  var timer     = 0;
  var translate = 0;
  var wait      = 0;

  var sin_spd    = 0;
  var scroll_pos = 0;
  var scroll_spd = 2;
  var twist_val  = 0.18;
  var twist_spd  = 0.30;

  setTimeout(initialize, 100);
}