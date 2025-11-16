const path = require('path')
const getProducts = require('./dataProvider')
const getUsers = require('./getUsers')

const routes = {
    '/': {
        html: path.join(__dirname, '../modules/main/main.html'),
        css: '/modules/main/main.css'
    },
    '/products': {
        html: path.join(__dirname, './modules/products/products.html'),
        css: '/modules/products/products.css',
        data: {
            products: getProducts()
        }
    },
    '/contacts': {
        html: path.join(__dirname, '../modules/contacts/contacts.html'),
        css: '/modules/contacts/contacts.html',
        data: {
            users: getUsers()
        }
    },
    '404': {
        html: path.join(__dirname, '../modules/err/err404.html'),
    },
    '500': {
        html: path.join(__dirname, '../modules/err/err500.html'),
    }
}
module.exports = routes