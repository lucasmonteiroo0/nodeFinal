require('dotenv').config();
console.log('Chave: ', process.env.SECRET_KEY);

const express = require('express');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const app = express(); // Inicializa um objeto de aplicação Express

app.use(morgan('common'));

app.use(express.static('public'));

//app.use ('/site', express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/site');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
  });

app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/site2', (req, res) => {
    res.render('index', { nome: 'josé Ricardo e Lucas Monteiro' });
});


/* Novo */
const routerSeg2 = require('./routes/routerSeg');
app.use('/login', routerSeg2);


const routerSeg3 = require('./routes/routerSeg');
app.use('/registro', routerSeg3);

/* Novo */

const routerAPI = require('./routes/routerAPI');
app.use('/api', routerAPI);


const routerAPI2 = require('./routes/routerAPI2');
app.use('/api/v2', routerAPI2);

const routerSeg = require('./routes/routerSeg');
app.use('/seg', routerSeg);


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
