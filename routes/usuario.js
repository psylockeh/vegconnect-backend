const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const Usuario = require('../models/usuario');

const router = express.Router();

// Listar todos os usuários (apenas administradores podem acessar)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar usuários', detalhes: error.message });
    }
});

// Buscar um usuário por ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar usuário', detalhes: error.message });
    }
});

// Atualizar dados do usuário
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        await usuario.update(req.body);
        res.json({ mensagem: 'Usuário atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar usuário', detalhes: error.message });
    }
});

// Deletar um usuário
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        await usuario.destroy();
        res.json({ mensagem: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao deletar usuário', detalhes: error.message });
    }
});

module.exports = router;
