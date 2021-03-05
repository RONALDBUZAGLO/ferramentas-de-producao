const express = require('express');
const router = express.Router();


//ROTAS STENCIL
router.get("/stencils-cadastrados",(req,res)=>{
    req.flash('message','Stencil cadastrado com sucesso!');
    res.render('pages/menu/stencil/stencils-cadastrados',{message: req.flash('message')});
});


module.exports = router;