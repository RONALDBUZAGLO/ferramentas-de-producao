const express = require("express");
const app = express();

const qr = require("qr-image");

app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render('home');
});

app.get("/qr/:qrcode",(req,res)=>{
    const url = req.params.qrcode;
    const code = qr.image(url, {type: 'svg'});

    // res.type('svg');

    // code.pipe(res);
    
    console.log(code);
    res.render('saida',{code:code});
});

app.post("/gerador",(req,res)=>{
    const entrada = req.body.entrada;
    console.log(entrada);
    res.render('/qr/:' + entrada);
});


const port = 3000;
app.listen(port,()=>{
    console.log("servidor rodando na porta "+ port);
});