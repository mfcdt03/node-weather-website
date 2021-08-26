const request = require('request');

//encodeURIComponent returns a string accounting for special characters that means something in URL format
const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoibWZjZHQiLCJhIjoiY2tzcHU1b2dlMDVjczJwcWhlaHh2d2liZiJ9.Fd2U6CMHDXZC3v1nWI-KNQ&limit=1';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find the location. Try another search', undefined);
    } else {
      //first paramater is undefined assuming there is no error
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

/*
geocode('Philadelphia New York', (error, data) => {
  console.log('Error', error);
  console.log('Data', data);
});
*/

module.exports = geocode;

// console.log(response.body.current)
// used [0] for array for weather_descriptions
// console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.'
// );
// });

//CHALLENGE
// const geocodeURL =
//   'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWZjZHQiLCJhIjoiY2tzcHU1b2dlMDVjczJwcWhlaHh2d2liZiJ9.Fd2U6CMHDXZC3v1nWI-KNQ&limit=1';
// request({ url: geocodeURL, json: true }, (error, response) => {
//   if (error) {
//     console.log('Unable to connect to Mapbox!');
//     //Check for length, features array is empty if location is error
//   } else if (response.body.features.length === 0) {
//     console.log('Unable to find location');
//   }
//   // already parsed
//   //console.log(response.body.current)
//   //used [0] for array for weather_descriptions
//   else {
//     console.log(
//       'The coordinates of Los Angeles are ' +
//         response.body.features[0].center[0] +
//         ' longitude and ' +
//         response.body.features[0].center[1] +
//         ' latitude.'
//     );
//   }
// });
