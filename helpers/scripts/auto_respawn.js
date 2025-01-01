// ==UserScript==
// @name         Bot auto respawn
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Auto respawn
// @author       You
// @match        https://diep.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=diep.io
// @grant        none
// ==/UserScript==

const preConfigName = "SongVĩ.Bot";
let state = "";

function handleMenuState() {
  state = "in menu";
  input.try_spawn(preConfigName);
}

function handleGameState() {
  state = "in game";
  input.execute("game_stats_build 445677445677445677456567856856888");
}

function checkState() {
  const tankState = input.doesHaveTank();
  switch (tankState) {
    case 0:
      handleMenuState();
      break;
    case 1:
      handleGameState();
      break;
    default:
      console.warn("Unknown state:", tankState);
  }
}

setInterval(checkState, 100);
