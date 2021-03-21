module.exports = (sequelize, DataTypes) => {
    const Countrys = sequelize.define('countrys', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        required: true
      },
      short_name: {
        type: DataTypes.STRING,
        required: true
      },
      mobile_code: {
        type: DataTypes.STRING,
        required: true
      },
    }, {
      underscored: true
    });
    return Countrys;
  };