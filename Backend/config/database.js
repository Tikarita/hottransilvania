const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuração do banco de dados
// Suporta DATABASE_URL (Supabase) ou variáveis individuais
let sequelize;

try {
  if (process.env.DATABASE_URL) {
    console.log('📦 Usando DATABASE_URL para conexão');
    // Usar DATABASE_URL do Supabase
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: process.env.DATABASE_URL.includes('supabase') ? {
          require: true,
          rejectUnauthorized: false
        } : false
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
  } else if (process.env.DB_HOST) {
    console.log('📦 Usando variáveis individuais para conexão');
    // Usar variáveis individuais (desenvolvimento local)
    sequelize = new Sequelize({
      dialect: 'postgres',
      host: process.env.DB_HOST,
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
  } else {
    console.error('❌ ERRO: Nenhuma configuração de banco de dados encontrada!');
    console.error('Configure DATABASE_URL ou as variáveis DB_HOST, DB_NAME, etc.');
    throw new Error('Configuração de banco de dados não encontrada. Configure DATABASE_URL ou variáveis individuais.');
  }
} catch (error) {
  console.error('❌ Erro ao configurar Sequelize:', error);
  throw error;
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
