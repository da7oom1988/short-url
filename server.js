var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

app.set('views', __dirname + '/views');
app.set(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

app.get('/',function(req,res){
    res.render( "index");
});




app.listen(port,function(){
    console.log('app is listening to PORT: ' + port);
});