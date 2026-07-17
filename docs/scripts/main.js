// import * as storage from './system/persistent/localStorage.js';
import {MonsterDbService} from './domain/persistent/monsterTrackerDb.js'
import * as trackerControlFactory from './ui/controls/trackerFactory.js';
import * as trackerWizardFactory from './ui/controls/trackerWizardFactory.js';
import * as trackerEventDialogFactory from './ui/controls/trackerEventDialogFactory.js'

import {dbMonsterService} from './domain/persistent/monsterTrackerDb.js';

const monsterDB = new MonsterDbService();
const showMonsterTrackerWizardBtn = document.getElementById('showMonsterTrackerWizardBtn');
const trackerList = document.getElementById('trackerList');


// Create Website Elements
const elTrackerWizardDialog = trackerWizardFactory.createTrackerWizard();
document.body.appendChild(elTrackerWizardDialog);
const elMonsterTrackerEventDialog = trackerEventDialogFactory.createTrackerEventDialog();
document.body.appendChild(elMonsterTrackerEventDialog);



// ======================================================================
// Functions

let showMonsterTrackerEntities = async () => {
    trackerList.innerHTML = ''; // Clear the tracker list
    // Load existing datasets from storage on page load
    // let items  = storage.getAllKeyValuePairs(); 
    let monsters  = await monsterDB.getAllMonsterTrackerEntitiesSortByMonsterType(); 
    monsters.forEach(monsterTrackerEntityKeyValuePair => {
        const trackerControl = trackerControlFactory.createMonsterTrackerControlFromMonsterEntity(elMonsterTrackerEventDialog,monsterTrackerEntityKeyValuePair.value);
        // trackerControl.addEventListener('click',() => {
        //     elMonsterTrackerEventDialog.showModal();
        // });
        trackerList.appendChild(trackerControl);

    });
}



// ======================================================================
// EVENTS


document.addEventListener('DOMContentLoaded', () => {
    showMonsterTrackerEntities();
});


dbMonsterService.addEventListener('monsterDbUpdated', (monsterDbUpdatedEvent) => {
    console.log('MonsterDB aktualisiert:', monsterDbUpdatedEvent);
    showMonsterTrackerEntities();
});


// ======================================================================
// Event Handlers for Buttons and Controls


showMonsterTrackerWizardBtn.addEventListener('click', () => {
   elTrackerWizardDialog.showModal(); // Show the dialog
});






