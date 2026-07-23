import * as monsterTypes from '../../domain/models/monsterTypes.js'

export class MonsterTrackerEntity {

    constructor(key,image,color,name, health, armor, focus, move,  monsterType,templateLevel) {
        this.key = key;
        this.image = image;
        this.color = color;
        this.name = name;
        this.health = health;
        this.armor = armor;
        this.focus = focus;
        this.move = move;
        this.monsterType = monsterType
        this.templateLevel = templateLevel;
    }

    static getMonsterTypeFromImagePath(imagePath){
        let img = imagePath;
        let retType;
        if(img.includes(monsterTypes.ChaosWarrior.TYPENAME)){retType = monsterTypes.ChaosWarrior;}
        else if(img.includes(monsterTypes.Fimir.TYPENAME)){retType = monsterTypes.Fimir;}
        else if(img.includes(monsterTypes.Gargoyle.TYPENAME)){retType = monsterTypes.Gargoyle}
        else if(img.includes(monsterTypes.Goblin.TYPENAME)){retType = monsterTypes.Goblin;}
        else if(img.includes(monsterTypes.Hexer.TYPENAME)){retType = monsterTypes.Hexer}
        else if(img.includes(monsterTypes.Mummy.TYPENAME)){retType = monsterTypes.Mummy}
        else if(img.includes(monsterTypes.Orc.TYPENAME)){retType = monsterTypes.Orc}
        else if(img.includes(monsterTypes.Skeleton.TYPENAME)){retType = monsterTypes.Skeleton}
        else if(img.includes(monsterTypes.Zombie.TYPENAME)){retType = monsterTypes.Zombie}
        else{retType = monsterTypes.Unknown}
        return retType;
 
    }
 
}


