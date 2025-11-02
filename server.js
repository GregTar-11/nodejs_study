const http = require('http')
const routing = require('./src')

const server = new http.Server(function(req,res){
    jsonString= ''

    res.setHeader('Content-Type' , 'application/json')

    req.on('data',(data)=>{
        jsonString +=data
    })

    req.on('end', ()=>{
        routing.define(req,res,jsonString)
    })
})

server.listen(8000,'localhost')
console.log('port http://localhost:8000')
