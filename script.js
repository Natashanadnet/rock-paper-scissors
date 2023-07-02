const startButton = document.querySelector(".btn-play");
const gameContent = document.querySelector(".game-content");
const playerButtons = document.querySelectorAll(".choice");
const playerChoiceUi = document.querySelector(".player-choice");
const compChoiceUi = document.querySelector(".comp-choice");
const playerPointsUi = document.querySelector(".player-points");
const CompPointsUi = document.querySelector(".comp-points");
const roundWinnerUi = document.querySelector(".round-winner");
const turnsUi = document.querySelector(".turns");
const winnerUi = document.querySelector(".winner");
const playAgain = document.querySelector(".btn-play-again");
const label = document.querySelectorAll(".label");
let playerPoints = 0;
let compPoints = 0;
let turn = 5;

startButton.addEventListener("click", () => {
  startButton.classList.add("hidden");
  gameContent.classList.remove("hidden");
});

function compChoice() {
  const answers = ["rock", "paper", "scissors"];
  const index = Math.floor(Math.random() * answers.length);
  return answers[index];
}

function updateChoiceUi(playerChoice, compChoice) {
  playerChoiceUi.textContent = playerChoice;
  compChoiceUi.textContent = compChoice;
}

function pointSetter(playerChoice, compChoice) {
  if (playerChoice === compChoice) {
    return;
  } else if (
    (playerChoice === "rock" && compChoice === "scissors") ||
    (playerChoice === "paper" && compChoice === "rock") ||
    (playerChoice === "scissors" && compChoice === "rock")
  ) {
    playerPoints++;
    return "Player";
  } else {
    compPoints++;
    return "Computer";
  }
}

function updatePointsUi() {
  playerPointsUi.textContent = `Player: ${playerPoints}`;
  CompPointsUi.textContent = `Computer: ${compPoints}`;
}

function updateRoundWinner(winner) {
  roundWinnerUi.textContent = `Round Winner: ${
    typeof winner === "undefined" ? "tie" : winner
  }`;
}

function turnSetter() {
  turn--;
  turnsUi.textContent = `Turns remaining : ${turn}`;
}

function checkEnd() {
  return turn === 0;
}

function checkWinner() {
  if (checkEnd()) {
    winnerUi.textContent = `Winner : ${
      playerPoints === compPoints
        ? "Tie"
        : playerPoints > compPoints
        ? "Player"
        : "Computer"
    }`;
    gameContent.classList.add("hidden");
    winnerUi.classList.remove("hidden");
    playAgain.classList.remove("hidden");
  }
}

function restart() {
  playAgain.addEventListener("click", () => {
    window.location.reload();
  });
}

function game() {
  playerButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const playerPick = e.target.id;
      const compPick = compChoice();
      updateChoiceUi(playerPick, compPick);
      label.forEach((label) => {
        label.classList.remove("hidden");
      });
      const winner = pointSetter(playerPick, compPick);
      updateRoundWinner(winner);
      updatePointsUi();
      turnSetter();
      checkWinner();
      restart();
    });
  });
}

game();
