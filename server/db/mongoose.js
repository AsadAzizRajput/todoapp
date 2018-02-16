var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
 mongoose.connect('mongodb://todoapp:CgpsBck1995@ds229388.mlab.com:29388/todoapp');

// mongoose.connect('mongodb://localhost:27017/todoapp');

module.exports={
    mongoose
}