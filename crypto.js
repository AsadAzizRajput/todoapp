const {SHA256} =  require('crypto-js');

const jwt = require('jsonwebtoken');

var data = {
    id:4
}
var token =jwt.sign(data,'pktm');

console.log(token);
var decoded = jwt.verify(token,'pktm');

console.log(decoded);


// var message = "Hello I am Asad";
// var hash = SHA256(message);
//
// console.log(`Message ${message}`);
// console.log(`Hash ${hash}`);
