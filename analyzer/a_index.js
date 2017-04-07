var cheerio = require('cheerio');
var fs = require('fs');
var colors = require('colors');





function Trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function ClearSpace(str){
    return str.replace(/\s/g, "");
}


module.exports = function(body,fn){
    var $ = cheerio.load(body);
    var list = [];
    var imglist = $('.sellListContent li');
    //拿到房屋
    imglist.each(function(index, obj) {
        //houseInfo
        var info1 = $(obj).find('.houseInfo').text();
        info1 = Trim(info1);
        info1 = ClearSpace(info1);
        info1 = info1.split('|');

        var info2 = $(obj).next().find('.positionInfo').text();
        info2 = Trim(info2);
        info2 = ClearSpace(info2);
        info2 = info2.split('-');
        //单价
        var price = $(obj).find('.unitPrice').text();
        price = Trim(price);
        //小区名
        var communityName = info1[0] || '信息缺失';
        //户型信息
        var houseInfo = info1[1] || '信息缺失';
        //房屋面积
        var houseArea = info1[2] || '信息缺失';
        //朝向
        var towards = info1[3] || '信息缺失';
        //装修情况
        var finish = info1[4] || '信息缺失';

        //电梯
        var lift = info1[5] || '信息缺失';
        //楼层信息
        var floorInfo = info2[0] || '信息缺失';
        // 地址
        var position = info2[1] || '信息缺失';
        list.push({
            communityName:communityName,
            houseInfo:houseInfo,
            houseArea:houseArea,
            towards:towards,
            finish:finish,
            lift:lift,
            floorInfo:floorInfo,
            position:position,
            price:price
        });
    });
    return list;
}
