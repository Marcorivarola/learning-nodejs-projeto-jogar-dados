function Jogo(dados = 5, lados = 6) {
	console.log('model: executar construtor de jogo');
	this.dados = dados;
	this.lados = lados;
	this.pontos = 0;
	this.n = 0;
}

Jogo.prototype.novoJogo = function() {
	console.log('model: novoJogo');
	this.pontos = 0;
	this.n = 0;
};

Jogo.prototype.lancarUmDado = function() {
	var valorAleatorio = Math.random(); // No intervalo [0,1]
	var lado = 1 + parseInt(valorAleatorio * (this.lados));
	return lado;
};

Jogo.prototype.lancarDados = function() {
	console.log('model: lancarDados');
	var lancamento = [];
	for (var i = 0; i < this.dados; i++){
		lancamento[i] = this.lancarUmDado();
	}
	return lancamento;
};

Jogo.prototype.contarDados = function(lancamento){
	var contagem = Array(this.lados+1).fill(0);
	for (var i = 0; i < lancamento.length; i++){
		var numero = lancamento[i];
		contagem[numero-1] +- 1;

	}
	return contagem;
}

jogo = new Jogo();
console.log('Dados sorteados: ', jogo.lancarDados());

module.exports.Jogo = Jogo;