function defaultMaterials() {
    const result = [
        "SP-8LKアオ(HGN11A)",
        "SP-8Kアオ(HGN7)",
        "SP-8Kアオ(HGN7)12R",
        "SP-8Kアオ(HGN7)KUFゲンシ",
        "SP-8Kアオ(HGN7)WT4(6.1R)",
        "SP-8Kアオ(HGN7)WT4(12.2R)",
        "KA-4GシロB",
        "SP-8Eアオ(N6)",
        "SP-ESFR78(N67)",
        "SP-8Eアイボリー(N6)",
        "SP-8Eアイボリー(N6)セマハバ",
        "SP-8Eアイボリー(N6)9R",
        "SP-4BCマルミズ",
        "SP-4BCマルミズ(エージング)",
        "SP-7Kアサギ(HGN7)(3%)",
        "SP-7Kシロ(HGN7)(3%)",
        "SP-7Kチャ",
        "SP-8EAアイボリー",
        "SP-8EBアイボリー",
        "SP-8Eシロ",
        "SP-8Eシロ(N6)",
        "SP-8Eシロ(N6)セマハバ",
        "SP-8KFアオ(L)ウチマキ"
      ];
      return result.sort();    
}

const storageKey = 'materials';

function saveMaterials(materials) {
    localStorage.setItem(storageKey, JSON.stringify(materials));
}

function loadMaterials() {
    const item = localStorage.getItem(storageKey);
    if (!item) {
        return defaultMaterials();
    }
    return JSON.parse(item);
}

export {
    saveMaterials,
    loadMaterials
}