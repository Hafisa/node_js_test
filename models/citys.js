module.exports = (sequelize, DataTypes) => {
    const Citys = sequelize.define('citys', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      country_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      city_name: {
        type: DataTypes.TEXT,
        required: true
      },
    }, {
      underscored: true
    });
    return Citys;
  };