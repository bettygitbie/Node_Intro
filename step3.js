const fs= require('fs');
const process = require('process');
const axios = require('axios');

function cat(path, newFile) {
    
    fs.readFile(path,'utf8',(err,data) => {
        if(err){
            console.log("Error reading",path,":", err);
        }else {
            if(newFile){
                copyFile(data,newFile);
            }else {
                console.log(data);
            }
        }
        
    })
}

async function webCat(url, newFile) {
    try{
        const res = await axios.get(url);
        copyFile(res.data,newFile);
    }catch(err){
        console.log(`Error fetching ${url}: ${err}`);
    }
}
function copyFile(oldFileText,newFile) {
    fs.writeFile(newFile,oldFileText,'utf8',(err)=> {
        if(err) {
            console.log(`Couldn't write ${newFile}: ${err}`);
        }
        else {
            console.log(oldFileText);
        }
    })
}

let consoleEntry = process.argv[2];

if(consoleEntry.slice(0,5)=== '--out'){
    let newFile= process.argv[3];
    let oldFile = process.argv[4];
    if(oldFile.slice(0,4)==='http'){
        webCat(oldFile, newFile);
    }else {
        cat(oldFile, newFile);
    }
    
}else if (consoleEntry.slice(0,4)==='http'){
    webCat(consoleEntry);
}
else{
    cat(consoleEntry);
}