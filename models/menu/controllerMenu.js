const express = require('express');
const router = express.Router();
const qr = require("qrcode");



//ROTAS MENU
router.get("/stencil",(req,res)=>{
    res.render('pages/menu/stencil/menuStencil',{
        titulo:'Cadastro de Stencil'
    });
});

router.get("/historico",(req,res)=>{
    res.render("pages/menu/historico/historico-de-produto",{
        titulo:'Histórico de produto'
    });
});

router.get("/estoque",(req,res)=>{
    res.render("pages/menu/pecas/estoque-de-pecas",{
        titulo:'Estoque de Peças'
    });
});

router.get("/maquina",(req,res)=>{
    res.render("pages/menu/maquinas/maquinas-e-manutencoes",{
        titulo:'Máquinas e Manutenções'
    });
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




module.exports = router;