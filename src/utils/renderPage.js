const path = require('path')
const fs = require('fs')
const routes = require('./routes')
const errPage = require('./errPage')

function renderPage(route, callback) {
    const routeDate = routes[route]
    if (!routeDate) {
        errPage(404, (errData) => {
            callback(404, errData)
        })
    }
    else {
    const { html: filePath, css: stylePath, data } = routeDate
    const templatePath = path.join(__dirname, '../shared/template/base.html')

    fs.readFile(templatePath, 'utf-8', (err, layoutData) => {
        if (err) {
            errPage(500, (errData) => {
                callback(500, errData)
            })
        } else {
            fs.readFile(filePath, 'utf-8', (err, pageDate) => {
                if (err) {
                    errPage(404, (errData) => {
                        callback(404, errData)
                    })
                } else {
                    if (data && data.users) {
                        const usersHtml = data.users.map(u =>
                            `
                            <div class="user">
                                <h2>${u.first_name}</h2>
                                <p>${u.last_name}</p>
                                <p>${u.age}</p>
                                <img src="${u.image_url}" alt="${u.first_name}">
                            </div>
                            `).join('')
                        pageDate = pageDate.replace('{{contacts}}', usersHtml)
                    } else if (data && data.products) {
                        const productsHtml = data.products.map(p =>
                            `
                            <div class="product">
                                <h2>${p.name}</h2>
                                <p>${p.price}</p>
                                <img src="${p.img}" alt="${p.name}">
                            </div>
                            `).join('')
                        pageDate = pageDate.replace('{{products}}', productsHtml)
                    }
                    const html = layoutData
                        .replace('{{content}}', pageDate)
                        .replace('{{style}}', `<link rel="stylesheet" href=${stylePath}>`)
                    callback(200, html)
                }
            })
        }
    })
    }
}

module.exports = renderPage