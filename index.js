const { fetchMyIp, fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require('./iss');

// fetchMyIp((err, ip) => {
//   if (err) {
//     return console.log('There was an error:', err);
//   } else {
//     return console.log('Your ip is:', ip);
//   }

  
// });

// fetchCoordsByIp('70.69.22.162', (err, data)=>{
//   if(err){
//     return console.log('There was an error:', err);
//   } else {
//     return console.log(`Your cordinates are: ${data.latitude} && ${data.longitude}`)
//   }
// })

// let cordinates = { latitude: '49.3167', longitude: '-122.7384' }

// fetchISSFlyOverTimes(cordinates, (err, data) =>{

//   if(err){
//     return console.log('There was an error:', err);
//   } else {
//     return console.log(`The fly times are over ${JSON.stringify(cordinates)} is ${JSON.stringify(data)}`)
//   }
// })

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }


};

nextISSTimesForMyLocation((error,passTimes) =>{
  if (error) {
    return console.log("It didn't work!", error);
  }

  printPassTimes(passTimes);

});


// https://iss-pass.herokuapp.com/json/?lat=49.3167&lon=-122.7384