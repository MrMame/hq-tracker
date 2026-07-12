import * as dbItem  from '/scripts/models/dbItem.js';


export function save(data){
    console.log("Speichere Daten in der Datenbank:", data);
    const timestamp = Date.now();
    const key = `user_${timestamp}`;
    localStorage.setItem(key, JSON.stringify(data));
    alert(`Gespeichert unter: ${key}`);
}

export function getAllData(){
    let items = [];
     // Alle Schlüssel im LocalStorage durchlaufen
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const data = localStorage.getItem(key);
        const parsedData = dbItem.parse(data);
        const dataItem = {
            key: key,
            data: parsedData
        };
        // Element an die Liste anhängen
        items.push(dataItem);
    }
    return items;
}

export function clearAllData(){
    localStorage.clear();
}