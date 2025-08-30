const express = require('express')
const path = require('path')

const router = express.Router()


router.get('/',(req, res, next) => {
    // console.log('in another middleware')
    // res.send("<h1>Hello from Express</h2>")
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'))
})

module.exports = router