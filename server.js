const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const htmlRoute = require('./routes/htmlRoutes/htmlRoutes.js');
const apiRoute = require('./routes/apiRoutes/apiRoutes.js');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//calls routes
app.use(express.static("public"));
app.use('/api', apiRoute);
app.use('/', htmlRoute);

//BONUS CODE
//ADD CODE HERE TO GET NOTES TO DELETE BY PUSHING THE TRASH CAN ICON.....


//Listens and sends the data to a specific port
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });