const express = require('express')
const rateLimit = require('express-rate-limit')
const xss = require('xss-clean')
const helmet = require('helmet')

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