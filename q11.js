const express = require('express');
const path = require('path');
const server = express();

const fs = require('fs');

const formidable = require('formidable');

server.get('/', (req, resp)=>{
    resp.sendFile(path.join(__dirname, "./q1.html"));
})

server.post('/upload', (req, resp)=>{
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files)=>{
        
        if (err) {
            console.error('Error parsing form:', err);
            resp.status(500).send("Error uploading file");
            return;
        }

        console.log('Received files:', files);

        // Assuming only one file is uploaded
        const file = files.uploadFile;
        console.log(file);
        const oldpath = file.path;
        const newpath = path.join(__dirname, file.name);
        
        fs.copyFile(oldpath, newpath, (err)=>{
            if(err){
                console.error('Error moving file:', err);
                resp.status(500).send("Error moving file");
                return;
            }
            resp.write("File was MOVED");
            resp.status(200).send();
        });
    });
})

server.listen(9999, ()=>{
    console.log("Server listening at 9999");
})

// added comment