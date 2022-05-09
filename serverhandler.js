async function getFromServer(endpoint) {
    const found = await fetch(endpoint);
    jsonFound = await found.json();
    return jsonFound;
}
async function getRandomFromGiphy() {
    let randomEndpoint = 'https://api.giphy.com/v1/gifs/random?&api_key=' + apiKey + '&tag=&rating=R';
    let jsonFound = await getFromServer(randomEndpoint);
    return jsonFound;
}
async function getTrendingFromGiphy() {
    let trendyEndpoint = 'http://api.giphy.com/v1/gifs/trending?&api_key=' + apiKey + '&limit=25&rating=G';
    let jsonFound = await getFromServer(trendyEndpoint);
    return jsonFound;
}
async function searchFromGiphy() {
    let search = document.getElementById('searchBarInput').value;
    let jsonFound = await getFromServer('http://api.giphy.com/v1/gifs/search?&api_key=' + apiKey + '&q=' + search + '&limit=25&offset=0&rating=R&lang=es');
    closeWelcomeSection();
    showGiphyResults(jsonFound);
}
async function searchFromTenor() {
    let search = document.getElementById('searchBarInput').value;
    let jsonFound = await getFromServer('https://api.tenor.com/v1/search?tag=' + search + '&key=' + apiKeyTenor + '&media_filter=minimal&contentfilter=off');
    closeWelcomeSection();
    cleanSearchedImgs();
    showTenorResults(jsonFound);
    closeSuggestionBar();
    addTermTolocalStorage(search);
}
async function getTrendingFromTenor() {
    let trendyEndpoint = 'https://api.tenor.com/v1/trending?&key=' + apiKeyTenor + '&media_filter=minimal&contentfilter=off';
    let jsonFound = await getFromServer(trendyEndpoint);
    return jsonFound;
}
async function getRandomFromTenor() {
    let randomEndpoint = 'https://api.tenor.com/v1/random?tag=funny&key=' + apiKeyTenor + '&media_filter=minimal&contentfilter=off';
    let jsonFound = await getFromServer(randomEndpoint);
    return jsonFound;
}
async function getSuggestions(term) {
    let suggestionsEndpoint = 'https://api.tenor.com/v1/search_suggestions?tag=' + term + '&key=' + apiKeyTenor;
    let found = await getFromServer(suggestionsEndpoint);
    return found
}
async function makeSuggestionSearch(suggestion) {
    let search = suggestion;
    let jsonFound = await getFromServer('https://api.tenor.com/v1/search?tag=' + search + '&key=' + apiKeyTenor + '&media_filter=minimal&contentfilter=off');
    let input = document.getElementById("searchBarInput");
    input.value = suggestion;
    closeWelcomeSection();
    cleanSearchedImgs();
    showTenorResults(jsonFound);
    closeSuggestionBar();
    addTermTolocalStorage(search);
}
async function uploadToGiphy(blob) {
    file = blobToFile(blob, 'gif.gif');
    let formToUpload = new FormData();
    formToUpload.append('file', blob, 'myGif.gif');
    formToUpload.append('api_key', apiKey);
    let uploadEnpoint = 'https://upload.giphy.com/v1/gifs?api_key=' + apiKey;
    let misCabeceras = new Headers();
    let miInit = {
        method: 'POST',
        body: formToUpload
    };
    let data = await fetch(uploadEnpoint, miInit);
    dataReturned = await data.json();
    uploadEnded = 'true'
}

function blobToFile(theBlob, fileName) {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

function searchFromTenorVerMas(index) {
    let textInRandCont = document.getElementsByClassName('textInRandCont');
    let input = document.getElementById("searchBarInput");
    input.value = textInRandCont[index].innerHTML;
    searchFromTenor();
}

function searcFromTenorSearchedTerm(evt) {
    let input = document.getElementById("searchBarInput");
    input.value = evt.currentTarget.innerHTML;
    searchFromTenor();
}