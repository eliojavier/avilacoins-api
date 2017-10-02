let CommerceType = require('./commerceType');
let Promotion = require ('./promotion');

module.exports = function (sequelize, DataTypes) {
  let CommercePromotion = sequelize.define('CommercePromotion', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fk_commerce_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CommerceType,
        key: 'id',
      }
    },
    fk_promotion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Promotion,
        key: 'id',
      }
    }
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