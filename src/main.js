const Player = require("./domain/Player.js");

(function main() {
  const player1 = new Player("Mario", 4, 3, 3, 0);
  const player2 = new Player("Luigi", 3, 4, 4, 0);
  console.log(
    `🏁🚗 Corrida entre ${player1._nome} e ${player2._nome} começando`
  );
  start(player1, player2);
  declaresWinnerBetween(player1, player2);
})();
function declaresWinnerBetween(player1, player2) {
  console.log("Pontuação Final");
  console.log(`${player1._nome} : ${player1._pontos} ponto(s)`);
  console.log(`${player2._nome} : ${player2._pontos} ponto(s)`);

  if (player1._pontos > player2._pontos) {
    console.log(`👑 ${player1._nome} foi vencedor!!`);
    return;
  }

  if (player1._pontos < player2._pontos) {
    console.log(`👑 ${player2._nome} foi vencedor!!`);
    return;
  }
  console.log("Empatou");
}
function start(player1, player2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🚩 Rodada ${round}`);

    let block = getRandomBlock();
    console.log(`Bloco: ${block}`);
    //Valores dos dados
    let diceResult1 = player1.rollDice();
    let diceResult2 = player2.rollDice();

    let totalTestSkill1 = diceResult1;
    let totalTestSkill2 = diceResult2;
    let diceType, attr1, attr2, powerResult1, powerResult2;

    if (block === "RETA") {
      totalTestSkill1 += player1._velocidade;
      totalTestSkill2 += player2._velocidade;
      diceType = "velocidade";
      attr1 = player1._velocidade;
      attr2 = player2._velocidade;
    }
    if (block === "CONFRONTO") {
      powerResult1 = totalTestSkill1 + player1._poder;
      powerResult2 = totalTestSkill1 + player2._poder;
      diceType = "poder";

      console.log(`⚔️ ${player1._nome} confrontou com ${player2._nome}`);

      attr1 = player1._poder;
      attr2 = player1._poder;
    }
    if (block === "CURVA") {
      totalTestSkill1 += player1._manobrabilidade;
      totalTestSkill2 += player2._manobrabilidade;
      diceType = "manobrabilidade";
      attr1 = player1._manobrabilidade;
      attr2 = player2._manobrabilidade;
    }
    logRollResult(player1._nome, diceType, diceResult1, attr1);
    logRollResult(player2._nome, diceType, diceResult2, attr2);

    if (diceType !== "poder") {
      if (totalTestSkill1 > totalTestSkill2) {
        console.log(`${player1._nome} ganhou um ponto`);
        player1._pontos++;
      } else if (totalTestSkill2 > totalTestSkill1) {
        console.log(`${player2._nome} ganhou um ponto`);
        player2._pontos++;
      }
    } else {
      if (powerResult1 > powerResult2) {
        if (player2._pontos > 0) {
          console.log(`${player2._nome} perdeu um ponto`);
          player2._pontos--;
        }
        console.log(`${player1._nome} ganhou o confronto`);
      }
      if (powerResult2 > powerResult1) {
        if (player1._pontos > 0) {
          console.log(`${player1._nome} perdeu um ponto`);
          player1._pontos--;
        }
        console.log(`${player2._nome} ganhou o confronto`);
      } else {
        console.log("Confronto empatado! Nenhum ponto perdido.");
      }
    }
    console.log("----------------------");
  }
}

function getRandomBlock() {
  let random = Math.random();
  if (random < 0.33) return "CURVA";
  if (random < 0.66) return "RETA";
  return "CONFRONTO";
}

function logRollResult(characterName, block, diceResult, attr) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} : ${diceResult} + ${attr} = ${
      diceResult + attr
    }`
  );
}
