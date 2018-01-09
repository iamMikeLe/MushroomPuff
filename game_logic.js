
/*-------------------------------------------------------------------*/
/*-------------------------------------------------------------------*/
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
    Q_KEYBOARD: 81,
    A_KEYBOARD: 65,
    D_KEYBOARD: 68
}


/*-------------------------------------------------------------------*/
/*-------------------------------------------------------------------*/
// 1.1 - Board Object
function Board(width, height) {
    this.width = width;
    this.height = height;
    this.layout = [];


    // Board method generator - generates empty space
    this.gameBoard = function () {
        for (i = 0; i < this.width; i++) {
            this.layout.push([]);

            for (z = 0; z < this.height; z++) {
                this.layout[i][z] = gameConstant.EMPTY;
            }
        }
    }

    //Bush method genetaror - adds bushes into the game
    this.gameBush = function () {
        var bush = Math.floor(Math.random() * (this.width * this.width * 0.12) + 8);

        for (i = 0; i < bush; i++) {
            var x = Math.floor(Math.random() * this.layout.length);
            var y = Math.floor(Math.random() * this.layout[0].length);

            while (this.layout[x][y] == gameConstant.BUSH) {
                x = Math.floor(Math.random() * this.layout.length);
                y = Math.floor(Math.random() * this.layout[0].length);
            }

            this.layout[x][y] = gameConstant.BUSH;
            console.log("number of bushes generated: " + bush);
        }
    }


    //Gun method generator - adds guns into the game
    this.gameGun = function (gunId) {
        var y = Math.floor(Math.random() * this.layout.length);
        var z = Math.floor(Math.random() * this.layout[0].length);

        while (!(this.layout[y][z] == gameConstant.EMPTY)) {
            y = Math.floor(Math.random() * this.layout.length);
            z = Math.floor(Math.random() * this.layout[0].length);
        }
        this.layout[y][z] = gunId;
    }

    //Player method generator - adds players into the game
    this.gamePlayer = function (player) {
        player.x = Math.floor(Math.random() * this.layout.length);
        player.y = Math.floor(Math.random() * this.layout[0].length);

        while (!(this.layout[player.x][player.y] == gameConstant.EMPTY)) {
            player.x = Math.floor(Math.random() * this.layout.length);
            player.y = Math.floor(Math.random() * this.layout[0].length);
        }

        this.layout[player.y][player.x] = player.playerId;

        console.log("player with ID " + player.playerId + " is on position " + "(" + player.x + ", " + player.y + ")");
    }

    // function that calls all other functions in Board Object
    this.init = function () {
        this.gameBoard();
        this.gameBush();

        this.gameGun(game.gun1.id);
        this.gameGun(game.gun2.id);
        this.gameGun(game.gun3.id);

        this.gamePlayer(game.player1);
        this.gamePlayer(game.player2);
    }
}

/*-------------------------------------------------------------------*/
/*-------------------------------------------------------------------*/
// 1.2 - Gun Object
function Gun(name, id, damage) {
    this.name = name;
    this.id = id;
    this.damage = damage;
}

/*-------------------------------------------------------------------*/
/*-------------------------------------------------------------------*/
// 1.3 - Player Object
function Player(playerId, hp, activeGun) {
    this.x = 0;
    this.y = 0;
    this.playerId = playerId;
    this.hp = hp;
    this.gunInventory = [activeGun];
    this.moveDistance = 0;
    this.moveDirection;
    this.defendMode = true;
    this.canAttack = true;


    this.getPos = function () {
        console.log("[" + this.x + ", " + this.y + "]");
    }

    this.move = function (direction) {

        switch (direction) {
            case "up":
                if (this.y - 1 < 0 || game.board.layout[this.y - 1][this.x] == gameConstant.PLAYER2 || game.board.layout[this.y - 1][this.x] == gameConstant.PLAYER1 || game.board.layout[this.y - 1][this.x] == gameConstant.BUSH) {
                    game.gameConsole.write("This move is not possible!");

                    /**/

                } else {
                    this.y = this.y - 1;
                    console.log("Player with ID: " + this.playerId + " Moved from: " + "(" + this.x + ", " + (this.y + 1) + ") to (" + this.x + ", " + this.y + ")");
                    this.moveDistance++;
                }
                break;

            case "right":
                if (this.x + 1 > 9 || game.board.layout[this.y][this.x + 1] == gameConstant.PLAYER2 || game.board.layout[this.y][this.x + 1] == gameConstant.PLAYER1 || game.board.layout[this.y][this.x + 1] == gameConstant.BUSH) {
                    game.gameConsole.write("This move is not possible!");

                    /**/
                } else {
                    this.x = this.x + 1;
                    console.log("Player with ID: " + this.playerId + " Moved from: " + "(" + (this.x - 1) + ", " + this.y + ") to (" + this.x + ", " + this.y + ")");
                    this.moveDistance++;
                }
                break;

            case "down":
                if (this.y + 1 > 9 || game.board.layout[this.y + 1][this.x] == gameConstant.PLAYER2 || game.board.layout[this.y + 1][this.x] == gameConstant.PLAYER1 || game.board.layout[this.y + 1][this.x] == gameConstant.BUSH) {
                    game.gameConsole.write("This move is not possible!");

                    /**/
                } else {
                    this.y = this.y + 1;
                    console.log("Player with ID: " + this.playerId + " Moved from: " + "(" + this.x + ", " + (this.y - 1) + ") to (" + this.x + ", " + this.y + ")");
                    this.moveDistance++;
                }
                break;

            case "left":
                if (this.x - 1 < 0 || game.board.layout[this.y][this.x - 1] == gameConstant.PLAYER2 || game.board.layout[this.y][this.x - 1] == gameConstant.PLAYER1 || game.board.layout[this.y][this.x - 1] == gameConstant.BUSH) {
                    game.gameConsole.write("This move is not possible!");

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

    this.attack = function (enemy) {


        if (this.canAttack) {
            if ((enemy.x == this.x + 1 && enemy.y == this.y) || (enemy.x == this.x - 1 && enemy.y == this.y) || (enemy.y == this.y + 1 && enemy.x == this.x) || (enemy.y == this.y - 1 && enemy.x == this.x)) {


                var dodgeChange = Math.round(Math.random());

                if (dodgeChange == 1) {
                    game.gameConsole.write("You attacked enemy but missed!");

                } else {
                    if (enemy.defendMode) {
                        enemy.hp = enemy.hp - this.gunInventory[0].damage / 2;
                        game.gameConsole.write("You attacked enemy and dealt: " + this.gunInventory[0].damage / 2 + " damage!");

                    } else {
                        enemy.hp = enemy.hp - this.gunInventory[0].damage;

                        game.gameConsole.write("You attacked enemy and dealt: " + this.gunInventory[0].damage + " damage!");

                    }
                }

                this.defendMode = false;
                this.canAttack = false;
                updateDom();
            } else {
                game.gameConsole.write("You need to move closer to attack!");

            }

        } else {
            game.gameConsole.write("You can attack only once per turn!");

        }




        if (this.hp <= 0 || enemy.hp <= 0) {
            console.log("Game Ended");
            game.gameOn = false;
            updateBoard();
            clearDom();
        }
    }



}


/*-------------------------------------------------------------------*/
/*-------------------------------------------------------------------*/
// 2.0 - Game object - inicialize a new game

var Game = function () {

    this.gameOn;

    this.start = function () {

        this.gameOn = true;
        this.gameConsole = new GameConsole();
        this.gameConsole.clearConsole();

         // Creating objects instances
        this.board = new Board(10, 10);

        this.gun0 = new Gun("Baloon", gameConstant.GUN_BALOON, gameConstant.LOW_DMG);
        this.gun1 = new Gun("Bat", gameConstant.GUN_BAT, gameConstant.MED_DMG);
        this.gun2 = new Gun("Ball", gameConstant.GUN_BALL, gameConstant.HIGH_DMG);
        this.gun3 = new Gun("Bomb", gameConstant.GUN_BOMB, gameConstant.ULTRA_DMG);

        this.player1 = new Player(gameConstant.PLAYER1, gameConstant.PLAYER_HP, this.gun0);
        this.player2 = new Player(gameConstant.PLAYER2, gameConstant.PLAYER_HP, this.gun0);

        this.player1Turn = true; //to check whos turn it is



        /*        this.board.layout = [];*/
        this.board.init();

        updateBoard();
        updateDom();
        possibleMoves(game.player1, gameConstant.PLAYER2);

        console.log(game.board.layout);
    }


    /*-------------------------------------------------------------------*/
    /*-------------------------------------------------------------------*/
    //4.0 - Event listener

    this.action = function (e) {

        var playerMoving;
        if (game.player1Turn) {
            playerMoving = game.player1;

        } else {
            playerMoving = game.player2;

        }

        function moveAction(direction) {

            if (playerMoving.moveDistance >= gameConstant.MAX_MOVE_DISTANCE) {
                game.gameConsole.write("You cannot move anymore! Only attack or Finish round");
                /**/

            } else if (playerMoving.moveDistance > gameConstant.MIN_MOVE_DISTANCE && direction !== playerMoving.moveDirection) {
                game.gameConsole.write("You cannot move " + direction + ". You can only move " + playerMoving.moveDirection);
                /**/

                /**/

            } else {

                if (playerMoving.gunInventory.length > 1) {
                    game.board.layout[playerMoving.y][playerMoving.x] = playerMoving.gunInventory[0].id;
                    playerMoving.gunInventory.shift();
                } else {
                    game.board.layout[playerMoving.y][playerMoving.x] = gameConstant.EMPTY;
                }

                playerMoving.move(direction);

                //---------------
                // this will add gun into inventory if player cross one
                var gunOnTheMap;
                var mapObject = game.board.layout[playerMoving.y][playerMoving.x];


                if (mapObject == gameConstant.GUN_BALOON || mapObject == gameConstant.GUN_BAT || mapObject == gameConstant.GUN_BALL || mapObject == gameConstant.GUN_BOMB) {

                    gunOnTheMap = mapObject;

                    switch (gunOnTheMap) {
                        case gameConstant.GUN_BALOON:
                            playerMoving.gunInventory.push(game.gun0);
                            break;
                        case gameConstant.GUN_BAT:
                            playerMoving.gunInventory.push(game.gun1);
                            break;
                        case gameConstant.GUN_BALL:
                            playerMoving.gunInventory.push(game.gun2);
                            break;
                        case gameConstant.GUN_BOMB:
                            playerMoving.gunInventory.push(game.gun3);
                            break;
                        default:
                            console.log("Error while adding weapon/gun object into inventory");
                    }
                }
                //---------------

                game.board.layout[playerMoving.y][playerMoving.x] = playerMoving.playerId;
                updateBoard();
                console.log(direction + " arrow: " + e.keyCode);
                playerMoving.moveDirection = direction;
            }

            /*if (playerMoving.moveDistance == 3 && playerMoving.canAttack == false) {
                drawPossibleMoves_EndRound();
                playerMoving.moveDistance = gameConstant.MIN_MOVE_DISTANCE;
                updateDom();
            }*/

        }

        if (game.gameOn) {
            switch (e.keyCode) {

                case gameConstant.UP_ARROW:
                    moveAction("up");
                    updateDom();
                    break;

                case gameConstant.RIGHT_ARROW:
                    moveAction("right");
                    updateDom();
                    break;

                case gameConstant.DOWN_ARROW:
                    moveAction("down");
                    updateDom();
                    break;

                case gameConstant.LEFT_ARROW:
                    moveAction("left");
                    updateDom();
                    break;

                case gameConstant.Q_KEYBOARD:
                    updateBoard();

                    if (game.player1Turn) {
                        game.player2.defendMode = true;

                    } else {
                        game.player1.defendMode = true;

                    }

                    drawPossibleMoves_EndRound();
                    playerMoving.moveDistance = gameConstant.MIN_MOVE_DISTANCE;
                    console.log("End round - Q key: " + e.keyCode);
                    updateDom();
                    break;

                case gameConstant.A_KEYBOARD:
                    console.log("Attack - A key: " + e.keyCode);

                    if (game.player1Turn) {
                        game.player1.attack(game.player2);

                    } else {
                        game.player2.attack(game.player1);

                    }

                    updateDom();
                    break;





                default:
                    console.log(e.keyCode);
            }
        } else {
            consoleOutput.innerHTML = "You need to start new game first!";
        }
        //    c.clearRect(0, 0, canvas.width, canvas.height);
        //     canvas.width = canvas.width;
        //     canvas.height = canvas.height;


    }

}

//  game console object
var GameConsole = function () {
    var lineNumber = 0;


    var consoleOutput = document.getElementById("consoleOutput");
    this.write = function (message) {

        lineNumber++;
        consoleOutput.innerHTML += lineNumber + ": " + message + "<br> --- <br>";
    }

    this.clearConsole = function () {
        lineNumber = 0;
        consoleOutput.innerHTML = "";
    }

}

var game = new Game();
document.onkeydown = game.action;
