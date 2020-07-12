const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3001;
const htmlRoute = require('./routes/htmlRoutes/htmlRoutes');
//const apiRoute = require('./routes/apiRoutes');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//calls routes
app.use(express.static("public"));
app.use('/', htmlRoute);

//app.use('/', apiRoute);

//display notes
app.get('/api/notes', (req,res) => {
  //looks for any previous notes
  fs.readFile('./db/db.json', 'utf8', function(err, data) {
      let noteData = [];
      if(err) {
          throw err;
      }
      if(data.length > 2) {
          noteData = JSON.parse(data);
          res.send(noteData);
      }
      //if no previous notes are found, then this
      else {
          console.log('No notes saved');
      }
  })   
});


//create new Note
app.post('/api/notes', (req, res) => {

let newNote = req.body;
  
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
          console.log(`err at the database ${err}`);
      } 
      
      else if (data.length > 2) {
          obj = JSON.parse(data);
          obj.push(newNote);
          //adds the new note to the list on the left
          fs.writeFile('./db/db.json', JSON.stringify(obj), 'utf8', (err) => {
              if(err) {
                  throw err;
              }
              console.log('Note saved.')
          });
     }
      else {
          obj = [];
          obj.push(newNote);
          fs.writeFile('./db/db.json', JSON.stringify(obj), 'utf8', (err) => {
              if(err) {
                  throw err;
              }
              console.log('Note saved.')
          });
      }
  });
});

//BONUS CODE
//ADD CODE HERE TO GET NOTES TO DELETE BY PUSHING THE TRASH CAN ICON.....


app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname,'./public/index.html'));
});

//Listens and sends the data to a specific port
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });