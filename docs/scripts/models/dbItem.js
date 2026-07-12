export function parse(rawData) {
    try {
        return JSON.parse(rawData);
    } catch (e) {
        console.error("Fehler beim Parsen der Daten:", e);
        return null;
    }   
}