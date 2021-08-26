const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=91dd3e3b98551b0f489fef0a8f03810c&query=' +
    latitude +
    ',' +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to Weatherstack', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          '. It is currently ' +
          body.current.temperature +
          ' degrees out. It feels like ' +
          body.current.feelslike +
          ' degrees out and humidity is ' +
          body.current.humidity +
          '%.'
      );
    }
  });
};

/*
to check for body
request({ url: url }, (error, response) => {
  console.log(response);
});
*/

/*
forecast(geoData.latitude, geoData.longitude, (error, data) => {
  console.log('Error', error);
  console.log('Data', data);
});
*/

module.exports = forecast;
