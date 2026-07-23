import {MonsterTrackerEntity} from '../models/monsterTrackerEntity.js';
import { MonsterNameService } from './MonsterNameService.js';
import * as MonsterTypes from '../models/monsterTypes.js';
import * as MonsterColors from '../models/monsterColors.js';
import * as MonsterTemplateNames from '../../domain/models/monsterTemplateNames.js'

export class MonsterEntityService{

    static createGoblinEntity(monsterTemplateName){
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
        if(monsterTemplateName===MonsterTemplateNames.Easy){
            key=null;
            image="img/monster-icon-Goblin.png";
            color=MonsterColors.Green;
            name=MonsterNameService.getGoblinName();
            health=1;
            armor=0;
            focus=0;
            move=10;
            monType=MonsterTypes.MonsterTypeGoblin;
            monTemplateLevel = monsterTemplateName;
        }else if(monsterTemplateName===MonsterTemplateNames.Normal){
            key=null;
            image="img/monster-icon-Goblin.png";
            color=MonsterColors.White;
            name=MonsterNameService.getGoblinName();
            health=2;
            armor=5;
            focus=0;
            move=10;
            monType=MonsterTypes.MonsterTypeGoblin;
            monTemplateLevel = monsterTemplateName;
        }else if(monsterTemplateName===MonsterTemplateNames.Hard){
            key=null;
            image="img/monster-icon-Goblin.png";
            color=MonsterColors.Red;
            name=MonsterNameService.getGoblinName();
            health=10;
            armor=7;
            focus=0;
            move=12;
            monType=MonsterTypes.MonsterTypeGoblin;
            monTemplateLevel = monsterTemplateName;
        }else if(monsterTemplateName===MonsterTemplateNames.Elite){
            key=null;
            image="img/monster-icon-Goblin.png";
            color=MonsterColors.Pink;
            name=MonsterNameService.getGoblinName();
            health=20;
            armor=10;
            focus=5;
            move=15;
            monType=MonsterTypes.MonsterTypeGoblin;
            monTemplateLevel = monsterTemplateName;
        }
        let newGob = new MonsterTrackerEntity(key,image,color,name, health, armor, focus, move,monType,monTemplateLevel);
        return newGob;
    }

}