let db = require('../models');

module.exports = {
  create: function (user, bankAccount) {
    return db.BankAccount.create({
      account_number: bankAccount.accountNumber,
      account_holder: bankAccount.accountHolder,
      email: bankAccount.email,
      status: 'active',
      fk_bank: bankAccount.fkBank,
      fk_user: user.id,
    });
  },
  findBankAccountsByUserId: function (user) {
    return db.BankAccount.findAll({
      order: [
        ['updated_at', 'DESC']
      ],
      where: {
        status: 'active',
        fk_user: user.id
      },
      include: [{model: db.Bank, as: 'bank', attributes: ['name']}]
    });
  },
  destroy: function (user, id) {
    return db.BankAccount.destroy({
      where: {
        id: id,
        fk_user: user.id
      }
    });
  },
};