const express = require('express');
const path = require('path');
const server = express();

const fs = require('fs');

const formidable = require('formidable');


server.get('/', (req, resp)=>{
    resp.sendFile(path.join(__dirname, "./q1.html"));
})

server.post('/upload', (req, resp)=>{
    // var form = new formidable.IncomingForm();
    const form = formidable.formidable({});
    form.parse(req, (err, fields, files)=>{
        console.log(files);
        var oldpath = files.uploadFile.filepath;
        var newpath = path.join(__dirname, files.uploadFile.name);
        
        console.log("hel")

        fs.copyFile(oldpath, newpath, (err)=>{
            if(err){
                throw err;
            }
            resp.write("File was uploaded and moved");
            resp.status(200).send();
        });

    })
})

server.listen(9999, ()=>{
    console.log("Server listening at 9999");
})