const express = require('express');
const router = express.Router();
const qr = require("qrcode");
const Dados = require('../database/Dados');


//ROTAS MENU
router.get("/cadastro-de-stencil",(req,res)=>{
    res.render('pages/menu/cadastro-de-stencil');
});

router.get("/historico-de-produto",(req,res)=>{
    res.render("pages/menu/historico-de-produto");
});

router.get("/estoque-de-pecas",(req,res)=>{
    res.render("pages/menu/estoque-de-pecas");
});

router.get("/maquinas-e-manutencoes",(req,res)=>{
    res.render("pages/menu/maquinas-e-manutencoes");
});//ROTAS MENU




//GERA QR CODE PARA A ROTA GERADOR RÁPIDO
router.post("/gerador",(req,res)=>{
    const url = req.body.url;

    if (url.length === 0){
    res.send("Empty data!");
    }

    qr.toDataURL(url,{ errorCorrectionLevel: 'H', version: 5},(err,src)=>{
        if (err) res.send("error ocoured");
        res.render("pages/geradorRapido",{src});
    });
});


//GERA QR CODE PARA A ROTA CADASTRO DE STENCIL
router.post("/gerarCode",(req,res)=>{

    const codigoDoPrograma = req.body.codigoDoPrograma;
    const lado = req.body.lado;
    const revisaoSerie = req.body.revisaoSerie;
    const mf = req.body.mf;
    const stencilId = req.body.stencilId;
    const descricao = req.body.descricao;
    const modificacao = req.body.modificacao;

    Dados.create({
        codigoDoPrograma,
        lado,
        revisaoSerie,
        mf,
        stencilId,
        descricao,
        modificacao,
    }).then(()=>{
        
        const concatenado = 
            codigoDoPrograma + '/' +
            lado + '/' +
            revisaoSerie + '/' +
            mf + '/' +
            stencilId + '/' +
            descricao + '/' +
            modificacao;
        
        if (concatenado.length <= 6){
            res.send("Empty data!");
        }

        qr.toDataURL(concatenado,{ errorCorrectionLevel: 'H', version: 10 },(err,src)=>{
        
            if (err) {
                res.send("Aconteceu um erro: " + err + "\nProcure suporte de programação!");
            }
            
            res.redirect("/stencils-cadastrados");

        });

    }).catch((err)=>{
        console.log("erro ao salvar dados: "+err);
        res.redirect('/pages/');
    });

});

module.exports = router;