let cells = document.querySelectorAll('.cell');
let cell2s = document.querySelectorAll('.cell2');
let markXs = document.querySelectorAll('.markX');
let markOs = document.querySelectorAll('.markO');
let cellnas = document.querySelectorAll('.cellna')
const body = document.querySelector('body');
let timer = document.querySelector('.timer');
const players = document.querySelectorAll('.player');
const scoreInfo = document.querySelector('.scoreInfo');
const mainContent = document.querySelector('.main-content');
const games = document.querySelectorAll('.game')
const scores = document.querySelectorAll('.score')
const characters = document.querySelectorAll('.character');

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
const youlose = new Audio("./audio/youlose.mov");






for (let player of players) {
    let i = Math.floor(Math.random() * characters.length);
            player.src = characters[i].src;
}


if (document.querySelector('.time.selected').textContent > 0) {
    timer.textContent = document.querySelector('.time.selected').textContent
}

//Opponent selector
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


        if (opponentType === 'A.I.' && charContainer.style.visibility === 'visible' && !playerNames[0].textContent.includes('Player')) {
            charContainer.classList.toggle('change');
            charContainer.style.visibility = 'hidden'
            mainContent.style.visibility = 'visible';
            playerNames[0].id = 'gameStarted'
        }

        if (opponentType === 'A.I.') {
            let num;
            do {
                    num = Math.floor(Math.random() * characters.length);
                    players[1].src = characters[num].src;
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
        )       
}

const startScreen = document.querySelector('.startScreen');
const congratsBGs = document.querySelectorAll('.congratsBG')


//Character selector
const preview = document.querySelector('.preview');
const btnClose = document.querySelector('.btnClose');
const btnChar = document.querySelector('.btnChar');
const charContainer = document.querySelector('.charContainer')
const playerNames = document.querySelectorAll('.playerName')

let player = players[0]
let playerName = playerNames[0]

btnChar.addEventListener('click', function() {
    coin.play();
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
                select.play()
                player.src = target.currentSrc;
                player.style.filter = "brightness()";
                playerName.textContent = target.getAttribute('alt');
                window.localStorage.setItem(`UTTTstoredP1name`, playerNames[0].textContent);
                target.classList.toggle('selected')
                
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
        btnChar.style.visibility = 'visible';
    
        for (let character of characters) {
            character.style.filter = "grayscale(100%)";
            character.style.outline = 'none';
            character.style.outlineOffset = 'none';
            character.classList.remove('selected')
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
        congratsBGs[0].style.opacity = 0.035;
        congratsBGs[1].style.opacity = 0.035;
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
            let i = Math.floor(Math.random() * cells.length);
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
                        empty.classList.toggle('cell2');
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
                        cell.classList.toggle('cell2')
                    }
    
                }
                
    
    
    
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
                    empties = document.querySelectorAll('.cellNA');
                    for (let empty of empties) {
                        empty.classList.remove('cellNA');
                        empty.textContent = "X";
                        empty.classList.add('cell');
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
                }
            }
            catch {};
            timer.textContent = timeLimit;
            drawCheck()
            
        }
        setTimeout(() => {
            ultiWinCheck()
        }, 100);
        
        
        if (opponents[1].getAttribute('class') === 'opponent selected')
            {setTimeout(() => {
                if (playerNames[0].id === 'gameStarted') {
                AIplayer()
                }
            }, 150);
        };

        



        
}

let countDownInt = setInterval(countDown , 1000);


//Fixed the issue on winning the game on turn 9


const drawCheck = function() {

    cells = document.querySelectorAll('.cell')
    cellnas = document.querySelectorAll('.cellNA')
    let cell2nas = document.querySelectorAll('.cell2.cellNA')

    if (cells.length === 0 && cellnas.length > 0) {
        cellnas.forEach(target =>
            target.classList.add('cell'))
        cellnas.forEach(target =>
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
            youlose.play()
            congrats()
            victor = playerNames[Math.floor(Math.random()*2)].textContent
            clearInterval(countDownInt)
            

            
        }},200)
    
}









//Rematch

const rematch = function() {
    for (let i of players) {
        i.style.filter = "brightness()";
    }
    cell2s = document.querySelectorAll('.cell2');
    markXs = document.querySelectorAll('.markX');
    markOs = document.querySelectorAll('.markO');
    cellnas = document.querySelectorAll('.cellNA');
    cell2s.forEach(target =>
        target.textContent = "")
    markXs.forEach(target =>
        target.textContent = "")
    markOs.forEach(target =>
        target.textContent = "");
    cellnas.forEach(target =>
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


        cell2s.forEach(target =>
            target.classList.add('cell'));
        markXs.forEach(target =>
            target.classList.add('cell'));
        markOs.forEach(target =>
            target.classList.add('cell'));
        cellnas.forEach(target =>
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

        if (victor === playerNames[0].textContent) {
            cells.forEach(target =>
                target.textContent = '〇')
            cells.forEach(target =>
                target.classList.toggle('cell2'))    
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
        


        countDownInt = setInterval(countDown , 1000);
        AdvAI = false;
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
        p1played = []
        p2played = []
        gridNext = ""
        gridIndex = ""
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


        
        congratsText.textContent = 'Withdraw!'
        players[0].style.filter = "brightness()";
        players[1].style.filter = "brightness()";
        UIopacity(1);
        options.style.visibility = 'hidden';
        congrats()

    }
})







   



















//Ultimate Tic Tac Toe!

const Ulticons2Win = [
    
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
// tictactoe();

cells.forEach(target =>
    target.textContent = 'X');


const ttts = document.getElementsByClassName('TTT')
cells = document.querySelectorAll('.cell')


p1played = []
p2played = []

const ultiWinCheck = function() {
    if (victor === "") {
        for (let i = 0; i < Ulticons2Win.length; i++) {
            checkP1 = ""
            checkP2 = ""
            for (let j of Ulticons2Win[i]){
                
                if (p1played.includes(j)) {
                    checkP1 = checkP1 + 'W'
                }
                if (checkP1.length === 3) {
                    congratsText.textContent = winningText(playerNames[0].textContent)
                    scores[0].textContent = `Wins: ${parseInt(scores[0].textContent.split(" ")[1]) + 1}`
                    players[1].style.filter = "grayscale(100%)";
                    p1wins.play()
                    congrats()
                    
                    victor = playerNames[0].textContent
                    clearInterval(countDownInt)

                    
                    
                }
                if (p2played.includes(j)) {
                    checkP2 = checkP2 + 'W'
                }
                if (checkP2.length === 3) {
                    congratsText.textContent = winningText(playerNames[1].textContent)
                    scores[1].textContent = `Wins: ${parseInt(scores[1].textContent.split(" ")[1]) + 1}`
                    players[0].style.filter = "grayscale(100%)";
                    p2wins.play()
                    congrats()
                    
                    victor = playerNames[1].textContent
                    clearInterval(countDownInt)

                }
            }
        } 
        drawCheck()
    }
}



cellnas = document.querySelectorAll('.cellna')
const ultimateTTT = function() {
    for (let cell of cells) {
        cell.addEventListener('click', function() {
            if (cell.className === 'markX' || cell.className === 'markO') {
                return
            }
            cellnas =  document.querySelectorAll('.cellNA')
            for (let cellna of cellnas) {
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
                    empty.textContent = "〇"
                    empty.classList.toggle('cell2')
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
                        cell.classList.toggle('cell2')
                    }

                }
                
                setTimeout(() => {
                    ultiWinCheck()
                }, 100);

                setTimeout(() => {
                    clearInterval(countDownInt)
                    timer.textContent = timeLimit;
                    countDownInt = setInterval(countDown , 1000);
                    if (opponents[1].getAttribute('class') === 'opponent selected') {
                        AIplayer()
                    }
                }, 150);

                
            }
            else {
                slash.play()
                cell.classList.add('markO')
                cell.classList.remove('cell');
                cell.classList.remove('cell2');
                empties = document.querySelectorAll('.cell');
                for (let empty of empties) {
                    empty.textContent = "X"
                }
                p2played.push(parseInt(Array.from(document.querySelectorAll('div')).indexOf(cell)));
                window.localStorage.setItem(`UTTTstoredOs`, p2played);


                let gridNext = String(parseInt(Array.from(document.querySelectorAll('div')).indexOf(cell)) + 1).substring(1)
                cells = document.querySelectorAll('.cell')
                for (let cell of cells) {
                    // console.log((parseInt(Array.from(document.querySelectorAll('div')).indexOf(cells[i]))))
                    let gridIndex = String(Array.from(document.querySelectorAll('div')).indexOf(cell)).charAt(0)
                
                    if (gridIndex != gridNext) {
                        cell.classList.add('cellNA')
                        cell.classList.remove('cell')
                        cell.classList.toggle('cell2')
                    }
                }

                setTimeout(() => {
                    ultiWinCheck()
                }, 100);

                setTimeout(() => {
                    clearInterval(countDownInt)
                    timer.textContent = timeLimit;
                    countDownInt = setInterval(countDown , 1000);
                    
                }, 150);
                
            }
        })
        cell.addEventListener('dblclick', function(event) {
            alert("Double-click disabled!");
            event.preventDefault()})
    }
}


ultimateTTT() 










//Basic A.I.
let AdvAI = false
const AIplayer = function() {
    if (opponents[0].getAttribute('class') === 'opponent selected') {
        return
    }  
    cells = document.querySelectorAll('.cell');



    if (AdvAI === false) {
        let i = Math.floor(Math.random() * cells.length);
        

        if (cells[i].textContent === '〇') {
            slash.play()
            cells[i].classList.add('markO')
            cells[i].classList.remove('cell');
            cells[i].classList.remove('cell2');
            
            lastMove = document.querySelector('#lastMove');
            try{
            if (lastMove.id != null) {
                lastMove.id = ''
            }} catch {}
            cells[i].id = 'lastMove'

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
        }        
        ultiWinCheck()
        drawCheck()
    }
}

games.forEach(target =>
    target.addEventListener('click', function() {
        click.play()
    }))

let lastCell = 0;
const reload = document.querySelector('.reload')
reload.addEventListener('click', function() {
    click.play();
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
    victor = ""
    timer.textContent = timeLimit

    markXs = document.querySelectorAll('.markX');
    markOs = document.querySelectorAll('.markO');
    cell2s = document.querySelectorAll(".cell2");
    cellnas = document.querySelectorAll(".cellNA")
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
    cellnas.forEach(target =>
        target.classList.add('cell'))
    cellnas.forEach(target =>
        target.classList.remove('cellNA'))
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
    





        
   
   






    
















})