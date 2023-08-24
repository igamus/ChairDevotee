'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true
      });

      Spot.hasMany(models.Review, {
        foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true
      });

      Spot.belongsToMany(models.User, {
        through: 'Bookings', foreignKey: 'spotId', otherKey: 'userId'
      });
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.DECIMAL,
    },
    lng: {
      type: DataTypes.DECIMAL,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      validate: {
        min: 0.01,
        max: 50_000
      }
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
