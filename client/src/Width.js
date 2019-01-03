function defaultWidths() {
    const result = [
        785,
        905,
        1000,
        1020,
        1040,
        1100,
        1120,
        1230
    ];
      return result.sort();    
}

const storageKey = 'widths';

function saveWidths(widths) {
    localStorage.setItem(storageKey, JSON.stringify(widths));
}

function loadWidths() {
    const item = localStorage.getItem(storageKey);
    if (!item) {
        return defaultWidths();
    }
    return JSON.parse(item);
}

export {
    saveWidths,
    loadWidths
}