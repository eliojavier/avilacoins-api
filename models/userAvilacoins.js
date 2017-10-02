module.exports = function (sequelize, DataTypes) {
  let UserAvilaCoins = sequelize.define('UserAvilaCoins', {
    emailNotification: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'email_notification',
      defaultValue: function () {
        return true
      }
    },
    smsNotification: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'sms_notification',
      defaultValue: function () {
        return false
      }
    },
    type: {
      type: DataTypes.ENUM('user', 'commerce'),
      allowNull: false
    }
  }, {
    tableName: 'user_avilacoins',
    freezeTableName: true,
    classMethods: {
      associate: function (models) {
        UserAvilaCoins.belongsTo(models.User, {as: 'user', foreignKey: {name: 'fk_user', allowNull: false}, onDelete: 'restrict', onUpdate: 'restrict'})
      }
    },
    instanceMethods: {
    }
  })
  return UserAvilaCoins
}
