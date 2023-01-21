const path = require('path'); // importing path module to handle file paths
const express = require('express'); // importing express module
const dotenv = require('dotenv').config(); // importing dotenv module to access environment variables
const port = process.env.PORT || 5500; // setting port to process.env.PORT or 5500 as a fallback

const app = express(); // creating a new instance of express

// Enable body parser
app.use(express.json()); // enabling json parsing
app.use(express.urlencoded({ extended: false })); // enabling url encoding

// Set static folder
app.use(express.static(path.join(__dirname, 'public'))); // setting the 'public' folder as the static folder for the app

app.use('/openai', require('./routes/openaiRoutes')); // using the '/openai' endpoint and requiring the openaiRoutes file

app.listen(port, () => console.log(`Server started on port ${port}`)); // starting the server on the specified port and logging a message to the console