const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
var handlebars = require('hbs')
const app = express();
const port = 3000;


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views', 'layouts'));

handlebars.registerPartials(__dirname + '/app_server/views/partials');
handlebars.registerHelper('eq', (a, b) => a == b)



require('./app_api/models/db')

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));


// Use the routes
app.use('/', require('./app_server/routes/index'));
app.use('/contact', require('./app_server/routes/contact'));
app.use('/about', require('./app_server/routes/about'));
app.use('/meals', require('./app_server/routes/meals'));
app.use('/news', require('./app_server/routes/news'));
app.use('/rooms', require('./app_server/routes/rooms'));
app.use('/travel', require('./app_server/routes/travel'));

var apiRouter = require('./app_api/routes/index')
app.use('/api', apiRouter)

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});