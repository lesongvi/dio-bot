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
const RAW_MAPPING = [
  "KeyA",
  "KeyB",
  "KeyC",
  "KeyD",
  "KeyE",
  "KeyF",
  "KeyG",
  "KeyH",
  "KeyI",
  "KeyJ",
  "KeyK",
  "KeyL",
  "KeyM",
  "KeyN",
  "KeyO",
  "KeyP",
  "KeyQ",
  "KeyR",
  "KeyS",
  "KeyT",
  "KeyU",
  "KeyV",
  "KeyW",
  "KeyX",
  "KeyY",
  "KeyZ",
  "ArrowUp",
  "ArrowLeft",
  "ArrowDown",
  "ArrowRight",
  "Tab",
  "Enter",
  "NumpadEnter",
  "ShiftLeft",
  "ShiftRight",
  "Space",
  "Numpad0",
  "Numpad1",
  "Numpad2",
  "Numpad3",
  "Numpad4",
  "Numpad5",
  "Numpad6",
  "Numpad7",
  "Numpad8",
  "Numpad9",
  "Digit0",
  "Digit1",
  "Digit2",
  "Digit3",
  "Digit4",
  "Digit5",
  "Digit6",
  "Digit7",
  "Digit8",
  "Digit9",
  "F2",
  "End",
  "Home",
  "Semicolon",
  "Comma",
  "NumpadComma",
  "Period",
  "Backslash",
];

let win = typeof unsafeWindow != "undefined" ? unsafeWindow : window;

var int = win.setInterval(function () {
  if (win.input != null) {
    win.clearInterval(int);
    onready();
  }
}, 100);

function onready() {
  function keyDown(keyString) {
    const index = RAW_MAPPING.indexOf(keyString);
    if (index === -1) return console.error(`Invalid key string: ${keyString}`);
    input.onKeyDown(index + 1);
  }

  function keyUp(keyString) {
    const index = RAW_MAPPING.indexOf(keyString);
    if (index === -1) return console.error(`Invalid key string: ${keyString}`);
    input.onKeyUp(index + 1);
  }

  function handleMenuState() {
    state = "in menu";
    input.try_spawn(preConfigName);

    setTimeout(() => {
      keyDown("Backslash");
      keyUp("Backslash");
    }, 500);
  }

  function handleGameState() {
    state = "in game";
    input.execute("game_stats_build 445677445677445677456567856856888");

    setTimeout(() => {
      document.querySelector("#sandbox-max-level").click();
    }, 500);
  }

  function checkState() {
    if (!(window.__common__.active_gamemode === "sandbox")) return;
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
}
