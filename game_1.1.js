/*
Content:
0.0 - Game constants
1.1 - Board constructor 
1.2 - Gun constructor
1.3 - Player constructor
1.4 - Init constructor - contains generating methods for initializing Board, Gun, Players, Bushes
2.0 - Creating objects instances
3.0 - Start function
4.0 - Creating Canvas
4.1 - Creating Sprites
4.2 - UpdateBoard function - updates Canvas instances once Called
5.0 - Event listener
*/



/*

var gun0 = new Gun("Baloon", 3, 5);
var gun1 = new Gun("Bat", 4, 10);
var gun2 = new Gun("Ball", 5, 20);
var gun3 = new Gun("Bomb", 6, 30);

var player1 = new Player(8, 100, gun0.id, 0, 0);
var player2 = new Player(9, 100, gun0.id, 0, 0);

*/
// 0.0 - Game constants
var gameConstant = {
    EMPTY: 0,
    BUSH: 1,
    GUN_BALOON: 3,
    GUN_BAT: 4,
    GUN_BALL: 5,
    GUN_BOMB: 6,
    PLAYER1: 8,
    PLAYER2: 9,
    PLAYER_HP: 100,
    LOW_DMG: 5,
    MED_DMG: 10,
    HIGH_DMG: 20,
    ULTRA_DMG: 25,
    MAX_MOVE_DISTANCE: 3,
    MIN_MOVE_DISTANCE: 0,

    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40,
    LEFT_ARROW: 37,
    Q_KEYBOARD: 81
}



// 1.1 - Board Object
function Board(width, height) {
    this.width = width;
    this.height = height;
    this.layout = [];

}

/*-------------------------------------------------------------------*/
// 1.2 - Gun Object
function Gun(name, id, damage) {
    this.name = name;
    this.id = id;
    this.damage = damage;
}

/*-------------------------------------------------------------------*/
// 1.3 - Player
function Player(playerId, hp, activeGun) {
    this.x = 0;
    this.y = 0;
    this.playerId = playerId;
    this.hp = hp;
    this.gunInventory = [activeGun];
    this.moveDistance = 0;
    this.moveDirection;


    this.move = function(direction) {

        switch (direction) {
            case "up":
                if (this.y - 1 < 0 || board.layout[this.y - 1][this.x] == gameConstant.PLAYER2 || board.layout[this.y - 1][this.x] == gameConstant.PLAYER1 || board.layout[this.y - 1][this.x] == gameConstant.BUSH) {
                    console.log("This move is not possible!");
                } else {
                    this.y = this.y - 1;
                    console.log("Player with ID: " + this.playerId + " Moved from: " + "(" + this.x + ", " + (this.y + 1) + ") to (" + this.x + ", " + this.y + ")");
                    this.moveDistance++;
                }
                break;

            case "right":
                if (this.x + 1 > 9 || board.layout[this.y][this.x + 1] == gameConstant.PLAYER2 || board.layout[this.y][this.x + 1] == gameConstant.PLAYER1 || board.layout[this.y][this.x + 1] == gameConstant.BUSH) {
                    console.log("This move is not possible!");
                } else {
                    this.x = this.x + 1;
                    console.log("Player with ID: " + this.playerId + " Moved from: " + "(" + (this.x - 1) + ", " + this.y + ") to (" + this.x + ", " + this.y + ")");
                    this.moveDistance++;
                }
                break;

            case "down":
                if (this.y + 1 > 9 || board.layout[this.y + 1][this.x] == gameConstant.PLAYER2 || board.layout[this.y + 1][this.x] == gameConstant.PLAYER1 || board.layout[this.y + 1][this.x] == gameConstant.BUSH) {
                    console.log("This move is not possible!");
                } else {
                    this.y = this.y + 1;
                    console.log("Player with ID: " + this.playerId + " Moved from: " + "(" + this.x + ", " + (this.y - 1) + ") to (" + this.x + ", " + this.y + ")");
                    this.moveDistance++;
                }
                break;

            case "left":
                if (this.x - 1 < 0 || board.layout[this.y][this.x - 1] == gameConstant.PLAYER2 || board.layout[this.y][this.x - 1] == gameConstant.PLAYER1 || board.layout[this.y][this.x - 1] == gameConstant.BUSH) {
                    console.log("This move is not possible!");
                } else {
                    this.x = this.x - 1;
                    console.log("Player with ID: " + this.playerId + " Moved from: " + "(" + (this.x + 1) + ", " + this.y + ") to (" + this.x + ", " + this.y + ")");
                    this.moveDistance++;
                }
                break;

            default:
                console.log("unknown expression");
        }
    }
}

/*-------------------------------------------------------------------*/
//1.4 Init Object for generating game
function Init() {

    // Board method generator 
    this.gameBoard = function (boardName) {
        for (i = 0; i < boardName.width; i++) {
            boardName.layout.push([]);

            for (z = 0; z < boardName.height; z++) {
                boardName.layout[i][z] = gameConstant.EMPTY;
            }
        }
    }

    //Bush method genetaror
    this.gameBush = function (boardName) {
        var bush = Math.floor(Math.random() * (boardName.width * boardName.width * 0.12) + 8);

        for (i = 0; i < bush; i++) {
            var x = Math.floor(Math.random() * boardName.layout.length);
            var y = Math.floor(Math.random() * boardName.layout[0].length);

            while (boardName.layout[x][y] == gameConstant.BUSH) {
                x = Math.floor(Math.random() * boardName.layout.length);
                y = Math.floor(Math.random() * boardName.layout[0].length);
            }

            boardName.layout[x][y] = gameConstant.BUSH;
            console.log("number of bushes generated: " + bush);
        }


    }


    //Gun method generator
    this.gameGun = function (boardName, gunId) {
        var y = Math.floor(Math.random() * boardName.layout.length);
        var z = Math.floor(Math.random() * boardName.layout[0].length);

        while (!(boardName.layout[y][z] == gameConstant.EMPTY)) {
            y = Math.floor(Math.random() * boardName.layout.length);
            z = Math.floor(Math.random() * boardName.layout[0].length);
        }
        boardName.layout[y][z] = gunId;
    }

    //Player method generator
    this.gamePlayer = function (boardName, player) {
        player.x = Math.floor(Math.random() * boardName.layout.length);
        player.y = Math.floor(Math.random() * boardName.layout[0].length);

        while (!(boardName.layout[player.x][player.y] == gameConstant.EMPTY)) {
            player.x = Math.floor(Math.random() * boardName.layout.length);
            player.y = Math.floor(Math.random() * boardName.layout[0].length);
        }

        boardName.layout[player.y][player.x] = player.playerId;

        console.log("player with ID " + player.playerId + " is on position " + "(" + player.x + ", " + player.y + ")");
    }

}


/*-------------------------------------------------------------------*/
// 2.0 - Creating objects instances
var board = new Board(10, 10);
var init = new Init();

var gun0 = new Gun("Baloon", gameConstant.GUN_BALOON, gameConstant.LOW_DMG);
var gun1 = new Gun("Bat", gameConstant.GUN_BAT, gameConstant.MED_DMG);
var gun2 = new Gun("Ball", gameConstant.GUN_BALL, gameConstant.HIGH_DMG);
var gun3 = new Gun("Bomb", gameConstant.GUN_BOMB, gameConstant.ULTRA_DMG);

var player1 = new Player(gameConstant.PLAYER1, gameConstant.PLAYER_HP, gun0.id);
var player2 = new Player(gameConstant.PLAYER2, gameConstant.PLAYER_HP, gun0.id);
var player1Turn = true; //to check whos turn it is


/*-------------------------------------------------------------------*/
// 3.0 - Start function - starts the game once called
function start() {
    board.layout = [];
    init.gameBoard(board);
    init.gameBush(board);

    init.gameGun(board, gun1.id);
    init.gameGun(board, gun2.id);
    init.gameGun(board, gun3.id);

    init.gamePlayer(board, player1);
    init.gamePlayer(board, player2);

    console.log(board.layout);

    //why does this work? I am not sure
    canvas.width = canvas.width;
    updateBoard();

}

/*-------------------------------------------------------------------*/
/*-------------------------------------------------------------------*/
/*-------------------------------------------------------------------*/
// 4.0 - Creating Canvas
var canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 800;

var c = canvas.getContext("2d");


/*-------------------------------------------------------------------*/
//4.1 - Creating sprites
var p1 = new Image();
var p2 = new Image();
var bushImage = new Image();


var w1 = new Image();
var w2 = new Image();
var w3 = new Image();
var w4 = new Image();

p1.src = "assets/p1.png";
p2.src = "assets/p2.png";
bushImage.src = "assets/bush.png";

w1.src = "assets/weapon1.png";
w2.src = "assets/weapon2.png";
w3.src = "assets/weapon3.png";
w4.src = "assets/weapon4.png";


/*-------------------------------------------------------------------*/
//4.1 - This function will update the canvas game instance
function updateBoard() {
    canvas.width = canvas.width;
    canvas.height = canvas.height;
    var xPos = 0;
    var yPos = 0;

    for (var x = 0; x < board.layout.length; x++) {
        for (var y = 0; y < board.layout[x].length; y++) {

            c.strokeRect(xPos, yPos, 80, 80);


            if (board.layout[x][y] == gameConstant.BUSH) {
                c.drawImage(bushImage, xPos, yPos);
            }

            if (board.layout[x][y] == gameConstant.GUN_BALOON) {
                //create animation here
                c.drawImage(w1, xPos, yPos);
            }

            if (board.layout[x][y] == gameConstant.GUN_BAT) {
                //create animation here
                c.drawImage(w2, xPos, yPos);
            }

            if (board.layout[x][y] == gameConstant.GUN_BALL) {
                c.drawImage(w3, xPos, yPos);
            }

            if (board.layout[x][y] == gameConstant.GUN_BOMB) {
                c.drawImage(w4, xPos, yPos);
            }

            if (board.layout[x][y] == gameConstant.PLAYER1) {
                c.drawImage(p1, xPos, yPos);
            }

            if (board.layout[x][y] == gameConstant.PLAYER2) {
                c.drawImage(p2, xPos, yPos);
            }

            xPos += 80;

        }
        xPos = 0;
        yPos += 80;
    }
}

/*-------------------------------------------------------------------*/
//5.0 - Event listener
function action(e) {
    var playerMoving;
    if (player1Turn) {
        playerMoving = player1;
    } else {
        playerMoving = player2;
    }

    function moveAction(direction){

        if (playerMoving.moveDistance >= gameConstant.MAX_MOVE_DISTANCE) {
            console.log("You cannot move anymore!");
        } else if (playerMoving.moveDistance > gameConstant.MIN_MOVE_DISTANCE && direction !== playerMoving.moveDirection) {
            console.log("You cannot move " + direction + ". You can only move " + playerMoving.moveDirection);
        } else {

            if (playerMoving.gunInventory.length > 1) {
                board.layout[playerMoving.y][playerMoving.x] = playerMoving.gunInventory[0];
                playerMoving.gunInventory.shift();
            } else {
                board.layout[playerMoving.y][playerMoving.x] = gameConstant.EMPTY;
            }

            playerMoving.move(direction);

            //---------------
            // this will add gun into inventory if player cross one
            var gunOnTheMap;
            var mapObject = board.layout[playerMoving.y][playerMoving.x];


            if (mapObject == gameConstant.GUN_BALOON || mapObject == gameConstant.GUN_BAT || mapObject == gameConstant.GUN_BALL || mapObject == gameConstant.GUN_BOMB) {
                gunOnTheMap = mapObject;
                playerMoving.gunInventory.push(gunOnTheMap);
            }
            //---------------

            board.layout[playerMoving.y][playerMoving.x] = playerMoving.playerId;
            updateBoard();
            console.log(direction + " arrow: " + e.keyCode);
            playerMoving.moveDirection = direction;
        }
    }

    switch(e.keyCode) {

        case gameConstant.UP_ARROW:
            moveAction("up");
            break;

        case gameConstant.RIGHT_ARROW:
            moveAction("right");
            break;

        case gameConstant.DOWN_ARROW:
            moveAction("down");
            break;

        case gameConstant.LEFT_ARROW:
            moveAction("left");
            break;

        case gameConstant.Q_KEYBOARD:
            if (player1Turn) {
                player1Turn = false;
            } else {
                player1Turn = true;
            }

            playerMoving.moveDistance = gameConstant.MIN_MOVE_DISTANCE;
            console.log("End round - Q key: " + e.keyCode);
            break;




        default:
            console.log(e.keyCode);
    }

    //    c.clearRect(0, 0, canvas.width, canvas.height);
    //     canvas.width = canvas.width;
    //     canvas.height = canvas.height;



}

document.onkeydown = action;
