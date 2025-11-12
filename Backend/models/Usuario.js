const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        len: [2, 100]
      }
    },
    cpf: {
      type: DataTypes.CHAR(11),
      allowNull: true,
      unique: true,
      validate: {
        isNumeric: true,
        len: [11, 11]
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
        len: [5, 100]
      }
    },
    telefone: {
      type: DataTypes.CHAR(15),
      allowNull: true,
      validate: {
        len: [10, 15]
      }
    },
    endereco: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        len: [5, 50]
      }
    },
    senha: {
      type: DataTypes.STRING(255), // Aumentado para hash bcrypt
      allowNull: true,
      validate: {
        len: [6, 255]
      }
    },
    // Campos para soft delete
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deletedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Usuarios',
        key: 'id'
      }
    }
  }, {
    tableName: 'usuarios',
    paranoid: true, // Habilita soft delete
    deletedAt: 'deletedAt',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    hooks: {
      beforeCreate: async (usuario) => {
        if (usuario.senha) {
          usuario.senha = await bcrypt.hash(usuario.senha, 10);
        }
      },
      beforeUpdate: async (usuario) => {
        if (usuario.changed('senha')) {
          usuario.senha = await bcrypt.hash(usuario.senha, 10);
        }
      }
    }
  });

  // Método para verificar senha
  Usuario.prototype.verificarSenha = async function(senha) {
    return await bcrypt.compare(senha, this.senha);
  };

  // Método para retornar dados seguros (sem senha)
  Usuario.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());
    delete values.senha;
    return values;
  };

  return Usuario;
};
