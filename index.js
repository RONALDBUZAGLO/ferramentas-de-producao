const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const rotasControler = require('./rotas/Controller');

app.set("view engine","ejs");

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use("/",rotasControler);


app.get("/",(req,res)=>{
    res.render('pages/home');
});


const port = 3000;
app.listen(port,()=>{
    console.log("servidor rodando na porta "+ port);
});