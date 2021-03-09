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
        
        var message = req.flash("message");
        var msg_erro = req.flash("msg_erro");
        var msg_success = req.flash("msg_success");
           
        res.render('pages/menu/stencil/lista',{
            titulo:'Lista',
            message: message,
            msg_erro: msg_erro,
            msg_success: msg_success,
            stencils: stencils,
        });
    });
});

// router.post("/stencil/lista/modal",(req,res)=>{

//     const { id , descricao } = req.body; 

//     res.render("partials/modal",{
//         id:id,
//         descricao:descricao
//     });
// })

router.post("/stencil/lista/deletar",(req,res)=>{

    const id = req.body.id;
    const descricao = req.body.descricao;
    
    if(id != undefined && !isNaN(id)){
        
            Stencil.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                req.flash("msg_success",`Stencil Descrição: ${descricao} e ID ${id} Foi deletado`);
                res.redirect("/stencil/lista");
            })
        
    }else{
        req.flash("msg_erro","Não foi possível deletar");
        res.redirect('/stencil/lista');

    }
});



router.get("/stencil/busca",(req,res)=>{
    res.render("pages/menu/stencil/busca",{titulo:"Buscar",message:"busca"});
});




router.get("/stencil/editar/:id",(req,res)=>{

    var id = req.params.id;

    Stencil.findByPk(id).then((stencil)=>{
        if (stencil != undefined) {
            res.render("pages/menu/stencil/editar",{titulo:"Editar Stencil",stencil:stencil});
        }else{
            req.flash("msg_erro","algum erro")
            res.redirect("/stencil")
        }
    }).catch(erro=>{
        req.flash("msg_erro","algum erro")
        res.redirect("/stencil")
    })
} )


module.exports = router;