'use strict';

module.exports = function(Services) {

  Services.splashScreen = function(device, cb) {
    var Customer = Services.app.models.Customers;
    Customer.findOne({fields: {id: false}, where:{device:device}},
      function(err,instance){
        if(instance===null){
          cb(null,{errorCode:"01"});
        }else{
          var finalInstance = instance;
          finalInstance.errorCode = "00";
          cb(null,finalInstance);
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
