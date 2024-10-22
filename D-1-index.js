const { error } = require('console');
let cmd = require('./C-1-cmd.js');
let fs = require('fs');
const { join } = require('path');
const { json } = require('stream/consumers');

cmd.use("minus", function(contInputs){
    console.log(cmd.parseInput(contInputs[1]) - cmd.parseInput(contInputs[2]));
});
cmd.use("sum", function(contInputs){
    console.log(cmd.parseInput(contInputs[1]) + cmd.parseInput(contInputs[2]));
});
cmd.use("multiply", function(contInputs){
    console.log(cmd.parseInput(contInputs[1]) * cmd.parseInput(contInputs[2]));
});
cmd.use("div", function(contInputs){
    console.log(cmd.parseInput(contInputs[1]) / cmd.parseInput(contInputs[2]));
});
cmd.use("printRecord", function(contInputs){
    console.log({
        name: contInputs[1],
        family: contInputs[2],
        age: contInputs[3],
        email: contInputs[4]
    });
});
cmd.use("saveRecord", function(contInputs){
    fs.writeFile('myDatabase.txt', contInputs[1], {encoding:'utf8'}, function(error){
        if(error){
            console.log('ERROR:', error);
        }
        else{
            console.log('File Saved.')
        }
    })
});
cmd.use("saveRecord2", function(contInputs){
    let x = {
        name: contInputs[1],
        family: contInputs[2],
        age: contInputs[3],
        email: contInputs[4]
    }
    x = JSON.stringify(x);
    fs.writeFile('myDatabase.txt', x, {encoding:'utf8'}, function(error){
        if(error){
            console.log('ERROR:', error);
        }
        else{
            console.log('File Saved.')
        }
    })
});
cmd.use("openFile", function(contInputs){
    console.log(111);
    fs.readFile(contInputs[1], function(error, data){
        if(error){
            if(error.code === 'ENOENT'){
                console.log('File not found.')
            }
            else{
                console.log('Some other Error:', error)
            }
        }
        else{
            console.log('File Opened.', data.toString())
        }
        console.log(222);
    });
    console.log(333);
});
cmd.use("open", function(contInputs){
    fs.readFile(contInputs[1], function(error, data){
        if(error){
            if(error.code === 'ENOENT'){
                console.log('File not found.')
            }
            else if(error.code === 'EINVAL'){
                fs.readdir(contInputs[1], function(readdirError, readdirData){
                    if(readdirError){
                        console.log("Read Dir ERROR:", readdirData)
                    }
                    else{
                        console.log("Dir list", readdirData)
                    }
                });
            }
            else{
                console.log('Some other Error:', error)
            }
        }
        else{
            console.log('File Opened.', data.toString())
        }
    });
});
cmd.use("update",function(contInputs){
    fs.readFile("database.json", function(error, data){
        if(error){
            if(error.code === 'ENOENT'){
                console.log('File not found.')
            }
            else{
                console.log('Some other Error:', error)
            }
        }
        else{

            let x = {
                name: contInputs[1],
                family: contInputs[2],
                age: contInputs[3],
                email: contInputs[4]
            }
            let obj=JSON.parse(data.toString());
            obj.data.push(x);
            let txt=JSON.stringify(obj);

            fs.writeFile('database.json', txt, {encoding:'utf8'}, function(error){
                if(error){
                    console.log('ERROR:', error);
                }
                else{
                    console.log('File Saved.')
                }
            })
        }
    })

});

    
    



cmd.start();