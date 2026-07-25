import {dbMonsterService} from '../../domain/persistent/monsterTrackerDb.js';
import {MonsterTrackerEntity} from '../../domain/models/monsterTrackerEntity.js';

import { MonsterEntityService } from '../../domain/services/MonsterEntityService.js';
import * as MonsterColors from '../../domain/models/monsterColors.js'
import * as MonsterTemplateNames from '../../domain/models/monsterTemplateNames.js'
import { TrackerWizardDialog } from './TrackerWizardDialog.js';

export function createTrackerWizard(){
    let initMonsterEntity = MonsterEntityService.createGoblinEntity(MonsterTemplateNames.Normal);
    return new TrackerWizardDialog(initMonsterEntity);
}
