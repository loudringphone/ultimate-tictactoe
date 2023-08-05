let cells = document.querySelectorAll('.cell');
let markXs = document.querySelectorAll('.markX');
let markOs = document.querySelectorAll('.markO');
let cell2s = document.querySelectorAll(".cell2")
const body = document.querySelector('body');
let timer = document.querySelector('.timer');
const players = document.querySelectorAll('.player');
const scoreInfo = document.querySelector('.scoreInfo');
const mainContent = document.querySelector('.main-content');
const characters = document.querySelectorAll('.character');
const hista = new Audio("./audio/hasta-la-vista.mp3");
const tanker = new Audio("./audio/drive-that-tanker.mp4")
const click = new Audio("./audio/click.wav");
const select = new Audio("./audio/select.mp3");
select.playbackRate = 1.8;
const sword = new Audio("./audio/sword.wav");
sword.playbackRate = 2.0;
const slash = new Audio("./audio/slash.mp3");
slash.playbackRate = 1.5;
const plasma = new Audio("./audio/plasma.wav");
plasma.playbackRate = 2.0;
const shotgun = new Audio("./audio/shotgun.mov");
shotgun.volume = 0.2;
shotgun.playbackRate = 1.1;
const closing = new Audio("./audio/closing.mov");
closing.playbackRate = 2.0;
closing.volume = 0.4
const coin = new Audio("./audio/coin.mov");
coin.playbackRate = 1.2;
coin.volume = 0.15;
const fight = new Audio("./audio/fight.mov");
fight.playbackRate = 1.4;
fight.volume = 0.35;
const p1wins = new Audio("./audio/p1wins.mov");
p1wins.playbackRate = 1.2;
p1wins.volume = 0.5;
const p2wins = new Audio("./audio/p2wins.mov");
p2wins.playbackRate = 1.2;
p2wins.volume = 0.5;
const drawgame = new Audio("./audio/drawgame.mov");


let board = [0, 1, 2, 3, 4, 5, 6, 7, 8]


for (let player of players) {
    let i = Math.floor(Math.random() * characters.length);
            player.src = characters[i].src;
}






if (document.querySelector('.time.selected').textContent > 0) {
    timer.textContent = document.querySelector('.time.selected').textContent
}


const cons2Win = [
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
const preview = document.querySelector('.preview');
const btnClose = document.querySelector('.btnClose');
const btnChars = document.querySelectorAll('.btnChar');
const charContainer = document.querySelector('.charContainer')
const playerNames = document.querySelectorAll('.playerName')

//so that only Player 1's image and name will be changed
let player = players[0]
let playerName = playerNames[0]

btnChars[0].addEventListener('click', function() {

    if (opponents[2].getAttribute('class') == 'opponent selected') {
        opponents[0].classList.remove('selected')
        opponents[3].classList.remove('selected')
    }
    else if (opponents[3].getAttribute('class') == 'opponent selected') {
        opponents[0].classList.remove('selected')
        opponents[2].classList.remove('selected')
    }
    else {
        opponents[1].classList.add('selected')
        opponents[0].classList.remove('selected') 
    }
    AIasOpponent()
})

btnChars[1].addEventListener('click', function() {

    if (opponents[0].getAttribute('class') != 'opponent selected') {
        opponents[0].classList.add('selected')
        opponents[1].classList.remove('selected')
        opponents[2].classList.remove('selected')
        playerNames[1].textContent = 'Player 2';
        players[1].style.filter = "grayscale(100%)";
        let i = Math.floor(Math.random() * characters.length);
        players[1].src = characters[i].src;
     
    }
  
})

btnChars.forEach(target =>
    
        target.addEventListener('click', function() {
        coin.play();
        startScreen.style.visibility = 'hidden';
        btnChars[0].style.visibility = 'hidden';
        btnChars[1].style.visibility = 'hidden';
        mainContent.style.visibility = 'hidden';
        charContainer.classList.toggle('change');
        charContainer.style.visibility = 'visible';
}))


//Character selection
const CharSel = function(){
characters.forEach(target => {
    target.addEventListener('mouseover', function() {
        if (playerName.textContent.includes('Player')) {
            player.src = target.currentSrc;
            preview.style.backgroundImage = `url(${target.currentSrc})`;
            preview.style.filter = "brightness()";
            player.style.filter = "brightness()";
            target.style.filter = "brightness()";
            }
        })
    function mouseOutHandler() {
        if (playerName.textContent.includes('Player')) {
            preview.style.filter = "grayscale(100%)";
            player.style.filter = "grayscale(100%)";
            this.style.filter = "grayscale(100%)";
        }
    }
    target.addEventListener('mouseout', mouseOutHandler)
    target.addEventListener('click', function() {
            select.play()
            player.src = target.currentSrc;
            player.style.filter = "brightness()";
            playerName.textContent = target.getAttribute('alt');
            window.localStorage.setItem(`storedP1name`, playerNames[0].textContent);
            // so that the character can not be chosen again by Player 2
            target.classList.toggle('selected');
            target.removeEventListener('mouseout', mouseOutHandler);
            target.style.filter = "brightness()";
            
            for (let character of characters) {
                if (player === players[0] && character.getAttribute('alt') === target.getAttribute('alt') ) {
                    character.style.filter = "brightness()";
                    character.style.outline = "solid 5px blue";
                    character.style.outlineOffset = '-5px'}
                else if (player === players[1] && character.getAttribute('alt') === target.getAttribute('alt') ) {
                    character.style.filter = "brightness()";
                    character.style.outline = "solid 5px red";
                    character.style.outlineOffset = '-5px';
                }
            }

            //now it is for Player 2' image and name to be changed
            player = players[1];
            playerName = playerNames[1]
            if (!playerName.textContent.includes('Player')) {
                characters.forEach(target => 
                    target.classList.add('selected'))


                window.localStorage.setItem(`storedP2name`, playerNames[1].textContent);
                setTimeout(function() {
                charContainer.classList.toggle('change');
                
                    charContainer.style.visibility = 'hidden';    
                    mainContent.style.visibility = 'visible';
                    playerNames[0].id = 'gameStarted'
                    fight.play()
                    return
                }, 500)   
            }   
        })
    })
}








        
        

    

btnClose.addEventListener('click', function() {
    closing.play()
    startScreen.style.visibility = 'visible';
    mainContent.style.visibility = 'visible';
    btnChars[0].style.visibility = 'visible';
    btnChars[1].style.visibility = 'visible';

    for (let character of characters) {
        character.style.filter = "grayscale(100%)";
        character.style.outline = 'none';
        character.style.outlineOffset = 'none';
        character.classList.remove('selected')
        function mouseOutHandler() {
            if (playerName.textContent.includes('Player')) {
                preview.style.filter = "grayscale(100%)";
                player.style.filter = "grayscale(100%)";
                this.style.filter = "grayscale(100%)";
            }
        }
        character.addEventListener('mouseout', mouseOutHandler)
        character.addEventListener('click', function() {
            character.removeEventListener('mouseout', mouseOutHandler);
        })
    }
    


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
    cells.forEach(target => 
        target.classList.add('disable'))
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
        if (window.innerWidth <= 1000) {
            congratsBGs[0].style.opacity = 0.15;
            congratsBGs[1].style.opacity = 0.15;

        } else {
        congratsBGs[0].style.opacity = 0.05;
        congratsBGs[1].style.opacity = 0.05;}
    })
)


let victor = "";

const winningText = function(winner) {
    if (winner === 'Lone Wolf and Cub') {
        return `${winner} win!`
    } else {return `${winner} wins!`}
}

// Countdown and random move
const countDown = function() {
    //this id is to let the countdown only run during a game 
    if (playerNames[0].id === 'gameStarted') {
        timer.textContent = parseInt(timer.textContent) - 1}
    //Random moves when time is up
    if (parseInt(timer.textContent) <= 0 && victor != playerNames[0].textContent && victor != playerNames[1].textContent) {
        timer.textContent = timeLimit;
        cells = document.querySelectorAll('.cell');
        let i = Math.floor(Math.random() * cells.length);
        try {
            if (cells[i].textContent === 'X') {
                sword.play()
                cells[i].classList.add('markX');
                cells[i].classList.remove('cell');
                empties = document.querySelectorAll('.cell');
                for (let empty of empties) {
                    empty.textContent = "〇";
                    empty.classList.toggle('cell2');
                }
            p1played.push(parseInt(cells[i].id));
            window.localStorage.setItem(`storedXs`, p1played);
            } else {
                slash.play()
                cells[i].classList.add('markO')
                cells[i].classList.remove('cell');
                cells[i].classList.remove('cell2');
                empties = document.querySelectorAll('.cell');
                for (let empty of empties) {
                    empty.textContent = "X";
                    empty.classList.toggle('cell2');
                }
                p2played.push(parseInt(cells[i].id));
                window.localStorage.setItem(`storedOs`, p2played);
            }
            winCheck()
            drawCheck()
        }
        catch {};
        if (opponents[0].getAttribute('class') != 'opponent selected') {
            if (victor === "") {
                setTimeout(() => {
                    AIplayer()
                }, 200); 
            }
            
            
        }
    }
}

let countDownInt = setInterval(countDown , 1000);


//Fixed the issue on winning the game on turn 9
const drawCheck = function() {
    cells = document.querySelectorAll('.cell');
    if (cells.length === 0) {
        setTimeout(function() {if (cells.length === 0 && victor!= playerNames[0].textContent && victor != playerNames[1].textContent) {
            congratsText.textContent = 'Draw!'
            players[0].style.filter = "grayscale(100%)";
            players[1].style.filter = "grayscale(100%)";
            window.localStorage.setItem(`storedP1scores`, parseInt(scores[0].textContent.split(" ")[1]));
            window.localStorage.setItem(`storedP2scores`, parseInt(scores[1].textContent.split(" ")[1]));
            drawgame.play()
            congrats()
            victor = playerNames[Math.floor(Math.random()*2)].textContent
            playerNames[0].id = ''
    
            
        }},300)
    }
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
        markXs = document.querySelectorAll('.markX');
        markOs = document.querySelectorAll('.markO');
        if (cell.textContent === 'X') {
            sword.play()
            cell.classList.add('markX');
            cell.classList.remove('cell');
            empties = document.querySelectorAll('.cell');
            //so that the Player 2 can now play 〇
            for (let empty of empties) {
                empty.textContent = "〇"
                empty.classList.toggle('cell2')
            }
            //to record all the moves Player 1 has made
            p1played.push(parseInt(cell.id))
            board[cell.id] = 'X'
            console.log(evalBoard(board, humPlayer))
            window.localStorage.setItem(`storedXs`, p1played);
            //to reset the timer
            setTimeout(() => {
                if (victor === "") {
                    clearInterval(countDownInt)
                    timer.textContent = timeLimit;
                    countDownInt = setInterval(countDown , 1000);
                }
            }, 100);
            setTimeout(() => {
                if (victor === "") {
                    AIplayer()
                }
            }, 200);
        }
        else {
            slash.play()
            cell.classList.add('markO')
            cell.classList.remove('cell');
            cell.classList.remove('cell2');
            empties = document.querySelectorAll('.cell');
            //so that the Player 1 can now play X
            for (let empty of empties) {
                empty.textContent = "X"
                empty.classList.toggle('cell2')
            }
            p2played.push(parseInt(cell.id))
            board[cell.id] = 'O'
            console.log(evalBoard(board, comPlayer))

            window.localStorage.setItem(`storedOs`, p2played);
            setTimeout(() => {
                    if (victor === "") {
                        clearInterval(countDownInt)
                        timer.textContent = timeLimit;
                        countDownInt = setInterval(countDown , 1000);
                    }
                }, 400);
        }

        winCheck()
        drawCheck()
    });
    cell.addEventListener('dblclick', function(event) {
        alert("Double-click disabled!");
        event.preventDefault()})
}
}












const winCheck = function() {
    

    for (let i = 0; i < cons2Win.length; i++) {
        checkP1 = ""
        checkP2 = ""
        for (let j of cons2Win[i]){
            //to check the P2's moves against the winning conditions
            if (p2played.includes(j)) {
                checkP2 = checkP2 + 'W'
                if (checkP2.length === 3) {
                    empties = document.querySelectorAll('.cell');
                    empties.forEach(target => {
                        target.textContent = "";
                        target.classList.add('markO');
                        target.classList.remove('cell');
                    });
                    //this variable is to let the loser make a move first in the next game
                    victor = playerNames[1];
                    p2wins.play()
                    congratsText.textContent = winningText(playerNames[1].textContent)
                    scores[1].textContent = `Wins: ${parseInt(scores[1].textContent.split(" ")[1]) + 1}`
                    players[0].style.filter = "grayscale(100%)";
                    congrats()
    
                    victor = playerNames[1].textContent
                    playerNames[0].id = ''
            
                }
            }      
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
                    victor = playerNames[0];
                    p1wins.play()
                    congratsText.textContent = winningText(playerNames[0].textContent)
                    scores[0].textContent = `Wins: ${parseInt(scores[0].textContent.split(" ")[1]) + 1}`
                    players[1].style.filter = "grayscale(100%)";
                    window.localStorage.setItem(`storedP1scores`, parseInt(scores[0].textContent.split(" ")[1]));
                    window.localStorage.setItem(`storedP2scores`, parseInt(scores[1].textContent.split(" ")[1]));
                    congrats()
                    
                    victor = playerNames[0].textContent
                    playerNames[0].id = ''
   
           
                }
            }
        }
    }

    

}




//Rematch

const rematch = function() {
    for (let i of players) {
        i.style.filter = "brightness()";
    }
    playerNames[0].id = ''
    clearInterval(countDownInt)
    markXs = document.querySelectorAll('.markX');
    markOs = document.querySelectorAll('.markO');
    markXs.forEach(target =>
        target.textContent = "")
    markOs.forEach(target =>
        target.textContent = "");
    timer.textContent = timeLimit;
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
    board = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    div.appendChild(h1);
    body.appendChild(div);
//Durration of msg shown up about which player's gonna play first in the next game
    setTimeout(function(){
        div.style.opacity = '0'
    }, 500)
    setTimeout(function(){
        div.remove()
    }, 1000)

    setTimeout(function(){
        checkP1 = "";
        checkP2 = "";
        p1played = [];
        p2played = [];
        cell2s = document.querySelectorAll('.cell2')
        try{
            cell2s.forEach(target =>
                target.classList.remove('cell2'))
        } catch{}
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
        playerNames[0].id = 'gameStarted';
        cells.forEach(target => 
            target.classList.remove('disable'))
     
        advAI = false;
        countDownInt = setInterval(countDown , 1000);
        if (opponents[0].getAttribute('class') != 'opponent selected') {
            setTimeout(() => {
                AIplayer()
            }, 200); 
        }
    }, 1000);
}


CharSel();

tictactoe();

const btnRematch = document.querySelector('.btnRematch');
btnRematch.addEventListener('click', function() {
    coin.play();
    rematch()
});









//Settings

const UIopacity = function (num) {
    mainContent.style.opacity = num;
    scoreInfo.style.opacity = num;
    players.forEach(target =>
        target.style.opacity = num);
    playerNames.forEach(target =>
        target.style.opacity = num);
}




const settings = document.querySelector('.settings');
const options = document.querySelector('.options');
const btnCloseOptions = document.querySelector('.btnCloseOptions');

settings.addEventListener('click', function() {
    click.play();
    options.style.visibility = 'visible';
    clearInterval(countDownInt)
    UIopacity(0.3);
    


})
let terminator = 0;
let madMax = 0;
btnCloseOptions.addEventListener('click', function() { 
    closing.play();
    options.style.visibility = 'hidden';
    UIopacity(1);
    countDownInt = setInterval(countDown , 1000);

    if (opponents[2].getAttribute('class') === 'opponent selected' && terminator == 0) {
        setTimeout(() => {
            console.log('Hasta la vista, baby');
            hista.play()
            terminator = 1  
        }, 600);
    }  
    if (opponents[3].getAttribute('class') === 'opponent selected' && madMax == 0) {
        setTimeout(() => {
            console.log("I'll drive that tanker");
            tanker.play()  
            madMax = 1
        }, 600); 
    }
})

const mute = document.querySelector('.mute')
const muteSound = function(boolean) {
    closing.muted = boolean
    click.muted = boolean
    select.muted = boolean
    sword.muted = boolean
    slash.muted = boolean
    plasma.muted = boolean
    fight.muted = boolean
    coin.muted = boolean
    p1wins.muted = boolean
    p2wins.muted = boolean
    drawgame.muted = boolean
    shotgun.muted = boolean
    slash.muted = boolean
    hista.muted = boolean
    tanker.muted = boolean
}
mute.addEventListener('click', function() {
    if (mute.textContent === 'Unmute') {
        click.play();
        mute.textContent = 'Mute';
        muteSound(false)
    } else {
        mute.textContent = 'Unmute';
        muteSound(true)    
    };
})

//Timer
const times = document.querySelectorAll('.time')
let timeLimit = parseInt(timer.textContent)
for (let time of times) {
    time.addEventListener('click', function() {
        click.play()
        for (let i = 0; i < times.length; i++) {
            if (times[i].getAttribute('class') === 'time selected') {
                times[i].classList.remove('selected')
            }}   
        time.classList.toggle('selected')
        timeLimit = parseInt(time.textContent)
        timer.textContent = time.textContent
        if (parseInt(time.textContent) > 0) {
            timer.style.visibility = 'visible'
        } else {timer.style.visibility = 'hidden'}        
    })
        
}


//Withdraw game
const withdraw = document.querySelector('.withdraw')
withdraw.addEventListener('click', function() {
    click.play();
    if (playerNames[0].id === 'gameStarted') {
        mainContent.style.visibility = 'visible';

        markXs = document.querySelectorAll('.markX')
        markOs = document.querySelectorAll('.markO')
        let cell2s = document.querySelectorAll('.cell2')

        for (let markX of markXs) {
            markX.classList.remove('markX')
            markX.classList.add('cell')
        }
        for (let markO of markOs) {
            markO.classList.remove('markO')
            markO.classList.add('cell')
        }
        for (let cell2 of cell2s) {
            cell2.classList.remove('cell2')
        }

        cells = document.querySelectorAll('.cell')
        cells.forEach(target =>
            target.textContent = 'X')
        p1played = []
        p2played = []
        playerNames[0].id = ''

        
        congratsText.textContent = 'Withdraw!'
        players[0].style.filter = "brightness()";
        players[1].style.filter = "brightness()";
        UIopacity(1);
        options.style.visibility = 'hidden';
        congrats()

    }


})






//Opponent selector

const AIasOpponent = function() {
    if (opponents[0].getAttribute('class') != 'opponent selected' && charContainer.style.visibility === 'visible' && !playerNames[0].textContent.includes('Player')) {
        charContainer.classList.toggle('change');
        charContainer.style.visibility = 'hidden'
        mainContent.style.visibility = 'visible';
        playerNames[0].id = 'gameStarted'
    }

    if (opponents[1].getAttribute('class') === 'opponent selected' ) {
        let num;
        do {
                num = Math.floor(Math.random() * characters.length);
                players[1].src = characters[num].src;
                players[1].style.filter = 'brightness()'
            playerNames[1].textContent = characters[num].alt
        } while(playerNames[1].textContent === playerNames[0].textContent);
        window.localStorage.setItem(`storedP2name`, playerNames[1].textContent);
        if (playerNames[0].id === 'gameStarted' && victor === "") {
            setTimeout(()=> {
                AIplayer()
            },150)
        } 
    }
}
const opponents = document.querySelectorAll('.opponent');
for (let opponent of opponents) {
    opponent.addEventListener('click', function() {
        click.play();
        for (let i = 0; i < opponents.length; i++) {
            if (opponents[i].getAttribute('class') === 'opponent selected') {
                opponents[i].classList.remove('selected')
            }} 
        // slash.muted = false;
        opponent.classList.toggle('selected')

        let opponentType = opponent.textContent;


        if (opponentType != 'Human' && charContainer.style.visibility === 'visible' && !playerNames[0].textContent.includes('Player')) {
            charContainer.classList.toggle('change');
            charContainer.style.visibility = 'hidden';
            mainContent.style.visibility = 'visible';
            playerNames[0].id = 'gameStarted';
        }
       
        if (opponents[3].getAttribute('class') === 'opponent selected') {
            // slash.muted = true;
            players[1].src = "./images/mad-max.jpeg";
            playerNames[1].textContent = 'Mad Max';
            window.localStorage.setItem(`storedP2name`, playerNames[1].textContent);
        }

        if (opponents[2].getAttribute('class') === 'opponent selected') {
            // slash.muted = true;
            players[1].src = "./images/terminator.jpeg";
            playerNames[1].textContent = 'The Terminator';
            window.localStorage.setItem(`storedP2name`, playerNames[1].textContent);
        }


        

        if (opponents[1].getAttribute('class') === 'opponent selected') {

            let num;
            do {
                    num = Math.floor(Math.random() * characters.length);
                    players[1].src = characters[num].src;
                playerNames[1].textContent = characters[num].alt
            } while(playerNames[1].textContent === playerNames[0].textContent);

            window.localStorage.setItem(`storedP2name`, playerNames[1].textContent);
        }




            players[1].style.filter = "brightness()";
            if (playerNames[0].id === 'gameStarted' && victor === "") {
                setTimeout(()=> {
                    AIplayer()
                },150)
            } 
        }     
    
    
    
        )       
}

//A.I.

/////////////////////////////////// Minimax
let comPlayer = 'O';
let humPlayer = 'X';
// returns list of the indexes of empty spots on the board
const emptyIndices = function(board) {
    return board.filter (s => s != 'X' && s != 'O')
}

// winning combinations using the board indices
const winning = function(board, player) {
    if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
    ) {
    return true;
    } else {
    return false;
    }
}


let bestAImove;
const minimax = function(targetBoard, player, depth, alpha, beta, maxDepth) {
    let emptySpots = emptyIndices(targetBoard);
    let score
    if (player == comPlayer) {
        score = evalBoard(targetBoard, humPlayer)
    } else {
        score = evalBoard(targetBoard, comPlayer)
    }
    
    if (winning(targetBoard, comPlayer)){
        return {score: depth - 50};
     }
       else if (winning(targetBoard, humPlayer)){
       return {score: 50 - depth};
       }
     else if (emptySpots.length === 0){
         return {score: 0};
     }

    if (depth == maxDepth) {
        
        return {score: score};
    }

    // move ordering
    // if (emptySpots.length >= 8 && emptySpots.includes(4)) {
    //     return {index: 4}
    // } else if (emptySpots.length >= 8) {
    //     return {index: [0, 2, 6, 8][Math.floor(Math.random() * 4)]}
    // }


   

     // an array to collect all the objects
     
    let moves = [];
    
    // loop through available spots
    for (let i = 0; i < emptySpots.length; i++){
        //create an object for each and store the index of that spot 
        let move = {};
        move.index = targetBoard[emptySpots[i]];
            
        // set the empty spot to the current player
        targetBoard[emptySpots[i]] = player;

        if (player == humPlayer){
            let result = minimax(targetBoard, comPlayer, depth + 1, alpha, beta, maxDepth); 
            if (result) {
                move.score = result.score;
                alpha = Math.max(alpha, move.score);
            } else {
                move.score = null
            }
        }
        else {
            let result = minimax(targetBoard, humPlayer, depth + 1, alpha, beta, maxDepth);
            if (result) {
                move.score = result.score;
                beta = Math.min(beta, move.score);
            } else {
                move.score = null
            }
        }


        // reset the spot to empty
        targetBoard[emptySpots[i]] = move.index;
        
        if (beta < alpha) {
            // console.log(move, 'branch pruned')
            break
        } 
        // push the object to the array
        if (move.score != null) {
            moves.push(move)
        }
    }
    // if it is the human player's turn, loop over the moves and choose the move with the highest score
    let bestMove;
    if(player === humPlayer){
        for(let i = 0; i < moves.length; i++){
        if(moves[i].score == alpha){
            bestMove = i;
            break
        }
        }
    }else{

// else if computer's turn, loop over the moves and choose the move with the lowest score
        for(let i = 0; i < moves.length; i++){
        if(moves[i].score == beta){
            bestMove = i;
            break
        }
        }
    }

// return the chosen move (object) from the moves array
console.log(player, moves) 
console.log(player, moves[bestMove]) 
    return moves[bestMove];
}

const evalBoard = function(targetBoard, player) {
    const allWinningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    let positionScores = [3, 2, 3, 2, 4, 2, 3, 2, 3]
    if (player == comPlayer) {
        positionScores = [-3, -2, -3, -2, -4, -2, -3, -2, -3]
    }
    function boardScore(targetBoard, arr, player) {
        
        let oCount = 0;
        let xCount = 0;
        let numCount = 0;
        let pos = ['','','']
        for (let i = 0; i < arr.length; i++) {
            
          if (arr[i] === 'O') {
            oCount++;
            pos[i] = 'O'
          }
          else if (arr[i] === 'X') {
            xCount++;
            pos[i] = 'X'
          }
          else {
            numCount++;
            pos[i] = ''
          }
        }
        if (pos[0] == 'O' && pos[1] == '' && pos[2] == 'X' || pos[0] == 'X' && pos[1] == '' && pos[2] == 'O') {
            let oCountBoard = 0
            let xCountBoard = 0
            for (let i = 0; i < 9; i++) {
                if (targetBoard[i] === 'O') {
                    oCountBoard++
                }
                if (targetBoard[i] === 'X') {
                    xCountBoard++
                }
            }
            if (player === comPlayer) {
                if (targetBoard[4] != 'O') {
                    if (oCountBoard <= xCountBoard) {
                        return 1500
                    }
                }
                
            } else {
                if (targetBoard[4] != 'X') {
                    if (xCountBoard <= oCountBoard) {
                        return -1500
                    }
                }
            }
        }
        if (player === comPlayer) {
            if (pos[0] == 'O' && pos[1] == '' && pos[2] == 'O') {
                return -12.5
            }
        } else {
            if (pos[0] == 'X' && pos[1] == '' && pos[2] == 'X') {
                return 12.5
            }
        }
        if (player === comPlayer) {
            
            if (oCount === 2 && numCount === 1) {
                return -10
            }
            if (xCount === 2 && numCount === 1) {
                return 20
            }
            if (xCount === 2 && oCount === 1) {
                return -6
            }
            // if (xCount === 1 && oCount === 1) {
            //     return -3
            // }
            else {
                return 0
            }
        }
        else {
            if (xCount === 2 && numCount === 1) {
                return 10
            }
            if (oCount === 2 && numCount === 1) {
                return -20
            }
            if (oCount === 2 && xCount === 1) {
                return 6
            }
            
             else {
                return 0
            }
        }
        
    }
    let score = 0

    if (winning(targetBoard, comPlayer)){
        score = score - 50
     }
       else if (winning(targetBoard, humPlayer)){
        score = score + 50
    }
   
    
    for (let i = 0; i < 9; i++) {
        if(targetBoard[i] == player) {
            score = score + positionScores[i]
        }
    }
    
       
        let pairs = 0
        for (let combo of allWinningCombos) {
            let boardArr = [targetBoard[combo[0]], targetBoard[combo[1]], targetBoard[combo[2]]]
            if (player == comPlayer) {
                if (boardScore(targetBoard, boardArr, player) == -10) {
                    pairs++
                    if (pairs > 1) {
                        score = score + 10
                    }
                }
            } else {
                if (boardScore(targetBoard, boardArr, player) == 10) {
                    pairs++
                    if (pairs > 1) {
                        score = score - 10
                    }
                }
            }
            score = score + boardScore(targetBoard, boardArr, player)
        }
        
        
    return score


}
const ttt = document.querySelector('.TTT')

//////////////////////////////////

let advAI = false;
let targetCell = "";
const AImove = function(target, msg) {
    try {
            target.classList.add('markO')
            target.classList.remove('cell');
            target.classList.remove('cell2');
            p2played.push(parseInt(target.id));
            board[target.id] = 'O'
            window.localStorage.setItem(`storedOs`, p2played);
            winCheck()
            drawCheck()
        } catch {}
    timer.textContent = timeLimit;
    console.log(msg)
}
const cells4nextTurn = function() {
    empties = document.querySelectorAll('.cell');
    for (let empty of empties) {
    empty.textContent = "X";
    }
    for (let empty of empties) {
        empty.classList.toggle('cell2');
    }
}
const AIplayer = function() {
    //so that if Player 2 is human, this function will not be triggered
    if (opponents[0].getAttribute('class') === 'opponent selected' || cells.length === 0) {
        return
    }
    cells = document.querySelectorAll('.cell');   
    if (cells[0].textContent === '〇') {
        if (opponents[2].getAttribute('class') === 'opponent selected' || opponents[1].getAttribute('class') === 'opponent selected' ) {
            if (playerNames[1].textContent === 'The Terminator') {
                plasma.play()
            } else {slash.play()}
            advAI = false  
            ////Hasta la vista, baby//////////////////
            //taking center
            if (opponents[2].getAttribute('class') === 'opponent selected') {
                if (document.getElementById('4').getAttribute('class') === 'cell cell2'){
                    targetCell = document.getElementById('4')
                    AImove(targetCell, 'AI taking center')
                    empties = document.querySelectorAll('.cell');
                    for (let empty of empties) {
                    empty.textContent = "X";
                    }
                    for (let empty of empties) {
                        empty.classList.toggle('cell2');
                    }
                    advAI = true;
                    return
                }
                //taking corners
                if (p1played[0] === 4 && p1played.length === 1) {
                    let corner;
                    do {
                        corner = Math.floor( Math.random() * 10 / 2 ) * 2
                    } while(corner === 4);
                    targetCell = document.getElementById(String(corner))
                    corner = 4
                    AImove(targetCell, 'AI taking corner')
                    cells4nextTurn()
                    advAI = true;
                    return
                }
            }
            //if A.I. is going to win this turn
            for (let i = 0; i < cons2Win.length; i++) {
                checkP2 = "";
                for (let j = 0; j < cons2Win[i].length; j++){
                    if (p2played.includes(cons2Win[i][j])) {
                        checkP2 = checkP2 + 'W';
                    }
                    if (checkP2.length === 2 && j === 2) {
                        if (document.getElementById(`${cons2Win[i][j-2]}`).getAttribute('class') === 'cell cell2') {
                            targetCell = document.getElementById(`${cons2Win[i][j-2]}`)
                            AImove(targetCell, 'WinningConditions[i][0]Attack')
                            cells4nextTurn()
                            advAI = true;
                            return
                        } else if (document.getElementById(`${cons2Win[i][j-1]}`).getAttribute('class') === 'cell cell2') {
                            targetCell = document.getElementById(`${cons2Win[i][j-1]}`)
                            AImove(targetCell, 'WinningConditions[i][1]Attack')
                            cells4nextTurn()
                            advAI = true;
                            return
                        } 
                        else if (document.getElementById(`${cons2Win[i][j]}`).getAttribute('class') === 'cell cell2') {
                            targetCell = document.getElementById(`${cons2Win[i][j]}`)
                            AImove(targetCell, 'WinningConditions[i][2]Attack')
                            cells4nextTurn()
                            advAI = true;
                            return
                        }
                    }
                }
            }
            //if P1 is going to win next turn
            setTimeout(() => {       
            for (let i = 0; i < cons2Win.length; i++) {
                checkP1 = "";
                for (let j = 0; j < cons2Win[i].length; j++){
                    if (p1played.includes(cons2Win[i][j])) {
                        checkP1 = checkP1 + 'W';
                    }
                    if (checkP1.length === 2 && j === 2) {           
                        if (checkP1.length === 2 && j === 2) {       
                        if (document.getElementById(`${cons2Win[i][j-2]}`).getAttribute('class') === 'cell cell2') {
                            targetCell = document.getElementById(`${cons2Win[i][j-2]}`)
                            AImove(targetCell, 'WinningConditions[i][0]Defence')
                            cells4nextTurn()
                            advAI = true;
                            return
                        } else if (document.getElementById(`${cons2Win[i][j-1]}`).getAttribute('class') === 'cell cell2') {
                            targetCell = document.getElementById(`${cons2Win[i][j-1]}`)
                            AImove(targetCell, 'WinningConditions[i][1]Defence')
                            cells4nextTurn()
                            advAI = true;
                            return
                        } else if (document.getElementById(`${cons2Win[i][j]}`).getAttribute('class') === 'cell cell2') {
                            targetCell = document.getElementById(`${cons2Win[i][j]}`)
                            AImove(targetCell, 'WinningConditions[i][2]Defence')
                            cells4nextTurn()
                            advAI = true;
                            return
                        }
                    }
                }
            }
            }}, 100);
            //Simple random move
            setTimeout(() => {
                cells = document.querySelectorAll('.cell')
            if (cells.length != 0) {    
                if (advAI === false && cells[0].textContent === '〇') {
                    let i = Math.floor(Math.random() * cells.length);
                    targetCell = cells[i]
                        AImove(targetCell, 'simpleAI')
                        cells4nextTurn()
                    }
                }
            }, 150);
        }

        else {

            cells = document.querySelectorAll('.cell');   
        
                
                for (let i = 0; i < ttt.children.length; i++) {
                    if (ttt.children[i].classList.contains('markX')) {
                        board[i] = 'X';
                    };
                    if (ttt.children[i].classList.contains('markO')) {
                        board[i] = 'O'
                    }
                }

                
            let bestMove = minimax(board, comPlayer, 0, -Infinity, Infinity, 4)
            console.log(bestMove)
            targetCell = document.getElementById(`${bestMove.index}`)
            board[bestMove.index] = 'O'
            shotgun.play()
            AImove(targetCell, 'Minimax')
            cells4nextTurn()

        }  
    }
}


let localStorage = []
const reload = document.querySelector('.reload')
reload.addEventListener('click', function() {
    click.play()
    btnChars[0].style.visibility = 'visible';
    btnChars[1].style.visibility = 'visible';
    options.style.visibility = 'hidden';
    startScreen.style.visibility = 'hidden';
    UIopacity(1)

    players.forEach(target =>
        target.style.filter = "brightness()");
    mainContent.style.visibility = 'visible';
    playerNames[0].id = 'gameStarted';
    cells.forEach(target => 
        target.classList.remove('disable'))
    p1played = []
    p2played = []
    victor = ""
    advAI = false
    timer.textContent = timeLimit
    
    markXs = document.querySelectorAll('.markX');
    markOs = document.querySelectorAll('.markO');
    cell2s = document.querySelectorAll(".cell2");


    markXs.forEach(target =>
        target.classList.add('cell'))
    markXs.forEach(target =>
        target.classList.remove('markX'))
    markOs.forEach(target =>
        target.classList.add('cell'))
    markOs.forEach(target =>
        target.classList.remove('markO'))
    cell2s.forEach(target =>
        target.classList.remove('cell2'))
    cells = document.querySelectorAll('.cell')
    cells.forEach(target =>
        target.textContent = 'X')
    
    congratsBGs.forEach(target => {
        target.style.visibility = 'hidden';
    })
    
    let storedP1name = window.localStorage.getItem(`storedP1name`);
    playerNames[0].textContent = storedP1name;

    for (let i of characters) {
        if (i.alt === storedP1name) {
            players[0].src = i.src;
        }
    }

    let storedP2name = window.localStorage.getItem(`storedP2name`);
    playerNames[1].textContent = storedP2name;
    if (storedP2name === 'The Terminator') {
        players[1].src = "./images/terminator.jpeg";
    } else {
        for (let i of characters) {
            if (i.alt === storedP2name) {
                players[1].src = i.src;
            }
        }
    }
    
    let storedP1scores = window.localStorage.getItem('storedP1scores');
    if (storedP1scores === null) {storedP1scores = 0};
    scores[0].textContent = `Wins: ${parseInt(storedP1scores)}`;

    let storedP2scores = window.localStorage.getItem('storedP2scores');
    if (storedP2scores === null) {storedP2scores = 0};
    scores[1].textContent = `Wins: ${parseInt(storedP2scores)}`;
  
    let arrXs = window.localStorage.getItem('storedXs').split(',');

    if (arrXs.length <= 5) {
        for (let i of arrXs) {
            p1played.push(parseInt(i))
        }
        let arrOs = window.localStorage.getItem('storedOs').split(',');
        for (let i of arrOs) {
            p2played.push(parseInt(i))
        }
        cells = document.querySelectorAll('.cell');
        for (let i of arrXs) {
            cells[parseInt(i)].textContent = 'X';
            cells[parseInt(i)].classList.add('markX');
            cells[parseInt(i)].classList.remove('cell');
        }
        for (let i of arrOs) {
            cells[parseInt(i)].textContent = '〇'
            cells[parseInt(i)].classList.add('markO');
            cells[parseInt(i)].classList.remove('cell');
        }
        if (arrOs.length < arrXs.length) {
            cells = document.querySelectorAll('.cell');
            cells.forEach(target =>
                target.classList.toggle('cell2'));
            cells.forEach(target =>
                target.textContent = '〇');
        }
    }
    winCheck();
    drawCheck()
})

const games = document.querySelectorAll('.game')
games.forEach(target =>
    target.addEventListener('click', function() {
        click.play()
    }))