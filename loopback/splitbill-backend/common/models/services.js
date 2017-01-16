'use strict';

module.exports = function(Services) {

  Services.splashScreen = function(device, cb) {
    var Customer = Services.app.models.Customers;
    Customer.findOne({fields: {id: false}, where:{device:device}},
      function(err,instance){
        if(instance===null){
          cb(null,null);
        }else{
          cb(null,instance);
        }
      });
  }

  Services.remoteMethod(
    'splashScreen',
    {
      accepts: [
        {arg: 'device', type: 'string'}
      ],
      returns: {arg: 'data', type: 'object', root: true},
      http: {path: '/splashScreen', verb: 'post'}
    }
  );

  Services.remoteMethod('registerUser',{
    http: {path: '/registerUser', verb: 'post'},
    returns: {arg: 'ok', type: 'Object'}
  })
};
