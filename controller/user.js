var express=require('express');
const { check, validationResult } = require('express-validator/check');
var format=require('string-format');
var logger=require('../util/logger.js');
var statics=require('../constant/static.js');
var messages=require('../constant/message.js');
var codes=require('../constant/code.js');
var fields=require('../constant/field.js');
var userService=require('../service/user.js')
var router=express.Router();
router.post('/add',[
    check([fields.USERNAME]).isLength({ min:statics.DEFAULT_MIN_CHARACTER_LENGTH,max: statics.DEFAULT_CHARATER_LENGTH }).withMessage(format(messages.INVALID_LENGTH,[fields.USERNAME],statics.DEFAULT_MIN_CHARACTER_LENGTH,statics.DEFAULT_CHARATER_LENGTH)),
    check([fields.EMAIL]).normalizeEmail().isEmail().withMessage(format(messages.EMAIL_NOT_VALID)),
    check([fields.PHONE]).isLength({ min:statics.DEFAULT_MIN_CHARACTER_LENGTH,max: 10 }).withMessage(format(messages.INVALID_LENGTH,[fields.PHONE],statics.DEFAULT_MIN_CHARACTER_LENGTH,10)),
    check([fields.CITY]).isLength({ min:statics.DEFAULT_MIN_CHARACTER_LENGTH,max: statics.DEFAULT_CHARATER_LENGTH }).withMessage(format(messages.INVALID_LENGTH,[fields.CITY],statics.DEFAULT_MIN_CHARACTER_LENGTH,statics.DEFAULT_CHARATER_LENGTH)),
    check([fields.PASSWORD]).isLength({ min:8,max: 16 }).withMessage(format(messages.INVALID_LENGTH,[fields.PASSWORD],8,16)),

],function(req,res){
    var errors = validationResult(req);
    if(errors.array().length==0){
        userService.Create(req.query).then(function(result){
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