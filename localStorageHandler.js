function addTermTolocalStorage(newTerm) {
    if (!localStorage.getItem('searchedTerms')) {
        localStorage.setItem('searchedTerms', '[]');
    }
    let searchedTermsArray = JSON.parse(localStorage.getItem('searchedTerms'));
    if (!searchedTermsArray.includes(newTerm)) {
        searchedTermsArray.unshift(newTerm);
        localStorage.setItem('searchedTerms', JSON.stringify(searchedTermsArray));
        addButtonSearchedTerm(newTerm);
    }
}

function addNewGifToStorage(newGifUrl) {
    if (!localStorage.getItem('storedGifs')) {
        localStorage.setItem('storedGifs', '[]');
    }
    let storedGifsArray = JSON.parse(localStorage.getItem('storedGifs'));
    storedGifsArray.unshift(newGifUrl);
    localStorage.setItem('storedGifs', JSON.stringify(storedGifsArray));
}

function getGifsStoraged() {
    return JSON.parse(localStorage.getItem('storedGifs'));
}