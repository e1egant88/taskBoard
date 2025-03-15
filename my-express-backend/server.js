import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import db from './db.js'; 
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5001;
const API_BASE_URL = process.env.API_BASE_URL || `http://localhost:${PORT}`;

app.use(cors())
// Middleware to parse JSON request bodies
app.use(express.json());

app.get('/config', (req, res) => {
  res.json({
      apiBaseUrl: API_BASE_URL,
  });
});

// Create a new item in the database (Insert Operation)
app.post('/create', (req, res) => {
  const { title, description, status } = req.body;
  console.log(title)
  const sql = 'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)';
  db.query(sql, [title, description, status], (err, result) => {
    if (err) {
      console.error('Error inserting data: ', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send('Task created');
  });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(password)

    // Query the database to check if the username exists
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).send('Server error');
        }

        if (results.length === 0) {
            // No user found with this username
            return res.status(400).send('User not found');
        }

        const user = results[0];

        // Compare the password with the hashed password in the database
      
        bcrypt.compare('password123', user.password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).send('Server error');
            }

            if (!isMatch) {
                // Passwords don't match
                return res.status(400).send('Incorrect password');
            }

            // User is authenticated successfully
            res.status(200).send('Login successful');
        });
    });
});

// Get all items from the database (Read Operation)
app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data: ', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results); // Send the results as JSON
  });
});

// Update an item in the database (Update Operation)
app.put('/update/:id', (req, res) => {
  const { title, description, status } = req.body;
  const { id } = req.params;
  const sql = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';
  db.query(sql, [title, description, status, id], (err, result) => {
    if (err) {
      console.error('Error updating data: ', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send('Task updated');
  });
});

// Delete an item from the database (Delete Operation)
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting data: ', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send('Task deleted');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
