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

const fetchISSFlyOverTimes = (cords, callback) => {
  request(
    `https://iss-pass.herokuapp.com/json/?lat=${cords.latitude}&lon=${cords.longitude}`,
    (error, response, body) => {
      if (error) {
        const msg = `Status Code ${response.statusCode} when fetching coordinates FLY over time. Response: ${body}`;
        callback(error, null);
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      const content = JSON.parse(body);
      callback(null, content.response);
    }
  );
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIp((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIp(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};



module.exports = {
  fetchMyIp,
  fetchCoordsByIp,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};
 