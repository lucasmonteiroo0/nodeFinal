const express = require('express');
const routerSeg = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const knexConfig = require('../knexfile');
const { token } = require('morgan');
const knex = require('knex')(knexConfig.development);

// Processa o corpo da requisição e insere os dados recebidos 
// como atributos de req.body
routerSeg.use(express.json());
routerSeg.use(express.urlencoded({ extended: true }));


routerSeg.post('/register', (req, res) => {
  knex('usuarios')
    .insert({
      nome: req.body.nome,
      login: req.body.login,
      senha: bcrypt.hashSync(req.body.senha, 8),
      email: req.body.email,
      roles: req.body.roles
    }, ['id'])
    .then((result) => {
      let usuarios = result[0];
      res.status(200).json({ id: usuarios.id });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Erro ao registrar usuário - ' + err.message
      });
    });
});


routerSeg.post('/login', (req, res) => {
  const { login, senha } = req.body;

  knex('usuarios').where({ login: login })
    .then((dados) => {
      if (dados.length > 0) {
        bcrypt.compare(senha, dados[0].senha, (err, result) => {
          if (err) {
            res.status(500).json({ message: 'Erro ao comparar senhas' });
          } else if (result) {
            jwt.sign(
              { id: dados[0].id, roles: dados[0].roles },
              process.env.SECRET_KEY,
              { algorithm: 'HS256' },
              (err, token) => {
                if (err) {
                  res.status(500).json({ message: `Erro ao criar o token: ${err.message}` });
                } else {
                  res.status(200).json({
                    message: token = jwt.sign(
                      { id: dados[0].id, roles: dados[0].roles },
                      process.env.SECRET_KEY,
                      { algorithm: 'HS256' }
                    ),
                    token: token
                  });
                }
              }
            );
          } else {
            res.status(401).json({ message: 'Usuário ou senha inválidos!' });
          }
        });
      } else {
        res.status(401).json({ message: 'Usuário ou senha inválidos!' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: `Erro ao obter os usuários: ${err.message}` });
    });
});


routerSeg.post('/logapi', (req, res) => {
  const { login, senha } = req.body;
  knex('usuarios')
    .where({ login: login })
    .then((dados) => {
      if (dados.length > 0) {
        bcrypt.compare(senha, dados[0].senha, (err, result) => {
          if (err) {
            res.status(500).json({ message: 'Erro ao comparar senhas' });
          } else if (result) {
            const token = jwt.sign(
              { id: dados[0].id, roles: dados[0].roles },
              process.env.SECRET_KEY,
              { algorithm: 'HS256' }
            );
            res.status(200).json({
              message: 'Autenticação realizada com sucesso',
              token: token
            });
          } else {
            res.status(401).json({ message: 'Usuário ou senha inválidos!' });
          }
        });
      } else {
        res.status(401).json({ message: 'Usuário ou senha inválidos!' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: `Erro ao obter os usuários: ${err.message}` });
    });
});


module.exports = routerSeg;
