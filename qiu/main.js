var mongoose = require('mongoose');
var dbPath = "mongodb://localhost/lianjia";
options = {
    server: {
        auto_reconnect: true,
        poolSize: 10
    }
};

var db = mongoose.connect(dbPath, options);
var jockSchema = mongoose.Schema({
    communityName:String,
    houseInfo:String,
    houseArea:String,
    towards:String,
    finish:String,
    lift:String,
    floorInfo:String,
    position:String,
    price:String
});

var data = db.model("lianjia", jockSchema);



data.find(function(err,result){
    if(err) {
        console.log(err);
        return ;
    }
    analyse(result);
});

// data.remove(function(err,result){
//     if(err) {
//         console.log(err);
//         return ;
//     }
//     console.log('删完了');
// });

function analyse(dataList){
    var total = dataList.length;
    var sum = 0;
    for(var i in dataList){
        var buffer = dataList[i].price;
        buffer = buffer.substring(2, buffer.indexOf('元')) * 1;
        sum += buffer;
    }
    //第一次 70372.11851851852
    console.log(sum/total);
}
