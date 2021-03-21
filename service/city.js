var countryRepository=require('../repository/country.js');
var fields=require('../constant/field.js');
var models=require('../models/models.js');
module.exports={
    AddCity:function(id,newCityData){
        return new Promise(function(resolve,reject){
            var newCityModel={};
            newCityModel[fields.CITY_NAME]=newCityData[fields.CITY_NAME];
            newCityModel[fields.COUNTRY_ID]=newCityData[fields.COUNTRY_ID];
            newCityModel[fields.DELETED]=false;
            var newCity=models.City.build(newCityModel);
            countryRepository.Save(newCity).then(function(result){
                resolve(result);
            },function(error){
                reject(error);
            }); 
        });
    },
};