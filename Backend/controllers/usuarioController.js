const database = require('../config/database');
const { Op } = require('sequelize');

// Função helper para obter Usuario de forma lazy
const getUsuario = () => database.Usuario;

class UsuarioController {
  
  // CREATE - Criar novo usuário
  static async criarUsuario(req, res) {
    try {
      const { nome, cpf, email, telefone, endereco, senha } = req.body;

      // Verificar se email já existe
      const emailExistente = await getUsuario().findOne({
        where: { email },
        paranoid: false // Inclui registros deletados
      });

      if (emailExistente && !emailExistente.deletedAt) {
        return res.status(400).json({
          success: false,
          message: 'Email já está em uso'
        });
      }

      // Verificar se CPF já existe
      const cpfExistente = await getUsuario().findOne({
        where: { cpf },
        paranoid: false
      });

      if (cpfExistente && !cpfExistente.deletedAt) {
        return res.status(400).json({
          success: false,
          message: 'CPF já está em uso'
        });
      }

      const novoUsuario = await getUsuario().create({
        nome,
        cpf,
        email,
        telefone,
        endereco,
        senha
      });

      res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso',
        data: novoUsuario
      });

    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  // READ - Listar todos os usuários (sem soft delete)
  static async listarUsuarios(req, res) {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const offset = (page - 1) * limit;

      let whereClause = {};
      
      if (search) {
        whereClause = {
          [Op.or]: [
            { nome: { [Op.iLike]: `%${search}%` } },
            { email: { [Op.iLike]: `%${search}%` } },
            { cpf: { [Op.iLike]: `%${search}%` } }
          ]
        };
      }

      const { count, rows } = await getUsuario().findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']]
      });

      res.json({
        success: true,
        data: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit)
        }
      });

    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  // READ - Buscar usuário por ID
  static async buscarUsuarioPorId(req, res) {
    try {
      const { id } = req.params;

      const usuario = await getUsuario().findByPk(id);

      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      res.json({
        success: true,
        data: usuario
      });

    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  // UPDATE - Atualizar usuário
  static async atualizarUsuario(req, res) {
    try {
      const { id } = req.params;
      const { nome, cpf, email, telefone, endereco, senha } = req.body;

      const usuario = await getUsuario().findByPk(id);

      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      // Verificar se email já existe em outro usuário
      if (email && email !== usuario.email) {
        const emailExistente = await getUsuario().findOne({
          where: { 
            email,
            id: { [Op.ne]: id }
          },
          paranoid: false
        });

        if (emailExistente && !emailExistente.deletedAt) {
          return res.status(400).json({
            success: false,
            message: 'Email já está em uso por outro usuário'
          });
        }
      }

      // Verificar se CPF já existe em outro usuário
      if (cpf && cpf !== usuario.cpf) {
        const cpfExistente = await getUsuario().findOne({
          where: { 
            cpf,
            id: { [Op.ne]: id }
          },
          paranoid: false
        });

        if (cpfExistente && !cpfExistente.deletedAt) {
          return res.status(400).json({
            success: false,
            message: 'CPF já está em uso por outro usuário'
          });
        }
      }

      await usuario.update({
        nome: nome || usuario.nome,
        cpf: cpf || usuario.cpf,
        email: email || usuario.email,
        telefone: telefone || usuario.telefone,
        endereco: endereco || usuario.endereco,
        senha: senha || usuario.senha
      });

      res.json({
        success: true,
        message: 'Usuário atualizado com sucesso',
        data: usuario
      });

    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  // DELETE - Soft delete usuário
  static async deletarUsuario(req, res) {
    try {
      const { id } = req.params;
      const { deletedBy } = req.body; // ID do usuário que está deletando

      const usuario = await getUsuario().findByPk(id);

      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      // Soft delete
      await usuario.update({
        deletedBy: deletedBy || null
      });

      await usuario.destroy();

      res.json({
        success: true,
        message: 'Usuário deletado com sucesso'
      });

    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  // RESTORE - Restaurar usuário deletado
  static async restaurarUsuario(req, res) {
    try {
      const { id } = req.params;

      const usuario = await getUsuario().findByPk(id, {
        paranoid: false
      });

      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      if (!usuario.deletedAt) {
        return res.status(400).json({
          success: false,
          message: 'Usuário não está deletado'
        });
      }

      await usuario.restore();

      res.json({
        success: true,
        message: 'Usuário restaurado com sucesso',
        data: usuario
      });

    } catch (error) {
      console.error('Erro ao restaurar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  // LOGIN - Autenticar usuário
  static async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({
          success: false,
          message: 'Email e senha são obrigatórios'
        });
      }

      const usuario = await getUsuario().findOne({
        where: { email }
      });

      if (!usuario) {
        return res.status(401).json({
          success: false,
          message: 'Credenciais inválidas'
        });
      }

      const senhaValida = await usuario.verificarSenha(senha);

      if (!senhaValida) {
        return res.status(401).json({
          success: false,
          message: 'Credenciais inválidas'
        });
      }

      res.json({
        success: true,
        message: 'Login realizado com sucesso',
        data: usuario
      });

    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  // LISTAR DELETADOS - Listar usuários deletados
  static async listarUsuariosDeletados(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const { count, rows } = await getUsuario().findAndCountAll({
        where: {
          deletedAt: { [Op.ne]: null }
        },
        paranoid: false,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['deletedAt', 'DESC']]
      });

      res.json({
        success: true,
        data: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit)
        }
      });

    } catch (error) {
      console.error('Erro ao listar usuários deletados:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }
}

module.exports = UsuarioController;
