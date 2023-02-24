// This is grabbing the HTML with the class of currentTurn
// As good convention, I write my variables at the top of the file
// querySelector will grab THE FIRST item it sees that matches
const currentPlayerHTML = document.querySelector('#currentTurn');
// Other options is make the HTML have an id and use document.getElementById('currentTurn');
// As good practice, COMMENT out console.log statements
// console.log(currentPlayerHTML);
// querySelectorAll will ALWAYS grab ALL of the items. This always create an array that is grabbing every item
const squares = document.querySelectorAll('.square');
console.log(squares);
// Initialize player
let player;
const xWinsInHTML = document.querySelector('.x');
const oWinsInHTML = document.querySelector('.oWins');
let totalWinsX = 0;
let totalWinsO = 0;
let count = 0;

// Half the time randomly make player X and half the time make player O
if(Math.random() > 0.5) {player = 'X'}
else {player = "O"};

// console.log(player);


// I put my functions in this spot 
// Write a function to change the DOM so I know whose turn it is
function updateTurnOnDOM() {
    currentPlayerHTML.innerHTML = `It is ${player}'s turn`;
    // Return is only needed if at some point I need the VALUE of what this function does
    return;
}
updateTurnOnDOM();

function resetBoard() {
    count = 0;
    for(let i = 0; i < squares.length; i++) {
        squares[i].innerHTML = '';
        squares[i].classList.remove('orange');
        squares[i].classList.remove('purple');
    }
}

// function blink(arrOfSquares, howLong) {
//     for(let i = 0; i < howLong; i+=500) {
//         setTimeout(() => {
//             arrOfSquares.forEach(square => {
//                 square.classList.add('green')
//             }, 250);
//             arrOfSquares.forEach(square => {
//                 square.classList.remove('green');
//             })
//         })
//     }
// }

function thereIsAWinner() {
    const winningConditions = [
        [squares[0].innerHTML, squares[1].innerHTML, squares[2].innerHTML],
        [squares[3].innerHTML, squares[4].innerHTML, squares[5].innerHTML],
        [squares[6].innerHTML, squares[7].innerHTML, squares[8].innerHTML],
        [squares[0].innerHTML, squares[3].innerHTML, squares[6].innerHTML],
        [squares[1].innerHTML, squares[4].innerHTML, squares[7].innerHTML],
        [squares[2].innerHTML, squares[5].innerHTML, squares[8].innerHTML],
        [squares[0].innerHTML, squares[4].innerHTML, squares[8].innerHTML],
        [squares[2].innerHTML, squares[4].innerHTML, squares[6].innerHTML]
    ]
    for(let i = 0; i < winningConditions.length; i++) {
        if(winningConditions[i][0] === "X" && winningConditions[i][1] === "X" && winningConditions[i][2] === "X" ) {
            console.log("X is the winner");
            totalWinsX++;
            xWinsInHTML.innerHTML = totalWinsX;
            setTimeout(resetBoard, 3000);
        } else if(winningConditions[i][0] === "O" && winningConditions[i][1] === "O" && winningConditions[i][2] === "O") {
            console.log("O is the winner");
            totalWinsO++;
            oWinsInHTML.innerHTML = `O has ${totalWinsO} wins`;
            setTimeout(resetBoard, 3000);
        }
    }
}

// I put my event listeners at the bottom https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener 
for(let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', function() {
        console.log(typeof squares[i].innerHTML);
        if(!squares[i].innerHTML) {
            if(player === 'X') {
                squares[i].innerHTML = "X";
                player = "O";
                squares[i].classList.add('purple');
            } else if(player === 'O') {
                squares[i].innerHTML = "O";
                player = "X";
                squares[i].classList.add('orange')
            }
            updateTurnOnDOM();
            thereIsAWinner();
            count++;
            if(count === 9) {
                setTimeout(resetBoard, 2000);
            }
        }
    })
}

// squares.forEach(square => {
//     square.addEventListener('click', () => {
//         console.log("Listening");
//     })
// })