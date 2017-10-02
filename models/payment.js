module.exports = function (sequelize, DataTypes) {
  let Payment = sequelize.define('Payment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cardholder: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiration_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    digits: {
      type: DataTypes.STRING,
      allowNull: false
    },
    response: {
      type: DataTypes.ENUM,
      values: ['approved', 'canceled', 'disapproved'],
      allowNull: false
    }
  }, {
    tableName: 'Payment',
    freezeTableName: true,
    classMethods: {
      associate: function (models) {
        Payment.hasOne(models.Transaction, {
          as: 'transaction',
          foreignKey: {name: 'fk_payment', allowNull: true},
          onDelete: 'restrict',
          onUpdate: 'restrict'
        });
      }
    },
    instanceMethods: {}
  });
  return Payment
};