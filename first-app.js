const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const adminRoute = require('./routes/admin')
const shopRoute = require('./routes/shop')

const app = express()

app.use(bodyParser.urlencoded())

app.use('/admin', adminRoute);
app.use(shopRoute);

app.use((req, res, next) => {
    res.status(404).send('<h1> Page not Found </h1>')
})


const server = http.createServer(app)

server.listen(3000)

// http.createServer(rqListener);