const express = require('express');
const router = express.Router();
const Historico = require('./Historico');


//ROTAS STENCIL
router.get("/ROTA DE HISTORICO",(req,res)=>{
    Historico.findAll({raw: true,order:[['id','DESC']]}).then((historicos)=>{
        console.log(historicos);
        req.flash('message','Historico cadastrado com sucesso!');
        res.render('ROTA DE HISTORICO',{
            message: req.flash('message'),
            historicos: historicos,
        });
    })

});


module.exports = router;