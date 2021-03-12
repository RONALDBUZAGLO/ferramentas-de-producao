const Sequelize = require('sequelize');
const connection = require('../../database/database');

const HistoricoModelo = connection.define('historicoModelo',{
    nomeModelo:{
        type: Sequelize.STRING,
        allowNull: false,
    }
});

HistoricoModelo.sync({force:false}).then(()=>{});

module.exports = HistoricoModelo;