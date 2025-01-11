function gameBoard() { // tworzenie planszy do gry
    const size = 3
    const board = [];

    for (let i = 0; i < size; i++) {
        board[i] = [];
        for (let j = 0; j < size; j++) {
            board[i].push(0);
        }
    }

    return board
}



function createPlayers(player1 = "Player1", player1Tag = "X", player2Tag = "O", player2 = "Player2") { //tworzenie gracza
    const players = [
        {
            name: player1,
            tag: player1Tag,
        },
        {
            name: player2,
            tag: player2Tag,
        }
    ];
    return players;
}

function checkingWin() {

    board = gameBoard();
    console.log(board.length);

    for (let i = 0; i < board.length; i++) { //sprawdzenie rzędów
        if (board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] !== 0) {
            console.log("Rząd wygrana");
            return true;
        } else if (board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] !== 0) { //sprawdzenie kolumn
            console.log("Kolumna wygrana");
            return true;
        }
    }
    if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== 0) { // sprawdzenie skosów
        return true;
    }
    else if (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== 0) {
        return true;
    }
    return false;
}
checkingWin();