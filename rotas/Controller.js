const express = require('express');
const router = express.Router();
const qr = require("qrcode");

router.post("/gerador",(req,res)=>{
    const url = req.body.url

    if (url.length === 0){
    res.send("Empty data!");
    }

    qr.toDataURL(url,{ errorCorrectionLevel: 'H', version: 5},(err,src)=>{
        if (err) res.send("error ocoured");
        res.render("pages/geradorRapido",{src})
    })
});

router.get("/cadastro",(req,res)=>{
    res.render('pages/cadastro');
});

router.post("/gerarCode",(req,res)=>{
    const codigoDoPrograma = req.body.codigoDoPrograma;
    const lado = req.body.lado;
    const revisaoSerie = req.body.revisaoSerie;
    const mf = req.body.mf;
    const stencilId = req.body.stencilId;
    const descricao = req.body.descricao;
    const modificacao = req.body.modificacao;

    const concatenado = codigoDoPrograma+'/'+lado+'/'+revisaoSerie+'/'+mf+'/'+stencilId+'/'+descricao+'/'+modificacao;

    if (concatenado.length === 0){
    res.send("Empty data!");
    }

    qr.toDataURL(concatenado,{ errorCorrectionLevel: 'H', version: 7 },(err,src)=>{
        if (err) res.send("Aconteceu um erro: " + err + "\nProcure suporte de programação!");
        res.render("pages/saida",{
            src,
            codigoDoPrograma,
            lado,
            revisaoSerie,
            stencilId,
            mf,

        })
    })
});

module.exports = router;