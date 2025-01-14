const button = document.getElementById("testButton");

button.addEventListener("click", game)

function createBoard(){
    const rows = 3;
    const columns = 3;
    let board = [];

    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = cell();
        }
    }

    const printBoard = () => board;

    return {printBoard};
}

const getBoard = createBoard();

function cell(){
    let value = "";
    return value;
}

function checkWin(){
    const board = updateBoard();
    const currentBoard= board.printUpdatedBoard();
    let win = false;

    for (let i = 0; i <currentBoard.length; i++) { //check rows

        if (currentBoard[i][0] === currentBoard[i][1] && currentBoard[i][0] === currentBoard[i][2] && currentBoard[i][0] !== "") {
            console.log("row Win");
            console.log(`Wining combination ${currentBoard[i][0]} ${currentBoard[i][1]} ${currentBoard[i][2]}`);
            win = true;
            return win;
        }
    }

    for (let i = 0; i <currentBoard.length; i++) { // check columns

        if(currentBoard[0][i] === currentBoard[1][i] && currentBoard[0][i] === currentBoard[2][i] && currentBoard[0][i] !== ""){
            console.log("Column win");
            console.log(`Wining combination ${currentBoard[0][i]} ${currentBoard[1][i]} ${currentBoard[2][i]}`);
            win = true;
            return win;
        }
    }
    if(currentBoard[0][0] === currentBoard[1][1] && currentBoard[0][0] === currentBoard[2][2] && currentBoard[0][0] !== ""){ // checking diagonal
        console.log("Skos 1");
        win = true;
        return win;
    }else if(currentBoard[0][2] === currentBoard[1][1] && currentBoard[0][2] === currentBoard [2][0] && currentBoard[0][2] !== ""){ // checking diagonal
        console.log("Skos 2");
        win = true;
        return win;}
    return win;
}

function updateBoard(imput){

    const board = getBoard.printBoard();
    const row = prompt("Row");
    const column = prompt("Column");
    board[row][column] = imput;


    const printUpdatedBoard = () => board;
    return{printUpdatedBoard};
}


function createPlayer(player1 = "Player .1", player2 = "Player .2"){ //tworzy gracza
    const players = [
        {name: player1,
        tag: "X"},
        {name: player2,
        tag: "O"},
    ]
    const firstPlayerName =  players[0].name;
    const secondPlayerName =  players[1].name;
    const firstPlayerTag =   players[0].tag;
    const secondPlayerTag =  players[1].tag;

    return {firstPlayerName, secondPlayerName, firstPlayerTag, secondPlayerTag }; //zwraca dane pierwszego i drugiego gracza
}

function changePlayerTurn(roundTracking){
    const players= createPlayer();
    const firstPlayer = players.firstPlayerTag;
    console.log(`round ${roundTracking}`);
    const secondPlayer = players.secondPlayerTag;
    let actualPlayer;
    if(roundTracking % 2 === 0){
        actualPlayer = firstPlayer;
    }else if(roundTracking % 2 !== 0){
        actualPlayer = secondPlayer;
    }

    return actualPlayer;
}

function game(){
    let round = 0;

    console.log("round" + round)
    if(checkWin() === false){
        round++;
        console.log(`Turn player ${changePlayerTurn(round)}`);
        displayBoardInConsole();
        updateBoard(changePlayerTurn(round));

    }
}

function displayBoardInConsole(){
    const array = getBoard.printBoard();
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

function getUserInput(r, c){
    let row  = r;
    let column = c;
    return {row, column};
}