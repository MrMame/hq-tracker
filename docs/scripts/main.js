// import * as storage from './system/persistent/localStorage.js';
import {MonsterDbService} from './domain/persistent/monsterTrackerDb.js'
import * as trackerControlFactory from './ui/controls/trackerFactory.js';
import * as trackerWizardFactory from './ui/controls/trackerWizardFactory.js';

import {dbMonsterService} from './domain/persistent/monsterTrackerDb.js';

const monsterDB = new MonsterDbService();
const showMonsterTrackerWizardBtn = document.getElementById('showMonsterTrackerWizardBtn');
const trackerList = document.getElementById('trackerList');


// Create Website Elements
const wizard = trackerWizardFactory.createTrackerWizard();
document.body.appendChild(wizard);



// ======================================================================
// Functions

let showMonsterTrackerEntities = async () => {
    trackerList.innerHTML = ''; // Clear the tracker list
    // Load existing datasets from storage on page load
    // let items  = storage.getAllKeyValuePairs(); 
    let monsters  = await monsterDB.getAllMonsterTrackerEntitiesSortByMonsterType(); 
    monsters.forEach(monsterTrackerEntityKeyValuePair => {
        const trackerControl = trackerControlFactory.createMonsterTrackerControlFromMonsterEntity(monsterTrackerEntityKeyValuePair.value);
        trackerList.appendChild(trackerControl);
    });
}



// ======================================================================
// EVENTS


document.addEventListener('DOMContentLoaded', () => {
    showMonsterTrackerEntities();
});

dbMonsterService.addEventListener('monsterSaved', (monsterSavedEvent) => {
    // console.log('Eintrag gespeichert:', monsterData);
    // const trackerControl = trackerControlFactory.createMonsterTrackerControlFromMonsterData(monsterData);
    // trackerList.appendChild(trackerControl);
});

dbMonsterService.addEventListener('monsterDbUpdated', (monsterDbUpdatedEvent) => {
    console.log('MonsterDB aktualisiert:', monsterDbUpdatedEvent);
    showMonsterTrackerEntities();
});


// ======================================================================
// Event Handlers for Buttons and Controls


showMonsterTrackerWizardBtn.addEventListener('click', () => {
   wizard.showModal(); // Show the dialog
});






