module.exports = function (sequelize, DataTypes) {
  let BankAccount = sequelize.define('BankAccount', {
    account_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    account_holder: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'locked'],
      allowNull: false,
    },
  }, {
    underscored: true,
    tableName: 'BankAccount',
    freezeTableName: true
  });

  BankAccount.associate = function (models) {
      BankAccount.belongsTo(models.Bank, {
        as: 'bank',
        foreignKey: {name: 'fk_bank', allowNull: false},
        onDelete: 'restrict',
        onUpdate: 'restrict'
      });
      BankAccount.belongsTo(models.User, {
        as: 'holder',
        foreignKey: {name: 'fk_user', allowNull: false},
        onDelete: 'restrict',
        onUpdate: 'restrict'
      });
      BankAccount.hasMany(models.Transaction, {
        as: 'withdraws',
        foreignKey: {name: 'fk_bankAccount', allowNull: true},
        onDelete: 'restrict',
        onUpdate: 'restrict'
      })

  };

  return BankAccount
};