const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const rotasControler = require('./rotas/Controller');
const connection = require('./database/database');
const Dados = require('./database/Dados');

//CONFIGURAÇÃO DATABASE
connection.authenticate().then(()=>{
        console.log("Conexão feita com o banco de dados!");
    }).catch((msgError)=>{
        console.log(" Houve um erro: " + msgError);
    });

//CONFIGURAÇÃO DA VIEW ENGINE EJS
app.set("view engine","ejs");

//CONFIGURAÇÃO DA PASTA DE ARQUIVOS ESTÁTICOS
app.use(express.static('public'));

//CONFIGURAÇÃO DO BODY-PARSER
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//INPORTAÇÃO DAS ROTAS
app.use("/",rotasControler);


app.get("/",(req,res)=>{
    res.render('pages/home');
});


const port = 3000;
app.listen(port,()=>{
    console.log("servidor rodando na porta "+ port);
});