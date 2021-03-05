const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const rotasControllerMenu = require('./rotas/controllerMenu');
const connection = require('./database/database');
const Dados = require('./database/Dados');
const session = require('express-session');
const flash = require('connect-flash');

//CONFIGURAÇÃO DATABASE
connection.authenticate().then(()=>{
        console.log("Conexão feita com o banco de dados!");
    }).catch((msgError)=>{
        console.log(" Houve um erro: " + msgError);
    });

//CONFIGURAÇÃO DO SESSION
app.use(session({
    secret: 'secret',
    cookie:{maxAge:60000},
    resave:false,
    saveUninitialized:false,
}));

//CONFIGURAÇÃO DO FLASH
app.use(flash());

//CONFIGURAÇÃO DA VIEW ENGINE EJS
app.set("view engine","ejs");

//CONFIGURAÇÃO DA PASTA DE ARQUIVOS ESTÁTICOS
app.use(express.static('public'));

//CONFIGURAÇÃO DO BODY-PARSER
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//IMPORTAÇÃO DE ROTAS
app.use("/",rotasControllerMenu);


//ROTAS
app.get("/",(req,res)=>{
    res.render('pages/menu');
});

// app.get("/",(req,res)=>{
//     res.render('pages/conversorQR');
// });

const port = 3000;
app.listen(port,()=>{
    console.log("servidor rodando na porta "+ port);
});