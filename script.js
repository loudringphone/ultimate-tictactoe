let  cells = document.querySelectorAll('.cell');
let markXs = document.querySelectorAll('.markX');
let markOs = document.querySelectorAll('.markO');
let cell2 = document.querySelectorAll(".cell2")
const body = document.querySelector('body');
let timer = document.querySelector('.timer');
const players = document.querySelectorAll('.player');
const scoreInfo = document.querySelector('.scoreInfo');
const mainContent = document.querySelector('.main-content');

if (document.querySelector('.time.selected').textContent > 0) {
    timer.textContent = document.querySelector('.time.selected').textContent
}


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

//Character selection
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


        player = players[1];
        playerName = playerNames[1]
        if (!playerName.textContent.includes('Player')) {
            setTimeout(function() {
            charContainer.classList.toggle('change');
            
                charContainer.style.visibility = 'hidden';    
                mainContent.style.visibility = 'visible';
                playerNames[0].id = 'gameStarted'
            }, 500)
            
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

// Countdown and random move
const countDown = function() {
    if (playerNames[0].id === 'gameStarted') {
        timer.textContent = parseInt(timer.textContent) - 1}
    
    if (parseInt(timer.textContent) <= 0 && victor != playerNames[0].textContent && victor != playerNames[1].textContent) {
        timer.textContent = timeLimit;
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
        
           
            }
            winCheck()
            drawCheck()
        }
        catch {};
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
            congrats()
            victor = playerNames[Math.floor(Math.random()*2)].textContent
            playerNames[0].id = ''
            clearInterval(timeCheckInt)
            clearInterval(AIplayerInt)
            clearInterval(winCheckInt)
            
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
            cell.classList.add('markX');
            cell.classList.remove('cell');
            empties = document.querySelectorAll('.cell');
            for (let empty of empties) {
                empty.textContent = "〇"
                empty.classList.toggle('cell2')
            }
            p1played.push(parseInt(cell.id))
            setTimeout(() => {
                if (victor === "") {
                    clearInterval(countDownInt)
                    timer.textContent = timeLimit;
                    countDownInt = setInterval(countDown , 1000);
                }
            }, 400);
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
}
}

// let move = 0
// if (playerNames[0].id === 'gameStarted') {move = 0};
//     cells = document.querySelectorAll('.cell');
//     move = 9 - cells.length




//A random move is made when time is up
const timeCheck = function() {
    
    
}
let timeCheckInt = setInterval(timeCheck, 300);





// p1played
// p2played


let intervalMoveTrackingP1 = []
let intervalMoveTrackingP2 = []



const winCheck = function() {
    try{

    markOs = document.querySelectorAll('.markO');
    markXs = document.querySelectorAll('.markX');
    
    for (let i = 0; i < markOs.length; i++) {
        if (intervalMoveTrackingP1.includes(parseInt(markOs[i].id))) {
        } else {
        intervalMoveTrackingP1.push(parseInt(markOs[i].id))
    }}
    for (let i = 0; i < markXs.length; i++) {
        if (intervalMoveTrackingP2.includes(parseInt(markXs[i].id))) {
        } else {
        intervalMoveTrackingP2.push(parseInt(markXs[i].id))
    }}
    }catch {}

    for (let i = 0; i < cons2Win.length; i++) {
        checkP1 = ""
        checkP2 = ""
        for (let j of cons2Win[i]){
            
            if (intervalMoveTrackingP1.includes(j)) {
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
                    playerNames[0].id = ''
                    clearInterval(timeCheckInt)
                    clearInterval(AIplayerInt)
                    clearInterval(winCheckInt)              
                }
            }      
            if (intervalMoveTrackingP2.includes(j)) {
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
                    playerNames[0].id = ''
                    clearInterval(timeCheckInt)
                    clearInterval(AIplayerInt)
                    clearInterval(winCheckInt)
                }
            }
        }
    }

    clearInterval(winCheckInt)

}


let winCheckInt = setInterval(winCheck, 300)


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
        countDownInt = setInterval(countDown , 1000);
        timeCheckInt = setInterval(timeCheck, 300);
        winCheckInt = setInterval(winCheck, 200)
        AIplayerInt = setInterval(AIplayer, 200);
        advAI = false;
        intervalMoveTrackingP2 = []
        intervalMoveTrackingP1 = []
    }, 1000);
}


CharSel();

tictactoe();

const btnRematch = document.querySelector('.btnRematch');
btnRematch.addEventListener('click', rematch);









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
    options.style.visibility = 'visible';
    clearInterval(countDownInt)
    UIopacity(0.3);
    


})
btnCloseOptions.addEventListener('click', function() { 
    options.style.visibility = 'hidden';
    UIopacity(1);
    countDownInt = setInterval(countDown , 1000);
})


//Timer
const times = document.querySelectorAll('.time')
let timeLimit = parseInt(timer.textContent)
for (let time of times) {
    time.addEventListener('click', function() {
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
        UIopacity(1);
        countDownInt = setInterval(countDown , 1000);
        options.style.visibility = 'hidden';
        
        
    })
        
}


//Withdraw game
const withdraw = document.querySelector('.withdraw')
withdraw.addEventListener('click', function() {
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
        intervalMoveTrackingP1 = []
        intervalMoveTrackingP2 = []
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
const opponents = document.querySelectorAll('.opponent');
for (let opponent of opponents) {
    opponent.addEventListener('click', function() {
        for (let i = 0; i < opponents.length; i++) {
            if (opponents[i].getAttribute('class') === 'opponent selected') {
                opponents[i].classList.remove('selected')
            }}   
        opponent.classList.toggle('selected')
        UIopacity(1);
        countDownInt = setInterval(countDown , 1000);
        let opponentType = opponent.textContent;


        if (opponentType === 'A.I.' && charContainer.style.visibility === 'visible' && !playerNames[0].textContent.includes('Player')) {
            charContainer.classList.toggle('change');
            charContainer.style.visibility = 'hidden'
            mainContent.style.visibility = 'visible';
            playerNames[0].id = 'gameStarted'
        }
        options.style.visibility = 'hidden';}
        )       
}


//A.I.
let advAI = false;
let targetCell = "";
let AIattack = true
const AImove = function(target, msg) {
    try {
            target.classList.add('markO')
            target.classList.remove('cell');
            target.classList.remove('cell2');
           
            winCheck()
            drawCheck()
            p2played.push(parseInt(target.id));
            
        } catch {}
    timer.textContent = timeLimit;
    console.log(msg)
}
const AIplayer = function() {
    if (opponents[0].getAttribute('class') === 'opponent selected') {
        players[1].src = "./images/terminator.jpeg";
        playerNames[1].textContent = 'The Terminator'
        players[1].style.filter = "brightness()";



        cells = document.querySelectorAll('.cell');



        ////better AI on attack and defense//////////////////
        try {
        if (cells[0].textContent === '〇') {
            advAI = false
            AIattack = true
        
        for (let i = 0; i < cons2Win.length; i++) {
            checkP1 = "";
            checkP2 = "";
            for (let j = 0; j < cons2Win[i].length; j++){
                if (intervalMoveTrackingP1.includes(cons2Win[i][j])) {
                    checkP2 = checkP2 + 'W';
                }
                if (intervalMoveTrackingP2.includes(cons2Win[i][j])) {
                    checkP1 = checkP1 + 'W';
                }


                if (checkP2.length === 2 && j === 2) {
                    
                    if (document.getElementById(`${cons2Win[i][j-2]}`).getAttribute('class') === 'cell cell2') {

                    
                        targetCell = document.getElementById(`${cons2Win[i][j-2]}`)

                        /////////////////
                        AImove(targetCell, 'WinningConditions[i][0]Attack')
                        empties = document.querySelectorAll('.cell');
                        empty.textContent = "X";
                        for (let empty of empties) {
                            empty.classList.toggle('cell2');
                        }
                        advAI = true;
                        return
                        ///////////////////////////////////////////////




                    } else if (document.getElementById(`${cons2Win[i][j-1]}`).getAttribute('class') === 'cell cell2') {


                        targetCell = document.getElementById(`${cons2Win[i][j-1]}`)


                     
                        /////////////////
                        AImove(targetCell, 'WinningConditions[i][1]Attack')
                        empties = document.querySelectorAll('.cell');
                        for (let empty of empties) {
                            empty.textContent = "X";
                            empty.classList.toggle('cell2');
                        }
                        advAI = true;
                        return
                        ///////////////////////////////////////////////


                    } 
                    else if (document.getElementById(`${cons2Win[i][j]}`).getAttribute('class') === 'cell cell2') {

                        targetCell = document.getElementById(`${cons2Win[i][j]}`)

                        cellAttack = targetCell
                      

                        /////////////////
                        AImove(targetCell, 'WinningConditions[i][2]Attack')
                        empties = document.querySelectorAll('.cell');
                        for (let empty of empties) {
                            empty.textContent = "X";
                            empty.classList.toggle('cell2');
                        }
                        advAI = true;
                        return
                        ///////////////////////////////////////////////
                    }
                } else if (checkP1.length === 2 && j === 2) {
                   
                    if (document.getElementById(`${cons2Win[i][j-2]}`).getAttribute('class') === 'cell cell2') {

                        targetCell = document.getElementById(`${cons2Win[i][j-2]}`)


                        /////////////////
                        AImove(targetCell, 'WinningConditions[i][0]Defence')
                        empties = document.querySelectorAll('.cell');
                        for (let empty of empties) {
                            empty.textContent = "X";
                            empty.classList.toggle('cell2');
                        }
                        advAI = true;
                        return
                        ///////////////////////////////////////////////



                    } else if (document.getElementById(`${cons2Win[i][j-1]}`).getAttribute('class') === 'cell cell2') {

                        targetCell = document.getElementById(`${cons2Win[i][j-1]}`)



                        cellDefence = targetCell
                       
                        /////////////////
                        AImove(targetCell, 'WinningConditions[i][1]Defence')
                        empties = document.querySelectorAll('.cell');
                        for (let empty of empties) {
                            empty.textContent = "X";
                            empty.classList.toggle('cell2');
                        }
                        advAI = true;
                        return
                        ///////////////////////////////////////////////




                    } else if (document.getElementById(`${cons2Win[i][j]}`).getAttribute('class') === 'cell cell2') {

                        targetCell = document.getElementById(`${cons2Win[i][j]}`)

                        cellDefence = targetCell
                

                        /////////////////
                        AImove(targetCell, 'WinningConditions[i][2]Defence')
                        empties = document.querySelectorAll('.cell');
                        for (let empty of empties) {
                            empty.textContent = "X";
                            empty.classList.toggle('cell2');
                        }
                        advAI = true;
                        return
                        ///////////////////////////////////////////////


                    }
                }
            }
        }

        }} catch {}
        /////////////////////////


   


        cells = document.querySelectorAll('.cell')
        if (cells.length != 0) {    
            if (advAI === false && cells[0].textContent === '〇') {
                let i = Math.floor(Math.random() * cells.length);
                    AImove(cells[i], 'simpleAI')
                    empties = document.querySelectorAll('.cell');
                    for (let empty of empties) {
                        empty.textContent = "X";
                        empty.classList.toggle('cell2');
                    }
                }
                    
                    
                    
                    
                
        }
       
        
}}
let AIplayerInt = setInterval(AIplayer, 200)







/////////////////////////////////////////////////////////



///localStorage move1 to move9  eg window.localStorage.getItem('move3');
let storageCount = 1;
cells = document.querySelectorAll('.cell');
for (let cell of cells) {
    cell.addEventListener('click',function() {
        
        window.localStorage.setItem(`move${storageCount}`, cell.id);
        storageCount = storageCount + 1
    })
    
}

let localStorage = []
const reload = document.querySelector('.reload')
reload.addEventListener('click', function() {
    btnChar.style.visibility = 'hidden';
    options.style.visibility = 'hidden';
    startScreen.style.visibility = 'hidden';
    UIopacity(1)

    players.forEach(target =>
        target.style.filter = "brightness()");
    mainContent.style.visibility = 'visible';
    playerNames[0].id = 'gameStarted';

    p1played = []
    p2played = []
    intervalMoveTrackingP1 = []
    intervalMoveTrackingP2 = []
    victor = ""
    advAI = false
    
    
    markXs = document.querySelectorAll('.markX');
    markOs = document.querySelectorAll('.markO');
    cell2s = document.querySelectorAll(".cell2")


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
    







    for (let i = 1; i <= 9; i++) {
        if (window.localStorage.getItem(`move${i}`) != null) {
            console.log(typeof +window.localStorage.getItem(`move${i}`))
            localStorage.push(+window.localStorage.getItem(`move${i}`))
        }
    }
    if (localStorage.length % 2 != 0) {


    }






    








})
// countDownInt = setInterval(countDown , 1000);
    // timeCheckInt = setInterval(timeCheck, 300);
    // winCheckInt = setInterval(winCheck, 200)
    // AIplayerInt = setInterval(AIplayer, 200);