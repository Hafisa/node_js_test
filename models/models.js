var {sequelize,Sequelize}=require('../util/db.js');
const db={}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Table
db.countrys = require('../models/countrys.js')(sequelize, Sequelize);
db.citys = require('../models/citys.js')(sequelize, Sequelize);
db.user = require('../models/user.js')(sequelize, Sequelize);

//Relations
db.citys.belongsTo(db.countrys);
db.countrys.hasMany(db.citys)

module.exports={
    Country:db.countrys,
    City:db.citys,
    User:db.user,
    //relations  
    db:db
};