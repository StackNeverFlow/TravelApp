const express   = require('express');
const morgan    = require('morgan');
const helmet    = require('helmet');
const cors      = require('cors')
const colors    = require('colors');

const app       = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    })
});

app.use((req, res, next) => {
    const error = new Error(`Sorry but we cloud not find the URL ${req.originalUrl} :<`);
    res.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message
    });
});

// The port for the site
const port      = process.env.PORT || 3100;

app.listen(port, () => {
    console.log(`Listing at http://localhost:${port}`.brightGreen);
});