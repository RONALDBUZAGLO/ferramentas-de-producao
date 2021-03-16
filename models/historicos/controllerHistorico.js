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

//MODELO==================================================
//MODELO MENU
router.get("/historico/modelo",(req,res)=>{ 
    const message = req.flash("message");
    res.render('pages/menu/historico/modelo/menuModeloHistorico',{
        titulo:'Menu Modelo',
        message: message,
    });
});

//MODELO CADASTRO
router.get("/historico/modelo/cadastro",(req,res)=>{
    const message = req.flash("message");
    res.render("pages/menu/historico/modelo/cadastroModeloHistorico",{
        titulo:'Menu Defeito',
        message: message,
    });
});

//MODELO LISTA
router.get("/historico/modelo/lista",(req,res)=>{ 

    HistoricoModelo.findAll({raw: true,order:[['id','DESC']]}).then((modelos)=>{
        
        var message = req.flash("message");
        var msg_erro = req.flash("msg_erro");
        var msg_success = req.flash("msg_success");
    
        res.render('pages/menu/historico/modelo/listaModeloHistorico',{
            titulo:'Lista Modelos',
            message: message,
            msg_erro: msg_erro,
            msg_success: msg_success,
            modelos: modelos,
        });
    });

});

//MODELO SALVAR
router.post("/historico/modelo/salvar",(req,res)=>{

    const nomeModelo = req.body.nomeModelo;
        
    HistoricoModelo.create({
        
        nomeModelo,
            
    }).then(()=>{
        
            req.flash('message','Modelo cadastrado com sucesso!');
            res.redirect("/historico");
  
    }).catch((err)=>{
        console.log("----erro ao salvar dados: " + err + " -----");
        req.flash('message','Erro ao cadastrar!');
        res.redirect('/historico');
    });
        
        
    
});

//MODELO DELETAR
router.post("/historico/modelo/deletar",(req,res)=>{

    const id = req.body.id;
    const nomeModelo = req.body.nomeModelo;
        
    if(id != undefined && !isNaN(id)){

            HistoricoModelo.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                req.flash("msg_success",`Modelo: ${nomeModelo} Foi deletado`);
                res.redirect("/historico/modelo/lista");
            })

    }else{

        req.flash("msg_erro","Não foi possível deletar");
        res.redirect('/historico/modelo/lista');

    }
});

//MODELO EDITAR 
router.get("/historico/modelo/editar/:id",(req,res)=>{

    const id = req.params.id;

    HistoricoModelo.findByPk(id).then((modelo)=>{
        
        if (modelo != undefined) {
            
            res.render("pages/menu/historico/modelo/editarModeloHistorico",{
                titulo: "Editar Modelo",
                modelo: modelo,
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
//DEFEITO SALVAR EDIÇÃO
router.post("/historico/modelo/editar/salvar",(req,res)=>{

    const id = req.body.id;
    const nomeModelo = req.body.nomeModelo;

    HistoricoModelo.update({
        nomeModelo:nomeModelo,
    },{where:{id:id}}).then(()=>{
        
        req.flash("message","Atualizado com sucesso");
        res.redirect("/historico/modelo");
        
    }).catch(erro=>{
        req.flash("msg_erro","algum erro")
        res.redirect("/historico")
    })

});
//MODELO=FIM==================================================

//DEFEITO==================================================
//DEFEITO MENU
router.get("/historico/defeito",(req,res)=>{ 
    const message = req.flash("message");
    res.render('pages/menu/historico/defeito/menuDefeitoHistorico',{
        titulo:'Menu Defeito',
        message: message,
    });
});

//DEFEITO CADASTRO 
router.get("/historico/defeito/cadastro",(req,res)=>{ 
    res.render('pages/menu/historico/defeito/cadastroDefeitoHistorico',{
        titulo:'Cadastrar Defeito',
        message: ""
    });
});

//DEFEITO LISTA
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

//DEFEITO SALVAR 
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
        console.log("----erro ao salvar dados: " + err + " -----");
        req.flash('message','Erro ao cadastrar!');
        res.redirect('/historico');
    });
        
    
});

//DEFEITO DELETAR
router.post("/historico/defeito/deletar",(req,res)=>{

    const id = req.body.id;
    // const nomeDefeito = req.body.nomeDefeito;
    
    if(id != undefined && !isNaN(id)){

            HistoricoDefeito.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                req.flash("msg_success",`Defeito Foi deletado`);
                res.redirect("/historico/defeito/lista");
            })

    }else{

        req.flash("msg_erro","Não foi possível deletar");
        res.redirect('/historico/defeito/lista');

    }
});

//DEFEITO EDITAR 
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

//DEFEITO SALVAR EDIÇÃO
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
//DEFEITO=FIM==================================================

//SALVAR OCORRENCIA
router.post("/historico/cadastro/salvar",(req,res)=>{

    const modelo = req.body.modelo;
    const defeito = req.body.defeito;
    const origem = req.body.defeito;
    const lado = req.body.lado;
    const comentario = req.body.comentario;
    const causa = req.body.causa;
    const acoes = req.body.acoes;    
    
    HistoricoDefeito.create({
        
        modelo,
        origem,
        
    }).then(()=>{
        
        // req.flash("message","Ocorrencia cadastrada com sucesso!");
        res.json();
  
    }).catch((err)=>{
        console.log("----erro ao salvar dados: "+err+" -----");
        req.flash('message','Erro ao cadastrar!');
        res.redirect('/historico');
    });

    

});

module.exports = router;