module.exports = function (sequelize, DataTypes) {
  let CommerceType = sequelize.define('CommerceType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function (val) {
        if (val && typeof val === 'string') {
          return this.setDataValue('name', val.toLowerCase())
        }
        this.setDataValue('name', val)
      }
    },
  }, {
    tableName: 'CommerceType',
    freezeTableName: true,
    classMethods: {
      associate: function (models) {
        CommerceType.hasMany(models.User, {
          as: 'users',
          foreignKey: {name: 'fk_commerce_type', allowNull: true},
          onDelete: 'restrict',
          onUpdate: 'restrict'
        });
        CommerceType.belongsToMany(models.Promotion, {
          as: 'commercePromotions',
          through: {model: 'CommercePromotion', unique: false},
          foreignKey: 'fk_commerce_type',
          onDelete: 'restrict',
          onUpdate: 'restrict'
        });
      }
    },
    instanceMethods: {}
  });
  return CommerceType
}
