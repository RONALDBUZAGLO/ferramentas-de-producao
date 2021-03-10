const express = require('express');
const router = express.Router();
const Historico = require('./Historico');
const HistoricoDefeito = require('./HistoricoDefeito');
const HistoricoModelo = require('./HistoricoModelo');


//ROTAS HISTÓRICO MENU
router.get("/historico/cadastro",(req,res)=>{ 

    HistoricoDefeito.findAll({raw: true,order:[['id','DESC']]}).then((defeitos)=>{

        HistoricoModelo.findAll({raw: true,order:[['id','DESC']]}).then((modelos)=>{
        
            var message = req.flash("message");
            var msg_erro = req.flash("msg_erro");
            var msg_success = req.flash("msg_success");

            res.render('pages/menu/historico/cadastroHistorico',{
                titulo:'Historico-Cadastro',
                message: message,
                msg_erro: msg_erro,
                msg_success: msg_success,
                modelos: modelos,
                defeitos: defeitos

            });       

        });

    });

});

router.get("/historico/lista",(req,res)=>{ 
    res.render('pages/menu/historico/listaHistorico',{
        titulo:'Historico-Lista',
    });
});

router.get("/historico/busca",(req,res)=>{ 
    res.render('pages/menu/historico/buscaHistorico',{
        titulo:'Historico-Busca',
    });
});

//MENU MODELO
router.get("/historico/modelo",(req,res)=>{ 
    res.render('pages/menu/historico/modeloHistorico',{
        titulo:'Historico-Modelo',
    });
});

//SALVAR MODELO
router.post("/historico/modelo/salvar",(req,res)=>{

    const nomeModelo = req.body.nomeModelo;
    
    HistoricoModelo.create({
        
        nomeModelo,

    }).then(()=>{
        
            req.flash('message','Modelo cadastrado com sucesso!');
            res.redirect("/historico");
  
    }).catch((err)=>{
        console.log("----erro ao salvar dados: "+err+" -----");
        req.flash('message','Erro ao cadastrar!');
        res.redirect('/historico');
    });
        
    
});

//MENU DEFEITO
router.get("/historico/defeito",(req,res)=>{ 
    const message = req.flash("message");
    res.render('pages/menu/historico/defeito/menuDefeitoHistorico',{
        titulo:'Menu Defeito',
        message: message,
    });
});

//CADASTRO DEFEITO
router.get("/historico/defeito/cadastro",(req,res)=>{ 
    res.render('pages/menu/historico/defeito/cadastroDefeitoHistorico',{
        titulo:'Cadastrar Defeito',
        message: ""
    });
});

//LISTA DEFEITO
router.get("/historico/defeito/lista",(req,res)=>{ 

    HistoricoDefeito.findAll({raw: true,order:[['id','DESC']]}).then((defeitos)=>{
        
        var message = req.flash("message");
        var msg_erro = req.flash("msg_erro");
        var msg_success = req.flash("msg_success");
    
        res.render('pages/menu/historico/defeito/listaDefeitoHistorico',{
            titulo:'Lista Defeitos',
            message: message,
            msg_erro: msg_erro,
            msg_success: msg_success,
            defeitos: defeitos,
        });
    });

});

//SALVAR DEFEITO
router.post("/historico/defeito/salvar",(req,res)=>{

    const nomeDefeito = req.body.nomeDefeito;
    const descricaoDefeito = req.body.descricaoDefeito;
    
    HistoricoDefeito.create({
        
        nomeDefeito,
        descricaoDefeito,
        
    }).then(()=>{
        
            req.flash('message','Defeito cadastrado com sucesso!');
            res.redirect("/historico");
  
    }).catch((err)=>{
        console.log("----erro ao salvar dados: "+err+" -----");
        req.flash('message','Erro ao cadastrar!');
        res.redirect('/historico');
    });
        
    
});

//DELETAR DEFEITO
router.post("/historico/defeito/deletar",(req,res)=>{

    const id = req.body.id;
    const descricao = req.body.descricao;
    
    if(id != undefined && !isNaN(id)){

            HistoricoDefeito.destroy({
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

//EDITAR DEFEITO
router.get("/historico/defeito/editar/:id",(req,res)=>{

    const id = req.params.id;

    HistoricoDefeito.findByPk(id).then((defeito)=>{
        
        if (defeito != undefined) {
            
            res.render("pages/menu/historico/defeito/editarDefeitoHistorico",{
                titulo: "Editar Defeito",
                defeito: defeito,
            });

        }else{
            
            req.flash("msg_erro","algum erro")
            res.redirect("/historico")

        }
    }).catch(erro=>{
        req.flash("msg_erro","algum erro")
        res.redirect("/historico")
    })

});

//EDITAR DEFEITO
router.post("/historico/defeito/editar/salvar",(req,res)=>{

    const id = req.body.id;
    const nomeDefeito = req.body.nomeDefeito;
    const descricaoDefeito = req.body.descricaoDefeito;

    HistoricoDefeito.update({
        nomeDefeito:nomeDefeito,
        descricaoDefeito:descricaoDefeito,
    },{where:{id:id}}).then(()=>{
        
        req.flash("message","Atualizado com sucesso");
        res.redirect("/historico/defeito");
        
    }).catch(erro=>{
        req.flash("msg_erro","algum erro")
        res.redirect("/historico")
    })

});

//SALVAR OCORRENCIA
router.post("/historico/cadastro/salvar",(req,res)=>{

    const nomeDefeito = req.body.nomeDefeito;
    const descricaoDefeito = req.body.descricaoDefeito;
    
    HistoricoDefeito.create({
        
        nomeDefeito,
        descricaoDefeito,
        
    }).then(()=>{
        
        req.flash("message","Ocorrencia cadastrada com sucesso!");
        res.redirect('/historico');
  
    }).catch((err)=>{
        console.log("----erro ao salvar dados: "+err+" -----");
        req.flash('message','Erro ao cadastrar!');
        res.redirect('/historico');
    });

    

});

module.exports = router;