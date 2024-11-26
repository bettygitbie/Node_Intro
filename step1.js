const fs= require('fs');
const process = require('process');

function cat(path) {
    fs.readFile(path,'utf8',(err,data) => {
        if(err){
            console.log("Error reading",path,":", err);
        }
        console.log(data);
    })
}

const path = process.argv[2];
cat(path);