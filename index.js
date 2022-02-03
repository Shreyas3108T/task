var express = require("express"); // express
var bodyParser = require("body-parser"); //body-paser
const axios = require('axios'); // axios



var app = express();
app.use(bodyParser.urlencoded({extended:true}));


// GET for /todos
app.get("/todos",(req,res)=>{
    
    var URL = "https://jsonplaceholder.typicode.com/todos";
    axios.get(URL)
        .then((response)=>{
            var List = response.data;
            for (var i in List){
                delete List[i].userId;
            }
            res.send(List);
        });

});

//GET for /user/<pass your user id>
app.get("/users/:userId",(req,res)=>{
    //parameter userId
    var userId = req.params.userId;
    var newUserData = {};

    var URL1 = "https://jsonplaceholder.typicode.com/users/" + userId;

    axios.get(URL1)
        .then((response)=>{
            var userData = response.data;
            
            newUserData['id'] = userData.id;
            newUserData['name'] = userData.name;
            newUserData['email'] = userData.email;
            newUserData['phone'] = userData.phone;
            newUserData['todos'] = [];

            var URL2 = "https://jsonplaceholder.typicode.com/todos";

            axios.get(URL2)
            .then((response)=>{
                var todoList = response.data;
                for (var i in todoList){
                    if(todoList[i].userId == userId){
                        newUserData['todos'].push(todoList[i]);
                    }
                } 
                res.send(newUserData);
            });
        }).catch((error)=>{
            res.send("enter a valid no, range is 1-10")
        })   
})

//Starting the server at port 3000
app.listen(3000,(req,res)=>{
    console.log("connected...")
});