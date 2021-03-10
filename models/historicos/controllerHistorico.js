const express = require('express');
const router = express.Router();
const Historico = require('./Historico');
const HistoricoDefeito = require('./HistoricoDefeito');


//ROTAS MENU HISTÓRICO
router.get("/historico/cadastro",(req,res)=>{ 

    HistoricoDefeito.findAll({raw: true,order:[['id','DESC']]}).then((defeitos)=>{
        
        var message = req.flash("message");
        var msg_erro = req.flash("msg_erro");
        var msg_success = req.flash("msg_success");
           
        res.render('pages/menu/historico/cadastroHistorico',{
            titulo:'Historico - Cadastro',
            message: message,
            msg_erro: msg_erro,
            msg_success: msg_success,
            defeitos: defeitos,
        });
    });

});


router.get("/historico/lista",(req,res)=>{ 
    res.render('pages/menu/historico/listaHistorico',{
        titulo:'Historico - Lista',
    });
});


router.get("/historico/busca",(req,res)=>{ 
    res.render('pages/menu/historico/buscaHistorico',{
        titulo:'Historico - Busca',
    });
});

router.get("/historico/defeito",(req,res)=>{ 
    res.render('pages/menu/historico/defeitoHistorico',{
        titulo:'Historico - Defeito',
    });
});

//SALVAR NOVO DEFEITO
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

//SALVAR NOVA OCORRENCIA
router.get("/historico/salvar",(req,res)=>{

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