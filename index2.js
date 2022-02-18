const {
  fetchMyIp,
  fetchCoordsByIp,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
} = require('./iss_promised');

fetchMyIp()
  .then(fetchCoordsByIp)
  .then(fetchISSFlyOverTimes)
  .then(nextISSTimesForMyLocation);

const printPassTimes = function (passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation().then((passTimes) => {
  printPassTimes(passTimes);
});
