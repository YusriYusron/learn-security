const express = require('express')
const rateLimit = require('express-rate-limit')
const xss = require('xss-clean')
const helmet = require('helmet')
const brcypt = require('bcrypt') 

const app = express()

app.use(helmet()) //Adding Helmet on top for HTTP headers XSS

app.use(express.json({
    limit: '10kb'
}))

const limit = rateLimit({
    max: 100, //Maximum request
    windowMs: 60 * 60 * 1000, // 1 hour banned/lockout
    message: 'Too many request' //Message to send
})

app.use('/', limit) //Setup limiter on specific route

app.use(xss()) //Clean XSS

brcypt.hash('mypassword',10, (error, hash) => {
     //Example print hash password
     console.log(hash)
     //Compare hash password to default
     brcypt.compare('mypassword',hash, (error, result) => {
         if (result) {
            console.log('True') //Print true, if hash password and default password is same
         } else {
            console.log('False') //Print false
         }
     })
})