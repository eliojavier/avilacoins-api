module.exports = function (sequelize, DataTypes) {
  let Account = sequelize.define('Account', {
    balance: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    withheld: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
  }, {
    tableName: 'Account',
    freezeTableName: true,
    classMethods: {
      associate: function (models) {
        Account.belongsTo(models.User, {
          as: 'user',
          foreignKey: {name: 'fk_user', allowNull: false},
          onDelete: 'restrict',
          onUpdate: 'restrict'
        })
      }
    },
    instanceMethods: {}
  });
  return Account
};