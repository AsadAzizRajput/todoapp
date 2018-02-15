const {Promise}=require ('mongoose');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {todo} = require('./models/todo');
var {user} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todoModel = todo({
        text: req.body.text
    });

    todoModel.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});


app.get('/todos', (req, res) => {

    todo.find({}).then((todos) => {
        res.send({
            todos
        })
    }, (err) => {
        res.status(400).send(err);
    })
})


app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(400).send();
        }
        res.send({
            todo
        });
    }).catch((err) => {
        res.status(400).send({});
    })


})

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    console.log(id);
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    todo.findByIdAndRemove(id).then((todo) => {
        if (!todo || null) {
            return res.status(404).send();
        }
        res.status(200).send({
            todo
        });
    }).catch((err) => {
        res.send(400).send({})
    })

})

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {

    }).catch((err) => {

    })
})

app.post('/users', (req, res) => {

    var body = _.pick(req.body, ['email', 'password']);
    var User = new user(body);

    User.save().then(() => {
        return User.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(User);
        console.log('Here in token Header Clause');
    }).catch((err) => {
        res.status(400).send(err);
        console.log('Here in error Clause', err);
    })
})


app.get('/users/me',authenticate, (req, res) => {
   res.send(req.user);
})



// assinging port tp server
app.listen(port, () => {
    console.log(`Started on port ${port}`);
})