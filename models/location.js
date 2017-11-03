module.exports = function (sequelize, DataTypes) {
  let Location = sequelize.define('Location', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      },
      set: function (val) {
        if (val && typeof val === 'string') {
          return this.setDataValue('name', val.toLowerCase())
        }
        this.setDataValue('name', val)
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      },
      set: function (val) {
        if (val && typeof val === 'string') {
          return this.setDataValue('type', val.toLowerCase())
        }
        this.setDataValue('type', val)
      }
    }
  }, {
    underscored: true,
    tableName: 'Location',
    freezeTableName: true,
    sync: true
  });

  Location.associate = function (models) {
    Location.hasMany(models.Location, {
      as: 'locations',
      foreignKey: {name: 'fk_location', allowNull: true},
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
    Location.belongsTo(models.Location, {
      as: 'location',
      foreignKey: {name: 'fk_location', allowNull: true},
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
    Location.hasMany(models.User, {
      as: 'users',
      foreignKey: {name: 'fk_location', allowNull: false},
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
    Location.hasOne(models.Rate, {
      as: 'rate',
      foreignKey: {name: 'fk_location', allowNull: false},
      onDelete: 'restrict',
      onUpdate: 'restrict'
    })
  };

  return Location
};
