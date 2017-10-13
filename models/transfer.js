let User = require('./user');

module.exports = function (sequelize, DataTypes) {
  let Transfer = sequelize.define('Transfer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'Transfer',
    freezeTableName: true,
    classMethods: {
      associate: function (models) {
        Transfer.belongsTo(models.User, {
          as: 'user',
          foreignKey: {name: 'fk_receptor', allowNull: true},
          onDelete: 'restrict',
          onUpdate: 'restrict'
        });
      }
    },
    instanceMethods: {}
  });
  return Transfer
};