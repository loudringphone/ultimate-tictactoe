let cells = document.querySelectorAll('.cell');
let cell2s = document.querySelectorAll('.cell2');
let markXs = document.querySelectorAll('.markX');
let markOs = document.querySelectorAll('.markO');
let cellNAs = document.querySelectorAll('.cellNA')
let cellWs = document.querySelectorAll('.cellW');
let cell2Ws = document.querySelectorAll('.cell2W');
const body = document.querySelector('body');
let timer = document.querySelector('.timer');
const players = document.querySelectorAll('.player');
const scoreInfo = document.querySelector('.scoreInfo');
const mainContent = document.querySelector('.main-content');
const games = document.querySelectorAll('.game')
const scores = document.querySelectorAll('.score')
const characters = document.querySelectorAll('.character');
const ttts = document.getElementsByClassName('TTT')
const divs = document.querySelectorAll('div')





const hista = new Audio("./audio/hasta-la-vista.mp3");
hista.volume = 0.8
const click = new Audio("./audio/click.wav");
const select = new Audio("./audio/select.mp3");
select.playbackRate = 1.8;
const sword = new Audio("./audio/sword.wav");
sword.playbackRate = 2.0;
const slash = new Audio("./audio/slash.mp3");
slash.playbackRate = 1.5;
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






for (let player of players) {
    let i = Math.floor(Math.random() * characters.length);
            player.src = characters[i].src;
}


if (document.querySelector('.time.selected').textContent > 0) {
    timer.textContent = document.querySelector('.time.selected').textContent
}

//Opponent selector
const AIasOpponent = function() {
    if (opponents[1].getAttribute('class') === 'opponent selected' && charContainer.style.visibility === 'visible' && !playerNames[0].textContent.includes('Player')) {
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
        window.localStorage.setItem(`UTTTstoredP2name`, playerNames[1].textContent);
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
        click.play()
        for (let i = 0; i < opponents.length; i++) {
            if (opponents[i].getAttribute('class') === 'opponent selected') {
                opponents[i].classList.remove('selected')
            }}   
        opponent.classList.toggle('selected')
        let opponentType = opponent.textContent;


        AIasOpponent()

        

        
        
    }
        )       
}

const startScreen = document.querySelector('.startScreen');
const congratsBGs = document.querySelectorAll('.congratsBG')


//Character selector
const preview = document.querySelector('.preview');
const btnClose = document.querySelector('.btnClose');
const btnChars = document.querySelectorAll('.btnChar');
const charContainer = document.querySelector('.charContainer')
const playerNames = document.querySelectorAll('.playerName')

let player = players[0]
let playerName = playerNames[0]

btnChars[0].addEventListener('click', function() {
    opponents[1].classList.add('selected')
    opponents[0].classList.remove('selected')
    AIasOpponent()
})

btnChars[1].addEventListener('click', function() {

    if (opponents[0].getAttribute('class') != 'opponent selected') {
        opponents[0].classList.add('selected')
        opponents[1].classList.remove('selected')
        playerNames[1].textContent = 'Player 2';
        players[1].style.filter = "grayscale(100%)";
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
                window.localStorage.setItem(`UTTTstoredP1name`, playerNames[0].textContent);
                target.classList.toggle('selected')
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
    
    
                player = players[1];
                playerName = playerNames[1]
                if (!playerName.textContent.includes('Player')) {
                    characters.forEach(target => 
                        target.classList.add('selected'))
                    window.localStorage.setItem(`UTTTstoredP2name`, playerNames[1].textContent);
                    setTimeout(function() {
                    charContainer.classList.toggle('change');
                    
                        charContainer.style.visibility = 'hidden';    
                        mainContent.style.visibility = 'visible';
                        playerNames[0].id = 'gameStarted'
                        fight.play();
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
    if (playerNames[0].id === 'gameStarted') {
        timer.textContent = parseInt(timer.textContent) - 1}
        if (parseInt(timer.textContent) < 0 && victor != playerNames[0].textContent && victor != playerNames[1].textContent) {
            timer.textContent = timeLimit;
            cells = document.querySelectorAll('.cell');
            // let i
            // do {
                i = Math.floor(Math.random() * cells.length);
            // } while(cells[i].classList.contains('cellW') === true || cells[i].classList.contains('cell2W') === true);
            try {
                lastMove = document.querySelector('#lastMove');
                try {if (lastMove.id != null) {
                    lastMove.id = ''
                }}catch{}
                cells[i].id = 'lastMove'
                if (cells[i].textContent === 'X') {
                    sword.play()
                    cells[i].classList.add('markX');
                    cells[i].classList.remove('cell');
                    empties = document.querySelectorAll('.cellNA');
                    for (let empty of empties) {
                        empty.classList.remove('cellNA');
                        empty.classList.add('cell');   
                    }
                    empties = document.querySelectorAll('.cell');
                    for (let empty of empties) {
                        empty.textContent = "〇";
                        // empty.classList.toggle('cell2')  
                    }        
                p1played.push(parseInt(Array.from(document.querySelectorAll('div')).indexOf(cells[i])))
                window.localStorage.setItem(`UTTTstoredXs`, p1played);
                let gridNext = String(parseInt(Array.from(document.querySelectorAll('div')).indexOf(cells[i])) + 1).substring(1)
                cells = document.querySelectorAll('.cell')
                for (let cell of cells) {           
                    let gridIndex = String(Array.from(document.querySelectorAll('div')).indexOf(cell)).charAt(0)
                    if (gridIndex != gridNext) {
                        cell.classList.add('cellNA')
                        cell.classList.remove('cell')
                    }
                }
                cells = document.querySelectorAll('.cell')
                for (let cell of cells) {
                    let gridIndex = String(Array.from(document.querySelectorAll('div')).indexOf(cell)).charAt(0)
                    if (gridIndex === gridNext && (cell.classList.contains('cellW') === true || cell.classList.contains('cell2W') === true)) {
                        cellNAs = document.querySelectorAll('.cellNA')
                        for (let cellna of cellNAs) {
                            cellna.classList.remove('cellNA')
                            cellna.classList.add('cell')
                        }}}
                } else {
                    slash.play()
                    cells[i].classList.add('markO')
                    cells[i].classList.remove('cell');
                    cells[i].classList.remove('cell2');
                    
                    
                    empties = document.querySelectorAll('.cellNA');
                    for (let empty of empties) {
                        empty.classList.remove('cellNA');
                        empty.classList.add('cell');
                        
                    }
                    empties = document.querySelectorAll('.cell');
                    for (let empty of empties) {
                        empty.textContent = "X"
                        // empty.classList.toggle('cell2')
                }
                    p2played.push(parseInt(Array.from(document.querySelectorAll('div')).indexOf(cells[i])))
                    window.localStorage.setItem(`UTTTstoredOs`, p2played);
                    let gridNext = String(parseInt(Array.from(document.querySelectorAll('div')).indexOf(cells[i])) + 1).substring(1)
    
                    cells = document.querySelectorAll('.cell')
                    for (let cell of cells) {
                        
                        let gridIndex = String(Array.from(document.querySelectorAll('div')).indexOf(cell)).charAt(0)
                        if (gridIndex != gridNext) {
                            cell.classList.add('cellNA')
                            cell.classList.remove('cell')
                        }
                    } 
                    cells = document.querySelectorAll('.cell')
                    for (let cell of cells) {
                    let gridIndex = String(Array.from(document.querySelectorAll('div')).indexOf(cell)).charAt(0)
                    if (gridIndex === gridNext && (cell.classList.contains('cellW') === true || cell.classList.contains('cell2W') === true)) {
                        cellNAs = document.querySelectorAll('.cellNA')
                        for (let cellna of cellNAs) {
                            cellna.classList.remove('cellNA')
                            cellna.classList.add('cell')
                        }}}   
                }
            }
            catch {};
            timer.textContent = timeLimit;   
            setTimeout(() => {
                WinCheck()
                ultiWinCheck()
                toggleCell2()
                drawCheck()  
            }, 150);   

            if (opponents[1].getAttribute('class') === 'opponent selected')
            {setTimeout(() => {
                if (playerNames[0].id === 'gameStarted') {
                AIplayer()
                }
            }, 150);
        }
        
        };


        
}
let countDownInt = setInterval(countDown , 1000);

//Fixed the issue on winning the game on turn 9
const drawCheck = function() {
    cells = document.querySelectorAll('.cell')
    cellNAs = document.querySelectorAll('.cellNA')
    let cell2nas = document.querySelectorAll('.cell2.cellNA')
    if (cells.length === 0 && cellNAs.length > 0) {
        cellNAs.forEach(target =>
            target.classList.add('cell'))
        cellNAs.forEach(target =>
            target.classList.remove('cellNA'))
    }
    if (cell2nas.length > 0) {
        cell2nas.forEach(target =>
            target.classList.remove('cell2'))
    }
    cells = document.querySelectorAll('.cell');
        setTimeout(function() {if (cells.length === 0 && victor!= playerNames[0].textContent && victor != playerNames[1].textContent) {
            congratsText.textContent = 'Draw!'
            players[0].style.filter = "grayscale(100%)";
            players[1].style.filter = "grayscale(100%)";
            window.localStorage.setItem(`UTTTstoredP1scores`, parseInt(scores[0].textContent.split(" ")[1]));
            window.localStorage.setItem(`UTTTstoredP2scores`, parseInt(scores[1].textContent.split(" ")[1]));
            drawgame.play()
            congrats()
            victor = playerNames[Math.floor(Math.random()*2)].textContent        
        }},200) 
}









//Rematch
const rematch = function() {
    for (let i of players) {
        i.style.filter = "brightness()";
    }
    ultiCheckP1 = "";
    ultiCheckP2 = "";
    checkP1 = "";
    checkP2 = "";
    ultiP1played =[];
    ultiP2played = [];
    p1played = [];
    p2played = [];
    cell2s = document.querySelectorAll('.cell2');
    markXs = document.querySelectorAll('.markX');
    markOs = document.querySelectorAll('.markO');
    cellNAs = document.querySelectorAll('.cellNA');
    cellWs = document.querySelectorAll('.cellW');
    cell2Ws = document.querySelectorAll('.cell2W');
    cell2s.forEach(target =>
        target.textContent = "")
    markXs.forEach(target =>
        target.textContent = "")
    markOs.forEach(target =>
        target.textContent = "");
    cellNAs.forEach(target =>
            target.textContent = "");
    cellWs.forEach(target =>
        target.textContent = "");
    cell2Ws.forEach(target =>
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
        cell2s.forEach(target =>
            target.classList.add('cell'));
        markXs.forEach(target =>
            target.classList.add('cell'));
        markOs.forEach(target =>
            target.classList.add('cell'));
        cellNAs.forEach(target =>
            target.classList.add('cell'));
        cellWs.forEach(target =>
            target.classList.add('cell'));
        cell2Ws.forEach(target =>
            target.classList.add('cell'));
        cells = document.querySelectorAll('.cell');
        cells.forEach(target =>
            target.classList.remove('cell2'));
        cells.forEach(target =>
            target.classList.remove('markX'));
        cells.forEach(target =>
            target.classList.remove('markO'));
        cells.forEach(target =>
            target.classList.remove('cellNA'));
        cellWs.forEach(target =>
            target.classList.remove('cellW'));
        cell2Ws.forEach(target =>
            target.classList.remove('cell2W'));
        if (victor === playerNames[0].textContent) {
            cells.forEach(target =>
                target.textContent = '〇')
            cells.forEach(target =>
                target.classList.add('cell2'))    
        } else {
            cells.forEach(target =>
                target.textContent = 'X')
        }
        lastMove = document.querySelector('#lastMove');
        if (lastMove != null) {
            lastMove.id = ""
        }
        victor = "";
        mainContent.style.visibility = 'visible';
        playerNames[0].id = 'gameStarted';
        clearInterval(countDownInt)
        if (opponents[1].getAttribute('class') === 'opponent selected')
            {setTimeout(() => {
                if (playerNames[0].id === 'gameStarted') {
                AIplayer()
                }
            }, 150);
        };    
        cells.forEach(target => 
            target.classList.remove('disable'))
        countDownInt = setInterval(countDown , 1000);
        P1played = []
        P2played = []
        gridNext = ""
        gridIndex = ""
    }, 1000);
}


CharSel();



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
    click.play()
    options.style.visibility = 'visible';
    clearInterval(countDownInt)
    UIopacity(0.3);
    


})
btnCloseOptions.addEventListener('click', function() { 
    closing.play()
    options.style.visibility = 'hidden';
    UIopacity(1);
    countDownInt = setInterval(countDown , 1000);
})

const mute = document.querySelector('.mute')
const muteSound = function(TorF) {
    closing.muted = TorF
    click.muted = TorF
    select.muted = TorF
    sword.muted = TorF
    slash.muted = TorF
    fight.muted = TorF
    coin.muted = TorF
    p1wins.muted = TorF
    p2wins.muted = TorF
}
mute.addEventListener('click', function() {
    if (mute.textContent === 'Unmute') {
        mute.textContent = 'Mute';
        click.play()
        muteSound(false)
        // if (opponents[2].getAttribute('class') === 'opponent selected') {
        //     slash.muted = true;
        // } 
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
    click.play()
    if (playerNames[0].id === 'gameStarted') {
        mainContent.style.visibility = 'visible';
        congratsText.textContent = 'Withdraw!'
        players[0].style.filter = "brightness()";
        players[1].style.filter = "brightness()";
        UIopacity(1);
        options.style.visibility = 'hidden';
        congrats()

    }
})







   



















//Ultimate Tic Tac Toe!
const ultiCons2Win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    ]





const cons2Win = [
    
        [10, 11, 12],
        [13, 14, 15],
        [16, 17, 18],
        [10, 13, 16],
        [11, 14, 17],
        [12, 15, 18],
        [10, 14, 18],
        [12, 14, 16],

        [20, 21, 22],
        [23, 24, 25],
        [26, 27, 28],
        [20, 23, 26],
        [21, 24, 27],
        [22, 25, 28],
        [20, 24, 28],
        [22, 24, 26],

        [30, 31, 32],
        [33, 34, 35],
        [36, 37, 38],
        [30, 33, 36],
        [31, 34, 37],
        [32, 35, 38],
        [30, 34, 38],
        [32, 34, 36],

        [40, 41, 42],
        [43, 44, 45],
        [46, 47, 48],
        [40, 43, 46],
        [41, 44, 47],
        [42, 45, 48],
        [40, 44, 48],
        [42, 44, 46],

        [50, 51, 52],
        [53, 54, 55],
        [56, 57, 58],
        [50, 53, 56],
        [51, 54, 57],
        [52, 55, 58],
        [50, 54, 58],
        [52, 54, 56],

        [60, 61, 62],
        [63, 64, 65],
        [66, 67, 68],
        [60, 63, 66],
        [61, 64, 67],
        [62, 65, 68],
        [60, 64, 68],
        [62, 64, 66],

        [70, 71, 72],
        [73, 74, 75],
        [76, 77, 78],
        [70, 73, 76],
        [71, 74, 77],
        [72, 75, 78],
        [70, 74, 78],
        [72, 74, 76],

        [80, 81, 82],
        [83, 84, 85],
        [86, 87, 88],
        [80, 83, 86],
        [81, 84, 87],
        [82, 85, 88],
        [80, 84, 88],
        [82, 84, 86],

        [90, 91, 92],
        [93, 94, 95],
        [96, 97, 98],
        [90, 93, 96],
        [91, 94, 97],
        [92, 95, 98],
        [90, 94, 98],
        [92, 94, 96], 
]

const permutatedCons = []
for (let con of ultiCons2Win) {
  permutatedCons.push(con)
  permutatedCons.push([con[0],con[2],con[1]])
  permutatedCons.push([con[1],con[0],con[2]])
  permutatedCons.push([con[1],con[2],con[0]])
  permutatedCons.push([con[2],con[0],con[1]])
  permutatedCons.push([con[2],con[1],con[0]])
}








cells.forEach(target =>
    target.textContent = 'X');

cells = document.querySelectorAll('.cell')


let p1played = []
let p2played = []
let ultiP1played = []
let ultiP2played = []



const ultiWinCheck = function() {
    if (victor === "") {
        for (let i = 0; i < ultiCons2Win.length; i++) {
            ultiCheckP1 = ""
            ultiCheckP2 = ""
            for (let j of ultiCons2Win[i]){
                
                if (ultiP1played.includes(j)) {
                    ultiCheckP1 = ultiCheckP1 + 'W'
                }
                if (ultiCheckP1.length === 3) {
                    congratsText.textContent = winningText(playerNames[0].textContent)
                    scores[0].textContent = `Wins: ${parseInt(scores[0].textContent.split(" ")[1]) + 1}`
                    players[1].style.filter = "grayscale(100%)";
                    p1wins.play()
                    congrats()             
                    victor = playerNames[0].textContent
                }
                                             
                
                if (ultiP2played.includes(j)) {
                    ultiCheckP2 = ultiCheckP2 + 'W'
                }
                if (ultiCheckP2.length === 3) {
                    congratsText.textContent = winningText(playerNames[1].textContent)
                    scores[1].textContent = `Wins: ${parseInt(scores[1].textContent.split(" ")[1]) + 1}`
                    players[0].style.filter = "grayscale(100%)";
                    p2wins.play()
                    congrats()                
                    victor = playerNames[1].textContent
                }
            }
        } 
    }
}

const WinCheck = function() {
    if (victor === "") {
        for (let i = 0; i < cons2Win.length; i++) {
            checkP1 = ""
            checkP2 = ""
            for (let j of cons2Win[i]){
                
                if (p1played.includes(j)) {
                    checkP1 = checkP1 + 'W'
                }
                if (checkP1.length === 3) {

                    for (let i = 0; i < 9; i++) {
                        ttts[parseInt(String(j)[0])-1].children[i].classList.remove('cell')
                        ttts[parseInt(String(j)[0])-1].children[i].classList.remove('cell2')
                        ttts[parseInt(String(j)[0])-1].children[i].classList.remove('cellNA')
                        ttts[parseInt(String(j)[0])-1].children[i].classList.add('cellW')
                    }
                    ultiP1played.push(parseInt(String(j)[0])-1)
                    ultiP1played = [...new Set(ultiP1played)];
                    break
                }
                    // congratsText.textContent = winningText(playerNames[0].textContent)
                    // scores[0].textContent = `Wins: ${parseInt(scores[0].textContent.split(" ")[1]) + 1}`
                    // players[1].style.filter = "grayscale(100%)";
                    // p1wins.play()
                    // congrats()             
                    // victor = playerNames[0].textContent                         
                
                if (p2played.includes(j)) {
                    checkP2 = checkP2 + 'W'
                }
                if (checkP2.length === 3) {
                    for (let i = 0; i < 9; i++) {
                        ttts[parseInt(String(j)[0])-1].children[i].classList.remove('cell')
                        ttts[parseInt(String(j)[0])-1].children[i].classList.remove('cell2')
                        ttts[parseInt(String(j)[0])-1].children[i].classList.remove('cellNA')
                        ttts[parseInt(String(j)[0])-1].children[i].classList.add('cell2W')       
                    }
                    ultiP2played.push(parseInt(String(j)[0])-1)
                    ultiP2played = [...new Set(ultiP2played)];
                    break
                }
            }
        } 
    }
    ultiWinCheck()
}









const toggleCell2 = function() {
    cells = document.querySelectorAll('.cell')
    cellNAs = document.querySelectorAll('.cellNA')
    if (p1played.length > p2played.length) {
    cellNAs.forEach(target =>
        target.classList.add('cell2'))
    cells.forEach(target =>
        target.classList.add('cell2'))
    } else {
        cellNAs.forEach(target =>
        target.classList.remove('cell2'))
    cells.forEach(target =>
        target.classList.remove('cell2'))
    }
}






const noCellNA = function() {
    cellNAs = document.querySelectorAll('.cellNA')
        cellNAs.forEach(target =>
            target.classList.add('cell'))
        cellNAs.forEach(target =>
            target.classList.remove('cellNA'))
}

const ultimateTTT = function() {
    for (let cell of cells) {
        cell.addEventListener('click', function() {
            if (cell.className === 'markX' || cell.className === 'markO') {
                return
            }
            cellNAs =  document.querySelectorAll('.cellNA')
            for (let cellna of cellNAs) {
                cellna.classList.remove('cellNA')
                cellna.classList.add('cell')
            }
            lastMove = document.querySelector('#lastMove');
            try {if (lastMove.id != null) {
                lastMove.id = ''
            }}catch{}
            cell.id = 'lastMove'
            markXs = document.querySelectorAll('.markX');
            markOs = document.querySelectorAll('.markO');

            if (cell.textContent === 'X') {
                sword.play()
                cell.classList.add('markX');
                cell.classList.remove('cell');
                empties = document.querySelectorAll('.cell');
                for (let empty of empties) {
                    if (empty.id === "") {
                    empty.textContent = "〇"
                    }
                }
                //There are 81 cells on the board. Their corresponding index between 10 and 98
                p1played.push(parseInt(Array.from(document.querySelectorAll('div')).indexOf(cell)))
                window.localStorage.setItem(`UTTTstoredXs`, p1played);
                //to get the index out of the 9 grids
                let gridNext = String(parseInt(Array.from(document.querySelectorAll('div')).indexOf(cell)) + 1).substring(1)
                cells = document.querySelectorAll('.cell')
                for (let cell of cells) {
                    let gridIndex = String(Array.from(document.querySelectorAll('div')).indexOf(cell)).charAt(0)
                    if (gridIndex != gridNext) {
                        cell.classList.add('cellNA')
                        cell.classList.remove('cell')
                    }
                }
                WinCheck()
                if (ttts[gridNext - 1].firstElementChild.classList.contains('cellW') || ttts[gridNext - 1].firstElementChild.classList.contains('cell2W')) {
                    cellNAs = document.querySelectorAll('.cellNA')
                    for (let cellna of cellNAs) {
                        cellna.classList.remove('cellNA')
                        cellna.classList.add('cell')
                    }}
                    
                setTimeout(() => {
                 
                    if (opponents[1].getAttribute('class') === 'opponent selected') {
                        AIplayer()
                    }
                }, 100);

                
            }
            else {
                targetMove(cell)
                // slash.play()
                // cell.classList.add('markO')
                // cell.classList.remove('cell');
                // cell.classList.remove('cell2');
                // empties = document.querySelectorAll('.cell');
                // for (let empty of empties) {
                //     if (empty.id === "") {
                //         empty.textContent = "X"
                //     }
                // }
                // p2played.push(parseInt(Array.from(document.querySelectorAll('div')).indexOf(cell)));
                // window.localStorage.setItem(`UTTTstoredOs`, p2played);


                // let gridNext = String(parseInt(Array.from(document.querySelectorAll('div')).indexOf(cell)) + 1).substring(1)
                // cells = document.querySelectorAll('.cell')

                // for (let cell of cells) {
                //     // console.log((parseInt(Array.from(document.querySelectorAll('div')).indexOf(cells[i]))))
                //     let gridIndex = String(Array.from(document.querySelectorAll('div')).indexOf(cell)).charAt(0)
                //     if (gridIndex != gridNext) {
                //         cell.classList.add('cellNA')
                //         cell.classList.remove('cell')
                //     }
                // }

                // WinCheck()
                // if (ttts[gridNext - 1].firstElementChild.classList.contains('cellW') || ttts[gridNext - 1].firstElementChild.classList.contains('cell2W')) {
                //     cellNAs = document.querySelectorAll('.cellNA')
                //     for (let cellna of cellNAs) {
                //         cellna.classList.remove('cellNA')
                //         cellna.classList.add('cell')
                //     }}
                
              
                
     
                
                
               
                
              

                
                
            }
            setTimeout(() => {
                WinCheck()
                clearInterval(countDownInt)
                timer.textContent = timeLimit;
                countDownInt = setInterval(countDown , 1000);     
            }, 100);

            setTimeout(() => {
                lastMove = document.querySelector('#lastMove');
                if (lastMove === null) {noCellNA()}
                toggleCell2()
                ultiWinCheck()
                drawCheck()




            },150);
        })
        cell.addEventListener('dblclick', function(event) {
            alert("Double-click disabled!");
            event.preventDefault()})
    }





}


ultimateTTT() 







const targetMove = function(target, msg) {
                
    if (target.textContent === '〇') {
        slash.play()
        target.classList.add('markO')
        target.classList.remove('cell');
        target.classList.remove('cell2');
        
        if (opponents[1].getAttribute('class') === 'opponent selected')  {
        console.log(msg)
        lastMove = document.querySelector('#lastMove');
        try{
        if (lastMove.id != null) {
            lastMove.id = ''
        }} catch {}
        target.id = 'lastMove'
        }

        empties = document.querySelectorAll('.cell');
        for (let empty of empties) {
            empty.textContent = "X";
            empty.classList.toggle('cell2');
        }
        empties = document.querySelectorAll('.cellNA');
        for (let empty of empties) {
            empty.classList.remove('cellNA');
            empty.textContent = "X";
            empty.classList.add('cell');
        }
        p2played.push(parseInt(Array.from(document.querySelectorAll('div')).indexOf(target)))
        window.localStorage.setItem(`UTTTstoredOs`, p2played);
        let gridNext = String(parseInt(Array.from(document.querySelectorAll('div')).indexOf(target)) + 1).substring(1)

        cells = document.querySelectorAll('.cell')
        for (let cell of cells) {
            
            let gridIndex = String(Array.from(document.querySelectorAll('div')).indexOf(cell)).charAt(0)
            if (gridIndex != gridNext) {
                cell.classList.add('cellNA')
                cell.classList.remove('cell')
            }
        }    
    }        
    WinCheck()
    ultiWinCheck()
    drawCheck()
    toggleCell2()
}


const localChildrenPlayed = function(local) {
    localP1played = []  
    localP2played = [] 
    for (let i = 0; i < local.length; i++){
        if (local[i].className === 'markX') {
            localP1played.push(i)
        }
        if (local[i].className === 'markO') {
            localP2played.push(i)
        }
    }  
}


const AIaction = function(i1, i2, msg) {

    if (localBoard[ultiCons2Win[i1][i2-2]].getAttrkbute('class') === 'cell cell2') {
        targetCell = localBoard[ultiCons2Win[k][i2-2]]
        targetMove(targetCell, `[${i1}][${i2-2}]${msg}`)
        return
    } else if (localBoard[ultiCons2Win[i1][i2-1]].getAttribute('class') === 'cell cell2') {
        targetCell = localBoard[ultiCons2Win[i1][i2-1]]
        targetMove(targetCell, `[${i1}][${i2-1}]${msg}`)
        return
    } 
    else if (localBoard[ultiCons2Win[i1][i2]].getAttribute('class') === 'cell cell2') {
        targetCell = localBoard[ultiCons2Win[i1][i2]]
        targetMove(targetCell, `[${i1}][${i2}]${msg}`)
        return
    } 
}


const AIattack = function(ttt, attack) {
    if (ttt.querySelectorAll('.cell').length > 0) {
        localChildrenPlayed(ttt.children)
        //if A.I. is going to win the local board this turn
        for (let i = 0; i < ultiCons2Win.length; i++) {
            advCheckP2 = "";
            for (let j = 0; j < 3; j++){
                if (localP2played.includes(ultiCons2Win[i][j])) {
                    advCheckP2 = advCheckP2 + 'W';
                }
                if (advCheckP2.length === 2 && j === 2) {
                    if (ttt.children[ultiCons2Win[i][j-2]].getAttribute('class') === 'cell cell2') {
                        targetCell = ttt.children[ultiCons2Win[i][j-2]]
                        targetMove(targetCell, `[${i}][${j-2}]${attack}`)
                        return
                    } else if (ttt.children[ultiCons2Win[i][j-1]].getAttribute('class') === 'cell cell2') {
                        targetCell = ttt.children[ultiCons2Win[i][j-1]]
                        targetMove(targetCell, `[${i}][${j-1}]${attack}`)
                        return
                    } 
                    else if (ttt.children[ultiCons2Win[i][j]].getAttribute('class') === 'cell cell2') {

                        targetCell = ttt.children[ultiCons2Win[i][j]]
                        targetMove(targetCell, `[${i}][${j}]${attack}`)
                        return
                    }
                        
                } 
            }
        
        }
    } 
}

const AIdefence = function(ttt, defence) {
    if (ttt.querySelectorAll('.cell').length > 0) {
        localChildrenPlayed(ttt.children)
   
        for (let i = 0; i < ultiCons2Win.length; i++) {
            advCheckP1 = "";
            for (let j = 0; j < ultiCons2Win[i].length; j++){
                if (localP1played.includes(ultiCons2Win[i][j])) {
                    advCheckP1 = advCheckP1 + 'W';
                }
                if (advCheckP1.length === 2 && j === 2) {                
                    if (ttt.children[ultiCons2Win[i][j-2]].getAttribute('class') === 'cell cell2') {
                        targetCell = ttt.children[ultiCons2Win[i][j-2]]
                        targetMove(targetCell, `[${i}][0]${defence}`)
                        return
                    } else if (ttt.children[ultiCons2Win[i][j-1]].getAttribute('class') === 'cell cell2') {
                        targetCell = ttt.children[ultiCons2Win[i][j-1]]
                        targetMove(targetCell, `[${i}][1]${defence}`)
                        return
                    } else if (ttt.children[ultiCons2Win[i][j]].getAttribute('class') === 'cell cell2') {
                        targetCell = ttt.children[ultiCons2Win[i][j]]
                        targetMove(targetCell, `[${i}][2]${defence}`)
                        return
                    } 
                
                }   
            }      
        }
    } 

}




//Adv A.I.
let localP1played = [];
let localP2played = [];
let advCheckP1 = "";
let advCheckP2 = "";
let advAI = false
const AIplayer = function() {
    if (opponents[0].getAttribute('class') === 'opponent selected' || cells.length === 0 ) {
        return
    }

    for (let i = 0; i < divs.length ; i++) {
                    if (divs[i].id != 'lastMove') {
                        divs[i].id = "";
                    }
                }
    localP1played = [];
    localP2played = [];
    targetCell = "";
    advAI = false;




               

    setTimeout(() => {
    cells = document.querySelectorAll('.cell');
    if (cells[0].textContent === '〇') {
        
            cells = document.querySelectorAll('.cell')

            setTimeout(() => {


                for (let con of permutatedCons) {
                    if (ttts[con[0]].children[0].classList.contains('cellW') && ttts[con[1]].children[0].classList.contains('cellW')) {
                        AIdefence(ttts[con[2]], 'Final Defence')
                    }
                }

                for (let con of permutatedCons) {
                    if (ttts[con[0]].children[0].classList.contains('cell2W') && ttts[con[1]].children[0].classList.contains('cell2W')) {
                        AIattack(ttts[con[2]], 'Final Attack')
                    }
                }











                
            for (let k = 0; k < ttts.length; k++) {
                
                AIattack(ttts[k], 'Local Board Attack')


            }}, 50);

            setTimeout(() => {

                for (let k = 0; k < ttts.length; k++) {
                    AIdefence(ttts[k], 'Local Board Defence')
                    
            }}, 100)
                        
                
                  
            

           

            setTimeout(() => { 
            let localBoard = cells[0].parentElement.children
            if (localBoard.length > 0) {
                localChildrenPlayed(localBoard)
                cellWs = document.querySelectorAll('.cellW');
                cell2Ws = document.querySelectorAll('.cell2W');
                
                if (localP1played.length <= 1 && localP2played.length <= 1) {
                    markXs = document.querySelectorAll('.markX')
                    if (localP1played.length + localP2played.length >= 1 && markXs.length <=5){
                        if (localBoard[4].getAttribute('class') === 'cell cell2' && ttts[4].querySelectorAll('.markX').length < 2){
                            targetCell = localBoard[4] 
                            targetMove(targetCell, `taking center`)
                            return
                        } else {
                        let num = localP1played[0]
                        let run = 0
                        while ((num === localP1played[0] || num === localP2played[0] || ttts[num].querySelectorAll('.markX').length >= 2|| ttts[num].querySelectorAll('.markO').length > ttts[num].querySelectorAll('.markX').length + 1) && run < 10) {
                        num = Math.floor(Math.random() * 10 / 2 ) * 2;
                        run++
                        }
                        if (run < 10) {
                        targetCell = localBoard[num]
                        targetMove(targetCell, `taking corners or center (followup move) ${num}`)
                        return} else {
                            console.log(`run1 ${run}`)
                            cells = document.querySelectorAll('.cell')
                            let i = Math.floor(Math.random() * cells.length);
                            targetCell = cells[i]
                            targetMove(targetCell, 'random move 1')
                            return
                        }}
                    };
                    if (localP1played.length + localP2played.length <= 0 && markXs.length <=5) {
                        let num = localP1played[0]
                        let run = 0
                        while ((num === localP1played[0] || num === localP2played[0] || ttts[num].querySelectorAll('.markX').length >= 2|| ttts[num].querySelectorAll('.markO').length > ttts[num].querySelectorAll('.markX').length + 1) && run < 10) {
                        num = Math.floor(Math.random() * 10 / 2 ) * 2
                        run++
                        }
                        if (run < 10) {
                        targetCell = localBoard[num];
                        targetMove(targetCell, `taking corners or center (initiate move) ${num}`)
                        return} else {
                            console.log(`run1 ${run}`)
                            cells = document.querySelectorAll('.cell')
                            let i = Math.floor(Math.random() * cells.length);
                            targetCell = cells[i]
                            targetMove(targetCell, 'random move 1')
                            return}
                    } else {
                        let num = 0;
                        let run = 0;
                        while ((!localBoard[num].classList.contains('cell') || run === 0 || ttts[num].querySelectorAll('.markX').length > 0|| ttts[num].querySelectorAll('.markO').length > 0) && run < 15) {
                            num = Math.floor(Math.random() * 9)
                            run++
                        }

                        if (run < 15) {
                            targetCell = localBoard[num]
                            targetMove(targetCell, `Sending P1 to a less intense local board1 ${num}`)
                            return
                        } 



                        while (((!localBoard[num].classList.contains('cell') || run === 15 || (ttts[num].firstElementChild.classList.contains('cell2W') || ttts[num].firstElementChild.classList.contains('cellW')) || ttts[num].querySelectorAll('.markX').length >= 2|| ttts[num].querySelectorAll('.markO').length > ttts[num].querySelectorAll('.markX').length + 1) && run < 30)) {
                            num = Math.floor(Math.random() * 9)
                            console.log(`run1 ${run} ${num}`)
                            run++
                        }
                        if (run < 30) {
                            targetCell = localBoard[num]
                            targetMove(targetCell, `avoid won local board 1 ${num}`)
                            return
                        } else {
                            console.log(`run1 ${run}`)
                            cells = document.querySelectorAll('.cell')
                            let i = Math.floor(Math.random() * cells.length);
                            targetCell = cells[i]
                            targetMove(targetCell, 'random move 1')
                            return
                        }








                        // cells = document.querySelectorAll('.cell')
                        // let i = Math.floor(Math.random() * cells.length);
                        // targetCell = cells[i]
                        // targetMove(targetCell, 'random move 1')
                        // return
                    }

                    
                } else if ((localP1played.length >= 2 || localP2played.length >= 2) && localP1played.length + localP2played.length <= 8 && targetCell === "") {
                
                    //if A.I. is going to win the local board this turn
                    for (let i = 0; i < ultiCons2Win.length + 3; i++) {
                        if (i < ultiCons2Win.length){
                            advCheckP2 = "";
                            for (let j = 0; j < ultiCons2Win[i].length; j++){
                                if (localP2played.includes(ultiCons2Win[i][j])) {
                                    advCheckP2 = advCheckP2 + 'W';
                                }
                                if (advCheckP2.length === 2 && j === 2) {
                                    if (localBoard[ultiCons2Win[i][j-2]].getAttribute('class') === 'cell cell2') {
                                        targetCell = localBoard[ultiCons2Win[i][j-2]]
                                        targetMove(targetCell, `[${i}][0]Attack`)
                                        return
                                    } else if (localBoard[ultiCons2Win[i][j-1]].getAttribute('class') === 'cell cell2') {
                                        targetCell = localBoard[ultiCons2Win[i][j-1]]
                                        targetMove(targetCell, `[${i}][1]Attack`)
                                        return
                                    } 
                                    else if (localBoard[ultiCons2Win[i][j]].getAttribute('class') === 'cell cell2') {
                                        targetCell = localBoard[ultiCons2Win[i][j]]
                                        targetMove(targetCell, `[${i}][2]Attack`)
                                        return
                                    } 
                                } 
                            }
                        } else if ( i === ultiCons2Win.length + 1) {
                            for (let k = 0; k < ultiCons2Win.length; k++) {
                                advCheckP1 = "";
                                for (let l = 0; l < ultiCons2Win[k].length; l++){
                                    if (localP1played.includes(ultiCons2Win[k][l])) {
                                        advCheckP1 = advCheckP1 + 'W';
                                    }
                                    if (advCheckP1.length === 2 && l === 2) {           
                                        if (advCheckP1.length === 2 && l === 2) {       
                                            if (localBoard[ultiCons2Win[k][l-2]].getAttribute('class') === 'cell cell2') {
                                                targetCell = localBoard[ultiCons2Win[k][l-2]]
                                                targetMove(targetCell, `[${k}][0]Defence`)
                                                return
                                            } else if (localBoard[ultiCons2Win[k][l-1]].getAttribute('class') === 'cell cell2') {
                                                targetCell = localBoard[ultiCons2Win[k][l-1]]
                                                targetMove(targetCell, `[${k}][1]Defence`)
                                                return
                                            } else if (localBoard[ultiCons2Win[k][l]].getAttribute('class') === 'cell cell2') {
                                                targetCell = localBoard[ultiCons2Win[k][l]]
                                                targetMove(targetCell, `[${k}][2]Defence`)
                                                return
                                            }
                                        }
                                    }
                                }
                            }
                        } else if ( i === ultiCons2Win.length + 2) {
                            localBoard = cells[0].parentElement.children
                            let num = 0;
                            let run = 0;
                            while ((!localBoard[num].classList.contains('cell') || run === 0 || ttts[num].querySelectorAll('.markX').length > 1|| ttts[num].querySelectorAll('.markO').length > 1) && run < 15) {
                                num = Math.floor(Math.random() * 9)
                                console.log(`run2 ${run} ${num}`)
                                run++
                            }

                            if (run < 15) {
                                targetCell = localBoard[num]
                                targetMove(targetCell, `Sending P1 to a less intense local board2 ${num}`)
                                return
                            } 
                            while (((!localBoard[num].classList.contains('cell') || run === 15 || (ttts[num].firstElementChild.classList.contains('cell2W') || ttts[num].firstElementChild.classList.contains('cellW')) || ttts[num].querySelectorAll('.markX').length > ttts[num].querySelectorAll('.markO').length + 1|| (ttts[num].querySelectorAll('.markX').length === 3 && ttts[num].querySelectorAll('.markO').length === 2) || (ttts[num].querySelectorAll('.markO').length === 3 && ttts[num].querySelectorAll('.markX').length === 2)) && run < 30)) {
                                num = Math.floor(Math.random() * 9)
                                console.log(`run2 ${run} ${num}`)
                                run++
                            }
                            if (run < 30) {
                                targetCell = localBoard[num]
                                targetMove(targetCell, `avoid won local board 2 ${num}`)
                                return
                            } else {
                                console.log(`run2 ${run}`)
                                cells = document.querySelectorAll('.cell')
                                let i = Math.floor(Math.random() * cells.length);
                                targetCell = cells[i]
                                targetMove(targetCell, 'random move 2')
                                return
                            }
                        }
                    } 

                    

                        
                        









                    
                        
                        
                        
                }
            }}, 200);
                
            
        
        
        
    
}}, 50)}

games.forEach(target =>
    target.addEventListener('click', function() {
        click.play()
    }))

let lastCell = 0;
const reload = document.querySelector('.reload')
reload.addEventListener('click', function() {
    click.play();
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
    timer.textContent = timeLimit

    lastMove = document.querySelector('#lastMove');
        if (lastMove != null) {
            lastMove.id = ""
        }

    markXs = document.querySelectorAll('.markX');
    markOs = document.querySelectorAll('.markO');
    cell2s = document.querySelectorAll(".cell2");
    cellNAs = document.querySelectorAll(".cellNA")
    cellWs = document.querySelectorAll('.cellW');
    cell2Ws = document.querySelectorAll('.cell2W');
    
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
    cellNAs.forEach(target =>
        target.classList.add('cell'))
    cellNAs.forEach(target =>
        target.classList.remove('cellNA'))
    cellWs.forEach(target =>
        target.classList.add('cell'))
    cellWs.forEach(target =>
        target.classList.remove('cellW'))
    cell2Ws.forEach(target =>
        target.classList.add('cell'))
    cell2Ws.forEach(target =>
        target.classList.remove('cell2W'))
    cells = document.querySelectorAll('.cell')
    cells.forEach(target =>
        target.textContent = 'X')
    
    congratsBGs.forEach(target => {
        target.style.visibility = 'hidden';
    })

    let storedP1name = window.localStorage.getItem(`UTTTstoredP1name`);
    playerNames[0].textContent = storedP1name;

    for (let i of characters) {
        if (i.alt === storedP1name) {
            players[0].src = i.src;
        }
    }

    let storedP2name = window.localStorage.getItem(`UTTTstoredP2name`);
    playerNames[1].textContent = storedP2name;

    for (let i of characters) {
        if (i.alt === storedP2name) {
            players[1].src = i.src;
        }
    }

    let storedP1scores = window.localStorage.getItem('UTTTstoredP1scores');
    if (storedP1scores === null) {storedP1scores = 0};
    scores[0].textContent = `Wins: ${parseInt(storedP1scores)}`;

    let storedP2scores = window.localStorage.getItem('UTTTstoredP2scores');
    if (storedP2scores === null) {storedP2scores = 0};
    scores[1].textContent = `Wins: ${parseInt(storedP2scores)}`;

    let arrXs = window.localStorage.getItem('UTTTstoredXs').split(',');
    for (let i of arrXs) {
        p1played.push(parseInt(i))
    }
    let arrOs = window.localStorage.getItem('UTTTstoredOs').split(',');
    for (let i of arrOs) {
        p2played.push(parseInt(i))
    }

    if (arrOs.length < arrXs.length) {
        let k= 0;
        let lastCell = arrXs[arrXs.length - 1]
        for (let j = 18; j < lastCell; j = j + 10) {
            k++
        }
        cells[lastCell - 10 - k].id = 'lastMove'
    } else {
        let k= 0;
        let lastCell = arrOs[arrOs.length - 1]
        for (let j = 18; j < lastCell; j = j + 10) {
            k++
        }
        cells[lastCell - 10 - k].id = 'lastMove' 
    }

    for (let i of arrXs) {
        //There are 81 cells on the board. Their corresponding index between 10 and 98
        let k = 0;
        for (let j = 18; j < i; j = j + 10) {
            k++
        }
        cells[i - 10 - k].textContent = 'X';
        cells[i - 10 - k].classList.add('markX');
        cells[i - 10 - k].classList.remove('cell');
    }
    for (let i of arrOs) {
        let k = 0;
        for (let j = 18; j < i; j = j + 10) {
            k++
        }
        cells[i - 10 - k].textContent = '〇';
        cells[i - 10 - k].classList.add('markO');
        cells[i - 10 - k].classList.remove('cell');
    }

    if (arrOs.length < arrXs.length) {
        cells = document.querySelectorAll('.cell');
        cells.forEach(target =>
            target.classList.toggle('cell2'));
        cells.forEach(target =>
            target.textContent = '〇');
    }



    if (arrOs.length < arrXs.length) {
        lastCell = arrXs[arrXs.length - 1]
    } else {lastCell = arrOs[arrOs.length - 1]}
    let gridNext = String(parseInt(lastCell) + 1).substring(1)
    cells = document.querySelectorAll('.cell')
    for (let cell of cells) {
        let gridIndex = String(Array.from(document.querySelectorAll('div')).indexOf(cell)).charAt(0)
        if (gridIndex != gridNext) {
            cell.classList.add('cellNA')
            cell.classList.remove('cell')
            cell.classList.toggle('cell2')
        }
    }
    WinCheck()
    ultiWinCheck()
})