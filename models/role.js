module.exports = function (sequelize, DataTypes) {
  let Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set: function (val) {
        if (val && typeof val === 'string') {
          return this.setDataValue('name', val.toLowerCase())
        }
        this.setDataValue('name', val)
      }
    },
  }, {
    tableName: 'Role',
    freezeTableName: true,
    classMethods: {
      associate: function (models) {
        Role.belongsToMany(models.User, {
          as: 'users',
          through: 'Role_User',
          foreignKey: 'user_id',
          onDelete: 'restrict',
          onUpdate: 'restrict'
        })
      }
    },
    instanceMethods: {}
  });
  return Role
};