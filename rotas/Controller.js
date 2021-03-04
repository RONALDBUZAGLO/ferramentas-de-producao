const express = require('express');
const router = express.Router();
const qr = require("qrcode");
const Dados = require('../database/Dados');
const flash = require('connect-flash');
const session = require('express-session');

router.post("/gerador",(req,res)=>{
    const url = req.body.url;

    if (url.length === 0){
    res.send("Empty data!");
    }

    qr.toDataURL(url,{ errorCorrectionLevel: 'H', version: 5},(err,src)=>{
        if (err) res.send("error ocoured");
        res.render("pages/geradorRapido",{src});
    })
});

router.get("/cadastro",(req,res)=>{
    res.render('pages/cadastro');
});

//
router.post("/gerarCode",(req,res)=>{

    const salvar = req.body.salvar;
    const etiqueta = req.body.etiqueta;

    if (!!salvar || !!etiqueta) {
        
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

            qr.toDataURL(concatenado,{ errorCorrectionLevel: 'H', version: 7 },(err,src)=>{
            
                if (err) {
                    res.send("Aconteceu um erro: " + err + "\nProcure suporte de programação!");
                }
                
                req.flash('info','flash is back !');
                

                res.render("pages/saida",{
                    message: req.flash('info'),
                    src,
                    codigoDoPrograma,
                    lado,
                    revisaoSerie,
                    stencilId,
                    mf,
                });

            });

        }).catch((err)=>{
            console.log("erro ao salvar dados: "+err);
            res.redirect('/cadastro');
        });

        }else{
            res.redirect('/cadastro');
        }
        
    });

module.exports = router;