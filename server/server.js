var express = require('express');
var bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose');
var {todoModel} = require('./models/todo');
var {userModel} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo =  todoModel({
        text:req.body.text
    });
    
    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
});


app.get('/todos',(req,res)=>{
    todoModel.find.then((todos)=>{
            res.send({todos})
    },(err)=>{
        res.status(400).send(err);
    })
})


app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    //my code
    // console.log(mongoose.Types.ObjectId.isValid(id));
    // if(mongoose.Types.ObjectId.isValid(id))
    // {
    //     todoModel.findById(id).then((todo)=>{
    //             if(!todo){
    //                 return res.status(400).send({});
    //             }
    //             else{
    //                 return res.send({todo});
    //             }
    //     },(err)=>{
    //         res.status(400).send({})
    //     })
    // }
    // else
    // {
    //     res.status(404).send('Your ID might not be correct');
    // }

    //tutorial code

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        res.status(404).send();
    }
    todoModel.findById(id).then((todo)=>{
            if(!todo){
               return res.status(400).send(); 
            }
            res.send({todo});
    }).catch((err)=>{
            res.status(400).send({});
    })
    

})




// assinging port tp server
app.listen(port,()=>{
    console.log(`Started on port ${port}`);
})

