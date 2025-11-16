const fs = require('fs')
const path = require('path')

function serverStatic (req, res, pathName) {
    const ext = path.extname(pathName).toLowerCase()

    let contentType = 'text/plain'
    if (ext === '.css') contentType = 'text/css'
    else if (ext === '.js') contentType = 'application/javascripts'

    const filePath = path.join(__dirname, '..', pathName)
    
    fs.readFile(filePath, (err, data) => {
        if (!err) {
            res.writeHead(200, { 'Content-Type': contentType })
            res.end(data)
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' })
            res.end('Ошибка , не найдены стили(статические файлы)')
        }
    })
}
module.exports = serverStatic