const path = require('path')
const fs = require('fs')

function getProducts() {
    const file = path.join(__dirname, '../shared/data/products.json')

    const json = fs.readFileSync(file, 'utf-8')
    return JSON.parse(json)
}
module.exports = getProducts
