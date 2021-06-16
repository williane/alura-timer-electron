const data = require("./data");
const { ipcMain } = require("electron");

module.exports = {
  templateInicial: null,
  geraTrayTemplate(window) {
    let template = [{ label: "Cursos" }, { type: "separator" }];
    let cursos = data.pegaNomeDosCursos();
    cursos.forEach((curso) => {
      let menuItem = {
        label: curso,
        type: "radio",
        click: () => {
          window.send("curso-trocado", curso);
        },
      };
      template.push(menuItem);
    });
    this.templateInicial = template;
    return template;
  },
  adicionaCursoTray(curso, window) {
    this.templateInicial.push({
      label: curso,
      type: "radio",
      checked: true,
      click: () => {
        window.send("curso-trocado", curso);
      },
    });

    return this.templateInicial;
  },
  geraMenuPrincipalTemplate(app) {
    let templateMenu = [
      {
        label: "View",
        submenu: [
          { role: "reload" },
          {
            role: "toggledevtools",
            accelerator: process.platform === "darwin" ? "Cmd+J" : "Ctrl+J",
          },
        ],
      },
      {
        label: "Window",
        submenu: [{ role: "minimize" }, { role: "zoom" }, { role: "close" }],
      },
      {
        label: "Sobre",
        submenu: [
          {
            label: "Sobre o Alura timer",
            accelerator: process.platform === "darwin" ? "Cmd+I" : "Ctrl+I",
            click: () => {
              ipcMain.emit("abrir-janela-sobre");
            },
          },
        ],
      },
    ];

    if (process.platform == "darwin") {
      templateMenu.unshift({ label: app.getName });
    }

    return templateMenu;
  },
};
