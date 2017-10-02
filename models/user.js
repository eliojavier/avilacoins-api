let bcrypt = require('bcrypt');

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - email
 *       - name
 *       - lastname
 *       - status
 *     properties:
 *       email:
 *         type: string
 *       name:
 *         type: string
 *       lastname:
 *         type: string
 *       username:
 *         type: string
 *       status:
 *         type: string
 *       phone:
 *         type: string
 *       profilePictureName:
 *         type: string
 */
module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function (val) {
        if (val && typeof val === 'string') {
          return this.setDataValue('name', val.toLowerCase())
        }
        this.setDataValue('name', val)
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'last_name',
      validate: {
        // isAlpha: true
      },
      set: function (val) {
        if (val && typeof val === 'string') {
          return this.setDataValue('lastName', val.toLowerCase())
        }
        this.setDataValue('lastName', val)
      }
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
    birthDate: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'birth_date',
    },
    gender: {
      type: DataTypes.ENUM,
      values: ['M', 'F'],
      allowNull: true
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'profile_picture',
      set: function (val) {
        if (val) {
          this.setDataValue('profile_picture', val.toLowerCase())
        }
      }
    },
    docId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'doc_id',
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
          var salt = bcrypt.genSaltSync(10)
          var hash = bcrypt.hashSync(val, salt)
          this.setDataValue('password', hash)
        }
      }
    },
    auth: {
      type: DataTypes.VIRTUAL
    },
    validationToken: {
      type: DataTypes.STRING,
      field: 'validation_token',
      allowNull: true,
      unique: true
    },
    passwordToken: {
      type: DataTypes.STRING,
      field: 'password_token',
      allowNull: true,
      unique: true
    },
    emailNotification: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'email_notification',
      defaultValue: function () {
        return true
      }
    },
    smsNotification: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'sms_notification',
      defaultValue: function () {
        return false
      }
    },
    type: {
      type: DataTypes.ENUM('user', 'commerce'),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('user', 'admin', 'superadmin'),
      allowNull: false
    }
  }, {
    tableName: 'User',
    freezeTableName: true,
    classMethods: {
      associate: function (models) {
        User.hasOne(models.UserAvilaCoins, {
          as: 'userAvilaCoins',
          foreignKey: {name: 'fk_user', allowNull: false},
          onDelete: 'restrict',
          onUpdate: 'restrict'
        });
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
        User.belongsToMany(models.Role, {
          as: 'roles',
          through: 'Role_User',
          foreignKey: 'role_id',
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
      }
    },
    instanceMethods: {
      toJSON: function () {
        var values = this.get();
        delete values.pin;
        delete values.password;
        delete values.tokens;
        return values
      },
      validPassword: function (password) {
        return bcrypt.compareSync(password, this.password)
      },
      validPin: function (pin) {
        return bcrypt.compareSync(pin, this.pin)
      }
    }
  });
  return User
}
