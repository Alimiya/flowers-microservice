const express = require('express')
const {createProxyMiddleware} = require('http-proxy-middleware')
const dotenv = require("dotenv")

dotenv.config({path: './apiGateway/config/.env'})

const app = express()

const routes = {
    '/api/users': 'http://localhost:3001',
    '/api/stores': 'http://localhost:3002',
    '/api/flowers': 'http://localhost:3003',
    '/api/deliveries': 'http://localhost:3004',
    '/api/payments': 'http://localhost:3005',
    '/api/auth': 'http://localhost:3006',
}

for (const route in routes) {
    const target = routes[route]
    console.log(`Target for route ${route}: ${target}`)
    app.use(route, createProxyMiddleware({target}))
}

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`)
})