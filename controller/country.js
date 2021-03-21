var express=require('express');
const { check, validationResult } = require('express-validator/check');
var format=require('string-format');
var logger=require('../util/logger.js');
var statics=require('../constant/static.js');
var messages=require('../constant/message.js');
var codes=require('../constant/code.js');
var fields=require('../constant/field.js');
var countryService=require('../service/country.js');
var router=express.Router();
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
var models=require('../models/models.js');
const { Model } = require('sequelize');
const countrys = require('../models/countrys.js');
var db=models.db
router.get('/',function(request,res){
    var countries=countryService.GetAllCountry();
    countries.then(function(result){
        res.json({status:statics.STATUS_SUCCESS,code:codes.SUCCESS,message:messages.DATA_FOUND,data:result});
    },function(error){
        logger.error(messages.SERVER_ERROR+' '+error);
        res.json({status:statics.STATUS_FAILURE,code:codes.FAILURE,message:messages.DATA_NOT_FOUND,data:null});
    });
});
// get Countries with cities

router.get('/get_countries_cities',function(request,res){
    db.countrys.findAll({
            include: [
              {
                model: db.citys,
              }
            ]
          }).then(countrys => {
            const resObj = countrys.map(country => {
              return Object.assign(
                {},
                {
                    [fields.ID]: country.id,
                    [fields.NAME]: country.name,
                    [fields.SHORT_NAME]: country.short_name,
                    [fields.CITY_ARRAY]: country.citys.map(city => {
                    return Object.assign(
                      {},
                      {
                        [fields.ID]: city.id,
                        [fields.CITY_NAME]: city.city_name,
                      }
                      )
                  })
                }
              )
            });
            res.json({status:statics.STATUS_SUCCESS,code:codes.SUCCESS,message:messages.DATA_FOUND,data:resObj});
          });
    });
router.get('/:id',function(req,res){
    
    var countries=countryService.GetCountry(req.params.id);
    countries.then(function(result){
        if(result){
            res.json({status:statics.STATUS_SUCCESS,code:codes.SUCCESS,message:messages.DATA_FOUND,data:result});
        }else{
            res.json({status:statics.STATUS_FAILURE,code:codes.FAILURE,message:messages.DATA_NOT_FOUND,data:null});
        }
    },function(error){
        logger.error(messages.SERVER_ERROR+' '+error);
        res.json({status:statics.STATUS_FAILURE,code:codes.FAILURE,message:messages.DATA_NOT_FOUND,data:null});
    });
});
router.post('/create',[
    check([fields.NAME]).isLength({ min:statics.DEFAULT_MIN_CHARACTER_LENGTH,max: statics.DEFAULT_CHARATER_LENGTH }).withMessage(format(messages.INVALID_LENGTH,[fields.NAME],statics.DEFAULT_MIN_CHARACTER_LENGTH,statics.DEFAULT_CHARATER_LENGTH)),
    check([fields.SHORT_NAME]).isLength({ min:statics.DEFAULT_MIN_CHARACTER_LENGTH,max: statics.DEFAULT_CHARATER_LENGTH }).withMessage(format(messages.INVALID_LENGTH,[fields.SHORT_NAME],statics.DEFAULT_MIN_CHARACTER_LENGTH,statics.DEFAULT_CHARATER_LENGTH)),
    check([fields.MOBILE_CODE]).isLength({ min:statics.DEFAULT_MIN_CHARACTER_LENGTH,max: 4 }).withMessage(format(messages.INVALID_LENGTH,[fields.MOBILE_CODE],statics.DEFAULT_MIN_CHARACTER_LENGTH,4))
],function(req,res){
    var errors = validationResult(req);
    if(errors.array().length==0){
      
        countryService.Create(req.query).then(function(result){
            res.json({status:statics.STATUS_SUCCESS,code:codes.SUCCESS,message:messages.DATA_SAVED,data:null});
        },function(error){
            logger.error(messages.SERVER_ERROR+' '+error)
            res.json({status:statics.STATUS_SUCCESS,code:codes.SUCCESS,message:messages.DATA_NOT_SAVED,data:null});
        });
    }else{
        res.json({status:statics.STATUS_FAILURE,code:codes.INVALID_DATA,message:messages.INVALID_DATA,data:errors.array()});
    }
});

// Update the Country table

router.post('/:id/update',[
    check([fields.NAME]).isLength({ min:statics.DEFAULT_MIN_CHARACTER_LENGTH,max: statics.DEFAULT_CHARATER_LENGTH }).withMessage(format(messages.INVALID_LENGTH,[fields.NAME],statics.DEFAULT_MIN_CHARACTER_LENGTH,statics.DEFAULT_CHARATER_LENGTH)),
    check([fields.SHORT_NAME]).isLength({ min:statics.DEFAULT_MIN_CHARACTER_LENGTH,max: statics.DEFAULT_CHARATER_LENGTH }).withMessage(format(messages.INVALID_LENGTH,[fields.SHORT_NAME],statics.DEFAULT_MIN_CHARACTER_LENGTH,statics.DEFAULT_CHARATER_LENGTH)),
    check([fields.MOBILE_CODE]).isLength({ min:statics.DEFAULT_MIN_CHARACTER_LENGTH,max: 4 }).withMessage(format(messages.INVALID_LENGTH,[fields.MOBILE_CODE],statics.DEFAULT_MIN_CHARACTER_LENGTH,4))
],function(req,res){
    var errors = validationResult(req);
    if(errors.array().length==0){
        countryService.Update(req.params[fields.ID],req.query).then(function(result){
            res.json({status:statics.STATUS_SUCCESS,code:codes.SUCCESS,message:messages.DATA_SAVED,data:null});
        },function(error){
            logger.error(messages.SERVER_ERROR+' '+error)
            res.json({status:statics.STATUS_SUCCESS,code:codes.SUCCESS,message:messages.DATA_NOT_SAVED,data:null});
        });
    }else{
        res.json({status:statics.STATUS_FAILURE,code:codes.INVALID_DATA,message:messages.INVALID_DATA,data:errors.array()});
    }
});
module.exports=router;