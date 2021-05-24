const { ipcRenderer } = require("electron");
const timer = require("./timer");
const data = require("../../data");

const linkSobre = document.querySelector("#link-sobre");
const botaoPlay = document.querySelector(".botao-play");
const tempo = document.querySelector(".tempo");
const curso = document.querySelector(".curso");

window.onload = () => {
  data.pegaDados(curso.textContent).then((dados) => {
    tempo.textContent = dados.tempo;
  });
};

linkSobre.addEventListener("click", function () {
  ipcRenderer.send("abrir-janela-sobre");
});

let imgs = ["img/play-button.svg", "img/stop-button.svg"];
let play = false;

botaoPlay.addEventListener("click", () => {
  if (play) {
    timer.parar(curso.textContent);
    play = false;
  } else {
    timer.iniciar(tempo);
    play = true;
  }

  imgs = imgs.reverse();

  botaoPlay.src = imgs[0];
});
