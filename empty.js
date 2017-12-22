var Game = function (){

    // 2.0 - Creating objects instances
    //QUESTION: is it possible to create it inside a function and make it global?
    var board = new Board(10, 10);

    var gun0 = new Gun("Baloon", gameConstant.GUN_BALOON, gameConstant.LOW_DMG);
    var gun1 = new Gun("Bat", gameConstant.GUN_BAT, gameConstant.MED_DMG);
    var gun2 = new Gun("Ball", gameConstant.GUN_BALL, gameConstant.HIGH_DMG);
    var gun3 = new Gun("Bomb", gameConstant.GUN_BOMB, gameConstant.ULTRA_DMG);

    var player1 = new Player(gameConstant.PLAYER1, gameConstant.PLAYER_HP, gun0);
    var player2 = new Player(gameConstant.PLAYER2, gameConstant.PLAYER_HP, gun0);
    var player1Turn = true; //to check whos turn it is

    /*-------------------------------------------------------------------*/
    /*-------------------------------------------------------------------*/
    // 3.0 - Start function - starts the game once called
    this.start = function(){
        board.layout = [];
        board.init();

        updateBoard();
        updateDom();
        possibleMoves(player1, gameConstant.PLAYER2);

        console.log(board.layout);
    }

}

var game = new Game();
game.start();

