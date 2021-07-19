const { urlencoded, json } = require('express');
const express = require('express')
const app = express();
const routing = require('./router')
const morgan = require('morgan')
const cors = require('cors')
const database = require('./database')


//starting server

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), ()=>{
    console.log('server on port:', app.get('port'))
});


//database connection

database.conexion();


//middlewares

app.use(urlencoded({extended: false}))
app.use(express.json());

app.use(morgan('dev'))
app.use(cors())


//router

app.use('/', routing)


//error handling

app.use((req, res, next)=>{
    res.status(404).send(JSON.stringify({error: '404'}));
});

app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send(JSON.stringify({error: '500'}));
});