const express = require('express');
const routerAPI = express.Router();

// Declara um array de produtos com id, decsrição, marca e preço
const produtos = [
    { id: 1, descricao: 'Coca-Cola', marca: 'Coca-Cola', preco: 5.00},
    { id: 2, descricao: 'Pepsi', marca: 'Pepsi', preco: 4.50},
    { id: 3, descricao: 'Guaraná', marca: 'Antarctica', preco: 4.00},
    { id: 4, descricao: 'Fanta', marca: 'Coca-Cola', preco: 4.00},
    { id: 5, descricao: 'Dolly', marca: 'Dolly', preco: 3.00},
    { id: 6, descricao: 'Sukita', marca: 'Coca-Cola', preco: 4.00},
    { id: 7, descricao: 'Sprite', marca: 'Coca-Cola', preco: 4.00}
]

// processa o corpo da requisição e insere os dados recebidos 
// como atributos de req.body
routerAPI.use(express.json());
routerAPI.use(express.urlencoded({ extended: true }))

routerAPI.get ('/produtos', (req, res) => {
    res.json (produtos);
})

routerAPI.get ('/produtos/:id', (req, res) => {
    let produto = produtos.find (p => p.id == req.params.id);
    res.json (produto);
})

routerAPI.post('/produtos', (req, res) => {
    console.log (req.body);
    req.body.id = produtos.length + 1;
    produtos.push (req.body);+

    res.status(201).json( { 
        message: 'Produto adicionado com sucesso',
        data: { id: req.body.id } });  
})

module.exports = routerAPI;