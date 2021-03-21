var countryRepository=require('../repository/country.js');
var fields=require('../constant/field.js');
var models=require('../models/models.js');
//password Encrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports={
    Create: function(newUserData){
        return new Promise(async function(resolve,reject){
            var newUserModel={};
            const password = newUserData.password;    
            const encryptedPassword = await bcrypt.hash(password, saltRounds)
            newUserModel[fields.USERNAME]=newUserData.name;
            newUserModel[fields.EMAIL]=newUserData.email;
            newUserModel[fields.PHONE]=newUserData.phone;
            newUserModel[fields.CITY]=newUserData.city;
            newUserModel[fields.PASSWORD]=encryptedPassword ;
            newUserModel[fields.DELETED]=false;
            var newUser=models.User.build(newUserModel);
            countryRepository.Save(newUser).then(function(result){
                resolve(result);
            },function(error){
                reject(error);
            }); 
        });
    },
};