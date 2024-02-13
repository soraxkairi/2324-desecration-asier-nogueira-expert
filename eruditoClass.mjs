export class Erudito {
    constructor(name, angerLevel) {
        this.name = name;
        this.angerLevel = angerLevel;
        this.hitpointsGlass = 1 + angerLevel;
        this.hitpointsNoGlass = "Invincible";
    }
}