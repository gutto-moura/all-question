const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require("./database/database");
const perguntaModel = require("./database/Pergunta");
const respostaModel = require("./database/Resposta");


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
      respostaModel.findAll({
        where: {perguntaId: pergunta.id},
        order:[
          ['id', 'DESC']
        ]
      }).then((respostas) => {
        res.render("pergunta", {
          pergunta:pergunta,
          respostas: respostas
        });
      });
    }else{
      res.redirect("/");
    }
  });
});

app.post("/responder", (req, res) => {
  var corpo = req.body.corpo;
  var perguntaId = req.body.perguntaId;
  console.log(perguntaId)

  respostaModel.create({
    corpo: corpo,
    perguntaId: perguntaId
  }).then(() => {
    res.redirect(`/pergunta/${perguntaId}`);
  })
})

app.listen(3334, () => {
  console.log("SERVIDOR RODANDO NA PORTA 3334");
});