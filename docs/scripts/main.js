import * as storage from './system/persistent/localStorage.js';
import * as trackerControlFactory from './ui/controls/trackerFactory.js';
import * as trackerWizardFactory from './ui/controls/trackerWizardFactory.js';

import {dbMonsterService} from './domain/persistent/monsterTrackerDb.js';


const saveBtn = document.getElementById('saveBtn');
const loadBtn = document.getElementById('loadBtn');
const clearBtn = document.getElementById('clearBtn');
const createMonsterTrackerBtn = document.getElementById('createMonsterTrackerBtn');
const showMonsterTrackerWizardBtn = document.getElementById('showMonsterTrackerWizardBtn');

const outputList = document.getElementById('outputList');
const trackerList = document.getElementById('trackerList');



// Create Website Elements
const wizard = trackerWizardFactory.createTrackerWizard();
document.body.appendChild(wizard);



// ======================================================================
// Functions

let showMonsterTrackerEntities = async () => {
    trackerList.innerHTML = ''; // Clear the tracker list
    // Load existing datasets from storage on page load
    let items  = storage.getAllKeyValuePairs(); 
    items.forEach(monsterTrackerEntityKeyValuePair => {
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


createMonsterTrackerBtn.addEventListener('click', () => {
    const trackerControl = trackerControlFactory.createMonsterTrackerControl();
    trackerList.appendChild(trackerControl);
});

// Save dataset
saveBtn.addEventListener('click', () => {
    const data = {
        id: Date.now(),
        name: "Max Mustermann",
        erstelltAm: new Date().toLocaleString('de-DE'),
        extrawert: "Beispielwert"
    };
    storage.save(data);
});

// print all existing datasets from storage
loadBtn.addEventListener('click', () => {
    // Clear output list first
    outputList.innerHTML = '';
    // Get and check for Items 
    let items  = storage.getAllKeyValuePairs();
    if (items.length === 0) {
        outputList.innerHTML = '<span class="no-data">Die Datenbank ist leer.</span>';
        return;
    }
    // Draw each item into the output list
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'data-item';
        itemDiv.innerHTML = `<strong>${item.key}:</strong> ${JSON.stringify(item.value, null, 2)}`;
        outputList.appendChild(itemDiv);
    });
});

// Clear all datasets from storage
clearBtn.addEventListener('click', () => {
    dbMonsterService.clearMonsterTrackerEntities();
    // Löscht den gesamten LocalStorage für diese Domain
    storage.clearAllData();
    // Aktualisiert die Anzeige im Ausgabefeld sofort
    const outputList = document.getElementById('outputList');
    if (outputList) {
        outputList.innerHTML = '<span class="no-data">Die Datenbank wurde gelöscht.</span>';
    }
    // Bestätigung in der Konsole
    console.log("LocalStorage komplett geleert.");
});
