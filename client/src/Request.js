function defaultRequests() {
    return [];
  }

const storageKey = 'requests';

function saveRequests(requests) {
    sessionStorage.setItem(storageKey, JSON.stringify(requests));
}

function loadRequests() {
    const item = sessionStorage.getItem(storageKey);
    if (!item) {
        return defaultRequests();
    }
    return JSON.parse(item);
}

export {
    saveRequests,
    loadRequests
}