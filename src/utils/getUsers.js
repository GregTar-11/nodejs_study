const path = require('path')
const fs = require('fs')

function getUsers() {
    const file = path.join(__dirname, '../shared/data/users.json')

    const json = fs.readFileSync(file, 'utf-8')
    return JSON.parse(json)
}
module.exports = getUsers