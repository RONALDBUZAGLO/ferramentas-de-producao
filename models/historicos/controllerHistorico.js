const express = require('express');
const router = express.Router();
const Historico = require('./Historico');


//ROTAS HISTÓRICO
router.get("/historico/cadastro",(req,res)=>{
        
    res.render('pages/menu/historico/cadastroHistorico',{
        titulo:'Historico - Cadastro',
    });

});


router.get("/historico/lista",(req,res)=>{
        
    res.render('pages/menu/historico/listaHistorico',{
        titulo:'Historico - Lista',
    });

});


router.get("/historico/busca",(req,res)=>{
        
    res.render('pages/menu/historico/buscaHistorico',{
        titulo:'Historico - Busca',
    });

});

module.exports = router;