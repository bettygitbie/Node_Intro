const fs= require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
    fs.readFile(path,'utf8',(err,data) => {
        if(err){
            console.log("Error reading",path,":", err);
        }else {
            console.log(data);
        }
        
    })
}

async function webCat(url) {
    try{
        const res = await axios.get(url);
        console.log(res.data);
    }catch(err){
        console.log(`Error fetching ${url}: ${err}`);
    }
}

let consoleEntry = process.argv[2];

if(consoleEntry.slice(0,4)=== 'http'){
    webCat(consoleEntry);
}else {
    cat(consoleEntry);
}