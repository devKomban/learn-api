
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', err => {
        console.log(`Something went wronge`);
    });
    next();
});
app.use((req, res, next) => {
    res.render('maintanence.hbs');
});
app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear', ()=> {
    return new Date().getFullYear();
});
hbs.registerHelper('toUpper', (text) => {
    return text.toUpperCase();
});

// app.get('/', (req, res) => {
//     res.send(req.headers);
// });

app.get('/', (req, res) => {
    res.render('home.hbs', {
        "pageTitle": "Home",
        "heading": "Home",
        "contentMessage": "Welcome to my page",
        "date": new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('home.hbs', {
        "pageTitle": "About",
        "heading": "About",
        "contentMessage": "About me",
        "date": new Date().getFullYear()
    });
});

app.listen(3000, () => {
    console.log('Server is ready to go');
});