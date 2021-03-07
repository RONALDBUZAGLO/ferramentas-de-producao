const express = require('express');
const router = express.Router();
const Stencil = require('./Stencil');


//ROTAS STENCIL

router.get("/stencil/cadastro",(req,res)=>{
    res.render("pages/menu/stencil/cadastro",{
        titulo:'Stencil'
    });
});


//GERA QR CODE PARA A ROTA CADASTRO DE STENCIL
router.post("/stencil/salvar",(req,res)=>{

    const codigoDoPrograma = req.body.codigoDoPrograma;
    const lado = req.body.lado;
    const revisaoSerie = req.body.revisaoSerie;
    const mf = req.body.mf;
    const stencilId = req.body.stencilId;
    const descricao = req.body.descricao;
    const modificacao = req.body.modificacao;
    
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


    Stencil.create({
        codigoDoPrograma,
        lado,
        revisaoSerie,
        mf,
        stencilId,
        descricao,
        modificacao,
    }).then(()=>{

        // qr.toDataURL(concatenado,{ errorCorrectionLevel: 'H', version: 10 },(err,src)=>{
        
            // if (err) {
            //     res.send("Aconteceu um erro: " + err + "\nProcure suporte de programação!");
            // }
            req.flash('message','Stencil cadastrado com sucesso!');
            res.redirect("/stencil/lista");

        // });

    }).catch((err)=>{
        console.log("----erro ao salvar dados: "+err+" -----");
        req.flash('message','Erro ao cadastrar!');
        res.redirect('/stencil/lista');
    });

});

router.get("/stencil/lista",(req,res)=>{
    Stencil.findAll({raw: true,order:[['id','DESC']]}).then((stencils)=>{
        
        const message = req.flash("message");
       
        res.render('pages/menu/stencil/lista',{
            titulo:'Lista',
            message: message,
            stencils: stencils,
        });
    })

});


module.exports = router;