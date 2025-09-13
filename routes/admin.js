const express = require('express')
const router = express.Router()
const path = require('path')
const rootDir = require('../util/path') 

router.get('/add-product',(req, res, next) => {
    // console.log('This is a product page')
    // res.send('<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Add PRoduct</button></form>')
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
})

router.post('/product', (req, res, next) => {
    // console.log('this is the product info')
    console.log(req.body.name)
    console.log(req.body)
    // if (!req.body.name) {
    //     return res.status(400).json({error: "something went wrong"})
    // }
    console.log(req.body)
    res.redirect('/')
})

module.exports = router