var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var list = [];
var tag = 0;
if(cluster.isMaster == true){
    require('os').cpus().forEach(function() {
        cluster.fork();
    });

    cluster.on('message', function(worker, aa) {
        console.log("A worker with #" + worker.id + aa );
    });
    
}
else{
    var worker = cluster.worker;
    process.on('message', function(msg) {
        console.log("主线程发来消息了:" + msg);
    });
}
