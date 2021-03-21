var express=require('express');
const { check, validationResult } = require('express-validator/check');
var format=require('string-format');
var logger=require('../util/logger.js');
var statics=require('../constant/static.js');
var messages=require('../constant/message.js');
var codes=require('../constant/code.js');
var fields=require('../constant/field.js');
var cityService=require('../service/city.js');
var countryRepository=require('../repository/country.js');
var countryService=require('../service/country.js');
var router=express.Router();
router.get('/',function(request,res){
    var countries=countryService.GetAllCountry();
    countries.then(function(result){
        res.json({status:statics.STATUS_SUCCESS,code:codes.SUCCESS,message:messages.DATA_FOUND,data:result});
    },function(error){
        logger.error(messages.SERVER_ERROR+' '+error);
        res.json({status:statics.STATUS_FAILURE,code:codes.FAILURE,message:messages.DATA_NOT_FOUND,data:null});
    });
});
router.post('/add_city',
check([fields.CITY_NAME]).isLength({ min:statics.DEFAULT_MIN_CHARACTER_LENGTH,max: statics.DEFAULT_CHARATER_LENGTH }).withMessage(format(messages.INVALID_LENGTH,[fields.CITY_NAME],statics.DEFAULT_MIN_CHARACTER_LENGTH,statics.DEFAULT_CHARATER_LENGTH)),
(req,res)=>{   
    var errors = validationResult(req); 
    if(errors.array().length==0){   
        countryRepository.FindByIdAndDeleted(req.query.country_id,false).then(existingCountry=>{
            if(existingCountry!=null){
                cityService.AddCity(req.query.id,req.query).then(function(result){
                    res.json({status:statics.STATUS_SUCCESS,code:codes.SUCCESS,message:messages.DATA_SAVED,data:[]});
                },function(error){
                    logger.error(messages.SERVER_ERROR+' '+error)
                    res.json({status:statics.STATUS_SUCCESS,code:codes.SUCCESS,message:messages.DATA_PRIMARYCODE_NOTMATCH,data:null});
                });
            }
            else{
                res.json({status:statics.STATUS_FAILURE,code:codes.INVALID_DATA,message:messages.DATA_NOT_FOUND,data:errors.array()});
            }
        })
    }else{
        res.json({status:statics.STATUS_FAILURE,code:codes.INVALID_DATA,message:messages.INVALID_DATA,data:errors.array()});
    }
})
module.exports=router;