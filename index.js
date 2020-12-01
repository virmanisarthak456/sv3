const express = require('express');
const path = require('path');
const port = 2000;
const db = require('./config/moongoose');
const Task = require('./models/todo');


const app = express();

// setting up the view engine now 

app.set('view engine','ejs');

// Now joining the path of views and current directory , by using path.join command

app.set('views',path.join(__dirname,'views'));

//now we are using urlencoded(); function this is a parser it is always declared in middleware.
// parser take the data from the user and it passes it to the server in the backend,making the web dynamic(kind off!)

app.use(express.urlencoded()); 

app.use(express.static('assets')); 

var todoList;

   app.get('/',function(req,res){
    
    //we use get request and response here

    Task.find({
        // in this we can pass query by finding it (id) in the database 
    },function(err,tasks){
        if(err){
            console.log('error in fetching data from mongodb');
            return;
        }
        return res.render('home',{title: "My_Todo_List",
    todo_list: tasks
    });
    
    });
        
    });

    app.post('/create-Task',function(req,res){
        // after filling the form and submitting it , we  will go through the action route
        
     // To create our todo/tast in data base we are using Task.create function here 
     
     
     Task.create({
         description:req.body.description,
         category:req.body.category,
         date:req.body.date
         
     },function(err,newTask){
         if(err){
             console.log('error in creating a task');
             return;
         }
         console.log('New Task is created',newTask);

         return res.redirect('back');
     });
             
     });

     // To delete a task we will create a controller route function 


     app.get('/delete-task/',function(req,res){ 

    // getting query from the url
       
    let id=req.query;//req.quey will contain array of all the task id's
    
     // now we are finding the conatact(By Id) in the database and deleting it by using findByIdAndDelete function

    //here we find length of that array

var count = Object.keys(id).length;
    
for(let i = 0 ; i < count ; i++){
    
    //and called delete one be one on each id

     Task.findByIdAndDelete(Object.keys(id)[i],function(err){
         if(err){
             console.log('error in deleting an object from the database');
         }
         
            console.log('function is called');
         
        
     });
}
res.redirect('back');//browser
     
    });

    app.listen(port,function(err){

        if (err) {
            console.log('error in running the sever',err);
        }
        console.log('server is running fine',port);
        });
    
                       

