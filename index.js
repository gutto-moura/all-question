const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index")
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar")
})
app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
})
app.listen(3334, () => {
  console.log("SERVIDOR RODANDO NA PORTA 3334");
});