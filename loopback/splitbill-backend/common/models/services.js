'use strict';

module.exports = function(Services) {

  Services.splashScreen = function(device, cb) {
    var Customer = Services.app.models.Customers;
    console.log(device);
    Customer.findOne({fields: {id: false}, where:{device:device}},

      function(err,instance){
        if(instance!==null && typeof device !== 'undefined'){
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
        if(instance!==null && typeof data !== 'undefined'){
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

  Services.dashboardOwed = function(username, cb) {
    var Customers = Services.app.models.Customers;
    Customers.find({
        fields: {
          username: true
        },
        where:{
          username:username
        },
        include: 'bills'
      },
      function(err,instance){

        if(instance!==null && instance.length!==0 && typeof username !== 'undefined'){
          var finalInstance = instance[0];
          finalInstance.errorCode = "00";
          console.log(finalInstance);
          cb(null,finalInstance);
        }else{
          cb(null,{errorCode:"01"});
        }
      }
    );
  }

  Services.remoteMethod(
    'dashboardOwed',
    {
      accepts: [
        {arg: 'username', type: 'string'}
      ],
      returns: {arg: 'data', type: 'object', root: true},
      http: {path: '/dashboardOwed', verb: 'post'}
    }
  );

  Services.dashboardOwing = function(data, cb) {
    var Customers = Services.app.models.Customers;
    Customers.find({
        fields: {
          username: true
        },
        where:{
          username:username
        },
        include: 'bills'
      },
      function(err,instance){

        if(instance!==null && typeof username !== 'undefined'){
          var finalInstance = instance;
          finalInstance.errorCode = "00";
          console.log(finalInstance);
          cb(null,finalInstance);
        }else{
          cb(null,{errorCode:"01"});
        }
      }
    );
  }

  Services.remoteMethod(
    'dashboardOwing',
    {
      accepts: [
        {arg: 'username', type: 'string'}
      ],
      returns: {arg: 'data', type: 'object', root: true},
      http: {path: '/dashboardOwing', verb: 'post'}
    }
  );


};
