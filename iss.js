const request = require('request');

const fetchMyIp = (callback) => {
  request(`https://api.ipify.org/?format=json`, (error, response, body) => {

    if (error) { 
      callback(error, null) 
      return;
    }
    if(response.statusCode !== 200){
      const msg = `Status code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null)
    }
    const content = JSON.parse(body);

    callback(null, content.ip);
  });
};

module.exports = { fetchMyIp };
