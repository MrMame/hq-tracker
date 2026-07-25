import {MonsterTrackerEntity} from '../models/monsterTrackerEntity.js';
import { MonsterNameService } from './MonsterNameService.js';
import * as MonsterTypes from '../models/monsterTypes.js';
import * as MonsterColors from '../models/monsterColors.js';
import * as MonsterTemplateNames from '../../domain/models/monsterTemplateNames.js'

export class MonsterEntityService{


    static CreateMonsterEntity(monsterType,templateName){
        let retEntity;
        switch(monsterType){
            case MonsterTypes.MonsterTypeChaosWarrior:
                retEntity = MonsterEntityService.createChaosWarriorEntity(templateName);
                break;
            case MonsterTypes.MonsterTypeFimir:
                retEntity = MonsterEntityService.createFimirEntityEntity(templateName);
                break;
            case MonsterTypes.MonsterTypeGargoyle:
                retEntity = MonsterEntityService.createGargoyleEntityEntity(templateName);
                break;
            case MonsterTypes.MonsterTypeGoblin:
                retEntity = MonsterEntityService.createGoblinEntity(templateName);
                break;
            case MonsterTypes.MonsterTypeHexer:
                retEntity = MonsterEntityService.createHexerEntity(templateName);
                break;
            case MonsterTypes.MonsterTypeMummy:
                retEntity = MonsterEntityService.createMummyEntity(templateName);
                break;
            case MonsterTypes.MonsterTypeOrc:
                retEntity = MonsterEntityService.createOrcEntity(templateName);
                break;
            case MonsterTypes.MonsterTypeSkeleton:
                retEntity = MonsterEntityService.createSkeletonEntity(templateName);
                break;
            case MonsterTypes.MonsterTypeUnknown:
                retEntity = MonsterEntityService.createUnknownEntity(templateName);
                break;
            case MonsterTypes.MonsterTypeZombie:
                retEntity = MonsterEntityService.createZombieEntity(templateName);
                break;
            default:
                break;
        }
        return retEntity;
    }

    static createChaosWarriorEntity(monsterTemplateName){throw new Error(`Create Entity of type "ChaosWarrior" for template "${monsterTemplateName}"is not implemented`);}
    static createFimirEntity(monsterTemplateName){throw new Error(`Create Entity of type "createFimirEntity" for template "${monsterTemplateName}"is not implemented`);}
    static createGargoyleEntity(monsterTemplateName){throw new Error(`Create Entity of type "createGargoyleEntity" for template "${monsterTemplateName}"is not implemented`);}
    static createGoblinEntity(monsterTemplateName){ throw new Error(`Create Entity of type "createGoblinEntity" for template "${monsterTemplateName}"is not implemented`);}
    static createHexerEntity(monsterTemplateName){ throw new Error(`Create Entity of type "createHexerEntity" for template "${monsterTemplateName}"is not implemented`);}
    static createMummyEntity(monsterTemplateName){ throw new Error(`Create Entity of type "createMummyEntity" for template "${monsterTemplateName}"is not implemented`);}
    static createOrcEntity(monsterTemplateName){ throw new Error(`Create Entity of type "createOrcEntity" for template "${monsterTemplateName}"is not implemented`);}
    static createSkeletonEntity(monsterTemplateName){ throw new Error(`Create Entity of type "createSkeletonEntity" for template "${monsterTemplateName}"is not implemented`);}
    static createUnknownEntity(monsterTemplateName){ throw new Error(`Create Entity of type "createUnknownEntity" for template "${monsterTemplateName}"is not implemented`);}
    static createZombieEntity(monsterTemplateName){ throw new Error(`Create Entity of type "createZombieEntity" for template "${monsterTemplateName}"is not implemented`);}

    static createGoblinEntity(monsterTemplateName){
        let newEntity = {
                key:null,
                image:"img/monster-icon-Goblin.png",
                color:null,
                name:MonsterNameService.getGoblinName(),
                health:null,
                armor:null,
                focus:null,
                move:null,
                monsterType:MonsterTypes.MonsterTypeGoblin,
                templateLevel:monsterTemplateName,
            };
            switch(monsterTemplateName){
                case MonsterTemplateNames.Easy:
                    newEntity.color = MonsterColors.Green;
                    newEntity.health = 1;
                    newEntity.armor = 0;
                    newEntity.focus = 0;
                    newEntity.move = 10;
                    break;
                case MonsterTemplateNames.Normal:
                    newEntity.color = MonsterColors.White;
                    newEntity.health = 2;
                    newEntity.armor = 5;
                    newEntity.focus = 0;
                    newEntity.move = 12;
                    break;
                case MonsterTemplateNames.Hard:
                    newEntity.color = MonsterColors.Yellow;
                    newEntity.health = 4;
                    newEntity.armor = 10;
                    newEntity.focus = 3;
                    newEntity.move = 14;
                    break;
                case MonsterTemplateNames.Elite:
                    newEntity.color = MonsterColors.Red;
                    newEntity.health = 8;
                    newEntity.armor = 15;
                    newEntity.focus = 5;
                    newEntity.move = 16;
                    break;
            }
        return new MonsterTrackerEntity(newEntity);
    }

}