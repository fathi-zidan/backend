import { readFileSync } from 'node:fs';
import http from 'node:http';

const server = http.createServer((req, res) => {
    const { url, method } = req;
    switch (url) {
        case '/raw-html':
            res.end("<h1>Welcome</h1>");
            return;
        case '/users':
            const usersFile = readFileSync('./src/users.json', 'utf8');
            res.end(usersFile);
            return;
        case '/':
            const htmlFile = readFileSync('./src/index.html', 'utf8');
            res.end(htmlFile);
            return;
        case '/style.css':
            const cssFile = readFileSync('./src/style.css', 'utf8');
            res.end(cssFile);
            return;
        case '/index.js':
            const indexJS = readFileSync('./src/index.js', 'utf8');
            res.end(indexJS);
            return;
    }


});

server.listen(4678, () => {
    console.log("PureNode server is listing!");
})