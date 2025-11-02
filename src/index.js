const fs = require('fs')
const path = require('path')
const url = require('url')

const define = function (req, res) {
    const urlParsed = url.parse(req.url, true)
    let pathName = urlParsed.pathname

    if (/\.(css|js)$/i.test(pathName)) {
        let ext = path.extname(pathName).toLowerCase()
        let contentTypy = 'text/plain'

        if (ext === '.css') contentTypy = 'text/css'
        else if (ext === '.js') contentTypy = 'text/javascripts'
        const filePath = path.join(__dirname, pathName)

        fs.readFile(filePath, (err, data) => {
            if (!err) {
                res.writeHead(200, { 'Content-Type': contentTypy })
                res.end(data)
            }
            else {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
                res.end('Страница не найдена')
            }

        })
        return
    }



    const filePath = path.join(__dirname, '/modules/main/main.html')

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
            res.end('Ошибка сервера')
        }
        else {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(data)
        }
    })
}

exports.define = define