const http = require('http');

const port = process.env.PORT || 3000; // Si la variable d'environnement PORT est définie, elle sera utilisée, sinon il se tournera vers le port 3000 par défaut.
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World! :  ta gueule');
});

server.listen(port, () => {
    console.log(`Serveur en fonctionnement à l'adresse http://localhost:${port}/`);
});
