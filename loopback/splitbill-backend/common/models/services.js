'use strict';

module.exports = function(Services) {

  Services.remoteMethod('splashScreen',{
    accepts: {arg: 'deviceId', type: 'string', required: true},
    http: {path: '/splashScreen', verb: 'post'},
    returns: {arg: 'status', type: 'Object'}
  })

  Services.splashScreen = function(deviceId, cb) {

    //query the database for a single matching dog
    Customer.findOne({where: {device: deviceId}}, function(err, dog) {

      //return only the location property of the dog
      cb(null, dog.location);
    });
  }

  Services.remoteMethod('registerUser',{
    http: {path: '/registerUser', verb: 'post'},
    returns: {arg: 'ok', type: 'Object'}
  })
};
