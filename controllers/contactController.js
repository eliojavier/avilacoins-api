let ContactRepository = require('../repositories/contactRepository');
let HTTPError = require('node-http-error');

module.exports = {
  findContactsByOwnerId: function (owner) {
    return ContactRepository.findContactsByOwnerId(owner)
      .then(contacts => {
        let result = {};
        result.contacts = contacts;
        return Promise.resolve(result);
      })
  },
  findContactByUsername: function (user, username) {
    return ContactRepository.findContactByUsername(user, username)
      .then(user => {
        let result = {};
        if (!user) {
          result.isContact = false;
          result.id = null;
          return Promise.resolve(result);
        }
        result.isContact = true;
        result.id = user.id;
        return Promise.resolve(result);
      });
  },
  create: function (user, body) {
    return ContactRepository.create(user, body.username, body.alias)
      .then(response => {
        let result = {};
        if (!response) {
          result.success = true;
          return Promise.resolve(result);
        }
        result.success = false;
        return Promise.resolve(result);
      })
  }
};