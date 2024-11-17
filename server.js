var express =  require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');

var app = express();
app.use(session({secret: 'todotopsecret'}))

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req,res,next){
  if (typeof(req.session.todolist) == 'undefined') {
    req.session.todolist = [];
  }
next();
})

.get('/todo', function(req, res) {
    res.render('todo.ejs', {todolist: req.session.todolist});
})

/* Adding an item to the to do list */
.post('/todo/add/',function(req, res) {
  console.log('adding to list');
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

.get('/todo/update/:id/:eds',function(req, res) {
    //console.log(req.params.eds);
    req.session.todolist[req.params.id] = req.params.eds;
    res.redirect('/todo');
})

.get('/todo/delete/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

/* Deletes an item from the to do list */

.use(function(req, res, next){
    res.redirect('/todo');
})
app.listen(8080);
