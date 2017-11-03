module.exports = function (sequelize, DataTypes) {
  let Bank = sequelize.define('Bank', {
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
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'locked'],
      allowNull: false,
    },
  }, {
    underscored: true,
    tableName: 'Bank',
    freezeTableName: true,
  });

  Bank.associate = function (models) {
    Bank.hasMany(models.BankAccount, {
      as: 'bankAccounts',
      foreignKey: {name: 'fk_bank', allowNull: false},
      onDelete: 'restrict',
      onUpdate: 'restrict'
    })
  };

  return Bank
};