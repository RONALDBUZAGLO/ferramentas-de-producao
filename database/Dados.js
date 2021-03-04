const Sequelize = require('sequelize');
const connection = require('./database');

const Dados = connection.define('dados',{
    codigoDoPrograma:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    lado:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    revisaoSerie:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    mf:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    stencilId:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false,
    },
    modificacao:{
        type: Sequelize.TEXT,
        allowNull: false,
    },  
});

// Dados.sync({force:false}).then(()=>{});

module.exports = Dados;