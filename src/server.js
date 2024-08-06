const express = require('express');

const app = express();
const PORT = 3333;

// Middleware para parsear o corpo da requisição como JSON
app.use(express.json());

// Middleware para parsear o corpo da requisição como application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Middleware para CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permite todas as origens
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Métodos permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With'); // Cabeçalhos permitidos
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Se você precisar permitir cookies e credenciais
  next();
});

// Rota para lidar com requisições POST (dados do webhook)
app.post('/', (req, res) => {
  const dados = req.body;

  console.log(dados);

  fetch('https://script.google.com/macros/s/AKfycbywv4n416rPcl3E3RUHrKMmM2-vsap4aMmpmMavQENW4pwui13gyx4SzunkvzDyOCD-rA/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  })
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));


  res.json({ success: true });
});

// Rota para lidar com requisições OPTIONS (CORS)
app.options('/', (req, res) => {
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  return res('Ola Mundo!')
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
