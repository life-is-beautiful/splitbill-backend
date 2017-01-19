'use strict';

module.exports = function(Services) {

  Services.splashScreen = function(device, cb) {
    var Customer = Services.app.models.Customers;
    Customer.findOne({where:{device:device}},

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
    Customer.findOrCreate(
      {where: {username:data.username} },
      data,
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
        include: {
          relation: 'bills',
          scope: {
            where: {status: 'Active'}
          }
        }
      },
      function(err,instance){
        if(instance!==null && instance.length!==0 && typeof username !== 'undefined'){
          var finalInstance = instance[0];
          finalInstance.errorCode = "00";
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

  Services.dashboardOwing = function(username, cb) {


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

  Services.inputData = function(data, cb) {
    var bills_instance = JSON.parse(JSON.stringify(data));;
    delete bills_instance.item;
    delete bills_instance.price;
    delete bills_instance.tax;
    delete bills_instance.serviceCharge;
    delete bills_instance.username;

    // var Bills = Services.app.models.Bills;
    // Bills.create(
    //   data,
    //   function(err,bills_instance){
    //     if(instance!==null && typeof data !== 'undefined'){
    //       var finalInstance = bills_instance;
    //       finalInstance.errorCode = "00";
    //       cb(null,finalInstance);
    //     }else{
    //       cb(null,{errorCode:"01"});
    //     }
    //   }
    // );

    var items_names = data.names.split(',');
    var items_prices = data.prices.split(',');
    var items_taxes = data.taxes.split(',');
    var items_serviceCharges = data.serviceCharges.split(',');
    var items_usernames = data.usernames.split(',');
    var items_owingId = new Array();

    console.log(items_usernames.length);

    for (var i = 0; i < items_usernames.length; i++) {
      var items_name = items_names[i];
      var items_price = items_prices[i];
      var items_tax = items_taxes[i];
      var items_serviceCharge = items_serviceCharges[i];
      var Customers = Services.app.models.Customers;

      console.log(items_usernames[i]);
      Customers.findOrCreate({
          fields: {id: true},
          where:{username:items_usernames[i]}
        },
        {username:items_usernames[i]},
        function(err,instance_customers){
          var Items = Services.app.models.Items;
          Items.create(
            {
              "name": items_name,
              "price": items_price,
              "tax": items_tax,
              "serviceCharge": items_serviceCharge,
              "owingId": instance_customers.id
            },
            function(err,instance_items){
              console.log(instance_items);
            }
          );
          console.log(instance_customers);
        }
      );
    }
    cb(null,data);
  }

  Services.remoteMethod(
    'inputData',
    {
      accepts: [
        {arg: 'data', type: 'object', http: {source: 'body'}}
      ],
      returns: {arg: 'data', type: 'object', root: true},
      http: {path: '/inputData', verb: 'post'}
    }
  );


};
