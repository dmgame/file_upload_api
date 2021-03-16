const express = require('express');
const multer  = require('multer');
const fs  = require('fs');
const path = require('path');

const app = express()
const PORT = 2121;

app.get('/', (req, res) => {
    res.render('index');
});

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const dir = './uploads';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        // const str = "some string".replaceAll(' ', '_')
        // console.log(str)
        callback(null, file.originalname);
    }
});
const upload = multer({storage: storage}).array('files', 12);
const directoryPath = path.join(__dirname, 'uploads');

app.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong:(");
        }
        res.end("Upload completed.");
    });
})

app.get('/files', function (req, res) {
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            console.log('Unable to scan directory: ' + err);
            return res.status(404).send(`Unable to find any files in the ${directoryPath}`)
        }
        const links = files.map(fileName => `http://localhost:${PORT}/uploads/${fileName}`)
        res.send(links)
    });
})

app.get('/uploads/:filename', (req, res) => {
    const directoryPath = path.join(__dirname, `uploads`, req.params.filename);
    res.sendFile(directoryPath);
})

app.listen(PORT, () => {
    console.log('Server up and running')
});
