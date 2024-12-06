const express = require('express'); // Importa o Express
const app = express(); // Cria a aplicação Express
const port = 3000; // Define a porta

// Rota básica que responde "Hello, World"
app.get('/', (req, res) => {
    res.send('Hello, World');
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
