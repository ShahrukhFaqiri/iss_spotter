const { fetchMyIp, fetchCoordsByIp, fetchISSFlyOverTimes } = require('./iss');

fetchMyIp((err, ip) => {
  if (err) {
    return console.log('There was an error:', err);
  } else {
    return console.log('Your ip is:', ip);
  }

  
});

fetchCoordsByIp('70.69.22.162', (err, data)=>{
  if(err){
    return console.log('There was an error:', err);
  } else {
    return console.log(`Your cordinates are: ${data.latitude} && ${data.longitude}`)
  }
})

let cordinates = { latitude: '49.3167', longitude: '-122.7384' }

fetchISSFlyOverTimes(cordinates, (err, data) =>{


  if(err){
    return console.log('There was an error:', err);
  } else {
    return console.log(`The fly times are over ${JSON.stringify(cordinates)} is ${JSON.stringify(data)}`)
  }
})



// https://iss-pass.herokuapp.com/json/?lat=49.3167&lon=-122.7384