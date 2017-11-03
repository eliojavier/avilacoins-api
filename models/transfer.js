module.exports = function (sequelize, DataTypes) {
  let Transfer = sequelize.define('Transfer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    underscored: true,
    tableName: 'Transfer',
    freezeTableName: true,
  });

  Transfer.associate = function (models) {
    Transfer.belongsTo(models.User, {
      as: 'user',
      foreignKey: {name: 'fk_receptor', allowNull: true},
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
  };

  return Transfer
};