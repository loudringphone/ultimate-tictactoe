let  cells = document.querySelectorAll('.cell');
let markXs = document.querySelectorAll('.markX');
let markOs = document.querySelectorAll('.markO');
const body = document.querySelector('body')
const timer = document.querySelector('.timer')


let cons2Win = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6],
]

const startScreen = document.querySelector('.startScreen');
const congratsBGs = document.querySelectorAll('.congratsBG')


//Character selector
let characters = document.querySelectorAll('.character');
const preview = document.querySelector('.preview');
const btnClose = document.querySelector('.btnClose');
const btnChar = document.querySelector('.btnChar');
const charContainer = document.querySelector('.charContainer')
const mainContent = document.querySelector('.main-content')
const players = document.querySelectorAll('.player')
const playerNames = document.querySelectorAll('.playerName')

let player = players[0]
let playerName = playerNames[0]

btnChar.addEventListener('click', function() {
    startScreen.style.visibility = 'hidden';
    btnChar.style.visibility = 'hidden';
    mainContent.style.visibility = 'hidden';
    charContainer.classList.toggle('change');
    charContainer.style.visibility = 'visible';
    

})

const CharSel = function(){
characters.forEach(target => {
    target.addEventListener('mouseover', function() {
        if (playerName.textContent.includes('Player')) {
            player.src = target.currentSrc;
            preview.style.backgroundImage = `url(${target.currentSrc})`;
            preview.style.filter = "brightness()";
            player.style.filter = "brightness()";
            }
        })
    target.addEventListener('mouseout', function() {
        if (playerName.textContent.includes('Player')) {
            preview.style.filter = "grayscale(100%)";
            player.style.filter = "grayscale(100%)";
        }})
    target.addEventListener('click', function() {
        player.src = target.currentSrc;
        player.style.filter = "brightness()";
        playerName.textContent = target.getAttribute('alt');
        player = players[1];
        playerName = playerNames[1]
        if (!playerName.textContent.includes('Player')) {
            charContainer.classList.toggle('change');
            charContainer.style.visibility = 'hidden';    
            mainContent.style.visibility = 'visible';
            playerNames[0].id = 'gameStarted'
        }
        })
    })
}








        
        

    

btnClose.addEventListener('click', function() {
    startScreen.style.visibility = 'visible';
    mainContent.style.visibility = 'visible';
    btnChar.style.visibility = 'visible';
    player = players[0];
    playerName = playerNames[0];
    playerName.textContent = 'Player 1';
    for (let i of players) {
        i.style.filter = "grayscale(100%)";
    }
    charContainer.classList.toggle('change');
    charContainer.style.visibility = 'hidden';

})


//WInning screen
const congratsText = document.querySelector('.congratsText')
const congrats = function() {
    congratsBGs.forEach(target => {
        target.style.visibility = 'visible';
    })
    startScreen.style.top = '60%';
    startScreen.style.opacity = 1;
    playerNames[0].removeAttribute('id');
}
 

congratsBGs.forEach(target =>
    target.addEventListener('mouseover', function() {
        congratsBGs[0].style.opacity = 1;
        congratsBGs[1].style.opacity = 1;
    })
)
    congratsBGs.forEach(target =>  
    target.addEventListener('mouseout', function() {
        congratsBGs[0].style.opacity = 0.08;
        congratsBGs[1].style.opacity = 0.25;
    })
)


let victor = "";

const winningText = function(winner) {
    if (winner === 'Lone Wolf and Cub') {
        return `${winner} win!`
    } else {return `${winner} wins!`}
}

//Tic Tac Toe

cells.forEach(target =>
    target.textContent = 'X')
let p1played = []
let p2played = []
let checkP1 = "";
let checkP2 = "";
const scores = document.querySelectorAll('.score')
const tictactoe = function() {
for (let cell of cells) {
    cell.addEventListener('click', function() {
        if (cell.className === 'markX' || cell.className === 'markO') {
            return
        }

        timer.textContent = 5;

        markXs = document.querySelectorAll('.markX');
        markOs = document.querySelectorAll('.markO');
        if (cell.textContent === 'X') {
            cell.classList.add('markX');
            cell.classList.remove('cell');
            empties = document.querySelectorAll('.cell');
            for (let empty of empties) {
                empty.textContent = "〇"
                empty.classList.toggle('cell2')
            }
            p1played.push(parseInt(cell.id))

 
        }
        else {
            cell.classList.add('markO')
            cell.classList.remove('cell');
            cell.classList.remove('cell2');
            empties = document.querySelectorAll('.cell');
            for (let empty of empties) {
                empty.textContent = "X"
                empty.classList.toggle('cell2')
            }
            p2played.push(parseInt(cell.id))
        }
    });
}
}



// Timer
const countDown = function() {
    if (playerNames[0].id === 'gameStarted') {
        timer.textContent = parseInt(timer.textContent) - 1}
}



let countDownInt = setInterval(countDown , 1000);



//A random move is made when time is up



const timeCheck = function() {
    if (parseInt(timer.textContent) < 0 && victor != playerNames[0].textContent && victor != playerNames[1].textContent) {
        timer.textContent = 5;
        cells = document.querySelectorAll('.cell');
        let i = Math.floor(Math.random() * cells.length);
        try {
            if (cells[i].textContent === 'X') {
                cells[i].classList.add('markX');
                cells[i].classList.remove('cell');
                empties = document.querySelectorAll('.cell');
                for (let empty of empties) {
                    empty.textContent = "〇";
                    empty.classList.toggle('cell2');
                }
            p1played.push(parseInt(cells[i].id));
            console.log(p1played);
            } else {
                cells[i].classList.add('markO')
                cells[i].classList.remove('cell');
                cells[i].classList.remove('cell2');
                empties = document.querySelectorAll('.cell');
                for (let empty of empties) {
                    empty.textContent = "X";
                    empty.classList.toggle('cell2');
                }
                p2played.push(parseInt(cells[i].id));
        
            console.log(p2played);
            }
        }
        catch {};
    }
}


let timeCheckInt = setInterval(timeCheck, 100);



const winCheck = function() {
    for (let i = 0; i < cons2Win.length; i++) {
        checkP1 = ""
        checkP2 = ""
        for (let j of cons2Win[i]){
            if (p1played.includes(j)) {
                checkP1 = checkP1 + 'W'
                if (checkP1.length === 3) {
                    empties = document.querySelectorAll('.cell2');
                    empties.forEach(target => {
                        target.textContent = "";
                        target.classList.add('markX');
                        target.classList.remove('cell');
                        target.classList.remove('cell2');
                    });
                    congratsText.textContent = winningText(playerNames[0].textContent)
                    scores[0].textContent = `Wins: ${parseInt(scores[0].textContent.split(" ")[1]) + 1}`
                    players[1].style.filter = "grayscale(100%)";
                    congrats()
                    
                    victor = playerNames[0].textContent
                    clearInterval(winCheckInt)
                    clearInterval(countDownInt)
                    clearInterval(timeCheckInt)
                }
            }
            if (p2played.includes(j)) {
                checkP2 = checkP2 + 'W'
                if (checkP2.length === 3) {
                    empties = document.querySelectorAll('.cell');
                    empties.forEach(target => {
                        target.textContent = "";
                        target.classList.add('markO');
                        target.classList.remove('cell');
                    });
                    victor = playerNames[1];
                    congratsText.textContent = winningText(playerNames[1].textContent)
                    players[0].style.filter = "grayscale(100%)";
                    congrats()
    
                    victor = playerNames[1].textContent
                    clearInterval(winCheckInt)
                    clearInterval(countDownInt)
                    clearInterval(timeCheckInt)
                }
            }
        }
    }



    // console.log(player1.length)
    // console.log(player2.length)  total:9
    if (p1played.length + p2played.length === 9 && checkP1.length != 3 && checkP2.length != 3) {
        congratsText.textContent = 'Draw!'
        players[0].style.filter = "grayscale(100%)";
        players[1].style.filter = "grayscale(100%)";
        congrats()
        victor = playerNames[Math.floor(Math.random())*2].textContent
        clearInterval(winCheckInt)
        clearInterval(countDownInt)
        clearInterval(timeCheckInt)


    }






}


let winCheckInt = setInterval(winCheck, 100);






//Rematch

const rematch = function() {
    for (let i of players) {
        i.style.filter = "brightness()";
    }
    markXs = document.querySelectorAll('.markX');
    markOs = document.querySelectorAll('.markO');
    markXs.forEach(target =>
        target.textContent = "")
    markOs.forEach(target =>
        target.textContent = "");

    congratsBGs.forEach(target => {
        target.style.visibility = 'hidden';
    })
    mainContent.style.visibility = 'hidden';

    let div = document.createElement('div');
    let h1 = document.createElement('h1');
    div.classList.add('restarting');
    if (victor === playerNames[0].textContent) {
        div.style.backgroundColor = 'red';
        div.style.border = "thick solid blue";
        div.style.outline = "thick solid black";
        h1.textContent = `${playerNames[1].textContent} will start first!`;
    } else {
        div.style.backgroundColor = 'blue';
        div.style.border = "thick solid red";
        div.style.outline = "thick solid black";
        h1.textContent = `${playerNames[0].textContent} will start first!`;
    }
    div.appendChild(h1);
    body.appendChild(div);

    setTimeout(function(){
        div.style.opacity = '0'
    }, 1000)
    setTimeout(function(){
        div.remove()
    }, 3000)

    setTimeout(function(){
        checkP1 = "";
        checkP2 = "";
        p1played = [];
        p2played = [];

        markXs.forEach(target =>
            target.classList.add('cell'));
        markOs.forEach(target =>
            target.classList.add('cell'));
        cells = document.querySelectorAll('.cell');
        cells.forEach(target =>
            target.classList.remove('markX'));
        cells.forEach(target =>
            target.classList.remove('markO'));

        if (victor === playerNames[0].textContent) {
            cells.forEach(target =>
                target.textContent = '〇')
            cells.forEach(target =>
                target.classList.toggle('cell2'))    
        } else {
            cells.forEach(target =>
                target.textContent = 'X')
        }

        victor = "";
        mainContent.style.visibility = 'visible';
        playerNames[0].id = 'gameStarted'
        countDownInt = setInterval(countDown , 1000);
        timeCheckInt = setInterval(timeCheck, 100);
        winCheckInt = setInterval(winCheck, 100);
    }, 3000)
}


CharSel()

tictactoe()

const btnRematch = document.querySelector('.btnRematch')
btnRematch.addEventListener('click', rematch)

