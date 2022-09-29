//jshint esversion: 6

const express = require('express');
const body = require('body-parser');
const app = express();

var items = [];
var workItems = [];

app.set('view engine', 'ejs');
app.use(body.urlencoded({extended:true}));
app.use(express.static("public"));
app.get('/', function(req, res){
  var today = new Date();
  var options = {
    weekday:"long",
    day:"numeric",
    month:"long"
  };
  var day = today.toLocaleString("en-CA",options);
    res.render("list", {listTitle:day,newListItems:items});

});

app.post("/",function(req,res){
  var item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});

app.get("/work", function(req,res){
  res.render("list", {listTitle:"Work List", newListItems:workItems});
});

app.post("/work",function(req,res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", function(req,res){
    res.render("about");
});

app.listen(3000, function() {
  console.log("Currently listening on port 3000");
});