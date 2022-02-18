const { fetchMyIp, fetchCoordsByIp } = require('./iss');

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