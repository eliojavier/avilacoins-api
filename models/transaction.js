module.exports = function (sequelize, DataTypes) {
  let Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    coins: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    subtotal: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    tax: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true
    },
    commission: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true
    },
    total: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM,
      values: ['purchase', 'withdraw'],
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['pending', 'approved', 'canceled', 'disapproved'],
      allowNull: false
    },
  }, {
    underscored: true,
    tableName: 'Transaction',
    freezeTableName: true,
  });

  Transaction.associate = function (models) {
    Transaction.belongsTo(models.User, {
      as: 'user',
      foreignKey: {name: 'fk_user', allowNull: false},
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
    Transaction.belongsTo(models.BankAccount, {
      as: 'bankAccount',
      foreignKey: {name: 'fk_bankAccount', allowNull: true},
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
    Transaction.belongsTo(models.Payment, {
      as: 'payment',
      foreignKey: {name: 'fk_payment', allowNull: true},
      onDelete: 'restrict',
      onUpdate: 'restrict'
    })
  };

  return Transaction
};