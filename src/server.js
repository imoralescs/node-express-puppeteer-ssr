import express from 'express'
import path from 'path'
import ssr from './ssr'

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use('/comments', async(req, res) => {
    const { html } = await ssr(`${req.protocol}://${req.get('host')}/comments.html`)
    
    return res
        .status(200)
        .send(html);
})

// Catch all or 404
app.all('*', (req, res) => {
    res.json({ok: true})
})

export default app