const board = createBoard();
let userTurn = document.getElementById("userTurn");
let round = 1;
let gameRunning = false;
let players;

let currentPlayer;

const startBtn = document.querySelector("#start");
startBtn.addEventListener("click", () => {
    let player1 = document.getElementById("player1").value;
    let player2 = document.getElementById("player2").value;
    if (player1 === "") {
        player1 = "TestPlayer1"
    }
    if (player2 === "") {
        player2 = "TestPlayer2"
    }
    players = createPlayer(player1, player2);
    gameRunning = true;
    gettingElementId();
});

const restartBtn = document.querySelector("#reset");
restartBtn.addEventListener("click", () => {
    if (gameRunning) return;
    restartGame();
})

function createBoard() {
    const rows = 3;
    const columns = 3;
    let board = [];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = " ";
        }
    }
    const printBoard = () => board;
    const updateBoard = (row, column, value) => {
        board[row][column] = value;
    };
    return { printBoard, updateBoard };
}

function checkWin(board, currentPlayer) {
    const currentBoard = board.printBoard();
    let win = false;

    for (let i = 0; i < currentBoard.length; i++) { //check rows
        if (currentBoard[i][0] === currentBoard[i][1] && currentBoard[i][0] === currentBoard[i][2] && currentBoard[i][0] !== " ") {
            userTurn.innerText = `Wygrywa gracz ${currentPlayer.name}`;
            gameRunning = false;
            win = true;
            return win;
        }
    }
    for (let i = 0; i < currentBoard.length; i++) { // check columns

        if (currentBoard[0][i] === currentBoard[1][i] && currentBoard[0][i] === currentBoard[2][i] && currentBoard[0][i] !== " ") {
            userTurn.innerText = `Wygrywa gracz ${currentPlayer.name}`;
            gameRunning = false;
            win = true;
            return win;
        }
    }
    if (currentBoard[0][0] === currentBoard[1][1] && currentBoard[0][0] === currentBoard[2][2] && currentBoard[0][0] !== " ") { // checking diagonal
        userTurn.innerText = `Wygrywa gracz ${currentPlayer.name}`;
        gameRunning = false;
        win = true;
        return win;
    } else if (currentBoard[0][2] === currentBoard[1][1] && currentBoard[0][2] === currentBoard[2][0] && currentBoard[0][2] !== " ") { // checking diagonal
        userTurn.innerText = `Wygrywa gracz ${currentPlayer.name}`;
        gameRunning = false;
        win = true;
        return win;
    }
    return win;
}


function createPlayer(player1 = "Player .1", player2 = "Player .2") { //tworzy gracza
    return [
        { name: player1, tag: "O", color: 0 },
        { name: player2, tag: "X", color: 1 },
    ]; //zwraca dane pierwszego i drugiego gracza
};

function game(targetRow, targetColumn, cell) {
    if (!gameRunning) return;
    let color = 1;
    if (board.printBoard()[targetRow][targetColumn] === " ") {
        color++;
        let currentPlayer = players[round % 2];
        let winner = players[(round - 1) % 2];
        board.updateBoard(targetRow, targetColumn, currentPlayer.tag);
        cell.innerHTML = `<h3 class=cell${currentPlayer.color}>${currentPlayer.tag}</h3>`;
        // cell.classList.add(`cell${round % 2}`)
        userTurn.innerText = `Tura gracza ${currentPlayer.name}`
        displayBoardInConsole(board);

        if (checkWin(board, winner)) {
            console.log(`${currentPlayer.name} wins!`);
            gameRunning = false;
            return;
        }

        if (board.printBoard().every(row => row.every(cell => cell !== " "))) {
            console.log("Gra zakończona remisem!");
            userTurn.innerText = `Gra zakończona remisem!`;
            gameRunning = false;
            return;
        }

        // Przełącz gracza po zakończeniu ruchu
        round++;

    } else {
        console.log("To pole jest już zajęte!");
    }
}

function displayBoardInConsole(getedBoard) {
    const array = getedBoard.printBoard();
    const uL = array[0][0];
    const uC = array[0][1];
    const uR = array[0][2];
    const cL = array[1][0];
    const cC = array[1][1];
    const cR = array[1][2];
    const dL = array[2][0];
    const dC = array[2][1];
    const dR = array[2][2];
    console.log(` ${uL} | ${uC} | ${uR}`)
    console.log(` ${cL} | ${cC} | ${cR}`)
    console.log(` ${dL} | ${dC} | ${dR}`)
}

function gettingElementId() {
    if (!gameRunning) {
        return;
    }

    let targetRow;
    let targetColumn;
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.addEventListener("click", (e) => {
            if (!gameRunning) return;
            targetRow = parseInt(e.target.id.charAt(0));
            targetColumn = parseInt(e.target.id.charAt(1));
            game(targetRow, targetColumn, cell);

        });

    });

}

function restartGame() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.innerHTML = " ";
    });

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board.updateBoard(i, j, " ");
        }
    }
    board.printBoard();
    gameRunning = true;
    round = 1;
    let player = players[(round - 1) % 2]
    userTurn.innerText = `Tura gracza ${player.name}`;
    createBoard();
}


// Naprawa trwania gry, gettingElementId musi otrzymywać false przy zakończeniu