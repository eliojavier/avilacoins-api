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
    underscored: true,
    tableName: 'Account',
    freezeTableName: true
  });

  Account.associate = function(models) {
    Account.belongsTo(models.User, {
      as: 'user',
      foreignKey: {name: 'fk_user', allowNull: false},
      onDelete: 'restrict',
      onUpdate: 'restrict'
    })
  };

  return Account
};
