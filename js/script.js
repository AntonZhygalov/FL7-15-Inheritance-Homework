function myAssign(obj) {
    for (var i = 1; i < arguments.length; i++) {
        var nextObj = arguments[i];
        for (var key in nextObj) {
            if (Object.prototype.hasOwnProperty.call(nextObj, key)) {
                obj[key] = nextObj[key];
            }
        }
    }
    return obj;
}

function Archetype(obj) {
    this.name = obj.name;
    this.attack = obj.attack;
    this.totalHitpoints = obj.hitpoints;
    this.hitpoints = obj.hitpoints;
}

Archetype.prototype.getHitpoints = function() {
    return this.hitpoints;
}

Archetype.prototype.setHitpoints = function(number) {
    if (number > this.totalHitpoints) {
        this.hitpoints = this.totalHitpoints;
    } else return this.hitpoints = number;
}

Archetype.prototype.getTotalHitpoints = function() {
    return this.totalHitpoints;
}

Archetype.prototype.setTotalHitpoints = function(number) {
    return this.totalHitpoints = number;
}

Archetype.prototype.getAttack = function() {
    return this.attack;
}

Archetype.prototype.setAttack = function(number) {
    return this.attack = number;
}

Archetype.prototype.fight = function(enemy) {
    let multiplayer = 1;

    if (this.rageTurns > 0) {
        multiplayer = 2;
        this.rageTurns -= 1;
    } else if (this.rageTurns === 0) {
        multiplayer = 1;
    }

    if (this === enemy) {
        console.log('You cant fight yourself');
    } else if (this.hitpoints === 0) {
        console.log('You are dead, you cant fight');
    } else if (enemy.hitpoints === 0) {
        console.log('The target is dead, no need to fight');
    } else if (enemy.block) {
        console.log('Your attack was blocked');
        enemy.block = false;
    } else if (enemy.hitpoints <= this.attack * multiplayer) {
        enemy.hitpoints = 0;
        if (this instanceof Champion) {
            this.attack += 1;
        } else {
            this.hitpoints += Math.floor((enemy.totalHitpoints * 25) / 100);
            this.totalHitpoints += Math.floor((enemy.totalHitpoints * 10) / 100);
            if (this.hitpoints > this.totalHitpoints) {
                this.hitpoints = this.totalHitpoints;
            }
        }
    } else enemy.hitpoints -= this.attack * multiplayer;
}

Archetype.prototype.isAlive = function() {
    return this.hitpoints > 0;
}

function Champion(obj) {
    Archetype.call(this, obj);
    this.block = false;
}

Champion.prototype = Object.create(Archetype.prototype);

Champion.prototype.rest = function() {
    this.hitpoints += 5;
    if (this.hitpoints > this.totalHitpoints) {
        this.hitpoints = this.totalHitpoints;
        console.log('You are fully healed')
    }
}

Champion.prototype.defence = function() {
    this.block = true;
}


function Monster(obj) {
    Archetype.call(this, obj);
    this.rageTurns = 0;
}

Monster.prototype = Object.create(Archetype.prototype);

Monster.prototype.enrage = function() {
    this.rageTurns = 2;
}

module.exports = {
    Archetype: Archetype,
    Champion: Champion,
    Monster: Monster,
    myAssign: myAssign
}