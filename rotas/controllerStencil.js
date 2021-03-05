const express = require('express');
const router = express.Router();
const Dados = require('../database/Dados');


//ROTAS STENCIL
router.get("/stencils-cadastrados",(req,res)=>{
    Dados.findAll({raw: true,order:[['id','DESC']]}).then((stencils)=>{
        console.log(stencils);
        req.flash('message','Stencil cadastrado com sucesso!');
        res.render('pages/menu/stencil/stencils-cadastrados',{
            message: req.flash('message'),
            stencils: stencils,
        });
    })

});


module.exports = router;