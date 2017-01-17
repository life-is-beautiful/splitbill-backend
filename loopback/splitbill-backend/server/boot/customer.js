module.exports = function(app) {
  delete app.models.Customers.validations.email;
};
