const express = require('express');
const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: 'Veena@1991', // Your MySQL password
    database: 'bqStock_db'
  });


  // Connect to MySQL
connection.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
  });

  // Create Express app
const app = express();
app.use(express.static(__dirname + "/index.js"));

// Middleware to parse JSON bodies
app.use(express.json());



// Routes

// GET AAPL ticker





  // API 2
  
  

  //API 3
  app.get('/ticker/:AAPL', (req, res) => {
    const AAPL = req.params.AAPL;

    connection.query(`SELECT ticker, date, revenue,gp  FROM sampledata WHERE ticker='AAPL' AND DATE_FORMAT(STR_TO_DATE(date, '%d-%m-%Y'), '%Y-%m-%d') >= DATE(CURDATE()) - INTERVAL 5 YEAR;`, (err, results) => {
      if (err) {
        console.error('Error fetching users:', err);
        res.status(500);
        res.send('Error fetching users');
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Data not found' });
        return;
      }
      res.json(results); 
    });
  });
  
  
  // Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});