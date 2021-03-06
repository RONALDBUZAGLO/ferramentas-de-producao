const express = require('express');
const router = express.Router();
const Peca = require('./Peca');


//ROTAS PECA
router.get("/ROTA DE PECA",(req,res)=>{
    Peca.findAll({raw: true,order:[['id','DESC']]}).then((pecas)=>{
        console.log(pecas);
        req.flash('message','Stencil cadastrado com sucesso!');
        res.render('VIEW DE PECA',{
            titulo:'Nome da página',
            message: req.flash('message'),
            pecas: pecas,
        });
    })

});


module.exports = router;