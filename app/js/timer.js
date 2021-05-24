const { ipcRenderer } = require("electron");
const moment = require("moment");
let timer;
let tempoSegundos;
let time;

module.exports = {
  iniciar(tempo) {
    time = moment.duration(tempo.textContent);
    tempoSegundos = time.asSeconds();
    clearInterval(timer);
    timer = setInterval(() => {
      tempoSegundos++;
      tempo.textContent = this.segundosParaTempo(tempoSegundos);
    }, 1000);
  },
  parar(curso) {
    clearInterval(timer);
    ipcRenderer.send(
      "curso-parado",
      curso,
      this.segundosParaTempo(tempoSegundos)
    );
  },
  segundosParaTempo(segundos) {
    return moment().startOf("day").seconds(segundos).format("HH:mm:ss");
  },
};
