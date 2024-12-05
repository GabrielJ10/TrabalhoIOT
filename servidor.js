const express = require("express");
const app = express();
const port = 80;

// Variável para armazenar o estado do ar-condicionado
let arCondicionadoIsOn = false;

// Middleware para interpretar JSON no corpo da requisição
app.use(express.json());

// Endpoint para ligar o ar-condicionado
app.post("/on", (req, res) => {
  arCondicionadoIsOn = true;
  res.send("Ar-condicionado ligado!");
});

// Endpoint para desligar o ar-condicionado
app.post("/off", (req, res) => {
  arCondicionadoIsOn = false;
  res.send("Ar-condicionado desligado!");
});

// Interface web
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Status do Ar-condicionado</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #e9ecef;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .container {
          text-align: center;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
          font-size: 24px;
          color: #007bff;
          margin-bottom: 20px;
        }
        p {
          font-size: 18px;
          font-weight: bold;
        }
        .status {
          font-size: 20px;
          padding: 10px 20px;
          border-radius: 8px;
          color: white;
          margin-top: 15px;
          display: inline-block;
        }
        .status.ligado {
          background-color: #28a745;
        }
        .status.desligado {
          background-color: #dc3545;
        }
      </style>
      <script>
        async function atualizarStatus() {
          try {
            const response = await fetch('/status');
            const data = await response.json();
            const statusElement = document.getElementById('status');
            statusElement.innerText = data.status;
            statusElement.className = 'status ' + (data.status === 'Ligado' ? 'ligado' : 'desligado');
          } catch (error) {
            console.error('Erro ao atualizar o status:', error);
          }
        }
        setInterval(atualizarStatus, 1000); // Atualiza o status a cada 1 segundo
        window.onload = atualizarStatus; // Atualiza o status ao carregar a página
      </script>
    </head>
    <body>
      <div class="container">
        <h1>Status do Ar-condicionado</h1>
        <p id="status" class="status desligado">Carregando...</p>
      </div>
    </body>
    </html>
  `);
});

// Endpoint para verificar o status do ar-condicionado
app.get("/status", (req, res) => {
  res.json({
    status: arCondicionadoIsOn ? "Ligado" : "Desligado",
  });
});

// Inicialização do servidor
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
