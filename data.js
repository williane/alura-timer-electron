const jsonfile = require("jsonfile-promised");
const fs = require("fs");

module.exports = {
  salvaDados(curso, tempo) {
    const caminhoCurso = __dirname + "/data/" + curso + ".json";
    if (fs.existsSync(caminhoCurso)) {
      this.adicionaTempoCurso(caminhoCurso, tempo);
    } else {
      this.criaArquivoCurso(caminhoCurso, {}).then(() => {
        this.adicionaTempoCurso(caminhoCurso, tempo);
      });
    }
  },
  criaArquivoCurso(nomeArquivo, conteudo) {
    return jsonfile
      .writeFile(nomeArquivo, conteudo, { spaces: 2 })
      .then(() => {
        console.log("arquivo criado");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  adicionaTempoCurso(arquivoCurso, tempo) {
    let dados = {
      ultimoEstudo: new Date().toString(),
      tempo: tempo,
    };
    return jsonfile
      .writeFile(arquivoCurso, dados, { spaces: 2 })
      .then(() => {
        console.log("tempo salvo com sucesso");
      })
      .catch((err) => {
        console.lor(err);
      });
  },
  pegaDados(curso) {
    const caminhoCurso = __dirname + "/data/" + curso + ".json";
    return jsonfile.readFile(caminhoCurso);
  },
  pegaNomeDosCursos() {
    let arquivos = fs.readdirSync(__dirname + "/data");
    let cursos = arquivos.map((arquivo) => {
      return arquivo.substr(0, arquivo.lastIndexOf("."));
    });

    return cursos;
  },
};
