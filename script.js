const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

// Create board cells
function createBoard() {
    board.innerHTML = "";
    boardState.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.index = index;
        cellElement.innerText = cell;
        cellElement.addEventListener("click", handleMove);
        board.appendChild(cellElement);
    });
}

// Handle player move
function handleMove(event) {
    const index = event.target.dataset.index;

    if (boardState[index] !== "" || checkWinner()) return;

    boardState[index] = currentPlayer;
    event.target.innerText = currentPlayer;

    if (checkWinner()) {
        statusText.innerText = `Player ${currentPlayer} Wins!`;
        highlightWinner();
        return;
    } else if (boardState.every(cell => cell !== "")) {
        statusText.innerText = "It's a Draw!";
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s turn`;
}

// Check for a winner
function checkWinner() {
    return winningCombos.find(combo => {
        const [a, b, c] = combo;
        return boardState[a] && boardState[a] === boardState[b] && boardState[b] === boardState[c];
    });
}

// Highlight winning combination
function highlightWinner() {
    const winningCombo = checkWinner();
    if (winningCombo) {
        winningCombo.forEach(index => {
            document.querySelector(`.cell[data-index='${index}']`).classList.add("winner");
        });
    }
}

// Restart game
function restartGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    statusText.innerText = "Player X's turn";
    createBoard();
}

restartButton.addEventListener("click", restartGame);

createBoard();
