const express = require("express"); // Importa o módulo do Express Framework
const app = express(); // Inicializa um objeto de aplicação Express

const bodyParser = require('body-parser');

app.use(bodyParser.json());

//Declara um array de produtos
const lista_produtos = {
  produtos: [
      { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
      { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
      { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
      { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
      { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
  ]
}


// Cria um manipulador da rota padrão

app.use('/', (req, res, next) => {
   console.log(new Date().toLocaleString (), req.method, req.url);
  next(); 
})

app.get('/', (req, res) => {
   res.send('Welcone mr. GET');
});

app.get('/api/produtos', (req, res) => {
  res.json (lista_produtos);
});

app.get ('/api/produtos/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let produto = lista_produtos.produtos.find (p => p.id === id);
  res.json (produto);
});

app.post('/', (req, res) => {
  res.send('Welcone mr. POST');
});


app.post('/api/produtos', (req, res) => {
   const novoProduto = req.body;
   const novoID = lista_produtos.produtos.length + 1;

   novoProduto.id = novoID;

   lista_produtos.produtos.push(novoProduto);
   res.json(novoProduto);
});

app.put('/api/produtos/:id', (req, res) =>{
   let id = parseInt(req.params.id);
   let produtoIndex = lista_produtos.produtos.findIndex(p => p.id === id);

   if (produtoIndex !== -1){
         lista_produtos.produtos[produtoIndex] = {
          ...lista_produtos.produtos[produtoIndex],
          ...req.body
        };

        res.json(lista_produtos.produtos[produtoIndex]);
    } else {
      res.status(404).json({ error: 'Produto não encontrado'});
    }
});

app.delete('/api/produtos/:id', (req, res) =>{
  let id = parseInt(req.params.id);
  let produtoIndex = lista_produtos.produtos.findIndex(p => p.id === id);

  if (produtoIndex !== -1){
        lista_produtos.produtos.splice(produtoIndex, 1);
         
        res.sendStatus(204);
   } else {
     res.status(404).json({ error: 'Produto não encontrado'});
   }
});

app.use((req, res) => {
  res.status(404);
  res.send('Recurso solicitado não existe');
})


// Inicializa o servidor HTTP na porta 3000
const port = 3000
const servidor = '127.0.0.1'
app.listen(port, function () {
  console.log(`Servidor rodando em http://${servidor}:${port}`);
});