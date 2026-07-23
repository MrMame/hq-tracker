import {MonsterTrackerEntity} from '../models/monsterTrackerEntity.js';
import { MonsterNameService } from './MonsterNameService.js';
import * as MonsterTypes from '../models/monsterTypes.js';
import * as MonsterColors from '../models/monsterColors.js';


export class MonsterEntityService{

    static createGoblinEntity(templateName){
        let key;
        let image;
        let color;
        let name;
        let health;
        let armor;
        let focus;
        let move;
        let monType;
        let monTemplateLevel;
        if(templateName==="easy"){
            key=null;
            image="img/monster-icon-Goblin.png";
            color=MonsterColors.Green;
            name=MonsterNameService.getGoblinName();
            health=1;
            armor=0;
            focus=0;
            move=10;
            monType=MonsterTypes.MonsterTypeGoblin;
            monTemplateLevel = templateName;
        }else if(templateName==="normal"){
            key=null;
            image="img/monster-icon-Goblin.png";
            color=MonsterColors.White;
            name=MonsterNameService.getGoblinName();
            health=2;
            armor=5;
            focus=0;
            move=10;
            monType=MonsterTypes.MonsterTypeGoblin;
            monTemplateLevel = templateName;
        }else if(templateName==="hard"){
            key=null;
            image="img/monster-icon-Goblin.png";
            color=MonsterColors.Red;
            name=MonsterNameService.getGoblinName();
            health=10;
            armor=7;
            focus=0;
            move=12;
            monType=MonsterTypes.MonsterTypeGoblin;
            monTemplateLevel = templateName;
        }else if(templateName==="elite"){
            key=null;
            image="img/monster-icon-Goblin.png";
            color=MonsterColors.Pink;
            name=MonsterNameService.getGoblinName();
            health=20;
            armor=10;
            focus=5;
            move=15;
            monType=MonsterTypes.MonsterTypeGoblin;
            monTemplateLevel = templateName;
        }
        let newGob = new MonsterTrackerEntity(key,image,color,name, health, armor, focus, move,monType,monTemplateLevel);
        return newGob;
    }

}