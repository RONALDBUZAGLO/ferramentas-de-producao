const Sequelize = require('sequelize');
const connection = require('../../database/database');

const Stencil = connection.define('stencil',{
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

Stencil.sync({force:false}).then(()=>{});

module.exports = Stencil;