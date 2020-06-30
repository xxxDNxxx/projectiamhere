import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'

export function setEnvironment(app) {
    if (process.env.NODE_ENV !== 'production') {
        setDevEnv(app)
    } else {
        setProdEnv(app)
    }
}

function setDevEnv(app) {
    process.env.NODE_ENV = 'development'
    process.env.DB_URL = 'mongodb://admin2:admin2@ds211269.mlab.com:11269/face_vertification'
    process.env.TOKEN_SECRET = 'my-development-secret'
    app.use(bodyParser.json())
    app.use(morgan('dev'))
    app.use(cors())
}

function setProdEnv(app) {
    process.env.DB_URL = 'mongodb://admin3:admin3@ds263048.mlab.com:63048/faceverification'
    process.env.TOKEN_SECRET = 'my-production-secret'
    app.use(bodyParser.json())
    app.use(express.static(__dirname + '/../../dist'))
}