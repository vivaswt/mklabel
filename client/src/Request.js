function defaultRequests() {
    let requests = [];
    for (let i = 0; i < 3; i++) {
      requests.push({
        material: 'SP-8Kアオ(HGN7)',
        width: 1000,
        page: 1
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