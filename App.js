const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.setHeader('Content-Type', 'text')
        res.write('<html>');
        res.write('<head><title>Greeting</title></head>');
        res.write('<body><div>Hello</div>');
        res.write('<form action = "/create-users" method = "POST" ><input type="text" value="username" autofocus name="username"><button type="submit">Submit</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/users'){
        res.setHeader('Content-Type', 'text')
        res.write('<html>');
        res.write('<head><title>Greeting User</title></head>');
        res.write('<body><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/create-users' && method === 'POST'){
        const body = [];
        req.on('data', (chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const newUsers = parsedBody.split('=')[1];
            fs.writeFileSync('newUsers.txt',newUsers);
            console.log(newUsers);
        })
        res.statusCode = 308;
        res.setHeader('Location','/');
        return res.end();
    }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Rando shit if there aint no route</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
})

server.listen(3000);
