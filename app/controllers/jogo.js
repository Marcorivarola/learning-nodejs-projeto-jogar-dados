/*
Controller jogo;
Resonsável por:
- manter uma intância do model
- Pedir ao model para iniciar o jogo
- Pedir ao model para lançar os dados
- Pedir ao model para encerrar o jogo
- Pedir ao model para iniciar u7m novo jogo
*/

//var model = require('../models/jogo');
var jogoMode1 = undefined;

module.exports.iniciar = function(application, req, res) {
	console.log('controller: iniciar');
	console.log('controller: cria intância de jogo');
	jogoMode1 = new application.app.models.jogo.Jogo();
	console.log('controller: atualiza view - novoJogo');
	res.render('novoJogo');	

}

module.exports.novoLancamento = function(application, req, res) {
	console.log('controller: novoLancamento');
	if (jogoMode1){
		console.log('controller: pede para o model fazer novoLancamento');
		var resultado = jogoMode1.novoLancamento();
		res.render('novoLancamento', resultado );
	}

}

	module.exports.reiniciar = function(application, req, res) {
		console.log('controller: reiniciar');
		if (jogoMode1){
			console.log('controller: pede para o model criar um novo jogo');
			jogoMode1.novoJogo();
			console.log('controller: atualiza a view');
			res.render('novoJogo');
		} else {
			console.log('controller: atualiza a view para página principal')
			res.render('home');
		}
	}

	module.exports.encerrar = function(application, req, res) {
		console.log('controller: encerrar');
		jogoMode1 = undefined;
		res.render('home');
	}
