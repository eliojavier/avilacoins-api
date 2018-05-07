let db = require('../models');

module.exports = {
  findContactsByOwnerId: function (owner) {
    return db.Contact.findAll({
      attributes: ['id', 'alias'],
      where: {
        fk_owner: owner.id
      },
      include: [{model: db.User, as: 'user', attributes: ['username']}]
    })
  },
  findContactByUsername(user, username) {
    return db.Contact.findOne({
      where: {
        fk_owner: user.id
      },
      include: [{model: db.User, as: 'user', where: {username: username}, attributes: ['id', 'username']}]
    })
  },
  create(user, username, alias) {
    return db.User.findOne({
      attributes: ['id'],
      where: {username: username}
    }).then(response => {
      return db.Contact.create({
        fk_owner: user.id,
        fk_contact: response.id,
        alias: alias
      })
    })
  },
  delete(id, user) {
    return db.Contact.destroy({
      where: {
        id: id,
        fk_owner: user.id
      }
    })
  }
};