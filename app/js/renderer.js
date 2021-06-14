const { ipcRenderer } = require("electron");
const timer = require("./timer");
const data = require("../../data");

const linkSobre = document.querySelector("#link-sobre");
const botaoPlay = document.querySelector(".botao-play");
const tempo = document.querySelector(".tempo");
const curso = document.querySelector(".curso");
const botaoAdicionar = document.querySelector(".botao-adicionar");
const campoAdicionar = document.querySelector(".campo-adicionar");

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

ipcRenderer.on("curso-trocado", (event, nomeCurso) => {
  data.pegaDados(nomeCurso).then((dados) => {
    3;
    tempo.textContent = dados.tempo;
  });
  curso.textContent = nomeCurso;
});

botaoAdicionar.addEventListener("click", () => {
  let novoCurso = campoAdicionar.value;
  curso.textContent = novoCurso;
  tempo.textContent = "00:00:00";
  campoAdicionar.value = "";
  ipcRenderer.send("curso-adicionado", novoCurso);
});
