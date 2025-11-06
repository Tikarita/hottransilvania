const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuração do banco de dados
// Suporta DATABASE_URL (Supabase) ou variáveis individuais
let sequelize;

if (process.env.DATABASE_URL) {
  // Usar DATABASE_URL do Supabase
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true
    }
  });
} else {
  // Usar variáveis individuais (desenvolvimento local)
  sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'usuarios_db',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true
    }
  });
}

// Importar modelos
let Usuario;

try {
  const UsuarioModel = require('../models/Usuario');
  Usuario = UsuarioModel(sequelize);
  console.log('✅ Modelo Usuario carregado com sucesso');
} catch (error) {
  console.error('❌ Erro ao carregar modelo Usuario:', error);
  throw error;
}

// Associar modelos (se houver relacionamentos futuros)
// Usuario.hasMany(OutroModelo, { foreignKey: 'usuarioId' });

module.exports = {
  sequelize,
  Usuario
};
