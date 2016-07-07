//use browser window.localStorage
//const store = localStorage
export let store = localStorage;

Storage.prototype.isEmpty = () => !store.length
