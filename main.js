var url = "http://bj.lianjia.com/ershoufang/";
var controller = require('./controller/c_index.js');
var db = require('./database/database.js');
var fs = require('fs');
var maxPage = 100;
var nowPage = 0;
var result = [];
function downPage(){
    nowPage ++;
    if(nowPage > maxPage){
        console.log('抓取完毕');
        db.close();
        return;
    }
    console.log('当前抓取第'+nowPage+'的数据');
    var url = "http://bj.lianjia.com/ershoufang/pg"+nowPage+"/";
    controller(url,function(list){
        save(list);
        downPage();
    })
}


downPage();


function save(result){
    for(var i in result){
        db.save(result[i]);
    }
}
