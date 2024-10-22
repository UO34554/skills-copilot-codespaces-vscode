// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const port = 3000;

app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
    fs.readFile(path.resolve(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send({ error: 'Internal Server Error' });
        } else {
            res.status(200).send(JSON.parse(data));
        }
    });
});
 

// Add a new comment
app.post('/comments', (req, res) => {
    fs.readFile(path.resolve(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send({ error: 'Internal Server Error' });
        } else {
            const comments = JSON.parse(data);
            const newComment = {
                    id: uuidv4(),
                    text: req.body.text,
                    createdAt: new Date().toISOString()
                };
                comments.push(newComment);
                fs.writeFile(path.resolve(__dirname, 'comments.json'), JSON.stringify(comments, null, 2), (err) => {
                    if (err) {
                        res.status(500).send({ error: 'Internal Server Error' });
                    } else {
                        res.status(201).send(newComment);
                    }
                });
        }
    });
});
            
