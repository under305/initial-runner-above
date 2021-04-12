const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

/**
 * *Initializations
 */
const app = express();

/**
 * *Settings
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

/**
 * *Midlewares
 */
app.use(express.urlencoded({extended: false}));

/**
 * *Global Variables
 */


/**
 * *Routes
 */
app.use(require('./routes/index.routes'));
app.use(require('./routes/images.router'));

/**
 ** Static files
 */
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;