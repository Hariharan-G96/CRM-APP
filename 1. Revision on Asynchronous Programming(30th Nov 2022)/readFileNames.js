/**
 * Problem statement: 
 * Your task is to write an async function `finder`. 
 * It will take an array of file names (filenames) in the 
 * form of a string and return a two-dimensional array where 
 * each inner array has the following values at each index.
 * 
 * Index 0: file name in the form of string
 * 
 * Index 1: boolean value where true value means the 
 * file does exist and false value means the file does not
 */

const fs = require('fs');

const finder = async function(fileNames) {
    let result = new Array();
    for(let i = 0; i < fileNames.length; i++){
        try{
            let filePresent = false;
            const readFileNames = new Promise((resolve, reject) => {
                fs.readFile(fileNames[i], "utf-8", (err, data) => {
                    if(err){
                        reject([fileNames[i], filePresent]);
                    }
                    else{
                        filePresent = true;
                        resolve([fileNames[i], filePresent]);
                    }
                });
            });
            let data = await readFileNames;
            result.push(data);
        } catch(err){
            result.push(err);
        }
    }

    return result;
};

let fileNames = [
    "./readFileNames.js",
    "./README.md",
    "xyz.txt"
];

finder(fileNames).then(data =>  console.log(data));