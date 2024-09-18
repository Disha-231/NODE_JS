const http = require('http');
const port = 8000;
const fs = require('fs')
http.createServer((req, res) => {
    //  console.log(req.url);
    let fileName = " ";
    switch (req.url) {
        case "/":
            fileName = "./home.html"
            break;
        case "/about":
            fileName = "./about.html"
            break;
        case "/contact":
            fileName = "./contact.html"
            break;
        case "/product":
            fileName = "./product.html"
            break;
        default:
            fileName = "./404.html"
            break;

    }
    fs.readFile(fileName, (err, data) => {
        if (err) {
            console.log("File Is Not Found");
            return false
        }
        res.end(data)
    })
}).listen(port)


















