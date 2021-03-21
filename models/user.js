module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user', {
        user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: '',
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: ''
      },
      phone: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: ''
      },
      city: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: ''
      },
      password: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: ''
      }
      
      
    }, {
      tableName: 'user'
    });
  };
  