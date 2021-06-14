const { app, BrowserWindow, ipcMain, Tray, Menu } = require("electron");
const data = require("./data");
const templateGenerator = require("./template");

let tray = null;
let mainWindow = null;

app.on("ready", () => {
  console.log("Aplicacao iniciada");
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
  });

  tray = new Tray(__dirname + "/app/img/icon-tray.png");
  let template = templateGenerator.geraTrayTemplate(mainWindow);
  let trayMenu = Menu.buildFromTemplate(template);
  tray.setContextMenu(trayMenu);

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on("window-all-closed", () => {
  app.quit();
});

let sobreWindow = null;
ipcMain.on("abrir-janela-sobre", () => {
  if (!sobreWindow) {
    sobreWindow = new BrowserWindow({
      width: 300,
      height: 220,
      alwaysOnTop: true,
      frame: false,
    });
  }

  sobreWindow.on("closed", () => {
    sobreWindow = null;
  });

  sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});

ipcMain.on("fechar-janela-sobre", () => {
  sobreWindow.close();
});

ipcMain.on("curso-parado", (event, curso, tempo) => {
  data.salvaDados(curso, tempo);
});

ipcMain.on("curso-adicionado", (event, curso) => {
  let novoTemplate = templateGenerator.adicionaCursoTray(curso, mainWindow);
  let novoTrayMenu = Menu.buildFromTemplate(novoTemplate);
  tray.setContextMenu(novoTrayMenu);
});
