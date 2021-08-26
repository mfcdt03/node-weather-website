const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Deannah Tan',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Deannah Tan',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    helpText: 'For more help information please contact us at 00-000-000',
    name: 'Deannah Tan',
  });
});
//objects used is request and response
//root url: app.com
//app.com/help
//app.com/about

app.get('/weather-page', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a valid address',
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

//for help 404s
app.get('/help/*', (req, res) => {
  res.render('404error', {
    title: '404',
    name: 'Deannah Tan',
    errorMSG: 'Help Page article not found',
  });
});

//for any 404s
app.get('*', (req, res) => {
  res.render('404error', {
    title: '404',
    name: 'Deannah Tan',
    errorMSG: 'Page not found',
  });
});
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});