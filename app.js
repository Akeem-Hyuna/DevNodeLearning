// Accessing the http module //
const http = require('http'); 

// Create web server using a call back fuction //
const server = http.createServer((req, res) =>  {
    if (req.url === '/') {
        res.write('Hello World'); 
        res.end(); 
    }

    if (res.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3])); 
        res.end(); 
    }
}); 

server.listen(3000); 

console.log('Listening on port 3000...'); 