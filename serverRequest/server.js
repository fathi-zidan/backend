import { readFileSync } from 'node:fs';
import http from 'node:http';

const server = http.createServer((req, res) => {
    const { url, method } = req;

    switch (url) {
        case '/about':
            switch (method) {
                case 'GET':
                    const htmlFile = readFileSync('./src/index.html', 'utf8');
                    res.end(htmlFile);
                    return;
                case 'DELETE':
                    res.end("delete in about")
                    return;
            }
            return;
        case '/style.css':
            const cssFile = readFileSync('./src/style.css', 'utf8');
            res.end(cssFile);
            return;
        case '/video':
            res.end("hi from video")
            return;
    }
})
server.listen(3000, () => {
    console.log('listening on port 3000');
})