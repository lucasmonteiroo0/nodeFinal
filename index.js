const http = require('http');

const fs = require('fs');




const server = http.createServer((req, res) => {

    

    let sTime = new Date().getTime();

    console.log (req.method, req.url)




    // Código bloqueante

    // let data = fs.readFileSync('./info.txt', 'utf-8');

    // res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});

    // res.end(data);




    fs.readFile('./info.txt', 'utf-8', (err, data) => {

        if (err) {

            res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});

            res.end("Ocorreu um erro ao ler o arquivo: " + err.message);

        }

        else {

            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});

            res.end(data);

        }

    })

    let fTime = new Date().getTime();

    console.log("Tempo de resposta: " + (fTime - sTime) + "ms");    




});




server.listen(3000, '127.0.0.1', () => {

  console.log(` Servidor rodando http://127.0.0.1:3000/`);

});