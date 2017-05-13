const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./models/db');

const app = express();
app.use(bodyParser.json());
app.use(cors());
var port = process.env.PORT || 3000;

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

//connect to the db
mongoose.connect( process.env.MONGOLAB_URI || 'mongodb://localhost/shorturl');


// home page
app.get('/',function(req,res){
    res.render( "index");
});

//valid URL fun
function validateURL(textval) {
     var urlregex = new RegExp(
         "^(http|https|ftp)\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*$");
     return urlregex.test(textval);
        }

// process
app.get('/new/:url(*)',function(req,res){
    var url = req.params.url;
    if(validateURL(url)){
        db.findOne({originalURL: url},function(err,data){
            if(err){
                console.log("ERROR");
            }else{
                if(data){
                     res.json(data);
                 }else{
                    var short = Math.floor(Math.random() * 100000).toString();
                    var date = new db({
                        originalURL: url,
                        shorterURL: short
                    });
                    date.save(function(err){
                        if(err){
                            console.log(err);
                        }
                    })
                    res.json(date); 
                }
            }
            
        });
    }else{
        res.json({"url": "Invalid URL Try agien"});
    }
    
});

app.get('/:url',function(req,res){
    var url = req.params.url;
    db.findOne({shorterURL: url},function(err,data){
        if(err){
            return res.send("ERROR!!");
        }else{
            if(data){
                res.redirect(data.originalURL);
            }else{
                res.send("ERROR!! page NOT found ");
            }
            
        }
    });
});



app.listen(port,function(){
    console.log('app is listening to PORT: ' + port);
});