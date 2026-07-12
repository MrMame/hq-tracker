import * as storage from './persistent/localStorage.js';


const saveBtn = document.getElementById('saveBtn');
const loadBtn = document.getElementById('loadBtn');
const clearBtn = document.getElementById('clearBtn');
const outputList = document.getElementById('outputList');



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
    let items  = storage.getAllData();
    if (items.length === 0) {
        outputList.innerHTML = '<span class="no-data">Die Datenbank ist leer.</span>';
        return;
    }
    // Draw each item into the output list
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'data-item';
        itemDiv.innerHTML = `<strong>${item.key}:</strong> ${JSON.stringify(item.data, null, 2)}`;
        outputList.appendChild(itemDiv);
    });
});

// Clear all datasets from storage
document.getElementById('clearBtn').addEventListener('click', () => {
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
