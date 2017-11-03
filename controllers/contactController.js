let contactRepository = require('../repositories/contactRepository');
let HTTPError = require('node-http-error');

module.exports = {
  findContactsByOwnerId: function (owner) {
    return contactRepository.findContactsByOwnerId(owner)
      .then(contacts => {
        let result = {};
        result.contacts = contacts;
        return Promise.resolve(result);
      })
  }
};