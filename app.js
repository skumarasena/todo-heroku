//Note: I found the following very helpful, and based my app on the code found here:
//https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular



var express  = require('express');
var index = require('./routes/index.js');                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


var app = express();

console.log(process.env['MONGOLAB_URI']);
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/todos');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected!');
});     // connect to mongoDB database on modulus.io


app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


app.get('/api/todos', index);
app.post('/api/todos', index);

app.delete('/api/todos/:todo_id', index);
app.put('/api/todos/:todo_id', index);
app.post('/api/todos/:todo_id', index);

app.get('*', index);

// listen (start app with node server.js) ======================================

var PORT = process.env.PORT || 3000;
app.listen(PORT, function(err) {
    if(err) console.log(err)
});

// app.listen(3000);
// console.log("App listening on port 3000");

module.exports = app;