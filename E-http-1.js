let http = require('http');

function write(res,body){
    res.write(body.toString());
    res.end();
}

    let server = http.createServer(function(req, res){
        console.log('request:', req.method, req.url);
        let path = req.url.split('/');
        let result;
    
        if(path[1] === 'sum'){
            result = parseInt(path[2]) + parseInt(path[3]);

        }
        if(path[1] === 'multiply'){
            result = parseInt(path[2]) * parseInt(path[3]);
        }
        
    write(res,result)
});
server.listen(80);