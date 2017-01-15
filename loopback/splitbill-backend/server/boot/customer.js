/**
 * Created by 8tmeran on 1/15/2017.
 */
module.exports = function(app) {
  delete app.models.User.validations.email;
};
