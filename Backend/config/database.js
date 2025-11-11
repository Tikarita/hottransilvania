const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuração do banco de dados
// Suporta DATABASE_URL (Supabase) ou variáveis individuais
let sequelize = null;
let Usuario = null;

// Função para inicializar o Sequelize
function initializeSequelize() {
  if (sequelize) {
    return sequelize; // Já inicializado
  }

  if (process.env.DATABASE_URL) {
    console.log('📦 Usando DATABASE_URL para conexão');
    // Usar DATABASE_URL do Supabase ou outros provedores
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: (process.env.DATABASE_URL.includes('supabase') || 
              process.env.DATABASE_URL.includes('amazonaws.com') ||
              process.env.DATABASE_URL.includes('render.com')) ? {
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
    const errorMsg = 'Configuração de banco de dados não encontrada. Configure DATABASE_URL ou variáveis individuais (DB_HOST, DB_NAME, etc.).';
    console.error('❌ ERRO: Nenhuma configuração de banco de dados encontrada!');
    console.error('Configure DATABASE_URL ou as variáveis DB_HOST, DB_NAME, etc.');
    throw new Error(errorMsg);
  }
  
  return sequelize;
}

// Função para inicializar modelos
function initializeModels() {
  if (Usuario) {
    return Usuario; // Já inicializado
  }

  if (!sequelize) {
    initializeSequelize();
  }

  const UsuarioModel = require('../models/Usuario');
  Usuario = UsuarioModel(sequelize);
  console.log('✅ Modelo Usuario carregado com sucesso');
  return Usuario;
}

// Não inicializar no carregamento do módulo - deixar para o app.js fazer isso
// Isso evita que o módulo quebre quando as variáveis não estiverem configuradas

// Associar modelos (se houver relacionamentos futuros)
// Usuario.hasMany(OutroModelo, { foreignKey: 'usuarioId' });

// Exportar com getters para inicialização lazy
// O getter só inicializa quando acessado, não no carregamento do módulo
module.exports = {
  get sequelize() {
    if (!sequelize && (process.env.DATABASE_URL || process.env.DB_HOST)) {
      initializeSequelize();
    }
    return sequelize;
  },
  get Usuario() {
    // Só inicializa quando acessado e se as variáveis estiverem configuradas
    if (!Usuario && (process.env.DATABASE_URL || process.env.DB_HOST)) {
      initializeModels();
    }
    return Usuario;
  },
  // Funções auxiliares para inicialização
  initializeSequelize,
  initializeModels
};
