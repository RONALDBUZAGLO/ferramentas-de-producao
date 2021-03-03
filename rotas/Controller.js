const express = require('express');
const router = express.Router();
const qr = require("qrcode");

router.post("/gerador",(req,res)=>{
    const url = req.body.url

    if (url.length === 0){
    res.send("Empty data!");
    }

    qr.toDataURL(url,{ errorCorrectionLevel: 'H', version: 5 },(err,src)=>{
        if (err) res.send("error ocoured");
        res.render("pages/saida",{src})
    })
});

router.get("/cadastro",(req,res)=>{
    res.render('pages/cadastro');
});
router.post("/gerarCode",(req,res)=>{
    const c1 = req.body.codigoDoPrograma;
    const c2 = req.body.lado;
    const c3 = req.body.revisaoSerie;
    const c4 = req.body.mf;
    const c5 = req.body.stencilId;
    const c6 = req.body.descricao;
    const c7 = req.body.modificacao;

    const concatenado =   c1 + '/' 
                        + c2 +  '/' 
                        + c3 +  '/' 
                        + c4 +  '/' 
                        + c5 +  '/' 
                        + c6 +  '/'
                        + c7;

    if (concatenado.length === 0){
    res.send("Empty data!");
    }

    qr.toDataURL(concatenado,{ errorCorrectionLevel: 'H', version: 5 },(err,src)=>{
        if (err) res.send("error ocoured");
        res.render("pages/saida",{src})
    })
});




module.exports = router;