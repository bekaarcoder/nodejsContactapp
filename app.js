var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contacts']);

var app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules'));

app.get('/contactlist', function(req, res){
	db.contacts.find(function(err, docs) {
		if(err){
			console.log(err);
		} else {
			res.json(docs);
		}
	});
});

app.post('/contactAdd', function(req, res){
	db.contacts.insert(req.body, function(err, docs){
		if(err){
			res.send(err);
		} else {
			res.json(docs);
		}
	})
});

app.delete('/contactDel/:id', function(req, res){
	var id = req.params.id;
	db.contacts.remove({_id: mongojs.ObjectId(id)}, function(err, docs){
		if(err){
			res.send(err);
		} else {
			res.json(docs);
		}
	});
});

app.put('/contactUpdate/:id', function(req, res){
	var id = req.params.id;
	// console.log(req.body);
	db.contacts.findAndModify({
		query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true
	}, function(err, docs){
		if(err){
			res.send(err);
		} else {
			res.json(docs);
		}
	});
});

app.listen(3000);
console.log("Server running at port 3000...");