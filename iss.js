const request = require('request');

const fetchMyIp = (callback) => {
  request(`https://api.ipify.org/?format=json`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
    }
    const content = JSON.parse(body);
    callback(null, content.ip);
    // fetchCoordsByIp(content.ip, null)
  });
};

const fetchCoordsByIp = (ip, callback) => {
  request(
    `https://api.freegeoip.app/json/${ip}?apikey=71b2f3b0-905c-11ec-b3fc-fdd45f757ec4`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      const { latitude, longitude } = JSON.parse(body);

      callback(null, { latitude, longitude });


    }
  );
};

module.exports = { fetchMyIp, fetchCoordsByIp };
