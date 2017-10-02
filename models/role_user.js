let User = require('./user');
let Role = require('./role');

module.exports = function (sequelize, DataTypes) {
  let Role_User = sequelize.define('Role_User', {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: User,
        key: 'id',
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Role,
        key: 'id',
      }
    },
  }, {
    tableName: 'Role_User',
    freezeTableName: true,
  });
  return Role_User
};