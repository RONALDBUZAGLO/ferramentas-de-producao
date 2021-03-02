const express = require('express');
const router = express.Router();
const qr = require("qrcode");


router.post("/gerador",(req,res)=>{
    const url = req.body.url

    if (url.length === 0) res.send("Empty data!");
    
    qr.toDataURL(url,{ errorCorrectionLevel: 'H', version: 5 },(err,src)=>{
        if (err) res.send("error ocoured");

        res.render("pages/saida",{src})

    })
        
    
});


module.exports = router;