const express = require('express');
const router = express.Router();


//ROTAS STENCIL
router.get("/stencils-cadastrados",(req,res)=>{
    res.render('pages/menu/stencils-cadastrados');
});


module.exports = router;