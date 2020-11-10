function playerWon() {
    if (gameState[0] != "" && gameState[0] === gameState[1] && gameState[1] === gameState[2])
        return gameState[0]
    if (gameState[3] != "" && gameState[3] === gameState[4] && gameState[4] === gameState[5])
        return gameState[3]
    if (gameState[6] != "" && gameState[6] === gameState[7] && gameState[7] === gameState[8])
        return gameState[6]
    if (gameState[0] != "" && gameState[0] === gameState[3] && gameState[3] === gameState[6])
        return gameState[0]
    if (gameState[1] != "" && gameState[1] === gameState[4] && gameState[4] === gameState[7])
        return gameState[1]
    if (gameState[2] != "" && gameState[2] === gameState[5] && gameState[5] === gameState[8])
        return gameState[2]
    if (gameState[0] != "" && gameState[0] === gameState[4] && gameState[4] === gameState[8])
        return gameState[0]
    if (gameState[2] != "" && gameState[2] === gameState[4] && gameState[4] === gameState[6])
        return gameState[2]
}
function draw() {
    for (let i = 0; i < 9; i++) {
        if (
            gameState[i] === ""
        )
            return false

    }

    return true
}
/*
We store our game status element here to allow us to more easily 
use it later on 
*/
const statusDisplay = document.querySelector('.game--status');
/*
Here we declare some variables that we will use to track the 
game state throught the game. 
*/
/*
We will use gameActive to pause the game in case of an end scenario
*/
let gameActive = true;
/*
We will store our current player here, so we know whos turn 
*/
let currentPlayer = "X";
/*
We will store our current game state here, the form of empty strings in an array
 will allow us to easily track played cells and validate the game state later on
*/
let gameState = ["", "", "", "", "", "", "", "", ""];
/*
Here we have declared some messages we will display to the user during the game.
Since we have some dynamic factors in those messages, namely the current player,
we have declared them as functions, so that the actual message gets created with 
current data every time we need it.
*/
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
/*
We set the inital message to let the players know whose turn it is
*/
statusDisplay.innerHTML = currentPlayerTurn();
function handleCellPlayed() {
    window.alert("update game state and UI")
}
function handlePlayerChange() {
    window.alert("player changed")
}
function handleResultValidation() {
    window.alert("validate result")
}
function handleCellClick(evt) {
    const cell = evt.target;
    const cellindex = cell.getAttribute("data-cell-index");
    if (gameState[cellindex] === "") {
        if (currentPlayer === "X") {
            cell.innerHTML = 'X'
            currentPlayer = "O"
            gameState[cellindex] = "X"
            statusDisplay.innerHTML = currentPlayerTurn()
        } else if (currentPlayer === "O") {
            cell.innerHTML = 'O'
            currentPlayer = "X"
            gameState[cellindex] = "O"
            statusDisplay.innerHTML = currentPlayerTurn()
        }
        const player = playerWon()
        if (player != undefined) {
            window.alert("player " + player + " has won")
            reset();
        }

        if (draw()) {
            window.alert("no one won, its a draw");
            reset();
        }
    }
    else {
        window.alert("feldBelegt")
    }
}
const cells = document.querySelectorAll('.cell');

function handleRestartGame() {
    reset();
    window.alert("restart game")
}

function reset() {
    for (let i = 0; i < 9; i++)
        cells[i].innerHTML = '';

    gameState = ["", "", "", "", "", "", "", "", ""];
}
/*
And finally we add our event listeners to the actual game cells, as well as our 
restart button
*/
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
