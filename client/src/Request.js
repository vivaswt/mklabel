function defaultRequests() {
    let requests = new Map();
    for (let i = 0; i < 10; i++) {
      requests.set(i, {
        material: '',
        width: '',
        page: 0
      });
    }
    return requests;
  }

const storageKey = 'requests';

function saveRequests(requests) {
    localStorage.setItem(storageKey, JSON.stringify(requests));
}

function loadRequests() {
    const item = localStorage.getItem(storageKey);
    if (!item) {
        return defaultRequests();
    }
    return JSON.parse(item);
}

export {
    saveRequests,
    loadRequests
}