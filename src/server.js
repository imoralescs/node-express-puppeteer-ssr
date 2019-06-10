'use strict'

const express = require('express')
const path = require('path')

const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT

const ssr = require('./ssr')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use('/comments', async(req, res) => {
    const { html } = await ssr(`${req.protocol}://${req.get('host')}/comments.html`)
    
    return res
        .status(200)
        .send(html);
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})