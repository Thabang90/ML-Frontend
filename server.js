const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist'));
console.log(__dirname + '/dist')
app.get('/*', function(req, res) { res.sendFile(path.join(__dirname + '/dist/index.html')); });
app.listen(process.env.PORT || 8080);

const fs = require('fs');

const directoryPath = __dirname; // Replace with the path to your directory

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
    } else {
        console.log('Files in the directory:');
        files.forEach(file => {
            console.log(file);
        });
    }
});



/* const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/<app-name>'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/dist/<app-name>/index.html'));});
app.listen(process.env.PORT || 8080); */