const { fetchMyIp } = require('./iss');

fetchMyIp((err, ip) => {
  if (err) {
    return console.log('There was an error:', err);
  } else {
    return console.log('Your ip is:', ip);
  }
});
