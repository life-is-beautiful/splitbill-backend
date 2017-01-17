'use strict';

module.exports = function(Services) {

  Services.splashScreen = function(device, cb) {
    var Customer = Services.app.models.Customers;
    Customer.findOne({fields: {id: false}, where:{device:device}},
      function(err,instance){
        if(instance!==null){
          var finalInstance = instance;
          finalInstance.errorCode = "00";
          cb(null,finalInstance);
        }else{
          cb(null,{errorCode:"01"});
        }
      });
  }

  Services.remoteMethod(
    'splashScreen',
    {
      accepts: {arg: 'device', type: 'string'},
      returns: {arg: 'data', type: 'object', root: true},
      http: {path: '/splashScreen', verb: 'post'}
    }
  );

  Services.registerUser = function(data, cb) {
    var Customer = Services.app.models.Customers;
    Customer.create(data,
      function(err,instance){
        if(instance!==null){
          var finalInstance = instance;
          finalInstance.errorCode = "00";
          cb(null,finalInstance);
        }else{
          cb(null,{errorCode:"01"});
        }
      });
  }

  Services.remoteMethod(
    'registerUser',
    {
      accepts: [
        {arg: 'data', type: 'object', http: {source: 'body'}}
      ],
      returns: {arg: 'data', type: 'object', root: true},
      http: {path: '/registerUser', verb: 'post'}
    }
  );

  Services.dashboardOwed = function(data, cb) {
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
    'dashboardOwed',
    {
      accepts: [
        {arg: 'data', type: 'object', http: {source: 'body'}}
      ],
      returns: {arg: 'data', type: 'object', root: true},
      http: {path: '/dashboardOwed', verb: 'post'}
    }
  );

  Services.dashboardOwing = function(data, cb) {
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
    'dashboardOwing',
    {
      accepts: [
        {arg: 'data', type: 'object', http: {source: 'body'}}
      ],
      returns: {arg: 'data', type: 'object', root: true},
      http: {path: '/dashboardOwing', verb: 'post'}
    }
  );
};
