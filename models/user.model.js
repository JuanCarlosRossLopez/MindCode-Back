const { DataTypes } = require('sequelize');

let User = null;

function initUserModel(sequelize) {
  User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    mail: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { isEmail: true }
    },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'admin' }
  });

  return User;
}

module.exports = {
  initUserModel,
  getUserModel: () => User
};
