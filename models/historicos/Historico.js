const Sequelize = require('sequelize');
const connection = require('../../database/database');

const Historico = connection.define('historico',{
    modelo:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    defeito:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    origem:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    lado:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    comentario:{
        type: Sequelize.TEXT,
        allowNull: false,
    },
    causa:{
        type: Sequelize.TEXT,
        allowNull: false,
    },
    acao:{
        type: Sequelize.TEXT,
        allowNull: false,
    }
});

Historico.sync({force:false}).then(()=>{});

module.exports = Historico;