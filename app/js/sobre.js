const { ipcRenderer, shell } = require("electron");
const process = require("process");

const linkFechar = document.querySelector("#link-fechar");
const linkGitHub = document.querySelector("#link-gitHub");
const versaoElectron = document.querySelector("#versao-electron");

window.onload = () => {
  versaoElectron.textContent = process.versions.electron;
};

linkFechar.addEventListener("click", () => {
  ipcRenderer.send("fechar-janela-sobre");
});

linkGitHub.addEventListener("click", () => {
  shell.openExternal("https://github.com/williane");
});
