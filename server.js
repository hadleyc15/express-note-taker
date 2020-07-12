const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3001;
const htmlRoute = require('./routes/htmlRoutes');
const apiRoute = require('./routes/apiRoutes');
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//calls routes
app.use(express.static("public"));
app.use('/', htmlRoute);
app.use('/', apiRoute);

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname,'public/index.html'));
});

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });