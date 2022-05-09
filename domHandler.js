async function showGiphyResults(jsonFound) {
  for (let index = 0; index < jsonFound.data.length; index++) {
    fatherNode = document.getElementById("imgsSearchResult");
    await wrapGiphyGif(
      jsonFound.data[index].id,
      fatherNode,
      "imgSearched",
      "imgConteiner"
    );
  }
}

function showGiphyTrending(jsonFound) {
  for (let index = 0; index < jsonFound.data.length; index++) {
    fatherNode = document.getElementById("imgsTreandingResult");
    wrapGiphyGif(
      jsonFound.data[index].id,
      fatherNode,
      "imgTrending",
      "imgConteinerTrendy"
    );
  }
}
async function showGiphyRandom() {
  nodeImg = document.getElementsByClassName("randomImg");
  nodeTitle = document.getElementsByClassName("textInRandCont");
  for (let index = 0; index < 4; index++) {
    let jsonFound = await getRandomFromGiphy();
    fatherNode = document.getElementById("imgsRandomResult");
    nodeImg[index].src =
      "https://media.giphy.com/media/" + jsonFound.data.id + "/giphy.gif";
    nodeTitle[index].innerHTML =
      "#" + jsonFound.data.title.replace(/\s/g, "").slice(0, 15);
  }
}

function wrapGiphyGif(id, fatherNode, classImg, classDiv) {
  let img = document.createElement("img");
  let div = document.createElement("div");
  img.classList.add(classImg);
  div.classList.add(classDiv);
  img.src = "https://media.giphy.com/media/" + id + "/giphy.gif";
  fatherNode.appendChild(div);
  div.appendChild(img);
  return div;
}
async function showTenorResults(jsonFound) {
  for (let index = 0; index < jsonFound.results.length; index++) {
    fatherNode = document.getElementById("imgsSearchResult");
    await wrapTenorGif(jsonFound.results[index], fatherNode, "imgSearched");
  }
}
async function showGifsStored(gifStored) {
  let misGifsStoredCont = document.createElement("section");
  misGifsStoredCont.classList.add("imgsSearchResult");
  misGifsStoredCont.id = "misGifs";
  let separator = document.createElement("div");
  separator.innerHTML = "Mis Gifs";
  separator.classList.add("separator");
  document.body.appendChild(separator);
  for (let index = 0; index < gifStored.length; index++) {
    let img = document.createElement("img");
    let imgContDiv = document.createElement("div");
    img.classList.add("imgSearched");
    imgContDiv.classList.add("imgCont");
    img.src = gifStored[index];
    img.onload = () => {
      imgContDiv.appendChild(img);
      misGifsStoredCont.appendChild(imgContDiv);
    };
  }
  document.body.appendChild(misGifsStoredCont);
}

function wrapTenorGif(gifFound, fatherNode, classImg) {
  let img = document.createElement("img");
  let imgContDiv = document.createElement("div");
  let hoverSection = getDivWithTagsHardcodeado();
  img.classList.add(classImg);
  hoverSection.classList.add("hoverSection");
  hoverSection.style.visibility = "hidden";
  imgContDiv.addEventListener("mouseover", function (event) {
    event.target.parentNode.childNodes[1].style.visibility = "visible";
  });
  imgContDiv.addEventListener("mouseout", function (event) {
    event.target.parentNode.childNodes[1].style.visibility = "hidden";
  });
  imgContDiv.classList.add("imgCont");
  img.onload = () => {
    imgContDiv.appendChild(img);
    imgContDiv.appendChild(hoverSection);
    fatherNode.appendChild(imgContDiv);
  };
  img.src = gifFound.media[0].gif.url;
  let width = gifFound.media[0].gif.dims[0];
  let heigth = gifFound.media[0].gif.dims[1];
  if (width > heigth * 1.7) {
    imgContDiv.classList.add("grow2");
    hoverSection.classList.add("grow2");
  }
}

function getDivWithTagsHardcodeado() {
  let hoverSection = document.createElement("div");
  let hashtags = "";
  for (let index = 0; index < 3; index++) {
    hashtags +=
      "#" +
      hashtagsHarcodeadosHorribles[
        getRandomArbitrary(0, hashtagsHarcodeadosHorribles.length)
      ];
  }
  hoverSection.innerHTML = hashtags;
  return hoverSection;
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function showTenorTrending(jsonFound) {
  for (let index = 0; index < jsonFound.results.length; index++) {
    fatherNode = document.getElementById("imgsTreandingResult");
    wrapTenorGif(jsonFound.results[index], fatherNode, "imgSearched");
  }
}

function addButtonSearchedTerm(term) {
  let buttonTermSearched = document.createElement("div");
  buttonTermSearched.classList.add("button");
  buttonTermSearched.innerHTML = term;
  let searchTerm = () => searchFromTenor(this.innerHTML);
  buttonTermSearched.addEventListener("click", searcFromTenorSearchedTerm);
  let termCont = document.getElementById("termCont");
  termCont.insertAdjacentElement("afterbegin", buttonTermSearched);
}

function changeButonsOnStopRecording() {
  let titleWindow = document.getElementById("title");
  titleWindow.innerHTML = "replayin a lot";
  document.getElementById("cameraButton").classList.add("dontShow");
  document.getElementById("captureButton").classList.add("dontShow");
  document.getElementById("repeateCapture").classList.remove("dontShow");
  document.getElementById("uploadGif").classList.remove("dontShow");
}

function setStartVideoControls() {
  buttonSetUp();
  let timerUpdaterIntervalRef = startTimer();
  let buttonCamera = document.getElementById("cameraButton");
  let buttonListo = document.getElementById("captureButton");
  let titleWindow = document.getElementById("title");
  titleWindow.innerHTML = "capturanding the gif";
  buttonCamera.removeEventListener("click", startRecord);
  buttonListo.removeEventListener("click", startRecord);
  buttonCamera.addEventListener("click", stoper);
  buttonListo.addEventListener("click", stoper);
}

function buttonSetUp() {
  let imgButton = document.getElementById("imgButton");
  imgButton.src = "/images/recording.svg";
  let captButton = document.getElementById("captureButton");
  captButton.innerHTML = "Listo";
  let imgCont = document.getElementById("cameraButton");
  imgCont.classList.add("activeButtons");
  captButton.classList.add("activeButtons");
}

function startProgressBar() {
  let squares = document.getElementsByClassName("progress-bar-square");
  let step = 100;
  for (let index = 0; index < squares.length; index++) {
    squares[index].classList.remove("onProgress");
  }
  intervalFunctionCaller = setInterval(changeColor, step);

  function changeColor() {
    squares[indexOfProgress].classList.add("onProgress");
    indexOfProgress++;
    if (indexOfProgress === 20) {
      clearInterval(intervalFunctionCaller);
      indexOfProgress = 0;
      endUpload();
    }
  }
}

function changeWindowToLoadingScreen() {
  let uploadWindowCont = document.getElementById("uploadConteiner");
  let videoControls = document.getElementById("videoControls");
  let progressBar = document.getElementById("progress-bar");
  let buttonCancel = document.getElementById("buttonCancel");
  video.classList.add("dontShow");
  videoControls.classList.add("dontShow");
  uploadWindowCont.classList.remove("dontShow");
  progressBar.classList.remove("dontShow");
  buttonCancel.classList.remove("dontShow");
}

function closeUploadWindow() {
  let uploadConteiner = document.getElementById("uploadConteiner");
  uploadConteiner.classList.add("dontShow");
  let buttonCancel = document.getElementById("buttonCancel");
  buttonCancel.classList.add("dontShow");
}
async function setupUploadedPage() {
  let titleWindow = document.getElementById("title");
  titleWindow.innerHTML = "Gif Subido";
  let uploadePage = document.getElementById("uploadedPage");
  let imgGif = document.getElementById("loadedGif");
  uploadePage.classList.remove("dontShow");
  newGifUrl =
    "https://media.giphy.com/media/" + dataReturned.data.id + "/giphy.gif";
  imgGif.src = newGifUrl;
  addNewGifToStorage(newGifUrl);
  showGifsStored(getGifsStoraged());
}

function openMisGifs() {
  document.getElementById("startPage").classList.add("dontShow");
  showGifsStored(getGifsStoraged());
}
