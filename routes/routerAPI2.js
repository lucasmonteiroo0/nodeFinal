const express = require('express');
const routerAPI2 = express.Router();
const jwt = require('jsonwebtoken');

const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);


// processa o corpo da requisição e insere os dados recebidos 
// como atributos de req.body
routerAPI2.use(express.json());
routerAPI2.use(express.urlencoded({ extended: true }))


const checkToken = (req, res, next) => {
  const AuthHeader = req.headers['authorization'];
  const token = AuthHeader && AuthHeader.split(' ')[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    else {
      req.id = decoded.id;
      req.roles = decoded.roles;
      next();
    }
  })
}

const isAdmin = (req, res, next) => {
  if (req.roles.indexOf('ADMIN') >= 0){
    next();
  }
  else {
    return res.status(403).json({ message: 'Acesso negado'});
  }

}

routerAPI2.get('/produtos', checkToken, (req, res) => {
  console.log(req.id, req.roles);
  knex('produtos')
    .then((dados) => {
      res.json(dados);
    })
    .catch((err) => {
      res.json({ message: `Erro o obter os produtos: ${err.message}` });
    })
});

routerAPI2.get('/produtos/:id', checkToken, (req, res) => {
  let id = req.params.id;
  knex('produtos').where('id', id)
    .then((dados) => {
      res.json(dados);
    })
    .catch((err) => {
      res.json({ message: `Erro ao obter os produto: ${err.message}` });
    })
});

routerAPI2.post('/produtos',checkToken, isAdmin, (req, res) => {
  console.log(req.body);

  knex('produtos')
    .insert(req.body, ['id'])
    .then((dados) => {
      if (dados.length > 0) {
        const id = dados[0].id
        res.status(201).json({
          message: 'Produto adicionado com sucesso',
          data: { id }
        });
      }
    })
    .catch((err) => {
      res.json({ message: `Erro ao inserir produto: ${err.message}` });
    })
});

routerAPI2.put('/produtos/:id',checkToken, isAdmin, (req, res) => {
  const id = req.params.id;
  const produto = req.body;

  knex('produtos')
    .where('id', id)
    .update(produto)
    .then(() => {
      res.json({
        message: 'Produto atualizado com sucesso',
        data: { id }
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Erro ao atualizar produto: ${err.message}`
      });
    });
});

routerAPI2.delete('/produtos/:id',checkToken, isAdmin, (req, res) => {
  const id = req.params.id;

  knex('produtos')
    .where('id', id)
    .del()
    .then(() => {
      res.json({
        message: 'Produto excluído com sucesso',
        data: { id }
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Erro ao excluir produto: ${err.message}`
      });
    });
});


module.exports = routerAPI2;