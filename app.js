const http = require('http');
const fs = require('fs');
const path = require('path');
const db = require('./db.js'); // Importa el archivo de conexión a la base de datos

const server = http.createServer(async (req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html'; // Nombre de tu archivo HTML
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
    }[extname] || 'application/octet-stream';

    if (req.url === '/search') {
        try {
            // Lógica para realizar la búsqueda en la base de datos
            const searchData = await db.searchInDatabase(); // Llama a una función de búsqueda en tu db.js
            
            // Envía los resultados de búsqueda como respuesta
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(searchData));
        } catch (error) {
            // Manejo de errores
            res.writeHead(500);
            res.end('500 Internal Server Error');
        }
    } else {
        // Lógica para servir archivos estáticos
        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404);
                    res.end('404 Not Found');
                } else {
                    res.writeHead(500);
                    res.end('500 Internal Server Error');
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    db.connectDB();
    
});


/*
const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');
const path = require('path');
const db = require('./operacionesDB');

app.use(express.json());

// Manejo de la solicitud POST a la ruta /guardar-usuario
app.post('/guardar-usuario', async (req, res) => {
  const { username } = req.body;
  console.log('Usuario recibido para guardar:', username);

  // Llama a la función para guardar el usuario en la base de datos
  try {
    await db.guardarRegistro(username);
    res.status(200).send('Usuario guardado en la base de datos');
  } catch (error) {
    console.error('Error al guardar el usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Lógica para servir archivos estáticos
app.use(express.static('public'));

// Creación del servidor HTTP para el manejo de rutas no manejadas por Express
const server = http.createServer(async (req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html'; // Nombre de tu archivo HTML
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
  }[extname] || 'application/octet-stream';

  if (req.url === '/search') {
    try {
      // Lógica para realizar la búsqueda en la base de datos
      const searchData = await db.searchInDatabase(); // Llama a una función de búsqueda en tu db.js
      
      // Envía los resultados de búsqueda como respuesta
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(searchData));
    } catch (error) {
      // Manejo de errores
      res.writeHead(500);
      res.end('500 Internal Server Error');
    }
  } else {
    // Lógica para servir archivos estáticos
    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404);
          res.end('404 Not Found');
        } else {
          res.writeHead(500);
          res.end('500 Internal Server Error');
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  }
});
const fecha = new Date().toISOString().slice(0, 19).replace('T', ' '); // Obtener la fecha actual
const query = `INSERT INTO dbo.logins (nombre_usuario, fecha) VALUES ('Nachete', '${fecha}')`;
console.log('Query a ejecutar:', query); // Agrega la consulta a la consola para verificar su estructura

// Iniciar el servidor HTTP
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
*/
