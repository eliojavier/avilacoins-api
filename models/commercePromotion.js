let CommerceType = require('./commerceType');
let Promotion = require('./promotion');

module.exports = function (sequelize, DataTypes) {
  let CommercePromotion = sequelize.define('CommercePromotion', {}, {
    underscored: true,
    tableName: 'CommercePromotion',
    freezeTableName: true,
  });

  CommercePromotion.associate = function (models) {
    CommercePromotion.belongsTo(models.CommerceType, {
      as: 'commerceType',
      foreignKey: {name: 'fk_commerce_type', primaryKey: true},
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
    CommercePromotion.belongsTo(models.Promotion, {
      as: 'promotion',
      foreignKey: {name: 'fk_promotion', primaryKey: true},
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
  };
  return CommercePromotion
};