# Tic Tac Toe

A class board game to play on browser. You can play with your human friend, a challenging AI or the unbeatable Terminator.
You can also play the ultimate Tic Tac Toe, but the only AI challenger provided is a simply one at this stage.

The webpage consists of two games at the moment. One is Tic Tac Toe and another one is Ultimate Tic Tac Toe. 

The Tic Tac Toe game was made on a 9 by 9 grid and players can choose their favourite characters out of the 12 choices to represent themselves. There are score counters on top of each player's section to record their wins. It is 5 sec per turn and if a move is not made within the timeframe, a random move would be made for the player. On the top right corner, there is a settings buttion. You can set a different timer or disable it. You can also choose to play the game with A.I.s or play the ultimate version of Tic Tac Toe.

You can play my game on https://loudringphone.github.io/tic-tac-toe/

<br />

### Game rules
---
#### Tic Tac Toe
Tic-tac-toe is a game for two players who take turns marking the spaces in a three-by-three grid with X or O. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row is the winner.

<br />

#### Ultimate Tic Tac Toe
The game starts with X playing wherever they want in any of the 81 empty spots. This move "sends" their opponent to its relative location. For example, if X played in the top right square of their local board, then O needs to play next in the local board at the top right of the global board. O can then play in any one of the nine available spots in that local board, each move sending X to a different local board.

Each small 3 × 3 tic-tac-toe board is referred to as a local board, and the larger 3 × 3 board as the global board. Once a local board is filled completely, no more moves may be played in that board. If a player is sent to such a board, then that player may play in any other board. Game play ends when either a player wins three of the local boards in a row or there are no legal moves remaining, in which case the game is a draw.

<br />

### How A.I. works in Tic Tac Toe
---
I applied what I have learnt in the GA classes and I just learnt what minimax algorithm is recently after finishing this project, so the functions and methods I use would all have been covered in the first two weeks in the GA course without using minimax.

I will explain how the unbeatable A.I. works below.

Firstly A.I. must find out which square to play in for their first move.
```
if (document.getElementById('4').getAttribute('class') === 'cell cell2'){
                targetCell = document.getElementById('4')
```
All the nine squares are first allocated a class called 'cell' when the game starts. This class mean that the square is avilable for Player 1 to play in. And after the player 1 has made a move, the corresponding square will be reallocated another class called 'MarkX' and it can not be refilled anymore in the game, while other squares will get a new class called 'cell2', which mean Player 2 or A.I. can fill in one of those squares.

Since the best square to first fill in is the center one in my opinon, I have written the code above to let AI take the center if it has not yet been occupied by Player 1.

However, if the center has already been occuplied by Player 1, A.I. will take any of the four corners instead.
```
if (p1played[0] === 4 && p1played.length === 1) {
                let corner;
                do {
                    corner = Math.floor( Math.random() * 10 / 2 ) * 2
                } while(corner === 4);
                targetCell = document.getElementById(String(corner))
```
The top left square has a id #0 and the squares from left to right and top to bottom has a id with a number increasing by 1.
Hence the corners are as follows: id #0 #2 #6 #8. Since there is another id with an even number which is #4, so I need to skip 4 by using do...while loop.

For A.I.'s 2nd move and onwards, the algorithm would find out whether Player 1 will be able to win in the next turn or whether A.I. can win during its current turn.
This means for each row, each column and each diagonal there is 6 possible scenarios if either Player 1 or A.I. has occipied two of the squares and the remaining one is still unoccuplied.
The below is 1 of the 6 scenarios.
```
for (let i = 0; i < cons2Win.length; i++) {
            checkP2 = "";
            for (let j = 0; j < cons2Win[i].length; j++){
                if (p2played.includes(cons2Win[i][j])) {
                    checkP2 = checkP2 + 'W';
                }
                if (checkP2.length === 2 && j === 2) {
                    if (document.getElementById(`${cons2Win[i][j-2]}`).getAttribute('class') === 'cell cell2') {
                        targetCell = document.getElementById(`${cons2Win[i][j-2]}`)
```
"p2played" is an array to record the moves that A.I. has already made in previous turns.
The game has 8 different winning conditions which are represented as arrays. "checkP2" is to check how many Os A.I. has in each of the 8 arrays. If A.I. needs three more Os to win the game in one condition, checkP2 would be "" for that condition. If two more, "W" and if one more, "WW".
Hence if checkP2 is "WW", the algorithm will check whether the last suqare is still unoccuplied or if it has been filled by Player 1. If it is empty, A.I. will take that square and win the game.
In the above example, "j-2" means A.I. needs the first position of an array where A.I. has already had two Os in it. If the position is empty, A.I. will take it and win the game.


Last but not least, A.I. could make random move after its first move if the algorithm could not find any possibility to win in its current turn nor Player 1 will win in the next turn. The line of code is as follows:
```
let i = Math.floor(Math.random() * cells.length);
                targetCell = cells[i]
```
I ackownledge that the algorithm is not perfect as I have not used minimax, but at least it is still unbeatable in Tic Tac Toe.

<br />
<br />
<br />
© 2022 Wing Fung Lau

