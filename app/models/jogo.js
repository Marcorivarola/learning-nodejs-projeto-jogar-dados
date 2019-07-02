function Jogo(dados = 5, lados = 6) {
	console.log('model: executar construtor de jogo');
	this.dados = dados;
	this.lados = lados;
	this.pontos = 0;
	this.n = 0;
	this.sorte0 = 0;
}

Jogo.prototype.novoJogo = function() {
	console.log('model: novoJogo');
	this.pontos = 0;
	this.n = 0;
};

Jogo.prototype.lancarUmDado = function() {
	var valorAleatorio = Math.random();
	// No intervalo [0,1]
	//De [0,1] * 6 => [0,6]
	//Usando math.floor temos [0,1,2,3,4,5]
	//Somando uma unidade temos [1,2,3,4,5,6]
	var lado = 1 + Math.floor(valorAleatorio * (this.lados));
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
	var contagem = Array(this.lados).fill(0);
	for (var i = 0; i < lancamento.length; i++){
		var numero = lancamento[i];
		contagem[numero-1] += 1;

	}
	return contagem;
}

const GENERALA = { jogo : 'Generela', pontos : 100 }
const POKER    = { jogo : 'Poker'   , pontos : 50  }
const FULL     = { jogo : 'Full'    , pontos : 30  }
const NADA     = { jogo : 'Nenhum'  , pontos : 0 }

Jogo.prototype.analisarLancamento = function(lancamento){

	var contagem = this.contarDados(lancamento);

	var resultado;

	if ( contagem.find(e => e === 5) )
		resultado = GENERALA;

	else if ( contagem.find(e => e === 4) )
		resultado = POKER;

	else if ( contagem.find(e => e === 3) && contagem.find(e => e === 2) )
		resultado = FULL;
	else 
		resultado = NADA;

	return resultado;

}

Jogo.prototype.novoLancamento = function(){
	console.log('model: novoLancamento');
	var lancamento = this.lancarDados();
	console.log('model: analisarLancamento');
	var analisarLancamento = this.analisarLancamento(lancamento);
	this.pontos += analisarLancamento.pontos;
	this.n += 1;

	var messenger = this.messenger(analisarLancamento);

	console.log('model: prepara resultado');

	var resultado = {
		pontosAcumulados : this.pontos,
		nLancamentos : this.n,
		lancamento : lancamento,
		jogoLancamento : analisarLancamento.jogo,
		pontosLancamento : analisarLancamento.pontos,
		sorte0 : messenger.sorte0,
		mensagem : messenger.mensagem,
		mensagemStatus : messenger.mensagemStatus

	};

	return resultado;

}

Jogo.prototype.messenger = function(analisarLancamento) {
	console.log('model: messenger');
	console.log('model: analisarLancamento');
	if (analisarLancamento.pontos == 0)
		this.sorte0 += 1;
	else 
		this.sorte0 = 0;
	mensagem = "";

	if (this.sorte0 >= 5){
		mensagem = "Talvez so tenha tido um pouco de azar, tente mais vezes. :)";
		mensagemStatus = 'azar';
		this.sorte0 = 0;
	}

	if (analisarLancamento.pontos != 0){
		mensagem = "Você está com sorte, Parabéns. ;)";
		mensagemStatus = 'sorte';
	}	


	var resultado = {
		sorte0 : this.sorte0,		
		mensagem : mensagem,
		mensagemStatus : mensagemStatus
	};

	return resultado;

}

jogo = new Jogo();
lancamento = jogo.lancarDados();
contagem = jogo.contarDados(lancamento);
resultado = jogo.analisarLancamento(lancamento);

console.log('Dados sorteados: ', lancamento);
console.log('contagem: ', contagem);
console.log('analise do lancamento: ', resultado);

module.exports.Jogo = Jogo;