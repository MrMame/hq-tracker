import * as dbItem  from '../models/dbItem.js';


export function save(data){
    let key = data.key; // Schlüssel aus den Daten extrahieren
    if(!data || typeof data !== 'object'){
        throw new Error("Invalid data. Must be an object.");
    }
    if(!data.key || data.key.trim() === ""){
        console.log("Create new Databse entry:", data);
        const timestamp = Date.now();
        key = `user_${timestamp}`;
        data.key = key; // Füge den Schlüssel zu den Daten hinzu
        localStorage.setItem(key, JSON.stringify(data));
        //alert(`Gespeichert unter: ${key}`);
    }else{
        console.log("Update existing Databse entry:", data);
        key = data.key; // Schlüssel aus den Daten extrahieren
        localStorage.setItem(data.key, JSON.stringify(data));
        //alert(`Aktualisiert unter: ${data.key}`);
    }
    return key;
}

export function getAllKeyValuePairs(){
    let items = [];
     // Alle Schlüssel im LocalStorage durchlaufen
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const data = localStorage.getItem(key);
        const parsedData = dbItem.parse(data);
        const dataItem = {
            key: key,
            value: parsedData
        };
        // Element an die Liste anhängen
        items.push(dataItem);
    }
    return items;
}

export function clearAllData(){
    localStorage.clear();
}

export function deleteKeyValuePair(key){
    localStorage.removeItem(key);
}

export function getKeyValuePair(key){
    const data = localStorage.getItem(key);
    if (data) {
        return dbItem.parse(data);
    }
    return null;
}