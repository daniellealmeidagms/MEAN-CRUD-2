// Import

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Get express modules
var app = express();

// Setup the port
app.listen(3005, function(){
	console.log('Server is running on port 3005. Press CTRL+C to stop.');
});

// Connect to DB at MongoLab
mongoose.connect('mongodb://daniellealmeidagms:#Erica2000@ds135594.mlab.com:35594/daniellealmeidagms');

/*
mongoose.connect('mongodb://daniellealmeidagms:#Erica2000@ds135594.mlab.com:35594/daniellealmeidagms')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
 */

// Model
var Company = mongoose.model('Company', mongoose.Schema({
  cnpj: String,
  razao_social: String,
  nome_fantasia: String,
  cpf_responsavel: String,
  nome_responsavel: String,
  data_fundacao: { type: Date, default: Date.now },
}));

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/client'));

// URLs
app.get('/api/companies', function(req, res){
	Company.find(function(err, companies){
		if(err){
			return res.send(err);
		}
		res.json(companies);
	});
});

app.get('/api/companies/:id', function(req, res){
	Company.findOne({_id:req.params.id}, function(err, company){
		if(err){
			return res.send(err);
		}
		res.json(company);
	});
});
app.post('/api/companies', function(req, res){
	Company.create( req.body, function(err, companies){
		if(req.body.data_fundacao == null){
			req.body.data_fundacao = Date.now();
		}
		if(err){
			console.log(req.body)
			console.log("Error! Could not save the company.");
			return res.send(err);
		}
		res.json(companies);
	});
});

app.delete('/api/companies/:id', function(req, res){
	Company.findOneAndRemove({_id:req.params.id}, function(err, company){
		if(err){
			return res.send(err);
		}
		res.json(company);
	});
});
app.put('/api/companies/:id', function(req, res){
	var query = {
		razao_social:req.body.razao_social,
		nome_fantasia:req.body.nome_fantasia,
		cpf_responsavel:req.body.cpf_responsavel,
		nome_responsavel:req.body.nome_responsavel,
		data_fundacao:req.body.data_fundacao
	};
	Company.findOneAndUpdate({_id:req.params.id}, query, function(err, company){
		if(err){
			return res.send(err);
		}
		res.json(company);
	});
});
