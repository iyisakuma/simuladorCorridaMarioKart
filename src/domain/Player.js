class Player {
  constructor(nome, velocidade, manobrabilidade, poder) {
    this._nome = nome;
    this._velocidade = velocidade;
    this._manobrabilidade = manobrabilidade;
    this._poder = poder;
    this._pontos = 0;
  }

  rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }
}

module.exports = Player;
