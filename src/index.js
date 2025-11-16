const url = require('url')
const serverStatic = require('./utils/serverStatic')
const renderPage = require('./utils/renderPage')

const define = function (req, res) {
    const urlParse = url.parse(req.url, true)
    const pathName = urlParse.pathname

    if (/\.(css|js)$/i.test(pathName)) {
        serverStatic(req, res, pathName)
        return
    }

    renderPage(pathName, (status, data) => {
        if (status === 200) {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(data)
        } else if (status === 404) {
            res.writeHead(404, { 'Content-Type': 'text/html' })
            res.end(data)
        } else if (status === 500) {
            res.writeHead(500, { 'Content-Type': 'text/html' })
            res.end(data)
        } else {
            res.writeHead(600, { 'Content-Type': 'text/plain;charset=utf-8' })
            res.end(data)
        }
    })
}
exports.define = define