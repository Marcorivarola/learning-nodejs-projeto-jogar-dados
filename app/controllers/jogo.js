/*
Controller jogo;
Resonsável por:
- manter uma intância do model
- Pedir ao model para iniciar o jogo
- Pedir ao model para lançar os dados
- Pedir ao model para encerrar o jogo
- Pedir ao model para iniciar u7m novo jogo
*/

var model = require('../models/jogo');
var jogoMode1 = undefined;

module.exports.iniciar = function(application, req, res) {
	console.log('controller: iniciar');
	console.log('controller: cria intância de jogo');
	jogoMode1 = new model.Jogo();
	console.log('controller: atualiza view - novoJogo');
	res.render('novoJogo');	

}