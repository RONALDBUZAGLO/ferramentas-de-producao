const Sequelize = require('sequelize');
const connection = require('../../database/database');

const HistoricoDefeito = connection.define('historicoDefeito',{
    nomeDefeito:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    descricaoDefeito:{
        type: Sequelize.TEXT,
        allowNull: false,
    }
});

// HistoricoDefeito.sync({force:false}).then(()=>{});

module.exports = HistoricoDefeito;