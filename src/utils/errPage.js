const path = require('path')
const fs = require('fs')
const routes = require('./routes')

function errPage(errStatus, errData) {
    const routeDate = routes[errStatus]
    if (!routeDate) {
        errData('такая ошибка не найдена')
        return
    }

    const {html:filePath}=routeDate
    fs.readFile(filePath, 'utf-8', (err, errFile) => {
        if (err) {
            errData('страница ошибки не найдена')
            return
        }
        else {
            errData(errFile)
            return
        }
    })
}
module.exports = errPage