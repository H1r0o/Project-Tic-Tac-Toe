const button = document.getElementById("testButton");

button.addEventListener("click", game);

const cells = document.querySelectorAll(".cell");
cells.forEach(cell => {
    cell.addEventListener("click", (e) => {
        e.target.innerHTML = `<h3>${e.target.getAttribute('id')}</h3>`;

    });

});

const board = createBoard();
let round = 0;

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

function checkWin(board) {
    const currentBoard = board.printBoard();
    let win = false;
    for (let i = 0; i < currentBoard.length; i++) { //check rows
        if (currentBoard[i][0] === currentBoard[i][1] && currentBoard[i][0] === currentBoard[i][2] && currentBoard[i][0] !== " ") {
            win = true;
            return win;
        }
    }
    for (let i = 0; i < currentBoard.length; i++) { // check columns

        if (currentBoard[0][i] === currentBoard[1][i] && currentBoard[0][i] === currentBoard[2][i] && currentBoard[0][i] !== " ") {
            win = true;
            return win;
        }
    }
    if (currentBoard[0][0] === currentBoard[1][1] && currentBoard[0][0] === currentBoard[2][2] && currentBoard[0][0] !== " ") { // checking diagonal
        win = true;
        return win;
    } else if (currentBoard[0][2] === currentBoard[1][1] && currentBoard[0][2] === currentBoard[2][0] && currentBoard[0][2] !== " ") { // checking diagonal
        win = true;
        return win;
    }
    return win;
}


function createPlayer(player1 = "Player .1", player2 = "Player .2") { //tworzy gracza
    return [
        { name: player1, tag: "X" },
        { name: player2, tag: "O" },
    ]; //zwraca dane pierwszego i drugiego gracza
};

function game() {

    const tie = board.printBoard().every(row => row.every(cell => cell !== " "));
    const players = createPlayer();
    let currentPlayer = players[round % 2];
    if (checkWin(board) === false) {
        console.log(`Turn ${currentPlayer.name}`);
        let row = parseInt(prompt("Wiersz 0-2"));
        let column = parseInt(prompt("Kolumna 0-2"));
        if (board.printBoard()[row][column] === " ") {
            board.updateBoard(row, column, currentPlayer.tag);
            round++;
            displayBoardInConsole(board);
        } else if (tie) {
            console.log("Brak miejsc na planszy");
            createBoard();
        }
        else {
            console.log("To miejsce jest zajęte");
        }
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


