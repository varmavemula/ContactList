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
        phone: "7989102289",
        email:"varmavemula1004@gmail.com"
    },
    {
        name:"harsha",
        phone:"9347247154",
        email:"harshavemula123@gmail.com"
    },
    {
        name:"muni",
        phone:"8500288210",
        email:"muni@gmail.com"
    }
];

app.get('/', function(req, res){
    const queryObject = contactdb.find({});
    // Execute the query and handle the results using promises
    queryObject.then((contacts) => {
            // console.log('Contacts:', contacts);
            return res.render('home', {
                title : 'Home', 
                Contact_list: contacts
            });
        }).catch((err) => {
            console.error('Error retrieving contacts:', err);
        });
    });

app.get('/CreateContact', function(req, res){
    return res.render('Contact',  {
        title: 'Creat_Contact'
    });
});

app.post('/new_Contact', function(req,res){
   
   contactdb.create({
    phone:req.body.phone,
    name:req.body.name,
    email:req.body.email
});
return res.redirect('/');
});
   


app.get('/deleteContact', function(req,res){
   let  id= req.query.id;
   contactdb.findByIdAndDelete(id).then(()=>{
    return res.redirect('back');
});
});

//write the code to edit the contact
app.get('/editContact', function(req,res){
    let id = req.query.id;
    console.log(contactdb.findById(id));
    contactdb.findById(id).then((contacttochange)=>{
        return res.render('editContact', {
            title: 'Edit Contact',
            contact: contacttochange
        });
    }).catch((err) => {
        console.error('Error retrieving contacts:', err);
    });

}
);

app.post('/updateContact', function(req,res){
    let id = req.body.id;
    contactdb.findByIdAndUpdate(id, {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }).then(()=>{
        return res.redirect('/');
    }).catch((err) => {
        console.error('Error retrieving contacts:', err);
    });
}); 
    



//To create a server
app.listen(port, function(err){
    if(err) console.log("Error in running the server", err);
    else console.log("yep! the server is up and running on port", port);
});