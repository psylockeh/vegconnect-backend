const express = require('express'); 
const imgur = require('imgur');
const fileUpload = require('express-fileupload')



const app = express(); 
const port = 3000; 


app.get('/', (req, res) => {
    res.send('Hello, World');
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
