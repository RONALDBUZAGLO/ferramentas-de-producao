const express = require('express');
const router = express.Router();
const Maquina = require('./Maquina');


//ROTAS MAQUINA
router.get("/ROTA DE MÁQUINA",(req,res)=>{
    Maquina.findAll({raw: true,order:[['id','DESC']]}).then((maquinas)=>{
        console.log(maquinas);
        req.flash('message','Maquina cadastrada com sucesso!');
        res.render('PÁGINA DE MÁQUINA',{
            message: req.flash('message'),
            masquinas: maquinas,
        });
    })

});


module.exports = router;