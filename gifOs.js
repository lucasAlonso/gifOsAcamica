const apiKey = "XBrtyxnpwVzEstGKyX7sjMxYpQrQwCkV";
const apiKeyTenor = "OSAV6J9IUJ8H";
let jsonTrending = [];
let jsonRandom = [];
let hashtagsHarcodeadosHorribles = [
  "acamica:",
  "no",
  "se",
  "hace",
  "una",
  "feature",
  "sin",
  "que",
  "el",
  "recurso",
  "este",
  "disponible",
  "also",
  "las",
  "guias",
  "son",
  "muy",
  "malas",
];

function showDropdown() {
  document.getElementById("dropdownContent").classList.toggle("show");
}

function turnNight() {
  document.documentElement.setAttribute("data-theme", "dark");
  document.getElementById("logo").src = "images" + "\\" + "gifOF_logo_dark.png";
}

function turnDay() {
  document.documentElement.setAttribute("data-theme", "light");
  document.getElementById("logo").src = "images" + "\\" + "gifOF_logo.png";
}

function cleanSearchedImgs() {
  const myNode = document.getElementById("imgsSearchResult");
  myNode.innerHTML = null;
}

function closeSuggestionBar() {
  let suggestionBar = document.getElementById("searchSuggestionCont");
  suggestionBar.classList.add("dontShow");
  suggestionBar.classList.remove("searchSuggestionsCont");
}
async function replaceRandom(nodeNumber) {
  let jsonFound = await getRandomFromGiphy();
  nodeTitle = document.getElementsByClassName("textInRandCont");
  nodeImg = document.getElementsByClassName("randomImg");
  nodeImg[nodeNumber].src =
    "https://media.giphy.com/media/" + jsonFound.data.id + "/giphy.gif";
  nodeTitle[nodeNumber].innerHTML =
    "#" + jsonFound.data.title.replace(/\s/g, "").slice(0, 15);
}

function dropdownCloserOnClickEvent() {
  window.onclick = function (event) {
    if (!event.target.matches(".button")) {
      var dropdowns = document.getElementsByClassName("dropdownContent");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };
}
async function sugestionsBarMaker() {
  if (document.getElementById("searchBarInput").value) {
    let suggestions = await getSuggestions(
      document.getElementById("searchBarInput").value
    );
    let divCont = document.getElementById("searchSuggestionCont");
    divCont.className = "searchSuggestionsCont";
    let divSuggestion = document.getElementsByClassName("suggestion");
    for (let index = 0; index < 3; index++) {
      if (suggestions.results[index]) {
        let newDiv = divSuggestion[index].cloneNode(false);
        newDiv.innerHTML = suggestions.results[index];
        newDiv.addEventListener("click", () =>
          makeSuggestionSearch(suggestions.results[index])
        );
        divCont.replaceChild(newDiv, divSuggestion[index]);
      }
    }
  }
  if (document.getElementById("btnSearch").disabled) {
    closeSuggestionBar();
  }
}

function closeWelcomeSection() {
  document.getElementById("welcomeSection").classList.add("dontShow");
  document.getElementById("imgsSearchResult").classList.remove("dontShow");
  document.getElementById("separatorSearchResult").classList.remove("dontShow");
}

function activeSearchBar() {
  let button = document.getElementById("btnSearch");
  let lupa = document.getElementById("lupa");
  if (document.getElementById("searchBarInput").value) {
    button.disabled = false;
    button.classList.add("active");
    lupa.src = "/images/lupa.svg";
  } else {
    button.disabled = true;
    button.classList.remove("active");
    lupa.src = "/images/lupa_inactive.svg";
    closeSuggestionBar();
  }
}
async function setUp() {
  document.getElementById("btnSearch").disabled = "true";
  let jsonTrending = await getTrendingFromTenor();
  showTenorTrending(jsonTrending);
  showGiphyRandom();
  let input = document.getElementById("searchBarInput");
  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("btnSearch").click();
    }
  });
  input.addEventListener("keyup", activeSearchBar);
  input.addEventListener("keydown", sugestionsBarMaker);
  dropdownCloserOnClickEvent();
  if (localStorage.getItem("searchedTerms")) {
    let searchedTermsArray = JSON.parse(localStorage.getItem("searchedTerms"));
    searchedTermsArray.forEach((element) => {
      addButtonSearchedTerm(element);
    });
  }
}

function reloadPage() {
  location.reload();
  return false;
}
window.onload = setUp();
