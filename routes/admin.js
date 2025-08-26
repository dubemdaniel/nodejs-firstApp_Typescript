const express = require('express')
const router = express.Router()

router.get('/add-product',(req, res, next) => {
    // console.log('This is a product page')
    res.send('<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Add PRoduct</button></form>')
})

router.post('/product', (req, res, next) => {
    // console.log('this is the product info')
    console.log(req.body)
    res.redirect('/')
})

module.exports = router