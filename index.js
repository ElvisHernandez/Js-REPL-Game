let readlineSync = require('readline-sync');

let userScore = 0;
let computerScore = 0;
let boardValues = [[" "," "," "], [" "," "," "], [" "," "," "]]
const referenceValues = [[0,1,2], [3,4,5], [6,7,8]];
const positionsObject = {
    0: [0,0],
    1: [0,1],
    2: [0,2],
    3: [1,0],
    4: [1,1],
    5: [1,2],
    6: [2,0],
    7: [2,1],
    8: [2,2]
}

const userName = readlineSync.question("Please enter your name: \n");
console.log(`Hi there ${userName}, welcome to command line based Tic Tac Toe! \n`);


function startOfGame () { 
    boardValues = [[" "," "," "], [" "," "," "], [" "," "," "]];
    const userFlip = readlineSync.question("Input H for heads, or T for tails to see who's going first: \n"
    , {limit: ["H","T"], limitMessage: "Incorrect input, please enter either 'H' for heads or 'T' for tails \n"});
    process.stdout.write('\033c'); // this clears the command line text above it
    const computerFlip = Math.floor(Math.random()*2);
    if (userFlip === "H" && computerFlip == 1) {
        game("User");
    }
    else if (userFlip === "T" && computerFlip == 0) {
        game("User");
    }
    else {
        game("Computer");
    };
}

function tttBoard (boardValue = boardValues) {   // this function draws the board with its updated values
    const row1 = ` ${boardValue[0][0]} | ${boardValue[0][1]} | ${boardValue[0][2]} \n`;
    const row2 = `___|___|___\n`;
    const row3 = ` ${boardValue[1][0]} | ${boardValue[1][1]} | ${boardValue[1][2]} \n`;
    const row4 = `___|___|___\n`;
    const row5 = ` ${boardValue[2][0]} | ${boardValue[2][1]} | ${boardValue[2][2]} \n`;
    const row6 = `   |   |   `;
    console.log(row1+row2+row3+row4+row5+row6 + '\n');
};


function game (firstToAct) {
    let freePositions = [0,1,2,3,4,5,6,7,8];
    if (firstToAct == "User") {
        tttBoard(referenceValues);
        console.log("You're first to act! You will have 'X' and the computer will have 'O'. \n");
        gameLoop(freePositions);
    }
    else {
        tttBoard(referenceValues);
        console.log("You lost the flip, you are second to go and you will have 'O' \n")
        let compPos = freePositions[Math.floor(Math.random()*freePositions.length)];
        boardValues[positionsObject[compPos][0]][positionsObject[compPos][1]] = 'O';
        let indexToRemove2 = freePositions.indexOf(compPos);
        freePositions.splice(indexToRemove2,1);
        tttBoard();
        gameLoop(freePositions);
    }
    if (freePositions.length == 0 && checkWin() == undefined) {
        console.log("IT'S A TIE!!!!!")
        restart();
    }

}

function gameLoop (freePositions) {
    while (freePositions.length > 0) {
        let location = parseInt(readlineSync.question("Choose a number from 0 to 8 to specify the placement of your tic: \n", 
            {limit: freePositions, limitMessage: "Incorrect input, make sure to input a single integer in the range {0,8}, "
            +"not including already occupied positions."}));
        console.log('\n');
        boardValues[positionsObject[location][0]][positionsObject[location][1]] = 'X';
        if (checkWin() !== undefined) {
            break;
        }
        let indexToRemove1 = freePositions.indexOf(location);
        freePositions.splice(indexToRemove1,1);
        if (freePositions.length == 0) {    
            break;
        }
        let compPos = freePositions[Math.floor(Math.random()*freePositions.length)];
        boardValues[positionsObject[compPos][0]][positionsObject[compPos][1]] = 'O';
        let indexToRemove2 = freePositions.indexOf(compPos);
        freePositions.splice(indexToRemove2,1);
        if (checkWin() !== undefined) {
            break;
        }
        tttBoard();
        }    

}

function checkWin() {
    let winningCombos = [
        [boardValues[0][0],boardValues[0][1],boardValues[0][2]],
        [boardValues[1][0],boardValues[1][1],boardValues[1][2]],
        [boardValues[2][0],boardValues[2][1],boardValues[2][2]],
        [boardValues[0][0],boardValues[1][0],boardValues[2][0]],
        [boardValues[0][1],boardValues[1][1],boardValues[2][1]],
        [boardValues[0][2],boardValues[1][2],boardValues[2][2]],
        [boardValues[0][0],boardValues[1][1],boardValues[2][2]],
        [boardValues[0][2],boardValues[1][1],boardValues[2][0]]
    ];
    for (let i = 0; i < winningCombos.length; i++)  {
        if (winningCombos[i].join('') === 'XXX') {
            userScore++;
            console.log('           YOU WON!!!!!');
            tttBoard();
            restart();
            return "User";
        }
        else if (winningCombos[i].join('') === 'OOO') {
            computerScore++;
            console.log('           YOU LOST!!!!!');
            tttBoard();
            restart();
            return "Computer";
        };
    };
}

function restart () {
    console.log(` User score: ${userScore} | Computer score: ${computerScore}`);
    const toRestartOrNot = readlineSync.question("Would you like to play again? Enter Y for Yes or N for No: \n",
    {limit: ['Y','N'],limitMessage: "Incorrect input, please enter either 'Y' for yes or 'N' for no \n"});
    if (toRestartOrNot == 'Y') {
        startOfGame();
    }
    else {
        return console.log(' GAME OVER \n');
    }
}

startOfGame();