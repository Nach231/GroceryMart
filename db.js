const sql = require('mssql');

// Configuration for your Azure SQL Database
const config = {
  user: 'azureuser',
  password: '@Nachete02',
  server: 'myservernacho.database.windows.net',
  database: 'myDatabase',
  options: {
    encrypt: true, // For secure connections
    trustServerCertificate: false // Change this based on your security needs
  },
  pool: {
    max: 10, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    idleTimeoutMillis: 30000 // How long a connection is allowed to remain idle
  }
};

// Function to establish a database connection pool
async function connectDB() {
  try {
    const pool = await sql.connect(config);
    console.log('Database connected!');
    
    
    const fecha = new Date().toISOString().slice(0, 19).replace('T', ' '); // Obtener la fecha actual
    const query = `INSERT INTO dbo.logins (nombre_usuario, fecha) VALUES ('nacho123', '${fecha}')`;
    //console.log('Query a ejecutar'); // Agrega la consulta a la consola para verificar su estructura
    
    // Ejecutar la consulta
    const result = await pool.request().query(query);
    //console.log('Rows affected:', result.rowsAffected); // Imprimir el número de filas afectadas
    
    return pool;
  } catch (err) {
    console.error('Error connecting to the database or executing query:', err);
    throw err; // Rethrow the error to handle it at a higher level if needed
  }
}

module.exports = {
  connectDB
};


