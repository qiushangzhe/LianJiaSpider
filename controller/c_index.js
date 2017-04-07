var request = require('request');
var colors = require('colors');
var analyzer = require('../analyzer/a_index.js');
module.exports = function(url,fn){
    request.get(url,function(err,request,body){
        if(err) {
            console.log(("访问"+url+"失败").red);
            return;
        }
        var result = analyzer(body);
        fn(result);
    });
}
