const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require("./database/database");
const perguntaModel = require("./database/Pergunta");


connection.authenticate().then(() => {
  console.log("conexão OK")
}).catch((erro) => {
  console.log(erro);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  perguntaModel.findAll({raw: true, order:[
    ['id', 'DESC']
  ]}).then(perguntas => {
    res.render("index", {
      perguntas: perguntas
    });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar")
})
app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;

  perguntaModel.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    res.redirect("/");
  })
})
app.get("/pergunta/:id", (req, res) => {
  var id = req.params.id;

  perguntaModel.findOne({
    where: {id: id}
  }).then(pergunta => {
    if(pergunta != undefined){
      res.render("pergunta");
    }else{
      res.redirect("/");
    }
  });
});
app.listen(3334, () => {
  console.log("SERVIDOR RODANDO NA PORTA 3334");
});