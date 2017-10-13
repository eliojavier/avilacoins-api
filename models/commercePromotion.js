let CommerceType = require('./commerceType');
let Promotion = require('./promotion');

module.exports = function (sequelize, DataTypes) {
  let CommercePromotion = sequelize.define('CommercePromotion', {

  }, {
    tableName: 'CommercePromotion',
    freezeTableName: true,
    classMethods: {
      associate: function (models) {
        CommercePromotion.belongsTo(models.CommerceType, {
          as: 'commerceType',
          foreignKey: {name: 'fk_commerce_type', allowNull: false},
          onDelete: 'restrict',
          onUpdate: 'restrict'
        });
        CommercePromotion.belongsTo(models.Promotion, {
          as: 'promotion',
          foreignKey: {name: 'fk_promotion', allowNull: false},
          onDelete: 'restrict',
          onUpdate: 'restrict'
        });
      }
    },
    instanceMethods: {}
  });
  return CommercePromotion
};