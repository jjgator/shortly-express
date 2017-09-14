var db = require('../config');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');



var User = db.Model.extend({
  tableName: 'users',

  links: function() {
    return this.hasMany(Link);
  },

  initialize: function() {
    console.log('user initialized');
    this.on('creating', function(model, attrs, options) {
      return new Promise(function(resolve, reject) {
        bcrypt.hash(model.get('password'), null, null, (err, result) => {
          console.log('our hashed password: ', result)
          model.set({ password: result });
          resolve();
        });
      });
    });
  }
});

module.exports = User;
