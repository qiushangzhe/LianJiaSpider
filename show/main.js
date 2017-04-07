var express = require('express');
var db = require('../database/database.js');
var bodyParser = require("body-parser");
var ejs = require('ejs');
var app = express();
app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs'); //设置默认的模板引擎
app.set('views', __dirname + '/views'); //设置views路径映射到views文件夹
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render('show',{
        title:"邱上哲"
    });
});


app.listen(10219);
