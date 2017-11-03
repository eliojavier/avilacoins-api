module.exports = function (sequelize, DataTypes) {
  let Rate = sequelize.define('Rate', {
    tax: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    purchase: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    withdraw: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    commission: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    }
  }, {
    underscored: true,
    tableName: 'Rate',
    freezeTableName: true,
  });

  Rate.associate = function (models) {
    Rate.belongsTo(models.Location, {
      as: 'location',
      foreignKey: {name: 'fk_location', allowNull: false},
      onDelete: 'restrict',
      onUpdate: 'restrict'
    })
  };

  return Rate
};