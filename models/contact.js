let User = require('./user');

module.exports = function (sequelize, DataTypes) {
  let Contact = sequelize.define('Contact', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    tableName: 'Contact',
    freezeTableName: true,
    classMethods: {
      associate: function (models) {
        Contact.belongsTo(models.User, {
          as: 'user',
          foreignKey: {name: 'fk_contact', allowNull: false},
          onDelete: 'restrict',
          onUpdate: 'restrict'
        });
      }
    },
    instanceMethods: {}
  });
  return Contact
};