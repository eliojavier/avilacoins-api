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
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'start_date'
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'end_date'
    },
    minAge: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'min_age'
    },
    maxAge: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'max_age'
    },
    maxCoupons: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'max_coupons',
    },
    male: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    female: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    promoCode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'promo_code'
    },
    status: {
      type: DataTypes.ENUM,
      values: ['open', 'closed'],
      allowNull: false
    },
    // fk_commerceType: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: CommerceType,
    //     key: 'id',
    //   }
    // },
    // fk_user: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: User,
    //     key: 'id',
    //   }
    // }
  }, {
    tableName: 'Promotion',
    freezeTableName: true,
    classMethods: {
      associate: function (models) {
        Promotion.belongsTo(models.User, {
          as: 'user',
          foreignKey: {name: 'fk_user', allowNull: false},
          onDelete: 'restrict',
          onUpdate: 'restrict'
        });
        // Promotion.belongsTo(models.CommerceType, {
        //   as: 'commerceType',
        //   foreignKey: {name: 'fk_commerceType', allowNull: false},
        //   onDelete: 'restrict',
        //   onUpdate: 'restrict'
        // });
        Promotion.belongsToMany(models.CommerceType, {
          as: 'categories',
          through: {model: 'CommercePromotion', unique: false},
          foreignKey: 'fk_promotion',
          onDelete: 'restrict',
          onUpdate: 'restrict'
        });
      }
    },
    instanceMethods: {}
  });
  return Promotion
};