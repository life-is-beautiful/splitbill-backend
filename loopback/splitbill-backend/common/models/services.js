'use strict';

module.exports = function(Services) {

  Services.remoteMethod('splashScreen',{
    http: {path: '/splashScreen', verb: 'post'},
    returns: {arg: 'status', type: 'Object'}
  })

  Services.remoteMethod('registerUser',{
    http: {path: '/registerUser', verb: 'post'},
    returns: {arg: 'ok', type: 'Object'}
  })
};
