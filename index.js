const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require("cookie-parser");
const path = require('path')
var favicon = require('serve-favicon')


const controllerMenu = require('./models/menu/controllerMenu');
const controllerHistorico = require('./models/historicos/controllerHistorico');
const controllerMaquina = require('./models/maquinas/controllerMaquina');
const controllerPeca = require('./models/peca/controllerPeca');
const controllerStencil = require('./models/stencils/controllerStencil');

const connection = require('./database/database');

const Historico = require('./models/historicos/Historico');
const Maquina = require('./models/maquinas/Maquina');
const Peca = require('./models/peca/Peca');
const Stencil = require('./models/stencils/Stencil');

//CONFIGURAÇÃO DATABASE
connection.authenticate().then(()=>{
    console.log("Conexão feita com o banco de dados!");
}).catch((msgError)=>{
    console.log(" Houve um erro: " + msgError);
});

//CONFIGURAÇÃO DA VIEW ENGINE EJS
app.set("view engine","ejs");

//CONFIGURAÇÃO DO BODY-PARSER
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CONFIGURAÇÃO DO COOKIE-PARSER
app.use(cookieParser("asdlkjasdlj"))

//CONFIGURAÇÃO DO SESSION
app.use(session({
    secret: 'secret',
    cookie:{maxAge:60000},
    resave:false,
    saveUninitialized:false,
}));

//CONFIGURAÇÃO DO FLASH
app.use(flash());



//CONFIGURAÇÃO DA PASTA DE ARQUIVOS ESTÁTICOS
app.use(express.static('public'));

app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')))



//IMPORTAÇÃO DE ROTAS
app.use("/",controllerMenu);
app.use("/",controllerStencil);
app.use("/",controllerMaquina);
app.use("/",controllerHistorico);
app.use("/",controllerPeca);

//ROTAS
app.get("/",(req,res)=>{
    
    res.render('pages/menu',{titulo:'Caixa de Ferramentas'});
});


const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log("servidor rodando na porta "+ PORT);
});