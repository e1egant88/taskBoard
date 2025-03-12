const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',  // Replace with your database host (localhost for local MySQL)
  user: 'root',       // Your MySQL username
  password: 'MyNewPass',       // Your MySQL password
  database: 'mydb'    // The name of the database you're using
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;
