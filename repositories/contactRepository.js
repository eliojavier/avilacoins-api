let db = require('../models');

module.exports = {
  findContactsByOwnerId: function(owner) {
    return db.Contact.findAll({
      attributes: ['id', 'alias'],
      where: {
        fk_owner: owner.id
      },
      include: [{model: db.User, as: 'user', attributes: ['username']}]
    })
  }
};