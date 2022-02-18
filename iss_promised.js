const request = require('request-promise-native');

const fetchMyIp = (callback) => {
  return request(`https://api.ipify.org/?format=json`);
};

const fetchCoordsByIp = (body) => {
  const ip = JSON.parse(body);
  return request(
    `https://api.freegeoip.app/json/${ip.ip}?apikey=71b2f3b0-905c-11ec-b3fc-fdd45f757ec4`
  );
};

const fetchISSFlyOverTimes = (body) => {
  const { latitude, longitude } = JSON.parse(body);
  return request(
    `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`
  );
};

const nextISSTimesForMyLocation = (body) => {
  return fetchMyIp()
  .then(fetchCoordsByIp)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });

}

module.exports = {
  fetchMyIp,
  fetchCoordsByIp,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};
