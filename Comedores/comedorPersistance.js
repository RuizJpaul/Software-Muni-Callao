function savePersistanceData(state, key = "comedores"){
    localStorage.setItem(key, JSON.stringify(state));
}

function getPersistanceData(key = "comedores"){
    const comedores = localStorage.getItem(key);
    return comedores === null ? [] : JSON.parse(comedores);
}

function deletePersistanceData(){
    localStorage.clear();
}