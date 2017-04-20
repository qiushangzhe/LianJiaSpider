var url = "http://bj.lianjia.com/ershoufang/";
var controller = require('./controller/c_index.js');
var db = require('./database/database.js');
var cluster = require('cluster');
var maxPage = 100;
var nowPage = 0;
var result = [];
function downPage(){
    nowPage ++;
    if(nowPage > maxPage){
        console.log('抓取完毕');
        db.close();
        cluster.worker.disconnect();
        return;
    }
    console.log('当前抓取第'+nowPage+'的数据');
    var url = "http://bj.lianjia.com/ershoufang/pg"+nowPage+"/";
    controller(url,function(list){
        save(list);
        downPage();
    })
}


// downPage();


function save(result){
    for(var i in result){
        db.save(result[i]);
    }
}

var cpus = 10;
if(cluster.isMaster == true){
    for(var i = 0 ;i<cpus;i++){
        var worker = cluster.fork();
        worker.send({from:100/cpus * i,to:100/cpus *(i+1)});
    }

    cluster.on('message', function(worker, aa) {
        console.log("A worker with #" + worker.id + aa );
    });


}
else{
    var worker = cluster.worker;
    process.on('message', function(data) {
        nowPage = data.from;
        maxPage = data.to;
        downPage();
    });
}
