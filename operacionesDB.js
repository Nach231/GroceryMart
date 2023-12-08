const sql = require('mssql');
const { connectDB } = require('./db'); // Importa la función de conexión desde el archivo db.js

// Función para guardar la información del usuario en la base de datos
async function guardarRegistro(nombreUsuario) {
  try {
    const pool = await connectDB(); // Obtiene el pool de conexiones
    console.log('Conexión establecida correctamente'); // Añade una verificación de conexión
    
    const fecha = new Date().toISOString().slice(0, 19).replace('T', ' '); // Obtener la fecha actual
    const request = pool.request();
    const query = `INSERT INTO dbo.logins (nombre_usuario, fecha) VALUES ('${nombreUsuario}', '${fecha}')`;
    console.log('Query a ejecutar:', query); // Agrega la consulta a la consola para verificar su estructura
    const result = await request.query(query);
    console.log('Registro exitoso');
    sql.close(); // Cierra la conexión después de realizar la operación
  } catch (error) {
    console.error('Error al insertar datos:', error);
  }
}

module.exports = {
  guardarRegistro
};

