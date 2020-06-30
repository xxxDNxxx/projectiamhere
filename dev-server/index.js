import express from 'express'
const app = express()
import { registerRoutes } from './routes'
import { setEnvironment } from './config/env'
import { connectToDB } from './config/db'
setEnvironment(app)
connectToDB()
registerRoutes(app)

app.get('/', (req, res) => {
    if (process.env.NODE_ENV !== 'production') {
        return res.send('Running server in Development mode.')
    } else {
        return res.sendFile('index.html', { root: __dirname + '/../dist/' })
    }
})
app.listen(3000, () => {
    console.log('app listen on port 3000' + process.env.NODE_ENV + 'mode.')
})