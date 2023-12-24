const express = require('express');
const path = require('path');
const port = 4000;

const db = require('./config/mongoose');
const app = express();
const contactdb = require('./models/Contact');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//the middleware takecare of manipulating response or it will get the data as an object, so that we can use.
app.use(express.urlencoded());

//the middleware is used to operate static files from a folder
app.use(express.static('assets'));

var contactList = [
    {
        name: "varma",
        phone: "7989102289"
    },
    {
        name:"harsha",
        phone:"9347247154"
    },
    {
        name:"muni",
        phone:"8500288210"
    }
];

app.get('/', function(req, res){
    
    return res.render('home', {title : 'Home', Contact_list: contactList});
});

app.get('/CreateContact', function(req, res){
    return res.render('Contact',  {
        title: 'Creat_Contact'
    });
});

app.post('/new_Contact', function(req,res){
   contactList.push(req.body);
   contactdb.create({
    phone:req.body.phone,
    name:req.body.name
});
return res.redirect('/');
});
   


app.get('/deleteContact/', function(req,res){
    const contactIndex = contactList.findIndex(contact=>contact.phone==req.query.phone);
    if(contactIndex!=-1){
        contactList.splice(contactIndex,1);
    }
    return res.redirect('back');
});

//To create a server
app.listen(port, function(err){
    if(err) console.log("Error in running the server", err);
    else console.log("yep! the server is up and running on port", port);
});