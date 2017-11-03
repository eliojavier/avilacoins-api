module.exports = function (sequelize, DataTypes) {
  let Log = sequelize.define('Log', {
    action: {
      type: DataTypes.ENUM,
      values: ['login', 'transfer', 'purchase', 'withdraw', 'register'],
      allowNull: false,
    },
    origin_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    underscored: true,
    tableName: 'Log',
    freezeTableName: true,
  });
  return Log
};