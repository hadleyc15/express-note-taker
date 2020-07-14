const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    //looks for any previous notes
    
    fs.readFile('db/db.json', 'utf8', function (err, data) {

        let noteData = [];
        if (err) {
            throw err;
        }
        if (data.length > 2) {
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
router.post('/notes', (req, res) => {

    let newNote = {
        title: req.body.title, 
        text: req.body.text,
        id: uuidv4(),
    };

    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(`err at the database ${err}`);
        }

        else if (data.length > 2) {
            obj = JSON.parse(data);
            obj.push(newNote);
            //adds the new note to the list on the left
            fs.writeFile('db/db.json', JSON.stringify(obj), 'utf8', (err) => {
                if (err) {
                    throw err;
                }
                console.log('Note saved.')
                res.json(obj)
            });
        }
        else {
            obj = [];
            obj.push(newNote);
            fs.writeFile('db/db.json', JSON.stringify(obj), 'utf8', (err) => {
                if (err) {
                    throw err;
                }
                console.log('Note saved.')
                res.json(obj)
            });
        }
    });
});

module.exports = router;