var Player = function(){
    this.id;
    this.name;
    this.hp;
    this.dmg;

    var max_moves = 3;

    this.init = function(id, name, hp, dmg){
        this.id = id;
        this.name = name;
        this.hp = hp;
        this.dmg = dmg;
    }

    var increment_hp = function(hp){
       this.hp = this.hp + hp;
    }
}
