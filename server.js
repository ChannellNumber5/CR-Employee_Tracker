const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();


// throws an error when there are no more routes/pages to serve out to the client
app.use((req, res) => {
    res.status(404).end()
});

//connects to the web server serving out our site
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
