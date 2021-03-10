const Sequelize = require('sequelize');
const connection = require('../../database/database');

const HistoricoModelo = connection.define('historicoModelo',{
    nomeModelo:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    // descricaoModelo:{
    //     type: Sequelize.TEXT,
    //     allowNull: false,
    // }
});

HistoricoModelo.sync({force:false}).then(()=>{});

module.exports = HistoricoModelo;