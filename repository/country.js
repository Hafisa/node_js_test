var models=require('../models/models.js');
var fields=require('../constant/field.js');
var commonRepository=require('./common.js');
var CountryRepository={
    FindAllByDeleted:function(deleted){
        return new Promise(function(resolve,reject){
            models.Country.findAll().then(existingCountries=>{
                resolve(existingCountries);
            },error=>{
                reject(error);
            }); 
        });
    },
    FindByIdAndDeleted:function(id,deleted){
        return new Promise(function(resolve,reject){
            models.Country.findOne({where:{id:id}}).then(existingCountries=>{
                resolve(existingCountries);
            },error=>{
                reject(error);
            }); 
        });
    },
    FindAllCities:function(id,deleted){
        return new Promise(function(resolve,reject){
            var cities=[]
            models.City.findAll({where:{id:id}}).then(existingCities=>{
                existingCities.forEach(existingcity=>{
                    var city={};
                    city[fields.CITY_ID]=existingcity.city_id;
                    city[fields.CITY_NAME]=existingcity.city_name;
                    cities.push(city)
                })
                resolve(cities)
            },error=>{
                reject(error);
            }); 
        });
    },
};

Object.assign(CountryRepository,commonRepository);
module.exports=CountryRepository;