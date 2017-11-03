module.exports = function (sequelize, DataTypes) {
  let Promotion = sequelize.define('Promotion', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    min_age: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    max_age: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coupons_limit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    male: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    female: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    promo_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['open', 'closed'],
      allowNull: false
    },
  }, {
    underscored: true,
    tableName: 'Promotion',
    freezeTableName: true,
  });

  Promotion.associate = function (models) {
    Promotion.belongsTo(models.User, {
      as: 'user',
      foreignKey: {name: 'fk_user', allowNull: false},
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
    Promotion.belongsToMany(models.CommerceType, {
      as: 'categories',
      through: {model: 'CommercePromotion', unique: false},
      foreignKey: 'fk_promotion',
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
  };

  return Promotion
};