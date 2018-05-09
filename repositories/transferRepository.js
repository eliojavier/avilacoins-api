let db = require('../models');
let Sequelize = require('sequelize');

module.exports = {
  create: function (sender, transfer, receptor) {
    return db.Transfer.create({
      amount: transfer.amount,
      description: transfer.description,
      fk_sender: sender.id,
      fk_receptor: receptor.id,
    })
  },
  findByUserId: function (user, page) {
    let limit = 15;
    let offset = limit * (page - 1);
    return db.Transfer.findAll({
      limit: limit,
      offset: offset,
      order: [
        ['updated_at', 'DESC']
      ],
      where: {
        $or: [
          {fk_sender: user.id},
          {fk_receptor: user.id}
        ]
      },
      include: [{model: db.User, as: 'user', attributes: ['username']}]
    })
  },
  findByUserIdAndYear: function (user, year, page) {
    let limit = 15;
    let offset = limit * (page - 1);
    return db.Transfer.findAll({
      limit: limit,
      offset: offset,
      order: [
        ['updated_at', 'DESC']
      ],
      where: {
        $and: [
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Transfer.created_at')), year),
          {fk_sender: user.id},
        ]
      },
      include: [{model: db.User, as: 'user', attributes: ['username']}]
    });
  },
  findByUserIdAndMonth: function (user, month, page) {
    let limit = 15;
    let offset = limit * (page - 1);
    return db.Transfer.findAll({
      limit: limit,
      offset: offset,
      order: [
        ['updated_at', 'DESC']
      ],
      where: {
        $and: [
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('Transfer.created_at')), month),
          {fk_sender: user.id},
        ]
      },
      include: [{model: db.User, as: 'user', attributes: ['username']}]
    });
  },
  findByUserIdAndLastThreeMonths: function (user, page) {
    let limit = 15;
    let offset = limit * (page - 1);
    return db.Transfer.findAll({
      limit: limit,
      offset: offset,
      order: [
        ['updated_at', 'DESC']
      ],
      where: {
        fk_sender: user.id,
        created_at: {
          $between: [Sequelize.fn('DATE_SUB',
            Sequelize.literal('NOW()'),
            Sequelize.literal('INTERVAL 90 DAY')), Sequelize.fn('NOW')]
        }
      },
      include: [{model: db.User, as: 'user', attributes: ['username']}]
    });
  },
  findById: function (id) {
    return db.Transfer.findOne({
      where: {
        id: id
      },
      include:[{model: db.User, as: 'user', attributes: ['username', 'email']}]
    })
  }
};