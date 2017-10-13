let bcrypt = require('bcryptjs');
let Location = require('./location');

module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: true,
      set: function (val) {
        if (val && typeof val === 'string') {
          return this.setDataValue('email', val.toLowerCase())
        }
        this.setDataValue('email', val)
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set: function (val) {
        if (val && typeof val === 'string') {
          return this.setDataValue('username', val.toLowerCase())
        }
        this.setDataValue('username', val)
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    birth_date: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'birth_date',
    },
    gender: {
      type: DataTypes.ENUM,
      values: ['M', 'F'],
      allowNull: true
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
      set: function (val) {
        if (val) {
          this.setDataValue('profile_picture', val.toLowerCase())
        }
      }
    },
    doc_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rif: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      set: function (val) {
        if (val) {
          this.setDataValue('address', val.toLowerCase())
        }
      }
    },
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'email-validation', 'locked'],
      allowNull: false
    },
    pin: {
      type: DataTypes.STRING,
      allowNull: true,
      set: function (val) {
        if (val) {
          var salt = bcrypt.genSaltSync(10)
          var hash = bcrypt.hashSync(val, salt)
          this.setDataValue('pin', hash)
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function (val) {
        if (val) {
          let salt = bcrypt.genSaltSync(10);
          let hash = bcrypt.hashSync(val, salt);
          this.setDataValue('password', hash)
        }
      }
    },
    validation_token: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    password_token: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    email_notification: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: function () {
        return true
      }
    },
    sms_notification: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: function () {
        return false
      }
    },
    type: {
      type: DataTypes.ENUM(['user', 'commerce']),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM(['user', 'admin', 'superadmin']),
      allowNull: false
    }
  }, {
    underscored: true,
    tableName: 'User',
    freezeTableName: true
  });

  User.associate = function (models) {
    User.hasMany(models.BankAccount, {
      as: 'bankAccounts',
      foreignKey: {name: 'fk_user', allowNull: false},
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
    User.hasOne(models.Account, {
      as: 'account',
      foreignKey: {name: 'fk_user', allowNull: false},
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
    User.belongsTo(models.Location, {
      as: 'location',
      foreignKey: {name: 'fk_location', allowNull: true},
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
    User.belongsTo(models.CommerceType, {
      as: 'commerceType',
      foreignKey: {name: 'fk_commerce_type', allowNull: true},
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
    User.belongsToMany(models.User, {
      as: 'transfersFrom',
      through: {model: 'Transfer', unique: false},
      foreignKey: 'fk_sender',
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
    User.belongsToMany(models.User, {
      as: 'transfersTo',
      through: {model: 'Transfer', unique: false},
      foreignKey: 'fk_receptor',
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
    User.belongsToMany(models.User, {
      as: 'myContacts',
      through: {model: 'Contact', unique: false},
      foreignKey: 'fk_owner',
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
    User.belongsToMany(models.User, {
      as: 'contacts',
      through: {model: 'Contact', unique: false},
      foreignKey: 'fk_contact',
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
    // User.hasMany(models.Promotion, {
    //   as: 'promotions',
    //   foreignKey: {name: 'fk_user', allowNull: false},
    //   onDelete: 'restrict',
    //   onUpdate: 'restrict'
    // });
    User.hasMany(models.Transaction, {
      as: 'transactions',
      foreignKey: {name: 'fk_user', allowNull: false},
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });
  };

  User.prototype.toJSON = function() {
    let values = this.get();
    delete values.pin;
    delete values.password;
    delete values.validation_token;
    delete values.password_token;
    return values
  };

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
  };

  User.prototype.validPin = function(pin) {
    return bcrypt.compareSync(pin, this.pin)
  };

  return User
};

